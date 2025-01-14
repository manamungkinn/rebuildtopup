"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const HeroSection = () => {
  const images = [
    { image: "/images/ml1.jpeg", deskripsi: "", linkTitle: "", link: "/" },
    { image: "/images/ml2.jpg", deskripsi: "", linkTitle: "", link: "https://www.instagram.com/arn28._/" },
    { image: "/images/ml3.webp", deskripsi: "", linkTitle: "", link: "https://www.instagram.com/roymen.y/" },
    { image: "/images/ml4.webp", deskripsi: "", linkTitle: "", link: "https://www.instagram.com/roymen.y/" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const deskripsiRef = useRef(null);

  useEffect(() => {
    // Animasi awal untuk teks
    gsap.fromTo(deskripsiRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" });
  }, []);

  // Ganti gambar setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);

        // Transisi teks dengan animasi zoom out
        gsap.to(deskripsiRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          onComplete: () => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);

            // Tampilkan teks baru dengan animasi zoom in
            gsap.fromTo(deskripsiRef.current, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" });
            setIsAnimating(false);
          },
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleDotClick = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);

      // Transisi teks dengan animasi zoom out
      gsap.to(deskripsiRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        onComplete: () => {
          setCurrentImageIndex(index);

          // Tampilkan teks baru dengan animasi zoom in
          gsap.fromTo(deskripsiRef.current, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" });
          setIsAnimating(false);
        },
      });
    }
  };

  return (
    <div className="bg-slate-500 p-2 rounded-lg">
      <div className="relative">
        <Image src={images[currentImageIndex].image} alt={`Hero Image ${currentImageIndex + 1}`} width={1000} height={1000} quality={100} className="w-full transition-opacity duration-700" />
        <div ref={deskripsiRef} key={currentImageIndex} className="absolute inset-0 flex items-center mt-[25%] justify-center">
          <div className="flex flex-col items-center ">
            <div>
              <p className={`${images[currentImageIndex].deskripsi.length == 0 ? `` : `text-base w-fit sm:text-4xl md:text-5xl lg:text-6xl text-white bg-black bg-opacity-20 px-4 py-2 rounded-lg font-bold mb-3 sm:mb-6`}`}>
                {images[currentImageIndex].deskripsi}
              </p>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 ">
          {images.map((_, index) => (
            <button key={index} onClick={() => handleDotClick(index)} className={`w-1 h-1 mx-[2px] md:w-3 md:h-3 rounded-full ${index === currentImageIndex ? "bg-primary" : "bg-gray-400"}`}></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
