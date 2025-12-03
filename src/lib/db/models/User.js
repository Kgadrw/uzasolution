import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['beneficiary', 'donor', 'admin'],
    required: true,
  },
  kycStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'expired'],
    default: 'pending',
  },
  kycDocuments: [{
    type: {
      type: String,
      enum: ['id', 'passport', 'business_registration', 'bank_statement', 'other'],
    },
    url: String,
    uploadedAt: Date,
  }],
  businessName: String,
  location: {
    district: String,
    sector: String,
    cell: String,
  },
  bankAccount: {
    accountNumber: String,
    bankName: String,
  },
  momoNumber: String,
  refreshToken: String,
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  delete obj.refreshToken
  return obj
}

export default mongoose.models.User || mongoose.model('User', userSchema)


