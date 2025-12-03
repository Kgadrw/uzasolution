import mongoose from 'mongoose'

const budgetItemSchema = new mongoose.Schema({
  label: String,
  amount: Number,
  category: String,
}, { _id: false })

const trancheSchema = new mongoose.Schema({
  number: Number,
  amount: Number,
  status: {
    type: String,
    enum: ['pending', 'in_escrow', 'released', 'frozen'],
    default: 'pending',
  },
  releasedAt: Date,
  releasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  milestoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone',
  },
}, { timestamps: true })

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: String,
  location: {
    district: String,
    sector: String,
    cell: String,
  },
  beneficiary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'active', 'completed', 'cancelled'],
    default: 'pending',
  },
  requestedAmount: {
    type: Number,
    required: true,
  },
  totalFunded: {
    type: Number,
    default: 0,
  },
  totalDisbursed: {
    type: Number,
    default: 0,
  },
  budget: [budgetItemSchema],
  tranches: [trancheSchema],
  health: {
    type: String,
    enum: ['on_track', 'at_risk', 'paused'],
    default: 'on_track',
  },
  impactTags: [String],
  stage: String,
  approvedAt: Date,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  completedAt: Date,
  impactReport: {
    url: String,
    generatedAt: Date,
  },
  kpis: {
    margin: Number,
    runway: Number,
    reportingFrequency: String,
    anomalyCount: Number,
    milestonesOnTime: Number,
  },
}, {
  timestamps: true,
})

projectSchema.index({ beneficiary: 1, status: 1 })
projectSchema.index({ status: 1 })
projectSchema.index({ category: 1 })

export default mongoose.models.Project || mongoose.model('Project', projectSchema)


