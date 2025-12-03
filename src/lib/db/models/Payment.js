import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  pledge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pledge',
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'RWF',
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['momo', 'bank', 'card', 'other'],
  },
  transactionId: String,
  providerResponse: mongoose.Schema.Types.Mixed,
  webhookData: mongoose.Schema.Types.Mixed,
  processedAt: Date,
}, {
  timestamps: true,
})

paymentSchema.index({ project: 1 })
paymentSchema.index({ status: 1 })
paymentSchema.index({ transactionId: 1 })

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema)


