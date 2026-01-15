## UZA Solution Platform

This repository hosts the UZA Solution marketing site together with the UZA Empower backend APIs implemented with the Next.js App Router. The backend follows the system architecture documented in “UZA Empower — System Architecture” and persists data in MongoDB Atlas.

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas cluster (or compatible MongoDB instance)

### Environment



### Install & Run

```bash
npm install
npm run dev
```

The site and API routes will be available at `http://localhost:3000`.

### API Overview

All API endpoints live under `/api/v1` and expect a JWT bearer token except for registration and login. Responses follow JSON conventions and use standard HTTP status codes.

| Area | Endpoint | Notes |
| --- | --- | --- |
| Auth | `POST /api/v1/auth/register` | Beneficiary & donor onboarding with optional KYC documents |
|  | `POST /api/v1/auth/login` | Returns JWT and profile |
| Projects | `POST /api/v1/projects` | Beneficiary creates project with budget & milestones |
|  | `GET /api/v1/projects?status=approved` | List projects for donor portal |
|  | `PATCH /api/v1/projects/:id/review` | Admin review + tranche plan |
|  | `PATCH /api/v1/projects/:id` | Mark project `completed` and generate a report stub |
| Funding | `POST /api/v1/projects/:id/pledges` | Donor pledges funds (simulated escrow) |
| Tranches | `POST /api/v1/tranches/:id/release` | Admin release tranche, ledger + audit |
| Ledger | `POST /api/v1/projects/:id/transactions` | Beneficiary logs expense/revenue, triggers risk checks |
| Milestones | `POST /api/v1/milestones/:id/evidence` | Submit milestone evidence |
|  | `PATCH /api/v1/milestones/:id/review` | Admin decision |
| Top-ups | `POST /api/v1/projects/:id/topups` | Auto-score top-up requests |
| Alerts | `GET /api/v1/alerts` | Admin alert queue |
|  | `PATCH /api/v1/alerts/:id` | Resolve, request info, or freeze project |
| Reports | `GET /api/v1/projects/:id/report` | Fetch generated project report |

Event emission and notifications are currently logged to the console in non-production environments. Integrate with Kafka, email, SMS, or WebSocket services by extending `src/lib/events.js`.

### Testing With curl

```bash
# Register beneficiary
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","phone":"+250700000000","password":"Passw0rd!","role":"beneficiary"}'

# Create project (replace TOKEN with JWT from login)
curl -X POST http://localhost:3000/api/v1/projects \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Poultry Expansion","description":"Project description ...","requestedAmount":5000,"budget":[{"label":"Chicks","amount":2000}],"milestones":[{"title":"Setup","criteria":"Build coops"}]}'
```

### Folder Structure Highlights

- `src/lib` – shared backend utilities (DB connection, auth, validation, events)
- `src/lib/db/models` – Mongoose models matching the Empower data model
- `src/app/api/v1/**` – Route handlers for each service area
- `src/app/uzasempower/page.jsx` – Product marketing UI for Empower

### Next Steps

- Connect `src/lib/events.js` and `notify` helpers to real infrastructure.
- Replace the placeholder report generator with the analytics pipeline.
- Implement webhooks for payment confirmation and KYC providers.

### Troubleshooting

- Ensure the MongoDB user has read/write permissions on the target database.
- If you change the connection string, restart the dev server to reset the cached connection.
- JWT errors usually indicate an expired token or a mismatch between `JWT_SECRET` values across environments.
