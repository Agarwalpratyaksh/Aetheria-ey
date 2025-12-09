"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button 
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-primary' : 'text-slate-800'}`}>
            {question}
        </span>
        <span className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 leading-relaxed pr-8">
            {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How does the AI ensure accuracy?",
      answer: "The system uses a 'Critique/Validation' layer where agents cross-reference findings against regulatory guidelines and scientific literature before synthesis."
    },
    {
      question: "Can I integrate my own internal data?",
      answer: "Yes. The Internal Knowledge Agent connects securely to your internal strategy decks and PostgreSQL databases to combine public data with private insights"
    },
    {
      question: "What sources does the system cover?",
      answer: "We cover over 30 million PubMed papers, ClinicalTrials.gov, USPTO patent data, trade flows, and IQVIA market datasets."
    },
    {
      question: "Do you offer a pilot program for pharmaceutical companies?",
      answer: "We offer a 12-week 'Proof of Value' pilot program where we deploy a specific agent (e.g., Protocol Optimization or Literature Synthesis) on a past trial to demonstrate ROI and accuracy compared to the manual results."
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-serif text-slate-900 mb-4">Frequently Asked Questions</h2>
           <p className="text-slate-500">Everything you need to know about the platform.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
