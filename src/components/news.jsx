'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function InsightsSection() {
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
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center mb-2">
              <span className="w-1.5 h-6 bg-[#FBAF43] rounded mr-3"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FBAF43]">
                Insights
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#213348] font-[Montserrat] leading-snug">
              News & Trends in Africa’s Trade Revolution
            </h2>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-[#FBAF43] hover:bg-[#e59e3b] text-[#213348] font-semibold px-6 py-3 rounded-md transition-all duration-300 group shadow-md hover:shadow-lg text-sm md:text-base whitespace-nowrap"
          >
            Read All Insights
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group"
            >
              <div className="overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#213348] font-[Montserrat] mb-4 line-clamp-2">
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
