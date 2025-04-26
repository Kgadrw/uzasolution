'use client'
import Hero from '../components/hero';
import AboutUs from '../components/about';
import TrustedCo from '../components/trusted';
import Profiles from '../components/Profiles';
import React from 'react';

const page = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Profiles />
      <TrustedCo />
    </div>
  );
};

export default page;
