'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TrustedCompanies() {
  const logos = [
    { src: '/alibaba.png', alt: 'Alibaba' },
    { src: '/ebay.png', alt: 'eBay' },
    { src: '/amazon.png', alt: 'Amazon' },
  
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (logos.length > 6) {
      setIsVisible(true);
    }
  }, [logos]);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 font-[Montserrat]">
          Our Trusted Partners
        </h3>

        <div
          className={`overflow-hidden relative ${isVisible ? 'animate-slide' : ''}`}
          style={{ whiteSpace: 'nowrap' }}
        >
          <div className={`flex ${isVisible ? 'w-max' : 'flex-wrap justify-center'} items-center gap-12`}>
            {logos.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
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
