"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  navLinks, featuresForAdvertiser, featuresForApp, 
  logos, socialMediaLinks, footerLinks 
} from "../lib/homepageData";
import { Button } from "antd";

const bgColor = "bg-blue-600";

const ArrowButton = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 transform -translate-y-1/2 animate-pulse ${direction === "left" ? "left-10" : "right-10"}`}
  >
    <Image src={`/${direction}-arrow.png`} alt={`${direction}-arrow`} width={30} height={30} />
  </button>
);

const FeatureSet = ({ title, features }: { title: string; features: { title: string; description: string }[] }) => (
  <div className="flex-shrink-0 w-full snap-center px-10">
    <h2 className="text-lg md:text-2xl font-semibold mb-5">{title}</h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col gap-5 items-center">
          <h3 className="text-md md:text-xl font-semibold lg:h-20 xl:h-14 2xl:h-10">{feature.title}</h3>
          <p className="text-sm md:text-lg">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const width = sliderRef.current.offsetWidth;
      const currentSlideIndex = Math.round(scrollLeft / width);
      setCurrentSlide(currentSlideIndex);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => {
        slider.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="flex flex-col">
      <header className="fixed w-full bg-slate-100 py-2">
        <div className="w-full lg:w-2/3 px-5 lg:px-0 flex flex-row justify-between items-center mx-auto">
          <Link href="#" className="flex flex-row items-center gap-3 transition duration-300 ease-in-out transform hover:-translate-y-1">
            <Image src="/qube.png" alt="qube.png" width={50} height={50} />
            <p className="text-lg font-semibold">Qube</p>
          </Link>
          
          <div className="hidden md:flex flex-row gap-7 items-center">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.id} className="hover:text-gray-500">{link.label}</Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
              <Image src={menuOpen ? "/close.png" : "/hamburger.png"} alt="Menu Toggle Icon" width={20} height={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white">
            <nav className="flex flex-col px-5 py-5 border-t border-gray-200">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.id} className="py-2 hover:text-gray-500">{link.label}</Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex flex-col bg-white">
        {/* Overview */}
        <section className={`${bgColor} text-white pt-16 md:pt-0 px-10 md:px-20`}>
          <div className="h-[600px] md:h-screen flex flex-col gap-10 justify-center items-start w-full xl:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold">Connecting Ecosystems, Maximizing Profits</h1>
            <h2 className="text-xl md:text-2xl font-semibold">Qube connects the TON ecosystem with EVM, expanding monetization opportunities for TON mini apps and all community.</h2>
            <h2 className="text-xl md:text-2xl font-semibold">Our innovative ad network bridges the gap between advertisers and mini app and community, unlocking new revenue streams across the Telegram.</h2>
            <div className="">
              <a href='/developer/login'><button className="mr-10 bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 border border-blue-600 hover:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105">Launch Ad</button></a>
              <a href='/advertiser/login'><button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg border border-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105">Provide Traffic</button></a>
              
            </div>
          </div>

        </section>

        {/* Our value */}
        <section id="value" className="py-20 px-10 md:px-20 overflow-hidden relative">
          <div ref={sliderRef} className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth">
            <FeatureSet title="Our value(for advertisers)" features={featuresForAdvertiser} />
            <FeatureSet title="Our value(for mini app and community)" features={featuresForApp} />
          </div>
          {currentSlide > 0 && (
            <ArrowButton direction="left" onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
              }
            }} />
          )}
          {currentSlide < 1 && (
            <ArrowButton direction="right" onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
              }
            }} />
          )}
        </section>

        {/* Users' Voices */}
        <section id="voices" className={`${bgColor} text-white py-20 px-10 md:px-20`}>
          <p className="text-md text-center mb-20">We partner with the best</p>
          <div className="flex flex-row flex-wrap gap-10 justify-center">
            {logos.map((logo, index) => (
              <Image key={index} src={logo} alt={logo} width={120} height={120} />
            ))}
          </div>
        </section>

        {/* About Us */}
        <section id="about" className="py-20 px-10 md:px-20">
          <h1 className="text-xl md:text-3xl font-bold mb-10">About Us</h1>
          <p className="text-lg font-semibold underline">We have provided our product called <Link href="https://www.0xqube.xyz/" target="_blank" className="text-blue-600">Qube</Link> on EVM to more than 15 game projects so far, and have already established a network of 100,000 affiliates in the Asian region.</p>
          <p className="text-lg font-semibold underline">We have already secured grants totaling approximately 100k from Japanese game publishers such as gumi, double jump.tokyo, and the Arbitrum Foundation.</p>
        </section>
      </main>

      <footer className={`${bgColor} grid grid-cols-1 lg:grid-cols-4 gap-5 py-20 px-10 md:px-20`}>
        <div className="lg:col-span-2 flex flex-col items-center gap-3">
          <div className="flex flex-col xl:flex-row items-center gap-3">
            <Link href="#" className="flex flex-row items-center gap-3 transition duration-300 ease-in-out transform hover:-translate-y-1">
              <Image src="/qube.png" alt="qube.png" width={100} height={100} />
              <p className="text-2xl font-bold">Qube</p>
            </Link>
            <p className="text-md px-5">Made a app for Telegram? We would love to have a chat!</p>
          </div>
          <div className="flex flex-row gap-5">
            {socialMediaLinks.map((link, index) => (
              <Link key={index} href={link.url} target="_blank" className="bg-white hover:bg-slate-200 p-3 rounded-full inline-flex justify-center items-center h-14 w-14 hover:shadow-xl">
                <Image src={link.src} alt={link.alt} width={30} height={30} />
              </Link>
            ))}
          </div>
        </div>
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category} className="flex flex-col items-center lg:items-start gap-5 text-slate-300">
            <h3 className="font-bold text-white text-xl">{category}</h3>
            {links.map(link => (
              <Link key={link.label} href={link.url} target="_blank" className="hover:text-slate-100 hover:font-semibold">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </footer>
    </div>
  );
}
