import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  targetDate: Date,
  status: {
    type: String,
    enum: ['not_started', 'pending', 'evidence_submitted', 'approved', 'rejected'],
    default: 'not_started'
  },
  trancheAmount: Number,
  evidence: [{
    type: String, // URLs to evidence files
    url: String,
    uploadedAt: Date
  }],
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date
}, {
  timestamps: true
});

export default mongoose.model('Milestone', milestoneSchema);

