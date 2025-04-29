'use client'
import Link from 'next/link'
import { Globe, Target } from 'lucide-react'

export default function AboutUs() {
  return (
    <section id="about" className="py-20 px-6 bg-gray-50">
      {/* ---------- MOBILE STACKED LAYOUT ---------- */}
      <div className="max-w-7xl mx-auto block lg:hidden space-y-12">
        {/* About */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 font-[Montserrat] mb-4 text-center">
            About <span className='text-[#FBAF43]'>UZA Solutions</span>
          </h3>
          <p className="text-[1.075rem] text-gray-700 font-[Montserrat] leading-relaxed text-center">
            At Uza Solutions Ltd, we empower African manufacturers and wholesalers by connecting them to global markets.
            Our platform enables seamless cross-border trade, offering direct access to raw materials and products from
            top global manufacturers. We eliminate middlemen, reduce costs, and provide customized solutions to boost
            your business. Whether importing or exporting, Uza Solutions simplifies the entire process, ensuring
            competitive prices and reliable logistics. Join us in transforming African trade for a more connected,
            prosperous future.
          </p>
        </div>

        {/* Overview */}
        <div>
          <h4 className="text-xl font-semibold text-gray-800 font-[Montserrat] mb-2 flex items-center justify-center gap-2 text-center">
            <Globe size={20} className="text-[#FBAF43]" />
            Overview
          </h4>
          <p className="text-base text-gray-600 font-[Monospace] text-center">
            UZA Solutions is a Rwandan-owned global tech company revolutionizing trade and business growth across Africa
            through innovative digital platforms. By leveraging strategic partnerships with industry giants like Alibaba Group
            and Maersk, we eliminate middlemen, reduce costs, and connect African businesses directly to global markets.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h4 className="text-xl font-semibold text-gray-800 font-[Monospace] mb-2 flex items-center justify-center gap-2 text-center">
            <Target size={20} className="text-[#FBAF43]" />
            Mission
          </h4>
          <p className="text-base text-gray-600 font-[Monospace] text-center">
            To democratize access to global trade, empower intra-African commerce, and provide end-to-end solutions that
            simplify sourcing, logistics, and scaling for businesses of all sizes.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm text-center">
          <h4 className="text-xl font-semibold text-gray-900 font-[Monospace] mb-1">
            Join the Movement
          </h4>
          <p className="text-base text-gray-600 font-[Montserrat] mb-4">
            From Kigali to Hong Kong, we’re building the infrastructure for Africa’s trade future.
          </p>
          <Link
            href="https://www.uzabulk.com/auth/signup"
            className="inline-block bg-[#FBAF43] hover:bg-[#e59e3b] text-white text-base font-medium font-[Montserrat] py-2.5 px-5 rounded-md transition"
          >
            Partner with Us
          </Link>
        </div>
      </div>

      {/* ---------- DESKTOP TABLE LAYOUT ---------- */}
      <div className="max-w-7xl mx-auto overflow-x-auto hidden lg:table">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-xl font-semibold text-gray-800 font-[Montserrat] text-left">
                About <span className='text-[#FBAF43]'>UZA Solutions</span>
              </th>
              <th className="px-6 py-4 text-xl font-semibold text-gray-800 font-[Montserrat] text-center">
                <div className="flex items-center justify-center gap-2">
                  <Globe size={20} className="text-[#FBAF43]" />
                  Overview
                </div>
              </th>
              <th className="px-6 py-4 text-xl font-semibold text-gray-800 font-[Montserrat] text-center">
                <div className="flex items-center justify-center gap-2">
                  <Target size={20} className="text-[#FBAF43]" />
                  Mission
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top">
              <td className="px-6 py-6 text-gray-700 font-[Montserrat] text-[1.075rem] leading-relaxed">
                At Uza Solutions Ltd, we empower African manufacturers and wholesalers by connecting them to global markets.
                Our platform enables seamless cross-border trade, offering direct access to raw materials and products from
                top global manufacturers. We eliminate middlemen, reduce costs, and provide customized solutions to boost
                your business. Whether importing or exporting, Uza Solutions simplifies the entire process, ensuring
                competitive prices and reliable logistics. Join us in transforming African trade for a more connected,
                prosperous future.
              </td>
              <td className="px-6 py-6 text-gray-600 font-[Montserrat] text-base">
                UZA Solutions is a Rwandan-owned global tech company revolutionizing trade and business growth across Africa
                through innovative digital platforms. By leveraging strategic partnerships with industry giants like Alibaba Group
                and Maersk, we eliminate middlemen, reduce costs, and connect African businesses directly to global markets.
              </td>
              <td className="px-6 py-6 text-gray-600 font-[Montserrat] text-base">
                To democratize access to global trade, empower intra-African commerce, and provide end-to-end solutions that
                simplify sourcing, logistics, and scaling for businesses of all sizes.
              </td>
            </tr>

            {/* CTA Row */}
            <tr>
              <td colSpan={3} className="px-6 py-6">
                <div className="bg-white border border-gray-200 rounded-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 font-[Montserrat] mb-1 text-left">
                      Join the Movement
                    </h4>
                    <p className="text-base text-gray-600 font-[Montserrat] text-left">
                      From Kigali to Hong Kong, we’re building the infrastructure for Africa’s trade future.
                    </p>
                  </div>
                  <Link
                    href="https://www.uzabulk.com/auth/signup"
                    className="inline-block bg-[#FBAF43] hover:bg-[#e59e3b] text-white text-base font-medium font-[Montserrat] py-2.5 px-5 rounded-md transition whitespace-nowrap"
                  >
                    Partner with Us
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
