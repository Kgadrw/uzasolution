'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import client, { urlFor  } from '../sanityClient'; // Adjust path if needed

export default function ImageWithTextSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await client.fetch(`*[_type == "newsSection"][0]{
          sectionTitle,
          newsArticles[]{
            title,
            description,
            image,
            link
          }
        }`);
        setData(res);
      } catch (error) {
        console.error("Failed to fetch news section:", error);
      }
    }

    fetchNews();
  }, []);

  if (!data || !Array.isArray(data.newsArticles)) return null;

  return (
    <section id="news" className="py-20 bg-[#f4f4f4]">
      <div className="container mx-auto text-center px-4 sm:px-8">
        <h2 className="text-3xl font-bold text-[#213348] mb-8 font-[Poppins]">
          {data.sectionTitle || 'Latest News'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center">
          {data.newsArticles.map((item, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-lg overflow-hidden group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <Link href={item.link} passHref className="relative block">
                <div className="absolute top-4 left-4 bg-[#FBAF43] text-white text-xs font-bold px-3 py-1 rounded-md z-10">
                  News
                </div>

                <div className="w-full h-64 sm:h-80 relative">
                  <img
                    src={urlFor(item.image).url()}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>

                <div className="absolute bottom-4 left-4 text-white font-[Poppins] group-hover:opacity-0 transition-opacity duration-300 z-20">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                </div>

                <div className="absolute bottom-4 left-4 text-white font-[Poppins] opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 transition-all duration-300 z-20">
                  <p className="text-xs">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
