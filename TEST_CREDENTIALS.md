# Test Credentials for UZA Empower Dashboards

## How to Create Test Users

Run this command to seed the database with test users:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or visit: `http://localhost:3000/api/seed` in your browser (though POST is required, so use curl or Postman)

## Login Credentials

### 👤 Admin Dashboard
- **Email:** `admin@uzaempower.com`
- **Password:** `admin123`
- **Dashboard URL:** `/uzasempower/login/admin/dashboard`

### 💝 Donor Dashboard
- **Email:** `donor@uzaempower.com`
- **Password:** `donor123`
- **Dashboard URL:** `/uzasempower/donor/dashboard`

### 👥 Beneficiary Dashboard
- **Email:** `beneficiary@uzaempower.com`
- **Password:** `beneficiary123`
- **Dashboard URL:** `/uzasempower/beneficiary/dashboard`

## Quick Login Steps

1. Go to `/uzasempower/login`
2. Enter one of the credentials above
3. You'll be automatically redirected to the appropriate dashboard based on the role

## Notes

- These are test credentials only - do not use in production
- The seed endpoint will delete and recreate these users each time it's called
- All users are set to `isActive: true` by default

