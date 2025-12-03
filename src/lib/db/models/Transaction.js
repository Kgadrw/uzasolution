import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  type: {
    type: String,
    enum: ['expense', 'revenue', 'disbursement'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'momo', 'bank', 'other'],
  },
  vendorName: String,
  balance: Number,
  proofStatus: {
    type: String,
    enum: ['uploaded', 'missing', 'pending'],
    default: 'pending',
  },
  media: [{
    url: String,
    type: String,
    uploadedAt: Date,
  }],
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
  },
  flagged: {
    type: Boolean,
    default: false,
  },
  flagReason: String,
  anomalyScore: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
})

transactionSchema.index({ project: 1, date: -1 })
transactionSchema.index({ project: 1, type: 1 })
transactionSchema.index({ flagged: 1 })

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)


