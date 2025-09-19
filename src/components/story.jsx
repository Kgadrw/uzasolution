'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function OurStory() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-gradient-to-r from-indigo-50 via-white to-pink-50 py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The UzaBulk Story
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-700 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Born From a Scam, Built for Trust
        </motion.p>

        <motion.div
          className={`text-left text-gray-800 prose prose-lg md:prose-xl max-w-4xl mx-auto overflow-hidden transition-all duration-500 ${
            expanded ? 'max-h-screen' : 'max-h-[220px]'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p>A few years ago, I wanted to buy a cup-making machine. Like many African traders, I relied on a middleman in China who promised to handle everything. The price he quoted felt high, but I thought that’s just how business was done.</p>

          <p>Something didn’t sit right with me, so I decided to travel to China and see things for myself.</p>

          <p>When I reached the factory, I was shocked. The real factory price was less than half of what the middleman had told me. That’s when I realized: it wasn’t just me. Countless African businesses were being forced to pay double or even triple the real cost — simply because of hidden commissions.</p>

          <p>At that moment, I knew things had to change.</p>

          <p>This experience gave birth to UzaBulk — a platform built to connect African businesses directly to factories, with no middlemen, no inflated costs, and no hidden games.</p>

          <p>Today, UzaBulk gives you access to 20M+ products worldwide, delivered to Rwanda in as little as two weeks.</p>

          <p>I started this journey because I was tired of seeing African entrepreneurs being cheated. Now, my mission is simple: <strong>To make trade fair, transparent, and affordable for every business in Africa.</strong></p>

          <p className="mt-6 font-semibold">Welcome to UzaSolutions. — Yves Nsengiyumva Iradukunda</p>
        </motion.div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-8 px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
        >
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      </div>
    </section>
  );
}
