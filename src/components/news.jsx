'use client';
import React, { useState, useRef } from 'react';

export default function InsightsSection() {
  const articles = [
    {
      type: 'video',
      videoId: 'Prs33Sr-HKs', // just the YouTube ID
      title: 'UZA Short: Quick Insights on Africa’s Trade',
    },
    {
      type: 'image',
      image: '/news2.jpg',
      title: 'Partnerships with Global Giants: The UZA Approach',
    },
    {
      type: 'image',
      image: '/news3.jpg',
      title: 'Logistics Innovation: Speeding Up Africa’s Supply Chains',
    },
  ];

  const [playVideo, setPlayVideo] = useState(null);
  const videoRefs = useRef({});

  const handlePlay = (id) => {
    setPlayVideo(id);
    const iframe = videoRefs.current[id];
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&controls=1`;
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white font-sans">
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#213348] leading-snug">
              News & Trends in Africa’s Trade Revolution
            </h2>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.type === 'video' ? article.videoId : article.title}
              className="bg-white rounded-lg overflow-hidden border- border transition-shadow duration-300"
            >
              {article.type === 'video' ? (
                <div className="relative">
                  <iframe
                    ref={(el) => (videoRefs.current[article.videoId] = el)}
                    className="w-full h-64"
                    src={
                      playVideo === article.videoId
                        ? `https://www.youtube.com/embed/${article.videoId}?autoplay=1&controls=1`
                        : `https://www.youtube.com/embed/${article.videoId}?controls=0`
                    }
                    title={article.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onClick={() => handlePlay(article.videoId)}
                  ></iframe>
                </div>
              ) : (
                <div>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Article Body */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {article.type === 'video'
                    ? 'Watch our short video insight on Africa’s trade.'
                    : 'Read more about this story shaping Africa’s trade landscape.'}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
