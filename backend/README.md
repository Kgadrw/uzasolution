# Backend API for UZA Empower Dashboards

This folder contains the backend API implementation for UZA Empower dashboards.

## Structure

```
backend/
├── config/          # Database and configuration
├── controllers/     # Business logic
├── middleware/      # Authentication and authorization
├── models/          # Database models
├── routes/          # API routes
├── server.js        # Main server file
└── package.json     # Dependencies
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB URI and JWT secret.

4. Run the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user (requires auth)

### Dashboards
- `GET /api/dashboards/admin` - Admin dashboard data (requires admin role)
- `GET /api/dashboards/donor` - Donor dashboard data (requires donor role)
- `GET /api/dashboards/beneficiary` - Beneficiary dashboard data (requires beneficiary role)

### Health Check
- `GET /api/health` - Server health check

## Authentication

All dashboard endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Database Models

- User
- Project
- Transaction
- Milestone
- Pledge
- Alert
- Notification
- FundingRequest

