"use client";
import React, { useRef, useState } from 'react';
import { Microscope, Users, FileCheck, Brain, ShieldAlert, LineChart, Code2, ArrowRight, Activity, FileText, Share2 } from 'lucide-react';

const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wide mb-4">
                    <Brain size={12} /> Aetheria Core Capabilities
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                    Intelligence engineered for  <span className="italic text-primary">Drug Repurposing</span>.
                </h2>
            </div>
            <p className="max-w-md text-slate-600 leading-relaxed text-sm md:text-base border-l-2 border-orange-200 pl-4">
                Deploy autonomous agents that reason, verify, and execute complex research tasks, collapsing months of analysis into days.
            </p>
        </div>

        {/* Bento Grid Container */}
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 relative group"
        >
          {/* Spotlight Gradient Overlay */}
          <div 
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0 rounded-3xl"
            style={{
                opacity,
                background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.08), transparent 40%)`
            }}
          />

          {/* 1. Synthetic Control Arms (Span 2) */}
          <div className="relative z-10 md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-500 group overflow-hidden hover:scale-[1.01]">
             <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                <Users size={300} className="text-primary" />
             </div>
             
             <div className="flex flex-col h-full justify-between relative z-10">
                 <div>
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                       <Microscope size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif">Multi-Agent Orchestration</h3>
                    <p className="text-slate-600 mb-8 max-w-lg leading-relaxed">
                      A Master Agent coordinates specialized workers—Market, Patent, and Clinical—to function like a 24/7 cross-functional R&D team.
                    </p>
                 </div>

                 {/* Visual Representation */}
                 <div className="flex items-center gap-4 mt-auto">
                    <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                {i}
                            </div>
                        ))}
                    </div>
                    <div className="h-px flex-1 bg-slate-200 border-t border-dashed border-slate-300 relative">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-white px-2 text-[10px] font-mono text-slate-400">MATCHING</div>
                    </div>
                    <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                                Syn
                            </div>
                        ))}
                    </div>
                 </div>
             </div>
          </div>

          {/* 2. Automated Pharmacovigilance (Span 1, Row Span 2) - DARK CARD */}
          <div className="relative z-10 row-span-2 bg-slate-900 text-white rounded-3xl p-8 shadow-2xl overflow-hidden group hover:scale-[1.01] hover:shadow-orange-500/20 transition-all duration-500 border border-slate-800">
              {/* Animated background blob */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-colors">
                      <ShieldAlert size={24} className="text-orange-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 font-serif">Live Agent Thought Process</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                     Watch as agents scan patents, analyze trade flows, and critique findings in real-time. Full transparency into the logic behind every insight.
                  </p>
                  
                  {/* Mock UI: Live Feed */}
                  <div className="mt-auto bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50 flex flex-col gap-3">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Signal Feed</span>
                          <span className="flex items-center gap-1 text-[10px] text-green-400"><Activity size={10} /> Online</span>
                      </div>
                      {[
                        { code: 'AE-291', risk: 'Low', time: '2m ago' },
                        { code: 'AE-294', risk: 'High', time: '14m ago', highlight: true },
                        { code: 'AE-301', risk: 'Med', time: '1h ago' }
                      ].map((item, i) => (
                          <div key={i} className={`flex justify-between items-center text-xs p-2 rounded ${item.highlight ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5'}`}>
                              <span className="font-mono text-slate-300">{item.code}</span>
                              <span className={item.highlight ? 'text-red-400 font-bold' : 'text-slate-400'}>{item.risk} Risk</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* 3. Regulatory Drafting (Span 1) */}
          <div className="relative z-10 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-purple-200 transition-all duration-500 group hover:scale-[1.01]">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:rotate-6 transition-transform">
                  <FileCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">Automated Strategic Reporting</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
Generate polished, evidence-backed PDF reports summarizing commercial viability, scientific strength, and operational feasibility automatically.              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg w-fit">
                  <FileText size={12} /> Auto-Citation
              </div>
          </div>

          {/* 4. Adaptive Protocol Design (Span 1) */}
          <div className="relative z-10 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-green-200 transition-all duration-500 group hover:scale-[1.01]">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:rotate-6 transition-transform">
                  <LineChart size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">Deep Dive & Fast Modes</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
Choose between 'Fast Mode' for quick scans or 'Deep Dive' for comprehensive analysis with continuous learning from past searches.              </p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-green-500 h-full w-[85%] rounded-full"></div>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 text-right">85% Opportunity Score</div>
          </div>

          {/* 5. API / Integration (Span 3 - Full Width Banner) */}
          <div className="relative z-10 md:col-span-3 bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-orange-200 transition-all duration-500 group overflow-hidden flex flex-col md:flex-row items-center gap-12 hover:scale-[1.005]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f973160a_1px,transparent_1px),linear-gradient(to_bottom,#f973160a_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="flex-1 relative z-10 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide mb-4 border border-slate-200">
                    <Code2 size={12} /> Developer First
                  </div>
                  <h3 className="text-3xl font-serif text-slate-900 mb-4">Seamless Integration</h3>
                  <p className="text-slate-600 mb-8 max-w-lg leading-relaxed">
                    Integrate Aetheria directly into your existing EDC (Electronic Data Capture) and CTMS platforms via our robust REST API.
                  </p>
                  <button className="inline-flex items-center gap-2 text-primary font-bold hover:underline decoration-2 underline-offset-4 group/btn cursor-hover">
                    Read the Documentation <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
              </div>

              {/* Code Snippet Visual */}
              <div className="w-full md:w-1/2 bg-slate-900 rounded-xl p-4 shadow-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500 font-mono text-xs relative z-10 border border-slate-800">
                  <div className="flex items-center gap-1.5 mb-4 opacity-50">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-blue-400">const <span className="text-yellow-300">trial</span> = <span className="text-purple-400">await</span> aetheria.<span className="text-blue-300">init</span>({'{'}</div>
                  <div className="pl-4 text-slate-300">studyId: <span className="text-green-400">'NCT048593'</span>,</div>
                  <div className="pl-4 text-slate-300">agents: [<span className="text-green-400">'synthesis'</span>, <span className="text-green-400">'biostat'</span>],</div>
                  <div className="pl-4 text-slate-300">compliance: <span className="text-orange-400">true</span></div>
                  <div className="text-blue-400">{'}'});</div>
                  <div className="mt-2 text-slate-500">// Agents deployed successfully...</div>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;