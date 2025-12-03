import mongoose from 'mongoose'
import User from '../src/lib/db/models/User.js'
import connectDB from '../src/lib/db/connect.js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const testUsers = [
  {
    name: 'Admin User',
    email: 'admin@uzaempower.com',
    phone: '+250788000001',
    password: 'admin123',
    role: 'admin',
    isActive: true,
  },
  {
    name: 'John Donor',
    email: 'donor@uzaempower.com',
    phone: '+250788000002',
    password: 'donor123',
    role: 'donor',
    isActive: true,
  },
  {
    name: 'Jane Beneficiary',
    email: 'beneficiary@uzaempower.com',
    phone: '+250788000003',
    password: 'beneficiary123',
    role: 'beneficiary',
    isActive: true,
  },
]

async function seedUsers() {
  try {
    await connectDB()
    console.log('Connected to database')

    // Clear existing test users
    await User.deleteMany({
      email: { $in: testUsers.map(u => u.email) }
    })
    console.log('Cleared existing test users')

    // Create new test users
    for (const userData of testUsers) {
      const user = new User(userData)
      await user.save()
      console.log(`Created user: ${userData.email} (${userData.role})`)
    }

    console.log('\n✅ Test users created successfully!')
    console.log('\n📋 Login Credentials:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('👤 ADMIN:')
    console.log('   Email: admin@uzaempower.com')
    console.log('   Password: admin123')
    console.log('\n💝 DONOR:')
    console.log('   Email: donor@uzaempower.com')
    console.log('   Password: donor123')
    console.log('\n👥 BENEFICIARY:')
    console.log('   Email: beneficiary@uzaempower.com')
    console.log('   Password: beneficiary123')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding users:', error)
    process.exit(1)
  }
}

seedUsers()

