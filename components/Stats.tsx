"use client";
import React, { useEffect, useRef, useState } from 'react';

// Reusable Counter Hook/Component for "Count Up" animation
const CountUp = ({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          let startTime: number;
          let animationFrame: number;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Ease out expo for a premium feel
            const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
            
            setCount(Math.floor(end * easeOut));

            if (progress < duration) {
              animationFrame = requestAnimationFrame(animate);
            }
          };

          animationFrame = requestAnimationFrame(animate);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={elementRef}>
      {count}{suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  const stats = [
    { label: "Time to Insight in Week", value:1 , suffix: " W", sub: "Accelerated from months of manual review." },
    { label: "Cost Reduction", value: 85, suffix: "%", sub: "Savings in human research hours & spend." },
    { label: "Database Utilization", value: 70, suffix: "%", sub: "Active use of paid subscriptions (vs <25%)" },
    { label: "Research Efficiency", value: 10, suffix: "x", sub: "Faster identification of repurposing opportunities." }
  ];

  return (
    <section className="bg-white py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative flex flex-col items-center lg:items-start text-center lg:text-left px-6 py-4 rounded-2xl group hover:-translate-y-2 hover:bg-slate-50 transition-all duration-300 cursor-default border border-transparent hover:border-slate-100 hover:shadow-lg">
              
              {/* Vertical Divider (Desktop) - Only show if not hovered for cleaner look */}
              {index !== stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-slate-200 to-transparent group-hover:opacity-0 transition-opacity"></div>
              )}
               {/* Horizontal Divider (Mobile) */}
               {index !== stats.length - 1 && (
                <div className="lg:hidden absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
              )}

              <div className="text-6xl lg:text-7xl font-serif text-slate-800 font-medium mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              
              <div className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                {stat.label}
              </div>
              
              <p className="text-slate-500 text-sm leading-relaxed max-w-[200px]">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;