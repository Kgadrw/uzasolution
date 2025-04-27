'use client'
import { Globe, ShieldCheck, Handshake } from 'lucide-react'; // Updated icons
import Link from 'next/link'

export default function AboutUs() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h3 className="text-2xl font-semibold font-[Monospace] text-gray-900 mb-6">Why Choose Us?</h3>
        <p className="text-base text-gray-600 mb-8 font-[Monospace]">
          We’re reshaping African trade with tech-powered transparency, global partnerships, and Pan-African presence.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg">
            <div className="mb-4 text-[#FBAF43]">
              <Globe size={30} />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3 font-[Monospace]">Pan-African & Global Reach</h4>
            <p className="text-sm text-gray-600 font-[Monospace]">
              Offices in Rwanda, Uganda, and Hong Kong ensure a strong presence from Africa to Asia.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg">
            <div className="mb-4 text-[#FBAF43]">
              <ShieldCheck size={30} />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3 font-[Monospace]">Tech-Driven Trust</h4>
            <p className="text-sm text-gray-600 font-[Monospace]">
              We use blockchain to bring unmatched transparency to the supply chain.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg">
            <div className="mb-4 text-[#FBAF43]">
              <Handshake size={30} />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3 font-[Monospace]">Partnerships That Matter</h4>
            <p className="text-sm text-gray-600 font-[Monospace]">
              Collaborating with Alibaba, Maersk, and key African trade alliances to open global doors.
            </p>
          </div>
        </div>
      </div>

      {/* Make Money with UZA */}
      <div className="max-w-7xl mx-auto mt-16 bg-white border border-gray-200 p-6 rounded-lg">
        <h3 className="text-2xl font-semibold font-[Monospace] text-gray-900 text-center mb-6">
          Make Money with UZA
        </h3>
        <p className="text-base text-gray-600 font-[Monospace] mb-4 text-center">
          Our Affiliate Program offers a straightforward way to earn commission from your referrals.
          Use the calculator below to estimate your potential earnings. Affiliates receive a commission on every sale generated through their unique link.
        </p>

        {/* Calculator Placeholder */}
        <div className="text-center mb-6">
          <p className="text-lg text-gray-500 font-[Monospace]">
            Coming Soon!
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <Link
            href="/affiliate"
            className="inline-block bg-[#FBAF43] hover:bg-[#e59e3b] text-white text-base font-medium font-[Monospace] py-2 px-5 rounded-md transition"
          >
            Join the Affiliate Program
          </Link>
        </div>
      </div>
    </section>
  )
}
