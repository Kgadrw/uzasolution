'use client'
import Hero from "@components/Hero";
import AboutUs from "@components/AboutUs";
import TrustedCompanies from "@components/TrustedCo";
import Profiles from "@components/Profiles";
import "@app/globals.css";

import React from 'react';

const page = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Profiles />
      <TrustedCompanies />
    </div>
  );
};

export default page;
