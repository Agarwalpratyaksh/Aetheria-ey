import React from 'react';
import { ShieldCheck, HeartPulse, Stethoscope, Pill, FlaskConical } from 'lucide-react';

const LogoTicker: React.FC = () => {
  const partners = [
    { name: 'IQVIA', icon: <HeartPulse size={28} /> },
    { name: 'PubMed', icon: <ShieldCheck size={28} /> },
    { name: 'MAYO CLINIC', icon: <Stethoscope size={28} /> },
    { name: 'ClinicalTrials.gov', icon: <span className="border-2 border-current w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">P</span> },
    { name: 'WHO ICTRP', icon: <DnaIcon /> },
    { name: 'NCT', icon: <PillIcon /> },
    { name: 'USPTO', icon: <FlaskConical size={28} /> },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
         <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Powered by Industry-Leading Data Sources</span>
      </div>
      
      {/* Container with gradient masks for smooth fade in/out */}
      <div className="relative flex overflow-x-hidden group">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Track 1 */}
        <div className="flex animate-[marquee_25s_linear_infinite] gap-24 py-2 min-w-full items-center justify-around shrink-0 group-hover:[animation-play-state:paused] pr-24">
           {partners.map((p, i) => (
             <div key={`t1-${i}`} className="flex items-center gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="text-slate-800">{p.icon}</div>
                <span className="font-bold text-lg text-slate-700 font-sans tracking-tight">{p.name}</span>
             </div>
           ))}
        </div>
        
        {/* Track 2 (Duplicate for seamless loop) */}
        <div className="flex animate-[marquee_25s_linear_infinite] gap-24 py-2 min-w-full items-center justify-around shrink-0 group-hover:[animation-play-state:paused] pr-24" aria-hidden="true">
           {partners.map((p, i) => (
             <div key={`t2-${i}`} className="flex items-center gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="text-slate-800">{p.icon}</div>
                <span className="font-bold text-lg text-slate-700 font-sans tracking-tight">{p.name}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

// Helper components
const DnaIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h5"/><path d="M22 12h-5"/><path d="M7 12s2-4 5-4 5 4 5 4"/><path d="M7 12s2 4 5 4 5-4 5-4"/></svg>;
const PillIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>;

export default LogoTicker;