import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedGallery from "@/components/home/FeaturedGallery";
import InfoSection from "@/components/home/InfoSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturedGallery />
      <InfoSection />
    </div>
  );
}