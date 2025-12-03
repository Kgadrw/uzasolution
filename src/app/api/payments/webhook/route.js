import { NextResponse } from 'next/server'
import connectDB from '@/lib/db/connect'
import Payment from '@/lib/db/models/Payment'
import { successResponse, errorResponse } from '@/lib/utils'

export async function POST(req) {
  try {
    await connectDB()
    
    const webhookData = await req.json()

    // Verify webhook signature here if needed
    // For now, just process the payment

    const payment = await Payment.findOne({ transactionId: webhookData.transactionId })
    if (payment) {
      payment.status = webhookData.status || 'completed'
      payment.providerResponse = webhookData
      payment.webhookData = webhookData
      payment.processedAt = new Date()
      await payment.save()
    }

    return successResponse({ message: 'Webhook processed' })
  } catch (error) {
    console.error('Webhook error:', error)
    return errorResponse('Webhook processing failed', 500)
  }
}






