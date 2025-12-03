import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  password: z.string().min(8),
  role: z.enum(['beneficiary', 'donor', 'admin']),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const createProjectSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  category: z.string().optional(),
  location: z.string().optional(),
  requestedAmount: z.number().positive(),
  budget: z.array(z.object({
    label: z.string(),
    amount: z.number().positive(),
  })).optional(),
  milestones: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    targetDate: z.string().optional(),
  })).optional(),
})

export const updateProjectSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).optional(),
  status: z.enum(['pending', 'approved', 'active', 'completed', 'cancelled']).optional(),
})

export const createFundingRequestSchema = z.object({
  projectId: z.string(),
  requestedAmount: z.number().positive(),
  purpose: z.string().min(10),
  supportingNotes: z.string().optional(),
})

export const createPledgeSchema = z.object({
  projectId: z.string(),
  amount: z.number().positive(),
})

export const createTransactionSchema = z.object({
  type: z.enum(['expense', 'revenue', 'disbursement']),
  category: z.string(),
  amount: z.number().positive(),
  description: z.string(),
  date: z.string().optional(),
  paymentMethod: z.string().optional(),
  vendorName: z.string().optional(),
})

export const createMilestoneSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  targetDate: z.string().optional(),
  trancheAmount: z.number().positive().optional(),
})

export const createTopUpSchema = z.object({
  requestedAmount: z.number().positive(),
  purpose: z.string().min(10),
  milestoneId: z.string().optional(),
  expectedRevenue: z.number().optional(),
  expectedTimeline: z.string().optional(),
  supportingNotes: z.string().optional(),
})

export function validateRequest(schema) {
  return async (req) => {
    try {
      const body = await req.json()
      const validated = schema.parse(body)
      return { success: true, data: validated, error: null }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          data: null,
          error: error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        }
      }
      return {
        success: false,
        data: null,
        error: [{ message: 'Invalid request body' }],
      }
    }
  }
}


