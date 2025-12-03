import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['tranche_released', 'milestone_approved', 'anomaly_query', 'topup_decision', 'project_update', 'other'],
    required: true,
  },
  title: String,
  message: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: Date,
  metadata: mongoose.Schema.Types.Mixed,
}, {
  timestamps: true,
})

notificationSchema.index({ user: 1, isRead: 1 })
notificationSchema.index({ user: 1, createdAt: -1 })

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema)


