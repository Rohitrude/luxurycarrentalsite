
import React from 'react'
import Hero from '../components/Hero'
import FreaturedSection from "../components/FreaturedSection";
import Banner from "../components/Banner"
import Testimonial from "../components/Testimonial";
import NewsLetter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <FreaturedSection />
      <Banner />
      <Testimonial />
      <NewsLetter />
    </>
  );
};

export default Home;
