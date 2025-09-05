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
        {/* Section Header */}
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
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-lg border border-white/10 backdrop-blur-sm cursor-pointer">
              {/* Image */}
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-64 object-cover transition-all duration-500 group-hover:brightness-110"
              />

              {/* Overlay Text on Hover */}
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center px-4">
                <h3 className="text-white font-bold text-lg mb-2">{article.title}</h3>
                <Link
                  href={article.link}
                  className="inline-flex items-center gap-1 text-[#FBAF43] font-semibold text-sm hover:text-[#e59e3b] transition-colors duration-300"
                >
                  Read More
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
