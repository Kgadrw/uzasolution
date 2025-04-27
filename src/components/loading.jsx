'use client'; // Mark as client-side component

import React, { useState, useEffect } from "react";

export default function LoadingPage() {
  const [loading, setLoading] = useState(true);

  // Simulate loading completion after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 5 seconds
    }, 5000); // Adjust time for loading duration

    return () => clearTimeout(timer); // Clean up on component unmount
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-white text-center">
        {/* Logo with fixed reduced size and centered */}
        {loading && (
          <img 
            src="/logo.png" 
            alt="Logo" 
            width={100} // Reduced size
            className="logo mb-4" 
          />
        )}
        
        {/* Loading card resembling volume bar */}
        <div className="loading-card mt-6">
          <div className="volume-bar">
            <div className={`fill-bar ${loading ? "loading" : "completed"}`}></div>
          </div>
        </div>
        
        {/* Optional loading text */}
      
      </div>

      <style jsx>{`
        .logo {
          width: 100px; /* Reduced size */
          height: 100px; /* Reduced size */
          object-fit: contain;
          margin: 0 auto; /* Centering the logo */
        }

        .loading-card {
          width: 200px;
          height: 20px;
          background-color: #333;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .volume-bar {
          width: 100%;
          height: 100%;
          background-color: #444;
        }

        .fill-bar {
          position: absolute;
          height: 100%;
          width: 0%; /* Start with width 0% */
          background-color: #FBAF43;
          animation: fillVolume 5s  forwards; /* 4 steps: 0%, 50%,100% */
        }

        @keyframes fillVolume {
          0% {
            width: 0%;
          }
          
          50% {
            width: 50%;
          }
          
          100% {
            width: 100%;
          }
        }

        /* After loading, stop the animation */
        .completed .fill-bar {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
