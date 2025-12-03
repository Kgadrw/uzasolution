import User from '../models/User.js';
import Project from '../models/Project.js';
import Transaction from '../models/Transaction.js';
import Milestone from '../models/Milestone.js';
import FundingRequest from '../models/FundingRequest.js';
import Pledge from '../models/Pledge.js';
import Alert from '../models/Alert.js';
import Notification from '../models/Notification.js';

// Admin Dashboard
export const getAdminDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get summary statistics
    const totalProjects = await Project.countDocuments();
    const pendingReview = await Project.countDocuments({ status: 'pending' });
    const activeProjects = await Project.countDocuments({ status: 'active' });
    
    // Calculate total funds
    const projects = await Project.find({});
    const totalFunds = projects.reduce((sum, p) => sum + (p.requestedAmount || 0), 0);
    const totalDisbursed = projects.reduce((sum, p) => sum + (p.totalDisbursed || 0), 0);
    
    // Get pending tranches
    const projectsWithTranches = await Project.find({ 'tranches.status': 'in_escrow' });
    const pendingTranches = projectsWithTranches.reduce((sum, p) => {
      return sum + p.tranches.filter(t => t.status === 'in_escrow').length;
    }, 0);
    
    // Get alerts count
    const alertsCount = await Alert.countDocuments({ status: 'active' });
    
    // Get pending KYC
    const kycPending = await User.countDocuments({ 
      role: { $in: ['beneficiary', 'donor'] },
      kycStatus: 'pending' 
    });

    // Get recent projects
    const recentProjects = await Project.find()
      .populate('beneficiary', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get recent alerts
    const recentAlerts = await Alert.find()
      .populate('project', 'title')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        summary: {
          totalProjects,
          pendingReview,
          activeProjects,
          totalFunds,
          totalDisbursed,
          pendingTranches,
          alertsCount,
          kycPending
        },
        recentProjects,
        recentAlerts
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin dashboard data'
    });
  }
};

// Donor Dashboard
export const getDonorDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get all pledges by this donor
    const pledges = await Pledge.find({ donor: userId })
      .populate('project', 'title description category location status');

    // Calculate portfolio summary
    const totalPledged = pledges.reduce((sum, p) => sum + (p.amount || 0), 0);
    
    // Get projects from pledges
    const projectIds = pledges.map(p => p.project._id);
    const projects = await Project.find({ _id: { $in: projectIds } });
    
    const totalDisbursed = projects.reduce((sum, p) => sum + (p.totalDisbursed || 0), 0);
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    
    // Calculate project health
    const onTrackProjects = projects.filter(p => {
      // Simple logic - can be enhanced
      return p.status === 'active' && (p.totalDisbursed || 0) < (p.requestedAmount || 0);
    }).length;
    
    const atRiskProjects = await Alert.countDocuments({
      project: { $in: projectIds },
      status: 'active'
    });

    // Get unread alerts
    const unreadAlerts = await Alert.countDocuments({
      project: { $in: projectIds },
      readBy: { $ne: userId }
    });

    // Calculate average impact score (placeholder - implement based on your metrics)
    const averageImpactScore = 4.5; // This should be calculated from actual data

    res.json({
      success: true,
      data: {
        portfolioSummary: {
          totalPledged,
          totalDisbursed,
          activeProjects,
          completedProjects,
          onTrackProjects,
          atRiskProjects,
          averageImpactScore,
          unreadAlerts
        },
        projects: projects.map(p => ({
          id: p._id,
          title: p.title,
          category: p.category,
          location: p.location,
          status: p.status,
          healthBadge: onTrackProjects > atRiskProjects ? 'On Track' : 'At Risk',
          kycStatus: 'Verified', // Get from user
          lastMilestone: 'In Progress', // Get from milestones
          pledgeAmount: pledges.find(pl => pl.project.toString() === p._id.toString())?.amount || 0
        }))
      }
    });
  } catch (error) {
    console.error('Donor dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donor dashboard data'
    });
  }
};

// Beneficiary Dashboard
export const getBeneficiaryDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user's projects
    const projects = await Project.find({ beneficiary: userId })
      .sort({ createdAt: -1 });

    if (projects.length === 0) {
      return res.json({
        success: true,
        data: {
          summary: {
            cashBalance: 0,
            nextMilestone: null,
            nextMilestoneDate: null,
            nextMilestoneStatus: null,
            pendingDecisions: 0,
            projectHealth: 'No Projects'
          },
          projectData: null
        }
      });
    }

    const project = projects[0]; // Get the most recent or active project

    // Calculate cash balance
    const transactions = await Transaction.find({ project: project._id })
      .sort({ date: -1 });
    
    let cashBalance = project.totalDisbursed || 0;
    transactions.forEach(t => {
      if (t.type === 'expense') {
        cashBalance -= t.amount;
      } else if (t.type === 'revenue') {
        cashBalance += t.amount;
      }
    });

    // Get next milestone
    const milestones = await Milestone.find({ project: project._id })
      .sort({ targetDate: 1 });
    
    const nextMilestone = milestones.find(m => m.status !== 'approved') || null;

    // Get pending decisions (milestones pending approval)
    const pendingDecisions = await Milestone.countDocuments({
      project: project._id,
      status: { $in: ['pending', 'evidence_submitted'] }
    });

    // Calculate project health
    const totalSpent = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalRevenue = transactions
      .filter(t => t.type === 'revenue')
      .reduce((sum, t) => sum + t.amount, 0);

    const projectHealth = (totalSpent / (project.totalDisbursed || 1)) < 0.8 
      ? 'On Track' 
      : 'At Risk';

    // Get unread notifications
    const unreadNotifications = await Notification.countDocuments({
      user: userId,
      read: false
    });

    res.json({
      success: true,
      data: {
        summary: {
          cashBalance,
          nextMilestone: nextMilestone?.title || null,
          nextMilestoneDate: nextMilestone?.targetDate || null,
          nextMilestoneStatus: nextMilestone?.status || null,
          pendingDecisions,
          projectHealth
        },
        projectData: {
          title: project.title,
          category: project.category,
          location: project.location,
          totalBudget: project.requestedAmount || 0,
          totalDisbursed: project.totalDisbursed || 0,
          totalSpent,
          totalRevenue
        },
        unreadNotifications
      }
    });
  } catch (error) {
    console.error('Beneficiary dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch beneficiary dashboard data'
    });
  }
};

