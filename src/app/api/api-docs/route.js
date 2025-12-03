import { NextResponse } from 'next/server'

export async function GET() {
  const docs = {
    info: {
      title: 'UZA Empower API',
      version: '1.0.0',
      description: 'Complete API documentation for UZA Empower platform',
    },
    basePath: '/api',
    endpoints: [
      {
        path: '/health',
        method: 'GET',
        description: 'Health check endpoint',
        auth: false,
      },
      {
        path: '/api-docs',
        method: 'GET',
        description: 'API documentation',
        auth: false,
      },
      {
        path: '/auth/register',
        method: 'POST',
        description: 'Register a new user',
        auth: false,
      },
      {
        path: '/auth/login',
        method: 'POST',
        description: 'Login user',
        auth: false,
      },
      {
        path: '/auth/refresh',
        method: 'POST',
        description: 'Refresh access token',
        auth: false,
      },
      {
        path: '/auth/logout',
        method: 'POST',
        description: 'Logout user',
        auth: true,
      },
      // Add more endpoints as needed
    ],
  }

  return NextResponse.json(docs)
}


