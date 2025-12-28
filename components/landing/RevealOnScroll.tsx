"use client";
import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  width?: "full" | "100%";
  id?: string;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, delay = 0, width = "full", id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-1000 ease-out transform ${width === "full" ? "w-full" : "w-auto"} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;