'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center" id="make">
        {/* Logo Image */}
        <div className="mb-6">
          <Image
            src="/logo.png" // path to the logo image in the public folder
            alt="Logo"
            width={200} // adjust the width as needed
            height={200} // adjust the height as needed
            className="mx-auto"
          />
        </div>
        
        {/* Coming Soon Text */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Make Money with UZA</h1>
        <p className="text-lg text-gray-600 mb-6">Our affiliate program is coming soon. Stay tuned for more updates!</p>

        {/* Optional: Link to Home or Other Pages */}
        <div>
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
