import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  filename: String,
  originalName: String,
  mimeType: String,
  size: Number,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  entityType: {
    type: String,
    enum: ['kyc', 'transaction', 'milestone', 'topup', 'other'],
  },
  entityId: mongoose.Schema.Types.ObjectId,
  isPublic: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
})

mediaSchema.index({ uploadedBy: 1 })
mediaSchema.index({ entityType: 1, entityId: 1 })

export default mongoose.models.Media || mongoose.model('Media', mediaSchema)


