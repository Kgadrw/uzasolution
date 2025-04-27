'use client';

import { useEffect, useState } from "react";
import LoadingPage from "../components/loading";
import "../app/globals.css";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setLoading(false); // Skip loading if already visited
    } else {
      sessionStorage.setItem("hasVisited", "true"); // Mark as visited
      setTimeout(() => {
        setLoading(false); // Show loading only on first visit
      }, 3000);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>UzaSolution</title>
      </head>
      <body className="bg-gray-100">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="min-h-screen bg-white text-gray-800">
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
