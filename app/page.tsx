"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  // Hero slideshow state
  const heroImages = useMemo(() => [
    "/assets/1.jpeg",
    "/assets/2.jpeg",
    "/assets/3.jpeg",
    "/assets/4.jpeg",
  ], []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Preload all images on mount with priority
  useEffect(() => {
    heroImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [heroImages]);

  // Auto-advance slideshow every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden block">
        {/* Navbar */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-0 w-full z-20 h-20 bg-black/30 backdrop-blur-sm"
        >
          <div className="max-w-[1440px] mx-auto h-full relative">
            {/* Nav Items - right side - Desktop only */}
            <div className="hidden md:flex absolute right-6 lg:right-20 2xl:right-28 top-[30px] gap-8 lg:gap-10 2xl:gap-[50px] text-base lg:text-lg leading-normal">
              <a href="#" className="text-white hover:text-secondary transition-colors drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                Home
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                About Us
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                Projects
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                Services
              </a>
              <a href="https://www.instagram.com/rashinbantodai/" target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary hover:opacity-80 drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                Contact Us
              </a>
            </div>

            {/* Hamburger Button - Mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden absolute right-4 sm:right-6 top-[26px] z-30 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white drop-shadow-lg"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white drop-shadow-lg"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white drop-shadow-lg"
              />
            </button>

            {/* Logo - left side */}
            <div className="absolute left-4 sm:left-6 md:left-12 lg:left-20 2xl:left-28 top-[14px] sm:top-[16px] md:top-[18px] flex items-center gap-2 sm:gap-2.5 md:gap-3">
              <Image
                src="/assets/rashinban-logo.png"
                alt="Rashinban Logo"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12"
              />
              <div className="flex flex-col justify-center leading-none">
                <p className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-white/95 mb-[2px] sm:mb-[2.5px] md:mb-[3px] tracking-wider drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  東京大学
                </p>
                <p className="text-[22px] sm:text-[25px] md:text-[28px] font-bold text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  羅針盤
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden fixed inset-0 top-20 bg-neutral-900/95 backdrop-blur-md z-20"
              >
                <div className="flex flex-col items-center justify-start pt-12 gap-8">
                  <a
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl hover:text-secondary transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl hover:text-secondary transition-colors"
                  >
                    About Us
                  </a>
                  <a
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl hover:text-secondary transition-colors"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl hover:text-secondary transition-colors"
                  >
                    Services
                  </a>
                  <a
                    href="https://www.instagram.com/rashinbantodai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-secondary text-2xl font-semibold hover:opacity-80 transition-opacity"
                  >
                    Contact Us
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
        {/* Slideshow Background */}
        {!isFirstImageLoaded && (
          <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
        )}
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, ease: "easeInOut" },
              scale: { duration: 5, ease: "linear" }
            }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Hero Background"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              quality={90}
              onLoad={() => {
                if (currentImageIndex === 0) {
                  setIsFirstImageLoaded(true);
                }
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.9) 16.585%, rgba(255,255,255,0) 72.384%)",
          }}
        />

        <div className="max-w-[1440px] mx-auto h-full relative px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-0">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="absolute left-4 sm:left-6 md:left-12 lg:left-16 xl:left-20 2xl:left-[calc(20.833%-188px)] top-32 sm:top-36 md:top-44 lg:top-52 xl:top-56 2xl:top-[239px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] 2xl:text-[72px] font-semibold leading-tight lg:leading-normal text-neutral-800 w-[calc(100%-2rem)] sm:w-[380px] md:w-[450px] lg:w-[500px] xl:w-[540px] 2xl:w-[556px]"
          >
            Building things is our mission.
          </motion.h1>
        </div>

        {/* Gradient Transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      </section>

      {/* Our Reputation */}
      <section className="bg-white py-12 sm:py-14 md:py-16 2xl:py-[60px] overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center text-2xl sm:text-3xl md:text-heading-4 2xl:text-heading-4 text-neutral-800 leading-normal mb-8 sm:mb-12 md:mb-16 lg:mb-20 2xl:mb-[92px]"
          >
            Our Reputation
          </motion.h2>

          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6 sm:gap-8 md:gap-10 lg:gap-12 2xl:gap-[63px]">
            {/* Left card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white border-[1.4px] border-solid border-neutral-100 rounded-[4px] pb-8 md:pb-10 pt-4 md:pt-5 px-4 md:px-5 flex flex-col gap-4 md:gap-[18px] items-start w-full sm:w-[320px] md:w-[280px] lg:w-[290px] 2xl:w-[292px]"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute inset-[4.17%]">
                  <Image src="/assets/112e73a57b2e94b8ce3dfdef856ce976d23ca2ea.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-bold text-lg md:text-xl leading-normal text-neutral-700">Best Services</h3>
              <p className="text-neutral-400 text-sm md:text-base leading-normal w-full md:w-[254px]">Nullam senectus porttitor in eget. Eget rutrum leo interdum.</p>
            </motion.div>

            {/* Center card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white border-[1.4px] border-solid border-neutral-100 rounded-[4px] pb-8 md:pb-10 pt-4 md:pt-5 px-4 md:px-5 flex flex-col gap-4 md:gap-[18px] items-start w-full sm:w-[320px] md:w-[280px] lg:w-[290px] 2xl:w-[292px]"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute inset-[4.17%]">
                  <Image src="/assets/112e73a57b2e94b8ce3dfdef856ce976d23ca2ea.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-bold text-lg md:text-xl leading-normal text-neutral-700">Best Teams</h3>
              <p className="text-neutral-400 text-sm md:text-base leading-normal w-full md:w-[254px]">Cursus semper tellus volutpat aliquet lacus. </p>
            </motion.div>

            {/* Right card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white border-[1.4px] border-solid border-neutral-100 rounded-[4px] pb-8 md:pb-10 pt-4 md:pt-5 px-4 md:px-5 flex flex-col gap-4 md:gap-[18px] items-start w-full sm:w-[320px] md:w-[280px] lg:w-[290px] 2xl:w-[292px]"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute inset-[9.208%]">
                  <Image src="/assets/1314a88b7ebf1eb3d4adc14cc32306b468412fe2.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-bold text-lg md:text-xl leading-normal text-neutral-700">Best Designs</h3>
              <p className="text-neutral-400 text-sm md:text-base leading-normal w-full md:w-[254px]">Ultricies at ipsum nunc, tristique nam lectus.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 2xl:py-[138px] overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto relative h-auto min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:h-[669px] 2xl:h-[669px] px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-0">
          {/* Mobile/Tablet: Flex layout, Desktop: Absolute positioned overlapping layout */}
          <div className="flex flex-col gap-6 md:gap-8 lg:block lg:relative lg:h-full">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:absolute lg:left-[120px] lg:top-0 lg:w-[902px] lg:h-[669px] 2xl:left-[120px] 2xl:w-[902px] 2xl:h-[669px] rounded-[2px] shadow-[0px_20px_24px_-4px_rgba(17,24,39,0.1),0px_8px_8px_-4px_rgba(17,24,39,0.04)] relative"
            >
              <Image
                src="/assets/compass-logo.jpg"
                alt="About Us"
                fill
                className="object-cover rounded-[2px]"
              />
            </motion.div>

            {/* Blue Box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full h-auto p-6 sm:p-8 md:p-10 lg:absolute lg:right-[120px] lg:top-[147px] lg:w-[488px] lg:h-[523px] lg:p-10 2xl:right-[120px] 2xl:w-[488px] 2xl:h-[523px] bg-primary rounded-[2px] shadow-[0px_20px_24px_-4px_rgba(17,24,39,0.1),0px_8px_8px_-4px_rgba(17,24,39,0.04)] flex flex-col justify-between lg:block"
            >
              <h3 className="text-2xl sm:text-3xl md:text-heading-4 lg:text-heading-4 2xl:text-heading-4 text-white leading-normal font-bold lg:absolute lg:left-10 lg:top-[50px] 2xl:left-10 2xl:top-[50px]">About us</h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-xl 2xl:text-xl text-white leading-normal w-full lg:absolute lg:left-10 lg:top-[129px] lg:w-[388px] 2xl:left-10 2xl:top-[129px] 2xl:w-[388px] mt-4 lg:mt-0">
                For more than 30 years we have been delivering world-class construction and we&apos;ve built many lasting relationships along the way. <br /><br />
                We&apos;ve matured into an industry leader and trusted resource for those seeking quality, innovation and reliability when building in the U.S.
              </p>
              <div className="bg-white border-2 border-primary border-solid px-4 sm:px-5 py-3 sm:py-4 rounded-md flex items-center justify-center gap-[10px] w-full sm:w-auto lg:absolute lg:left-10 lg:top-[410px] lg:w-auto 2xl:left-10 2xl:top-[410px] mt-6 lg:mt-0">
                <p className="font-semibold text-base sm:text-lg text-primary text-center leading-normal">More on Our History</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-neutral-50 min-h-0 py-12 sm:py-14 md:py-16 lg:py-20 2xl:h-[608px] 2xl:py-0 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto h-full relative px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative md:absolute left-0 md:left-[calc(41.667%+44px)] right-0 md:right-[calc(41.667%+45px)] text-center top-0 md:top-11 text-2xl sm:text-3xl md:text-heading-4 2xl:text-heading-4 text-neutral-800 leading-normal mb-8 md:mb-0"
          >
            Services
          </motion.h2>

          {/* Services Grid - Mobile/Tablet (hidden at 2xl) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 2xl:hidden">
            {/* Construction */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white p-4 sm:p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-auto sm:h-[160px] md:h-[170px] w-full flex flex-col items-center justify-center gap-3 sm:gap-4"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute inset-[8.33%_12.5%_8.33%_8.34%]">
                  <Image src="/assets/1102ba2e18d71fd823bd6cd489e4e3099ab6f39f.svg" alt="" fill className="object-contain" />
                </div>
                <div className="absolute inset-[62.5%_62.5%_29.17%_29.17%]">
                  <Image src="/assets/a1fa079092540e4007d66ceec9f4e2ac609cafde.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[50px] sm:w-[55px] md:w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-lg sm:text-xl font-semibold text-primary text-center leading-normal">Construction</p>
            </motion.div>

            {/* Renovation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-primary p-4 sm:p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-auto sm:h-[160px] md:h-[170px] w-full flex flex-col items-center justify-center gap-3 sm:gap-4"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute inset-[8.33%_8.33%_8.33%_12.5%]">
                  <Image src="/assets/29b696f3e1665259ef6c1a161b5032e552ee0fef.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[50px] sm:w-[55px] md:w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-lg sm:text-xl font-semibold text-white text-center leading-normal">Renovation</p>
            </motion.div>

            {/* Consultation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white p-4 sm:p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-auto sm:h-[160px] md:h-[170px] w-full flex flex-col items-center justify-center gap-3 sm:gap-4"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute inset-[10.02%_10.08%_10.06%_10.08%]">
                  <Image src="/assets/e16c90f1b437106be8f191785e435a103c0939d1.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[50px] sm:w-[55px] md:w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-lg sm:text-xl font-semibold text-primary text-center leading-normal">Consultation</p>
            </motion.div>

            {/* Repair Services */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-primary p-4 sm:p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-auto sm:h-[160px] md:h-[170px] w-full flex flex-col items-center justify-center gap-3 sm:gap-4"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute inset-[16.67%_8.33%]">
                  <Image src="/assets/7f3d8acf43007109c2aa2b24d6526a550f4a2306.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[50px] sm:w-[55px] md:w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-lg sm:text-xl font-semibold text-white text-center leading-normal">Repair Services</p>
            </motion.div>

            {/* Architecture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white p-4 sm:p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-auto sm:h-[160px] md:h-[170px] w-full flex flex-col items-center justify-center gap-3 sm:gap-4"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute inset-[12.5%_26.46%_12.5%_26.5%]">
                  <Image src="/assets/89211b87752a537161dcc15b405700e48ef12e03.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[50px] sm:w-[55px] md:w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-lg sm:text-xl font-semibold text-primary text-center leading-normal">Architecture</p>
            </motion.div>

            {/* Electric */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-primary p-4 sm:p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-auto sm:h-[160px] md:h-[170px] w-full flex flex-col items-center justify-center gap-3 sm:gap-4"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute bottom-[16.67%] left-[41.67%] right-[12.5%] top-1/2">
                  <Image src="/assets/42d4cacd435a23e4b81c12244fe8acbcb2c21efb.svg" alt="" fill className="object-contain" />
                </div>
                <div className="absolute bottom-[29.17%] left-[12.5%] right-1/2 top-[16.67%]">
                  <Image src="/assets/c9b66e9544c448c6ad1318821744b0c41797fe19.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[50px] sm:w-[55px] md:w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-lg sm:text-xl font-semibold text-white text-center leading-normal">Electric</p>
            </motion.div>
          </div>

          {/* Services - Desktop (2xl) - Absolute positioned layout */}
          <div className="hidden 2xl:block">
            {/* Row 1 */}
            {/* Construction */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="absolute left-[calc(8.333%+96px)] top-[122px] bg-white p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[271px] flex flex-col items-center justify-center gap-5"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute inset-[8.33%_12.5%_8.33%_8.34%]">
                  <Image src="/assets/1102ba2e18d71fd823bd6cd489e4e3099ab6f39f.svg" alt="" fill className="object-contain" />
                </div>
                <div className="absolute inset-[62.5%_62.5%_29.17%_29.17%]">
                  <Image src="/assets/a1fa079092540e4007d66ceec9f4e2ac609cafde.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-xl font-semibold text-primary text-center leading-normal">Construction</p>
            </motion.div>

            {/* Renovation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute left-[calc(33.333%+105px)] top-[122px] bg-primary p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[271px] flex flex-col items-center justify-center gap-5"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute inset-[8.33%_8.33%_8.33%_12.5%]">
                  <Image src="/assets/29b696f3e1665259ef6c1a161b5032e552ee0fef.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-xl font-semibold text-white text-center leading-normal">Renovation</p>
            </motion.div>

            {/* Consultation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute left-[calc(66.667%-6px)] top-[122px] bg-white p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[270px] flex flex-col items-center justify-center gap-5"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute inset-[10.02%_10.08%_10.06%_10.08%]">
                  <Image src="/assets/e16c90f1b437106be8f191785e435a103c0939d1.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-xl font-semibold text-primary text-center leading-normal">Consultation</p>
            </motion.div>

            {/* Row 2 */}
            {/* Repair Services */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute left-[calc(8.333%+96px)] top-[351px] bg-primary p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[271px] flex flex-col items-center justify-center gap-5"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute inset-[16.67%_8.33%]">
                  <Image src="/assets/7f3d8acf43007109c2aa2b24d6526a550f4a2306.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-xl font-semibold text-white text-center leading-normal">Repair Services</p>
            </motion.div>

            {/* Architecture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute left-[calc(33.333%+105px)] top-[351px] bg-white p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[271px] flex flex-col items-center justify-center gap-5"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute inset-[12.5%_26.46%_12.5%_26.5%]">
                  <Image src="/assets/89211b87752a537161dcc15b405700e48ef12e03.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-xl font-semibold text-primary text-center leading-normal">Architecture</p>
            </motion.div>

            {/* Electric */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute left-[calc(66.667%-6px)] top-[351px] bg-primary p-5 rounded shadow-[0px_0px_37px_-2px_rgba(17,24,39,0.05)] h-[181px] w-[270px] flex flex-col items-center justify-center gap-5"
            >
              <div className="w-10 h-10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[58.33%] h-[58.33%] bg-[#7595fd]" />
                <div className="absolute bottom-[16.67%] left-[41.67%] right-[12.5%] top-1/2">
                  <Image src="/assets/42d4cacd435a23e4b81c12244fe8acbcb2c21efb.svg" alt="" fill className="object-contain" />
                </div>
                <div className="absolute bottom-[29.17%] left-[12.5%] right-1/2 top-[16.67%]">
                  <Image src="/assets/c9b66e9544c448c6ad1318821744b0c41797fe19.svg" alt="" fill className="object-contain" />
                </div>
              </div>
              <div className="w-[60px] h-0.5 bg-neutral-100" />
              <p className="text-xl font-semibold text-white text-center leading-normal">Electric</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white min-h-0 py-12 sm:py-16 md:py-20 lg:py-24 2xl:h-[723px] 2xl:py-0 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto h-full relative px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-0">
          {/* Mobile/Tablet: Flex layout, Desktop (2xl): Absolute positioned scattered layout */}
          <div className="flex flex-col gap-8 lg:gap-10 2xl:contents">
            {/* Stats Grid - Mobile/Tablet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 2xl:contents">
              {/* Stat Box 1: Projects Completed */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                className="bg-white border border-white rounded-[4px] p-5 sm:p-6 md:p-[30px] 2xl:absolute 2xl:left-[calc(25%+32.5px)] 2xl:top-[221px] 2xl:-translate-x-1/2 w-full 2xl:w-[361px] flex flex-col gap-[2px] shadow-sm"
              >
                <div className="flex flex-col h-[50px] sm:h-[55px] md:h-[60px] 2xl:h-[65px] justify-end leading-[0] text-5xl sm:text-6xl md:text-[64px] 2xl:text-[72px] font-semibold text-neutral-800 w-full 2xl:w-[115px]">
                  <p className="leading-normal">123</p>
                </div>
                <div className="flex gap-3 items-center pl-3 sm:pl-3.5 md:pl-4 w-full 2xl:w-[273px]">
                  <div className="w-[5px] sm:w-[6px] md:w-[7px] h-full bg-secondary" />
                  <p className="text-lg sm:text-xl md:text-2xl 2xl:text-2xl text-neutral-500 w-full 2xl:w-[238px]">Projects Completed</p>
                </div>
              </motion.div>

              {/* Stat Box 2: Happy Clients */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="bg-white border border-white rounded-[4px] p-5 sm:p-6 md:p-[30px] 2xl:absolute 2xl:left-[calc(45.833%-8px)] 2xl:top-[122px] 2xl:-translate-x-1/2 w-full 2xl:w-[280px] flex flex-col gap-[2px] shadow-sm"
              >
                <div className="flex flex-col h-[50px] sm:h-[55px] md:h-[60px] 2xl:h-[65px] justify-end leading-[0] text-5xl sm:text-6xl md:text-[64px] 2xl:text-[72px] font-semibold text-neutral-800 w-full 2xl:w-[115px]">
                  <p className="leading-normal">84</p>
                </div>
                <div className="flex gap-3 items-center pl-3 sm:pl-3.5 md:pl-4 w-full 2xl:w-[273px]">
                  <div className="w-[5px] sm:w-[6px] md:w-[7px] h-full bg-secondary" />
                  <p className="text-lg sm:text-xl md:text-2xl 2xl:text-2xl text-neutral-500 w-full 2xl:w-[238px]">Happy Clients</p>
                </div>
              </motion.div>

              {/* Stat Box 3: Awards Win */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="bg-white border border-white rounded-[4px] p-5 sm:p-6 md:p-[30px] 2xl:absolute 2xl:left-[calc(37.5%+56px)] 2xl:top-[364px] 2xl:-translate-x-1/2 w-full 2xl:w-[276px] flex flex-col gap-[2px] shadow-sm"
              >
                <div className="flex flex-col h-[50px] sm:h-[55px] md:h-[60px] 2xl:h-[65px] justify-end leading-[0] text-5xl sm:text-6xl md:text-[64px] 2xl:text-[72px] font-semibold text-neutral-800 w-full 2xl:w-[115px]">
                  <p className="leading-normal">37</p>
                </div>
                <div className="flex gap-3 items-center pl-3 sm:pl-3.5 md:pl-4 w-full 2xl:w-[273px]">
                  <div className="w-[5px] sm:w-[6px] md:w-[7px] h-full bg-secondary" />
                  <p className="text-lg sm:text-xl md:text-2xl 2xl:text-2xl text-neutral-500 w-full 2xl:w-[238px]">Awards Win</p>
                </div>
              </motion.div>

              {/* Stat Box 4: Years in Business */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="bg-white border border-white rounded-[4px] p-5 sm:p-6 md:p-[30px] 2xl:absolute 2xl:left-[calc(29.167%+7.5px)] 2xl:top-[469px] 2xl:-translate-x-1/2 w-full flex flex-col gap-[2px] shadow-sm"
              >
                <div className="flex flex-col h-[50px] sm:h-[55px] md:h-[60px] 2xl:h-[65px] justify-end leading-[0] text-5xl sm:text-6xl md:text-[64px] 2xl:text-[72px] font-semibold text-neutral-800 w-full 2xl:w-[115px]">
                  <p className="leading-normal">30</p>
                </div>
                <div className="flex gap-3 items-center pl-3 sm:pl-3.5 md:pl-4 w-full 2xl:w-[273px]">
                  <div className="w-[5px] sm:w-[6px] md:w-[7px] h-full bg-secondary" />
                  <p className="text-lg sm:text-xl md:text-2xl 2xl:text-2xl text-neutral-500 w-full 2xl:w-[238px]">Years in Business</p>
                </div>
              </motion.div>
            </div>

            {/* Right side content - Below stats on mobile, absolute on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col gap-4 sm:gap-6 md:gap-8 2xl:contents"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] 2xl:text-[60px] 2xl:absolute 2xl:right-[496px] 2xl:translate-x-full 2xl:top-[172px] 2xl:w-[359px] font-bold text-primary leading-normal">
                30 Years Experience
              </h2>
              <p className="text-base sm:text-lg md:text-xl 2xl:text-xl 2xl:absolute 2xl:right-[496px] 2xl:translate-x-full 2xl:top-[352px] 2xl:w-[330px] 2xl:h-[74px] text-neutral-600 leading-normal">
                Our company has been the leading provided construction services to clients throughout the USA since 1988.
              </p>
              <div className="2xl:absolute 2xl:right-[calc(16.667%+80px)] 2xl:top-[493px]">
                <a href="https://www.instagram.com/rashinbantodai/" target="_blank" rel="noopener noreferrer">
                  <Button>Contact Us</Button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Illustrations - Desktop only (hidden on mobile/tablet) */}
          <div className="hidden 2xl:block">
            <div className="absolute left-[calc(12.5%+38.5px)] top-[172px] -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src="/assets/6e9a91091bc241cbdb3b4d11e910890e1b8fcaef.png"
                  alt="illus"
                  width={79}
                  height={79}
                />
              </motion.div>
            </div>

            <div className="absolute left-[calc(37.5%+51px)] top-[582px] -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src="/assets/45ae3a838060ffdbf7a62dc788fd967a024d4335.png"
                  alt="illus"
                  width={84}
                  height={84}
                />
              </motion.div>
            </div>

            <div className="absolute left-[calc(50%-11.5px)] top-[349px] -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src="/assets/3de872771f4000bb313182245651d05a0d2ddd87.png"
                  alt="illus"
                  width={93}
                  height={93}
                />
              </motion.div>
            </div>

            <div className="absolute left-[calc(54.167%-8.5px)] top-[103px] -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src="/assets/98b21396e6c4886178eab4b6bc331d5494931d2e.png"
                  alt="illus"
                  width={97}
                  height={97}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultation */}
      <section className="h-auto py-12 md:py-16 lg:py-20 2xl:h-[300px] 2xl:py-0 relative overflow-hidden">
        <Image
          src="/assets/f00572a9e4c1d924a7af45ea22ff31a554b4eee0.png"
          alt="Consultation Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="max-w-[1440px] mx-auto h-full relative px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-28 flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-heading-4 lg:text-heading-4 2xl:text-heading-4 text-white mb-3 sm:mb-4 md:mb-5">
              Free consultation with exceptional quality
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl 2xl:text-2xl text-white">
              Just one call away:{" "}
              <span className="underline">+84 1102 2703</span>
            </p>
          </div>
          <a href="https://www.instagram.com/rashinbantodai/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Get your consultation</Button>
          </a>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-white min-h-0 md:min-h-[800px] lg:min-h-[900px] 2xl:min-h-[1098px] overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 2xl:py-[88px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-heading-4 2xl:text-heading-4 text-neutral-800 mb-8 sm:mb-12 md:mb-16 lg:mb-20 2xl:mb-[82px]"
          >
            Projects
          </motion.h2>

          {/* Filter Menu - Horizontal scroll on mobile, vertical on desktop */}
          <div className="mb-6 md:mb-0 overflow-x-auto md:overflow-visible -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
            <div className="flex md:hidden gap-4 min-w-max pb-2">
              {["All", "Commercial", "Residential", "Other"].map((item, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded whitespace-nowrap text-base sm:text-lg ${
                    i === 0
                      ? "bg-primary text-white font-bold"
                      : "bg-neutral-100 text-neutral-600 font-medium"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-[32px]">
            {/* Menu - Desktop only */}
            <div className="hidden md:flex flex-col gap-[48px]">
              {["All", "Commercial", "Residential", "Other"].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className={`w-1 h-7 ${
                      i === 0 ? "bg-primary" : "bg-transparent"
                    }`}
                  />
                  <p
                    className={`text-2xl ${
                      i === 0
                        ? "font-bold text-primary"
                        : "font-medium text-neutral-200"
                    }`}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Project Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
              {[
                {
                  img: "/assets/089bf250bdd2caa4b33e7eb864d788a16c95da1e.png",
                  title: "Wildstone Infra Hotel",
                  location: "2715 Ash Dr. San Jose, South Dakota",
                },
                {
                  img: "/assets/f042d9f36de69d6d289fec45cc15040db6b8cb7c.png",
                  title: "Wish Stone Building",
                  location: "2972 Westheimer Rd. Santa Ana, Illinois",
                },
                {
                  img: "/assets/028a0cef1bf65382382cde195cc45b34a13e4399.png",
                  title: "Mr. Parkinston&apos;s House",
                  location: "3517 W. Gray St. Utica, Pennsylvania",
                },
                {
                  img: "/assets/efb357ca4521dda2f5a91dd1a02dbc47a02c9f36.png",
                  title: "Oregano Height",
                  location: "2464 Royal Ln. Mesa, New Jersey",
                },
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded overflow-hidden"
                >
                  <div className="h-[180px] sm:h-[220px] md:h-[247px] relative">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-primary text-white p-3">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3">{project.title}</h3>
                    <p className="text-base sm:text-lg">{project.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 2xl:mt-[64px]">
            <button className="bg-neutral-800 text-white px-4 sm:px-5 py-3 sm:py-4 h-12 sm:h-14 md:h-16 w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px] lg:min-w-[280px] 2xl:w-[295px] flex items-center justify-center gap-2 text-sm sm:text-base">
              <span>Back</span>
              <Image
                src="/assets/26c9f2977fa59b9ed6318be31aed0536035626f7.svg"
                alt="Arrow"
                width={26}
                height={17}
              />
            </button>
            <div className="flex gap-3 sm:gap-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 relative">
                  <Image
                    src={i === 0 ? "/assets/48ef74dad202a85e699dba48ca473a230e20028a.svg" : "/assets/8d468749cfd0036d52dda60c49c9cb3777fcb9db.svg"}
                    alt="Page indicator"
                    width={16}
                    height={16}
                  />
                </div>
              ))}
            </div>
            <button className="bg-neutral-800 text-white px-4 sm:px-5 py-3 sm:py-4 h-12 sm:h-14 md:h-16 w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px] lg:min-w-[280px] 2xl:w-[295px] flex items-center justify-center gap-2 text-sm sm:text-base">
              <Image
                src="/assets/762a4f982c7e562c3187091f9952d7ed888f2920.svg"
                alt="Arrow"
                width={26}
                height={17}
              />
              <span>Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-neutral-50 py-12 sm:py-14 md:py-16 lg:py-20 2xl:py-[60px] pb-16 sm:pb-20 md:pb-24 lg:pb-28 2xl:pb-[100px] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-[360px]">
          <h2 className="text-heading-4 text-neutral-800 text-center mb-4">
            What can us do for you?
          </h2>
          <p className="text-xl text-neutral-800 text-center mb-[46px]">
            We are ready to work on a project of any complexity, whether it&apos;s
            commercial or residential.
          </p>

          <form className="space-y-[13px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <input
                type="text"
                placeholder="Your Name *"
                className="bg-white border border-neutral-100 rounded px-2 py-2.5 text-lg text-neutral-300"
              />
              <input
                type="email"
                placeholder="Email *"
                className="bg-white border border-neutral-100 rounded px-2 py-2.5 text-lg text-neutral-300"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <select className="bg-white border border-neutral-100 rounded px-2 py-2.5 text-lg text-neutral-300">
                <option>Reason for Contacting *</option>
              </select>
              <input
                type="tel"
                placeholder="Phone"
                className="bg-white border border-neutral-100 rounded px-2 py-2.5 text-lg text-neutral-300"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full bg-white border border-neutral-100 rounded px-2 py-2.5 text-lg text-neutral-300"
            />
            <p className="text-base text-neutral-500">
              <span className="text-red-600">*</span> indicates a required field
            </p>
            <div className="flex justify-center pt-5 pb-8">
              <Button className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 2xl:w-1/3">Submit</Button>
            </div>
          </form>
        </div>
      </section>

      {/* Bottom */}
      <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 2xl:py-[85px] pb-16 sm:pb-20 md:pb-24 lg:pb-28 2xl:pb-[120px] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-32 2xl:gap-[200px]">
            {/* Left */}
            <div className="space-y-8">
              <div className="flex items-start gap-3">
                <p className="font-medium text-xl text-primary">Address:</p>
                <p className="font-normal text-xl text-neutral-800 capitalize">
                  6391 Elgin St. Celina, Delaware 10299
                </p>
              </div>
              <div className="flex items-start gap-[34px]">
                <p className="font-medium text-xl text-primary">Phone:</p>
                <p className="font-normal text-xl text-neutral-800 capitalize">
                  +84 1102 2703
                </p>
              </div>
              <div className="flex items-start gap-[41px]">
                <p className="font-medium text-xl text-primary">Email:</p>
                <p className="font-normal text-xl text-black">hello@thebox.com</p>
              </div>
            </div>

            {/* Right */}
            <div>
              <p className="font-medium text-xl text-primary mb-[43px]">
                Newsletter:
              </p>
              <div className="flex gap-0 mb-[83px]">
                <input
                  type="email"
                  placeholder="Your email here"
                  className="flex-1 bg-white border border-neutral-100 rounded-l px-2 py-2.5 text-lg text-neutral-300"
                />
                <Button variant="secondary" className="rounded-l-none">
                  Subscribe
                </Button>
              </div>

              <p className="font-medium text-xl text-primary mb-5">Social:</p>
              <div className="flex gap-5">
                <a href="https://www.instagram.com/rashinbantodai/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="url(#instagram-gradient)"/>
                    <path d="M20 13.5C16.42 13.5 13.5 16.42 13.5 20C13.5 23.58 16.42 26.5 20 26.5C23.58 26.5 26.5 23.58 26.5 20C26.5 16.42 23.58 13.5 20 13.5ZM20 24.5C17.52 24.5 15.5 22.48 15.5 20C15.5 17.52 17.52 15.5 20 15.5C22.48 15.5 24.5 17.52 24.5 20C24.5 22.48 22.48 24.5 20 24.5Z" fill="white"/>
                    <circle cx="26.8" cy="13.2" r="1.5" fill="white"/>
                    <path d="M25 9H15C11.69 9 9 11.69 9 15V25C9 28.31 11.69 31 15 31H25C28.31 31 31 28.31 31 25V15C31 11.69 28.31 9 25 9ZM29 25C29 27.21 27.21 29 25 29H15C12.79 29 11 27.21 11 25V15C11 12.79 12.79 11 15 11H25C27.21 11 29 12.79 29 15V25Z" fill="white"/>
                    <defs>
                      <linearGradient id="instagram-gradient" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FD5949"/>
                        <stop offset="50%" stopColor="#D6249F"/>
                        <stop offset="100%" stopColor="#285AEB"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Logo at bottom */}
          <div className="flex items-center gap-3 mt-[80px] relative">
            {/* Random Symboles decoration */}
            <div className="absolute w-12 h-12 pointer-events-none">
              <Image src="/assets/41a98b88102502d3c6cec122fddef099043efe8a.svg" alt="" width={19} height={11} className="absolute top-[33px] left-[12px]" />
              <Image src="/assets/61cb0ed8ecf2cf84821a6eb9cd5e2051c34fc39c.svg" alt="" width={18} height={8} className="absolute top-[13px] left-[12px]" />
              <Image src="/assets/340dd3ac461322f02a6971897207ec64200d0647.svg" alt="" width={7} height={15} className="absolute top-[28px] left-[9px]" />
              <Image src="/assets/caa924e875e75de0bd57cb7e4978822d99abab1d.svg" alt="" width={19} height={22} className="absolute top-[22px] left-[12px]" />
              <Image src="/assets/5b210e843b3a7890bbb5c0f80ddb50eee79df84d.svg" alt="" width={18} height={16} className="absolute top-[13px] left-[8px]" />
              <Image src="/assets/a2cfc15aa3275c054b181dbf7aa54cd05376dadc.svg" alt="" width={19} height={35} className="absolute top-[22px] left-[6px]" />
            </div>
            <div className="w-12 h-12 relative">
              <Image
                src="/assets/762a4f982c7e562c3187091f9952d7ed888f2920.svg"
                alt="Logo"
                width={48}
                height={48}
              />
            </div>
            <p className="font-bold italic text-[30px] text-primary leading-none">
              The<span className="not-italic">Box</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary h-auto py-4 md:py-0 md:h-[70px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-28 h-full flex items-center justify-center md:justify-start">
          <p className="text-white text-sm md:text-base text-center md:text-left">
            TheBox Company © 2022. All Rights Reserved
          </p>
        </div>
      </footer>
    </main>
  );
}
