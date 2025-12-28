"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Features', id: 'features' },
    { name: 'Security', id: 'security' },
    { name: 'Workflow', id: 'workflow' },
    { name: 'Agent', id: 'agent' },
    { name: 'FAQ', id: 'faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const NavItem = ({ text, id }: { text: string; id: string }) => (
    <button 
      onClick={() => scrollToSection(id)}
      className="relative group cursor-pointer flex items-center gap-1 text-gray-600 hover:text-primary transition-colors font-medium text-sm py-2"
    >
      {text}
      
      {/* Hover Underline Animation */}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
    </button>
  );

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md h-16 border-b border-gray-200/50' 
          : 'bg-transparent h-24 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transform rotate-45 group-hover:rotate-90 transition-transform duration-500">
            <div className="w-4 h-4 bg-white rounded-full transform -rotate-45 group-hover:-rotate-90 transition-transform duration-500"></div>
          </div>
          <span className="text-2xl font-bold text-primary tracking-tight font-sans">AETHERIA</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavItem key={item.id} text={item.name} id={item.id} />
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer">
            <Globe className="text-gray-500 hover:text-primary transition-colors" size={20} />
          </div>
          <button className="px-5 py-2.5 text-sm font-medium text-primary hover:bg-gray-100/80 rounded-lg transition-colors border border-transparent hover:border-gray-200">
            Login
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-slate-800 rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
            Request a Demo
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5 duration-200">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="py-2 border-b border-gray-50 font-medium text-left text-gray-600 hover:text-primary"
            >
              {item.name}
            </button>
          ))}
          <button className="w-full py-3 text-center text-primary border border-gray-200 rounded-lg hover:bg-gray-50">Login</button>
          <button className="w-full py-3 text-center text-white bg-primary rounded-lg hover:bg-slate-800">Request a Demo</button>
        </div>
      )}
    </nav>
  );
};

export default Header;