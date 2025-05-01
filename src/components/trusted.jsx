'use client';
import { useEffect, useState } from 'react';
import client, { urlFor } from '../sanityClient';


export default function TrustedCompanies() {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await client.fetch(`*[_type == "trustedCompanies"][0]{
          sectionTitle,
          isVisible,
          companies[]{
            altText,
            logo
          }
        }`);
        setData(res);
        if (res?.companies?.length > 6) {
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Error fetching trusted companies:', error);
      }
    }

    fetchData();
  }, []);

  if (!data || !Array.isArray(data.companies)) return null;

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 font-[Montserrat]">
          {data.sectionTitle || 'Our Trusted Partners'}
        </h3>

        <div
          className={`overflow-hidden relative ${isVisible ? 'animate-slide' : ''}`}
          style={{ whiteSpace: 'nowrap' }}
        >
          <div className={`flex ${isVisible ? 'w-max' : 'flex-wrap justify-center'} items-center gap-12`}>
            {data.companies.map((company, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={urlFor(company.logo).url()}
                  alt={company.altText}
                  width={160}
                  height={100}
                  className="mx-auto h-auto w-auto max-h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-slide > div {
          animation: slide 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
