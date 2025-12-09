"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Database, BrainCircuit, FileSearch, CheckCircle } from 'lucide-react';

const Workflow: React.FC = () => {
  const steps = [
    {
      icon: <Database size={24} />,
      title: "Intelligent Initiation",
      desc: "User selects a target molecule. The system initializes session context and retrieves internal strategy decks to align research with business goals"
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "Multi-Agent Orchestration",
      desc: "Master Agent delegates tasks. Worker agents simultaneously fetch market data (IQVIA), trade flows (EXIM), and patent landscapes (USPTO).."
    },
    {
      icon: <FileSearch size={24} />,
      title: "Critique & Validation",
      desc: "Aggregator layer synthesizes insights, while the Critique Agent cross-references findings against regulatory guidelines to ensure accuracy."
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Strategic Reporting",
      desc: "Generates a comprehensive, downloadable PDF report with commercial viability scores and operational feasibility assessments."
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate scroll progress for the connecting line
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Start animating when the top of the element is at 75% of viewport
      const startOffset = windowHeight * 0.75;
      
      // Calculate how much of the element has been scrolled past
      // We want 0% when elementTop is at startOffset, and 100% when we've scrolled past most of it
      let progress = (startOffset - elementTop) / (elementHeight * 0.8);
      
      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
            
            {/* Header Content */}
            <div className="md:w-1/3 sticky top-24">
                <div className="uppercase tracking-widest text-xs font-bold text-orange-500 mb-4 animate-pulse">THE WORKFLOW</div>
                <h2 className="text-4xl font-serif text-slate-900 mb-6">From manual review to instant strategic intelligence.</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Aetheria collapses the fragmented research cycle. You define the target molecule; our agents handle the market analysis, patent scanning, and clinical validation.
                </p>
                <button className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-white hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5 transition-all shadow-sm cursor-hover">
                    See Architecture Diagram
                </button>
            </div>

            {/* Timeline */}
            <div className="md:w-2/3 relative" ref={containerRef}>
                {/* Background Line */}
                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200"></div>
                
                {/* Active Progress Line */}
                <div 
                    className="absolute left-8 top-8 w-0.5 bg-gradient-to-b from-orange-400 to-primary transition-all duration-100 ease-out"
                    style={{ height: `${scrollProgress * 100}%`, maxHeight: 'calc(100% - 2rem)' }}
                ></div>

                <div className="space-y-12 pb-12">
                    {steps.map((step, index) => {
                        // Calculate if this step is "active" based on scroll progress
                        // Roughly split progress into 4 segments
                        const isActive = scrollProgress > (index / (steps.length - 0.5));
                        
                        return (
                          <div 
                            key={index} 
                            className={`relative flex gap-8 group transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}
                          >
                              {/* Icon Bubble */}
                              <div className="relative z-10 shrink-0">
                                  <div className={`w-16 h-16 rounded-full border transition-all duration-300 flex items-center justify-center
                                    ${isActive 
                                        ? 'bg-white border-orange-200 text-orange-600 shadow-lg scale-110' 
                                        : 'bg-slate-50 border-slate-200 text-slate-400 shadow-sm'
                                    } group-hover:scale-125 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500`}>
                                      {step.icon}
                                  </div>
                              </div>
                              
                              {/* Content */}
                              <div className="pt-3 cursor-default">
                                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isActive ? 'text-slate-900' : 'text-slate-400'} group-hover:text-orange-600`}>
                                    {step.title}
                                  </h3>
                                  <p className="text-slate-600 leading-relaxed max-w-lg transition-colors group-hover:text-slate-800">
                                      {step.desc}
                                  </p>
                              </div>
                          </div>
                        );
                    })}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Workflow;