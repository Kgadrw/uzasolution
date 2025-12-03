import mongoose from 'mongoose';

const trancheSchema = new mongoose.Schema({
  number: Number,
  amount: Number,
  status: {
    type: String,
    enum: ['pending', 'in_escrow', 'released', 'frozen'],
    default: 'pending'
  },
  milestone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone'
  },
  releasedAt: Date,
  releasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: String,
  location: String,
  beneficiary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestedAmount: {
    type: Number,
    required: true
  },
  totalDisbursed: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  budget: [{
    label: String,
    amount: Number
  }],
  tranches: [trancheSchema]
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);

