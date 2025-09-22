'use client';

import { useEffect, useState } from "react";
import LoadingPage from "../components/loading";
import Chatbot from "@components/Chatbot";
import "../app/globals.css";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setLoading(false);
    } else {
      sessionStorage.setItem("hasVisited", "true");
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }

    // Scroll listener
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>UzaSolution</title>

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nata+Sans:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100 relative">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="min-h-screen bg-white text-gray-800 relative">
            {children}

            {/* Chatbot */}
            <Chatbot />

            {/* Slim Scroll Map */}
            <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 w-1.5 h-64 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="bg-[#FBAF43] w-full rounded-full shadow-lg transition-all duration-300 ease-out"
                style={{ height: `${scrollProgress}%` }}
              ></div>
            </div>

            {/* Hide Default Scrollbar */}
            <style jsx global>{`
              html, body {
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE 10+ */
              }
              html::-webkit-scrollbar,
              body::-webkit-scrollbar {
                width: 0;
                height: 0;
                background: transparent;
              }
            `}</style>
          </div>
        )}
      </body>
    </html>
  );
}
