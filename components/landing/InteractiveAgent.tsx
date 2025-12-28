"use client";
import React, { useState } from 'react';

import { Sparkles, Send, Loader2, Database, BrainCircuit, FileText } from 'lucide-react';
import { runAgentSimulation } from '@/services/geminiService';

const InteractiveAgent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const predefinedQueries = [
    "Summarize Phase 3 outcomes for mRNA Alzheimer's vaccines",
    "Analyze patient retention rates in oncology trials vs cardiology",
    "Identify biomarkers for early-onset diabetes in recent literature"
  ];

  const handleSearch = async (inputQuery: string = query) => {
    if (!inputQuery.trim()) return;
    
    setLoading(true);
    setResponse(null);
    setQuery(inputQuery);
    
    // Simulate agent "Thinking" steps for visual effect
    setStep(1); // Searching
    setTimeout(() => setStep(2), 1500); // Analyzing
    setTimeout(() => setStep(3), 2800); // Synthesizing

    const result = await runAgentSimulation(inputQuery);
    
    setResponse(result);
    setLoading(false);
    setStep(0);
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
            <Sparkles size={14} /> Live Capability Demo
          </div>
          <h2 className="text-4xl font-serif text-primary mb-4">Experience the Autonomous Researcher</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how Aetheria's agentic core breaks down complex medical queries into actionable intelligence in seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Interface Column */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-[500px]">
            {/* Window Controls */}
            <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="ml-2 text-xs text-gray-500 font-mono">agent_core_v2.5.exe</span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-6">
              {/* Initial Greeting */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <BrainCircuit className="text-white" size={20} />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-700 text-sm leading-relaxed">
                  <p>Hello. I am your Medical Research Agent. I have access to over 50 million clinical papers and trial datasets. What shall we investigate today?</p>
                </div>
              </div>

              {/* User Query */}
              {(loading || response) && (
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <span className="font-bold text-gray-600">DR</span>
                  </div>
                  <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-sm text-sm">
                    {query}
                  </div>
                </div>
              )}

              {/* Agent Thinking/Response */}
              {loading && (
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                     <BrainCircuit className="text-white" size={20} />
                   </div>
                   <div className="space-y-2 w-full max-w-md">
                      {step >= 1 && (
                        <div className="flex items-center gap-3 text-xs text-gray-500 animate-pulse">
                          <Database size={14} /> Searching PubMed & ClinicalTrials.gov...
                        </div>
                      )}
                      {step >= 2 && (
                        <div className="flex items-center gap-3 text-xs text-gray-500 animate-pulse delay-100">
                          <Loader2 size={14} className="animate-spin" /> Cross-referencing cohort data...
                        </div>
                      )}
                      {step >= 3 && (
                        <div className="flex items-center gap-3 text-xs text-gray-500 animate-pulse delay-200">
                          <FileText size={14} /> Synthesizing executive summary...
                        </div>
                      )}
                   </div>
                 </div>
              )}

              {response && !loading && (
                <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <BrainCircuit className="text-white" size={20} />
                  </div>
                  <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-800 text-sm leading-relaxed w-full">
                     <div className="prose prose-sm prose-indigo max-w-none">
                        {/* Render simple markdown-like response */}
                        {response.split('\n').map((line, i) => (
                            <p key={i} className={`mb-2 ${line.startsWith('**') || line.startsWith('#') ? 'font-bold text-primary' : ''}`}>
                                {line.replace(/\*\*/g, '')}
                            </p>
                        ))}
                     </div>
                     <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                        <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors">Export PDF</button>
                        <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors">View Citations</button>
                     </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="relative">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Ask about a disease, trial phase, or drug mechanism..." 
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  disabled={loading}
                />
                <button 
                  onClick={() => handleSearch()}
                  disabled={loading || !query}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-md hover:bg-slate-800 disabled:opacity-50 transition-colors"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Prompts Column */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-serif text-xl text-primary mb-4">Try these prompts</h3>
                <div className="space-y-3">
                  {predefinedQueries.map((q, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSearch(q)}
                      disabled={loading}
                      className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-blue-50/50 transition-all text-sm text-gray-600 hover:text-primary group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="line-clamp-2">{q}</span>
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
             </div>

             <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h3 className="font-serif text-lg text-orange-800 mb-2">Why Agentic AI?</h3>
                <p className="text-sm text-orange-700/80 leading-relaxed">
                  Unlike standard LLMs, Aetheria's agents can browse live databases, verify citations against trusted journals, and reason through multi-step clinical logic without hallucination.
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Helper Icon
const ArrowUpRight = ({ size, className }: { size?: number, className?: string }) => (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

export default InteractiveAgent;