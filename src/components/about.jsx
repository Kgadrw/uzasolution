'use client'
import Link from 'next/link'
import { Rocket, Headphones, Settings, DollarSign } from 'lucide-react'; // Using lucide-react icons

export default function AboutUs() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h3 className="text-3xl font-semibold font-[Monospace] text-gray-900 mb-8">Why Choose Us?</h3>
        <p className="text-lg text-gray-600 mb-12 font-[Monospace]">
          We believe in creating lasting relationships with our clients by offering unmatched support, advanced technology, and personalized services.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4 text-[#FBAF43]">
              <Rocket size={40} />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4 font-[Monospace]">Innovative Solutions</h4>
            <p className="text-gray-600 font-[Monospace]">
              We stay ahead of the curve, constantly innovating to offer the best technology solutions for your business.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4 text-[#FBAF43]">
              <Headphones size={40} />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4 font-[Monospace]">Expert Support</h4>
            <p className="text-gray-600 font-[Monospace]">
              Our dedicated support team is available 24/7 to help with any questions or issues you might face.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4 text-[#FBAF43]">
              <Settings size={40} />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4 font-[Monospace]">Customizable Features</h4>
            <p className="text-gray-600 font-[Monospace]">
              We offer solutions tailored to your specific needs, ensuring that every feature fits your business perfectly.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4 text-[#FBAF43]">
              <DollarSign size={40} />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4 font-[Monospace]">Affordable Pricing</h4>
            <p className="text-gray-600 font-[Monospace]">
              Our services are designed to deliver great value, offering competitive pricing without compromising on quality.
            </p>
          </div>
        </div>
      </div>


    </section>
  )
}
