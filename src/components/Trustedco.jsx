'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TrustedCompanies() {
  const logos = [
    { src: '/alibaba.png', alt: 'Alibaba' },
    { src: '/ebay.png', alt: 'eBay' },
    { src: '/amazon.png', alt: 'Amazon' },
    // Example of 8th logo
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (logos.length > 6) {
      setIsVisible(true); // Start the sliding animation only if there are more than 6 logos
    }
  }, [logos]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-3xl font-semibold text-gray-900 mb-8 font-[Monospace]">Our Trusted Partners</h3>
        
        {/* Sliding animation container */}
        <div
          className={`overflow-hidden ${isVisible ? 'animate-slide' : ''}`}
          style={{ whiteSpace: 'nowrap' }}
        >
          <div className="flex justify-center items-center space-x-16">
            {/* Render Company Logos */}
            {logos.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={100}
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

        .animate-slide {
          animation: slide 50s linear infinite;
        }
      `}</style>
    </section>
  );
}
