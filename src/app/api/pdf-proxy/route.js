import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const pdfUrl = searchParams.get('url')
    
    if (!pdfUrl) {
      return NextResponse.json(
        { error: 'PDF URL is required' },
        { status: 400 }
      )
    }

    // Fetch the PDF from Cloudinary
    const response = await fetch(pdfUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf,application/octet-stream',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch PDF: ${response.status} ${response.statusText}` },
        { status: response.status }
      )
    }

    // Get the PDF as a blob
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()

    // Return the PDF with proper headers
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="catalogue.pdf"',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    })
  } catch (error) {
    console.error('PDF proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PDF' },
      { status: 500 }
    )
  }
}

