# UZA Empower API Implementation

## Overview

This document describes the complete API implementation for the UZA Empower platform. All endpoints have been implemented using Next.js 15 App Router with MongoDB/Mongoose for data persistence.

## Project Structure

```
src/
├── lib/
│   ├── db/
│   │   ├── connect.js           # MongoDB connection utility
│   │   └── models/              # Mongoose models
│   │       ├── User.js
│   │       ├── Project.js
│   │       ├── KYC.js
│   │       ├── Transaction.js
│   │       ├── Milestone.js
│   │       ├── FundingRequest.js
│   │       ├── Pledge.js
│   │       ├── TopUp.js
│   │       ├── Alert.js
│   │       ├── Notification.js
│   │       ├── Payment.js
│   │       ├── Dispute.js
│   │       └── Media.js
│   ├── auth.js                  # Authentication & authorization utilities
│   ├── validation.js            # Zod validation schemas
│   └── utils.js                 # Helper functions
└── app/
    └── api/                     # API route handlers
        ├── health/
        ├── api-docs/
        ├── auth/
        ├── users/
        ├── kyc/
        ├── projects/
        ├── funding-requests/
        ├── pledges/
        ├── transactions/
        ├── milestones/
        ├── top-ups/
        ├── payments/
        ├── disputes/
        ├── alerts/
        ├── notifications/
        ├── messaging/
        ├── upload/
        ├── media/
        └── admin/
```

## Environment Variables

Required environment variables (add to `.env.local`):

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Token Structure

- Access tokens expire after 7 days
- Refresh tokens expire after 30 days
- Tokens contain: `userId`, `email`, `role`

## Endpoints Summary

### System Endpoints

- `GET /api/health` - Health check (no auth)
- `GET /api/api-docs` - API documentation (no auth)

### Authentication (`/api/auth`)

- `POST /api/auth/register` - Register new user (no auth)
- `POST /api/auth/login` - Login user (no auth)
- `POST /api/auth/refresh` - Refresh access token (no auth)
- `POST /api/auth/logout` - Logout user (auth required)

### Users (`/api/users`)

- `GET /api/users/me` - Get current user profile (auth required)
- `PUT /api/users/me` - Update current user profile (auth required)
- `GET /api/users/:id` - Get user by ID (admin only)

### KYC (`/api/kyc`)

- `POST /api/kyc/submit` - Submit KYC documents (auth required, file upload)
- `GET /api/kyc/status` - Get KYC status for current user (auth required)
- `GET /api/kyc/pending` - Get pending KYC submissions (admin only)
- `PUT /api/kyc/:id/approve` - Approve KYC submission (admin only)
- `PUT /api/kyc/:id/reject` - Reject KYC submission (admin only)

### Projects (`/api/projects`)

