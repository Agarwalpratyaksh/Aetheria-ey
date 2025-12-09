import React from 'react';
import { Shield, Lock, FileKey, Server, CheckCircle2, ScanFace } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
      {/* Abstract Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
      
      {/* Glowing Orb Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-xs font-bold uppercase tracking-wide mb-6 backdrop-blur-sm">
             <Shield size={12} /> Enterprise Grade Security
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 leading-tight">
             Your data never leaves <br/>
             <span className="text-blue-400">your private cloud.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
             Aetheria is architected for the strict IP protection requirements of pharma R&D. We ensure your proprietary strategy remains confidential.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
           
           {/* Left: Interactive Visual (Radar Scanner) */}
           <div className="relative h-[400px] bg-slate-900/50 rounded-3xl border border-slate-800 flex items-center justify-center overflow-hidden group">
              {/* Radar Rings */}
              <div className="absolute border border-blue-500/20 w-[150px] h-[150px] rounded-full animate-[ping_3s_linear_infinite]"></div>
              <div className="absolute border border-blue-500/20 w-[250px] h-[250px] rounded-full"></div>
              <div className="absolute border border-blue-500/10 w-[350px] h-[350px] rounded-full"></div>
              
              {/* Rotating Scanner */}
              <div className="absolute inset-0 animate-spin-slow opacity-30">
                 <div className="w-full h-1/2 bg-gradient-to-b from-blue-500/0 to-blue-500/10 border-b border-blue-400/30 origin-bottom transform rotate-0"></div>
              </div>

              {/* Central Icon */}
              <div className="relative z-10 bg-slate-900 p-6 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                 <Lock size={40} className="text-blue-400" />
              </div>

              {/* Floating Badges */}
              <div className="absolute top-10 right-10 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-green-400 flex items-center gap-2 animate-float">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> System Active
              </div>
              <div className="absolute bottom-12 left-10 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-blue-300 flex items-center gap-2 animate-float-delayed">
                 <ScanFace size={12} /> HIPAA Ready
              </div>
           </div>

           {/* Right: Features Grid */}
           <div className="grid sm:grid-cols-2 gap-6">
              {[
                 { 
                   icon: <Server size={20} />, 
                   title: "Isolated Architecture", 
                   desc: "Each agent operates in a fault-tolerant, isolated environment with clear boundaries."
                 },
                 { 
                   icon: <FileKey size={20} />, 
                   title: "Data Protection", 
                   desc: "Authenticated API access and encrypted data storage ensure your proprietary strategy remains confidential."
                 },
                 { 
                   icon: <CheckCircle2 size={20} />, 
                   title: "Scalable Design", 
                   desc: "Modular architecture allows new agents or data sources to be added without disrupting the system."
                 },
                 { 
                   icon: <Shield size={20} />, 
                   title: "Role-Based Access", 
                   desc: "Strict permission controls for internal documents and strategic deck repositories."
                 }
              ].map((feature, i) => (
                 <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all group">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                       {feature.icon}
                    </div>
                    <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default Security;
