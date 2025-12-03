import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'
import User from '@/lib/db/models/User'
import { successResponse, errorResponse } from '@/lib/utils'

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

export async function POST(req) {
  try {
    await connectDB()

    // Clear existing test users
    await User.deleteMany({
      email: { $in: testUsers.map(u => u.email) }
    })

    // Create new test users
    const createdUsers = []
    for (const userData of testUsers) {
      const user = new User(userData)
      await user.save()
      createdUsers.push({
        email: userData.email,
        role: userData.role,
        password: userData.password
      })
    }

    return successResponse({
      message: 'Test users created successfully',
      users: createdUsers,
      credentials: {
        admin: {
          email: 'admin@uzaempower.com',
          password: 'admin123'
        },
        donor: {
          email: 'donor@uzaempower.com',
          password: 'donor123'
        },
        beneficiary: {
          email: 'beneficiary@uzaempower.com',
          password: 'beneficiary123'
        }
      }
    }, 201)
  } catch (error) {
    console.error('Seed error:', error)
    return errorResponse('Failed to seed users', 500)
  }
}

