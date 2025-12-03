import express from 'express';
import { authenticate, requireRole } from '../middleware/auth.middleware.js';
import {
  getAdminDashboard,
  getDonorDashboard,
  getBeneficiaryDashboard
} from '../controllers/dashboard.controller.js';

const router = express.Router();

// Admin Dashboard
router.get('/admin', authenticate, requireRole('admin'), getAdminDashboard);

// Donor Dashboard
router.get('/donor', authenticate, requireRole('donor'), getDonorDashboard);

// Beneficiary Dashboard
router.get('/beneficiary', authenticate, requireRole('beneficiary'), getBeneficiaryDashboard);

export default router;

