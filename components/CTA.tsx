import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    // <section className="relative py-32 bg-slate-950 overflow-hidden">
    <section className="relative py-32 mx-8 rounded-4xl bg-slate-950 overflow-hidden mb-8">

      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 rounded-[100%] blur-[120px] -translate-y-[60%] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange-500/10 rounded-[100%] blur-[100px] translate-y-[50%] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-md text-slate-300 text-sm font-medium mb-8 hover:border-slate-700 transition-colors cursor-default animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles size={14} className="text-orange-400" />
          <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Trusted by 500+ Institutions</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          Ready to accelerate your <br className="hidden md:block" />
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">clinical breakthroughs?</span>
            <span className="absolute bottom-2 left-0 w-full h-8 bg-blue-500/20 blur-xl -z-10 rounded-full"></span>
          </span>
        </h2>

        {/* Subhead */}
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Stop losing months to manual research. Start discovering high-value repurposing opportunities today
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <button className="group relative px-6 py-3 bg-white text-slate-950 rounded-xl font-bold text-lg overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all active:scale-95 w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-2">
              Start Research <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="px-6 py-3 bg-slate-900 border border-slate-800 text-white rounded-xl font-medium text-lg hover:bg-slate-800 hover:border-slate-700 transition-all active:scale-95 w-full sm:w-auto">
            View Architecture
          </button>
        </div>

        {/* Footer Text / Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-500 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <div className="flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500" /> SOC2 Type II Certified
          </div>
           <div className="flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500" /> HIPAA Compliant
          </div>
           <div className="flex items-center gap-2">
             <CheckCircle2 size={16} className="text-green-500" /> 14-Day Free Trial
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;