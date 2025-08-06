'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function InsightsSection() {
  // Example static data; replace with dynamic data as needed
  const articles = [
    {
      image: '/news1.jpg',
      title: 'How Digital Platforms Are Transforming African Trade',
      link: '#',
    },
    {
      image: '/news2.jpg',
      title: 'Partnerships with Global Giants: The UZA Approach',
      link: '#',
    },
    {
      image: '/news3.jpg',
      title: 'Logistics Innovation: Speeding Up Africa’s Supply Chains',
      link: '#',
    },
  ];

  return (
    <section className="py-16 px-4 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center mb-1">
              <span className="w-1 h-5 bg-[#FBAF43] rounded mr-3"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FBAF43]">Insights</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#213348] font-[Montserrat] mt-2">
              News & Trends in Africa’s Trade Revolution
            </h2>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-[#213348] font-semibold px-5 py-2.5 rounded-md transition-all duration-300 group shadow-md hover:shadow-lg text-sm md:text-base whitespace-nowrap"
          >
            Read All Insights
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <div key={idx} className="bg-white rounded-xl  overflow-hidden flex flex-col h-full">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#213348] font- mb-4">
                  {article.title}
                </h3>
                <div className="mt-auto">
                  <Link
                    href={article.link}
                    className="inline-flex items-center gap-1 text-[#FBAF43] font-semibold text-sm hover:text-[#e59e3b] transition-colors duration-300 group/link"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
