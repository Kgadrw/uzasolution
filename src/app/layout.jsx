'use client';

import "../app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <title>UZA Solutions – Your Gateway to Smarter Trade & Business</title>
        <meta name="title" content="UZA Solutions – Your Gateway to Smarter Trade & Business" />
        <meta name="description" content="UZA Solutions is a Rwandan-owned global tech company revolutionizing trade and business growth across Africa through innovative digital platforms." />
        <meta name="keywords" content="UZA Solutions, Africa trade, business growth, digital platforms, supply chain, logistics, e-commerce, Rwanda tech, global trade, UZA Bulk, UZA Mall, UZA Logistics, UZA Cloud, Wikwigora" />
        <meta name="author" content="UZA Solutions Ltd" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://uzasolutions.com/" />
        <meta property="og:title" content="UZA Solutions – Your Gateway to Smarter Trade & Business" />
        <meta property="og:description" content="UZA Solutions is a Rwandan-owned global tech company revolutionizing trade and business growth across Africa through innovative digital platforms." />
        <meta property="og:image" content="https://uzasolutions.com/logo.png" />
        <meta property="og:site_name" content="UZA Solutions" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://uzasolutions.com/" />
        <meta property="twitter:title" content="UZA Solutions – Your Gateway to Smarter Trade & Business" />
        <meta property="twitter:description" content="UZA Solutions is a Rwandan-owned global tech company revolutionizing trade and business growth across Africa through innovative digital platforms." />
        <meta property="twitter:image" content="https://uzasolutions.com/logo.png" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#FBAF43" />
        <meta name="msapplication-TileColor" content="#213348" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UZA Solutions" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://uzasolutions.com/" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=BBH+Sans+Hegarty&family=Boldonse&family=Chewy&family=Comfortaa:wght@300..700&family=Nata+Sans:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Permanent+Marker&family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "UZA Solutions",
              "alternateName": "UZA Solutions Ltd",
              "url": "https://uzasolutions.com",
              "logo": "https://uzasolutions.com/logo.png",
              "description": "UZA Solutions is a Rwandan-owned global tech company revolutionizing trade and business growth across Africa through innovative digital platforms.",
              "foundingDate": "2020",
              "founder": {
                "@type": "Person",
                "name": "UZA Solutions Team"
              },
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Nyarurembo, Kiyovu, Nyarugenge",
                  "addressLocality": "Kigali",
                  "addressCountry": "RW"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "New City, 2 Lei Yue Mun Rd, Kwun Kong",
                  "addressLocality": "Hong Kong",
                  "addressCountry": "HK"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+250-788-371-081",
                "contactType": "customer service",
                "email": "info@uzasolutionsltd.com"
              },
              "sameAs": [
                "https://www.uzabulk.com/",
                "https://uzasolutions.com"
              ],
              "offers": [
                {
                  "@type": "Service",
                  "name": "UZA Bulk",
                  "description": "Bulk procurement and sourcing platform"
                },
                {
                  "@type": "Service", 
                  "name": "UZA Mall",
                  "description": "E-commerce marketplace platform"
                },
                {
                  "@type": "Service",
                  "name": "UZA Logistics", 
                  "description": "End-to-end logistics management"
                },
                {
                  "@type": "Service",
                  "name": "UZA Cloud",
                  "description": "Cloud infrastructure and services"
                }
              ]
            })
          }}
        />
      </head>
      <body className="bg-gray-100 relative custom-scrollbar">
        <div className="min-h-screen bg-white text-gray-800 relative">
          {children}
        </div>
      </body>
    </html>
  );
}
