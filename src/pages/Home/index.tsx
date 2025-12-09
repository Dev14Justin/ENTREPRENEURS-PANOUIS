import React from 'react';
import {
  Hero,
  TargetAudience,
  Methodology,
  WhyUs,
  CTA,
} from '../../components/home';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TargetAudience />
      <Methodology />
      <WhyUs />
      <CTA />
    </>
  );
};