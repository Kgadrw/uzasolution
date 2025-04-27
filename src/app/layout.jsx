'use client'; // This ensures the file runs client-side

import { useEffect, useState } from "react";
import LoadingPage from "../components/loading"; // Import loading component
import "../app/globals.css"; // Make sure your TailwindCSS is imported

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Change the loading state to false after 3 seconds
    }, 3000);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>UzaSolution</title>
      </head>
      <body className="bg-gray-100">
        {loading ? (
          <LoadingPage /> // Show the loading page while loading is true
        ) : (
          <div className="min-h-screen bg-white text-gray-800">
            {/* The main content (children) will be rendered here once loading is complete */}
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
