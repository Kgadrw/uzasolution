import mongoose from 'mongoose';

const KycDocumentSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    url: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, trim: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['beneficiary', 'donor', 'admin'],
      default: 'beneficiary',
    },
    orgId: { type: String },
    kycStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    kycDocuments: [KycDocumentSchema],
  },
  { timestamps: true },
);

UserSchema.index({ phone: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true, sparse: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
