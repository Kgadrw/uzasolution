'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function InsightsSection() {
  const videos = [
    { src: "https://www.youtube.com/embed/xVJa3Lypjww", title: "Main Story", type: "youtube" },
    { src: "https://www.youtube.com/embed/2FCvn0r4EUs", title: "Short Intro", type: "youtube" },
    { src: "https://www.youtube.com/embed/Prs33Sr-HKs", title: "Vision", type: "youtube" },
  ];

  const [currentVideo, setCurrentVideo] = useState(0);

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
            <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent leading-snug">
              News & Blogs
            </h2>
          </div>
        </div>

        {/* Message */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="text-center py-8 mb-12"
        >
          <p className="text-lg md:text-xl text-gray-600">
            Stay updated with latest news
          </p>
        </motion.div>

        {/* Our Story in Motion Videos */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E5243B] via-[#19486A] to-[#00689D] bg-clip-text text-transparent mb-4">
              Our Story in Motion
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose a video to learn more about UZA Solutions and our mission to transform Africa's supply chain.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group cursor-pointer transition-all duration-300 ${
                  currentVideo === index 
                    ? 'transform scale-105' 
                    : 'hover:transform hover:scale-102'
                }`}
                onClick={() => setCurrentVideo(index)}
              >
                {/* Video Thumbnail/Preview */}
                <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                  currentVideo === index 
                    ? 'ring-4 ring-[#FBAF43] shadow-2xl' 
                    : 'group-hover:shadow-xl'
                }`}>
                  {video.type === "youtube" ? (
                    <iframe
                      className="w-full h-full"
                      src={video.src}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      src={video.src}
                      title={video.title}
                      controls
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
