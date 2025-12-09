import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Aetheria reduced our protocol design phase from 8 months to 6 weeks. The synthetic control arms were indistinguishable from our historical datasets.",
      author: "Dr. Elena Ray",
      role: "VP of Clinical Operations",
      company: "Genentech"
    },
    {
      quote: "The ability to simulate patient recruitment scenarios saved us millions in a potentially failed Phase IIb trial. It's not just a tool; it's a safety net.",
      author: "Mark Stevens",
      role: "Global Head of R&D",
      company: "Novartis"
    },
    {
      quote: "Finally, an AI that understands medical nuance. The automated pharmacovigilance agents flagged a rare adverse event two weeks before our manual review team.",
      author: "Sarah Jenning, PhD",
      role: "Director of Safety",
      company: "Pfizer"
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
            <h2 className="text-4xl font-serif text-slate-900 mb-4">Trusted by pioneers in medicine</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/* Quote Icon Watermark */}
              <Quote className="absolute top-8 right-8 text-slate-200 w-12 h-12 opacity-50 group-hover:text-orange-100 group-hover:opacity-100 transition-colors duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex-1 mb-8">
                  <p className="text-slate-700 text-lg leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{t.author}</div>
                    <div className="text-sm text-slate-500">{t.role}, <span className="text-primary font-semibold">{t.company}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
