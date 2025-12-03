import mongoose from 'mongoose'

const pledgeSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  },
  paymentId: String,
  pledgedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
})

pledgeSchema.index({ project: 1 })
pledgeSchema.index({ donor: 1 })
pledgeSchema.index({ status: 1 })

export default mongoose.models.Pledge || mongoose.model('Pledge', pledgeSchema)


