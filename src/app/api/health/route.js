import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Database connection failed' },
      { status: 503 }
    )
  }
}