- `POST /api/projects` - Create a new project (auth required)
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/mine` - Get current user's projects (auth required)
- `GET /api/projects/:id` - Get project by ID (public)
- `PUT /api/projects/:id` - Update project (auth required)
- `PUT /api/projects/:id/status` - Update project status (admin only)
- `GET /api/projects/:id/budget` - Get project budget (public)
- `PUT /api/projects/:id/budget` - Update project budget (auth required)
- `GET /api/projects/:id/kpis` - Get project KPIs (public)
- `GET /api/projects/:id/impact-report` - Get project impact report (public)
- `POST /api/projects/:id/complete` - Complete a project (auth required)

### Funding Requests (`/api/funding-requests`)

- `POST /api/funding-requests` - Create a funding request (auth required)
- `GET /api/funding-requests/mine` - Get current user's funding requests (auth required)
- `GET /api/funding-requests/pending` - Get pending funding requests (admin only)
- `GET /api/funding-requests/:id` - Get funding request by ID (auth required)
- `PUT /api/funding-requests/:id/approve` - Approve funding request (admin only)
- `PUT /api/funding-requests/:id/reject` - Reject funding request (admin only)

### Pledges (`/api/pledges`)

- `POST /api/pledges` - Create a pledge (donor auth required)
- `GET /api/pledges/mine` - Get current user's pledges (auth required)
- `GET /api/pledges/projects/:id` - Get pledges for a project (public)
- `GET /api/pledges/:id` - Get pledge by ID (auth required)

### Tranches (`/api/projects/:id/tranches`)

- `GET /api/projects/:id/tranches` - Get project tranches (auth required)
- `POST /api/projects/:id/tranches/:trancheId/release` - Release a tranche (admin only)
- `POST /api/projects/:id/tranches/:trancheId/freeze` - Freeze a tranche (admin only)

### Transactions (`/api/projects/:id/transactions`)

- `POST /api/projects/:id/transactions` - Create a transaction (auth required)
- `GET /api/projects/:id/transactions` - Get project transactions (auth required)
- `GET /api/transactions/:id` - Get transaction by ID (auth required)
- `POST /api/transactions/:id/media` - Upload transaction media (auth required, file upload)
- `GET /api/projects/:id/ledger` - Get project ledger (auth required)

### Milestones (`/api/projects/:id/milestones`)

- `POST /api/projects/:id/milestones` - Create a milestone (auth required)
- `GET /api/projects/:id/milestones` - Get project milestones (public)
- `POST /api/milestones/:id/evidence` - Upload milestone evidence (auth required, file upload)
- `PUT /api/milestones/:id/approve` - Approve milestone (admin only)
- `PUT /api/milestones/:id/reject` - Reject milestone (admin only)

### Top-Ups (`/api/projects/:id/top-ups`)

- `POST /api/projects/:id/top-ups` - Create a top-up request (auth required)
- `GET /api/projects/:id/top-ups` - Get project top-ups (auth required)
- `PUT /api/top-ups/:id/approve` - Approve top-up (admin only)
- `PUT /api/top-ups/:id/reject` - Reject top-up (admin only)

### Payments (`/api/payments`)

- `POST /api/payments/webhook` - Payment webhook handler (no auth)
- `GET /api/payments/:id` - Get payment by ID (auth required)
- `GET /api/payments/projects/:id/payments` - Get project payments (auth required)

### Disputes (`/api/disputes`)

- `POST /api/disputes/projects/:id/disputes` - Create a dispute (auth required)
- `GET /api/disputes/mine` - Get current user's disputes (auth required)
- `GET /api/disputes/pending` - Get pending disputes (admin only)
- `PUT /api/disputes/:id/resolve` - Resolve a dispute (admin only)

### Alerts (`/api/alerts`)

- `GET /api/alerts` - Get all alerts (admin only)
- `GET /api/alerts/projects/:id/alerts` - Get project alerts (auth required)
- `PUT /api/alerts/:id/resolve` - Resolve an alert (admin only)

### Notifications (`/api/notifications`)

- `GET /api/notifications` - Get user notifications (auth required)
- `PUT /api/notifications/:id/read` - Mark notification as read (auth required)

### Messaging (`/api/messaging`)

- `POST /api/messaging/sms` - Send SMS message (admin only)
- `POST /api/messaging/whatsapp` - Send WhatsApp message (admin only)
- `POST /api/messaging/email` - Send email message (admin only)

### File Upload (`/api/upload`)

- `POST /api/upload` - Upload a file (auth required, file upload)
- `GET /api/upload/:id` - Get uploaded media by ID (public)

### Media Access (`/api/media`)

- `GET /api/media/:id` - Get media by ID (public) - Alias for `/api/upload/:id`

### Admin (`/api/admin`)

- `GET /api/admin/dashboard` - Get admin dashboard data (admin only)
- `GET /api/admin/review-queue` - Get review queue (admin only)
- `GET /api/admin/risk-heatmap` - Get risk heatmap (admin only)
- `GET /api/admin/audit-log` - Get audit log (admin only)

## Database Models

### User
- Authentication credentials
- Profile information
- KYC status
- Role (beneficiary, donor, admin)

### Project
- Project details
- Budget and tranches
- Status and health tracking
- KPIs

### Transaction
- Expense/revenue/disbursement records
- Media attachments
- Balance tracking
- Anomaly detection

### Milestone
- Project milestones
- Evidence submissions
- Approval workflow

### Additional Models
- KYC, FundingRequest, Pledge, TopUp
- Alert, Notification, Payment, Dispute
- Media (file storage metadata)

## Notes

1. **File Uploads**: Currently implemented with placeholder URLs. Integrate with S3, Cloudinary, or similar service for production.

2. **Payment Processing**: Webhook handler is implemented but needs integration with actual payment provider.

3. **Messaging**: SMS, WhatsApp, and Email endpoints are placeholders. Integrate with actual service providers.

4. **Anomaly Detection**: Logic needs to be implemented based on transaction patterns.

5. **Notifications**: Auto-generation of notifications needs to be implemented when events occur (tranche release, milestone approval, etc.).

6. **Audit Log**: Currently a placeholder. Implement proper audit logging model.

## Testing

Use the provided curl examples in the main README.md or use tools like Postman/Insomnia to test the endpoints.

## Next Steps

1. Integrate file storage service (S3/Cloudinary)
2. Implement payment gateway integration
3. Set up messaging service providers
4. Implement anomaly detection algorithms
5. Set up notification triggers
6. Implement audit logging
7. Add comprehensive error handling
8. Add rate limiting
9. Set up API documentation (Swagger/OpenAPI)






