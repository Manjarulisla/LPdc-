import React from 'react';
import { MagneticButton } from './MagneticButton';
import { Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/60 dark:bg-black/60 backdrop-blur-lg pt-24 pb-12 border-t border-slate-200 dark:border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
              <img 
                src="/logo.png" 
                alt="PLDC Logo" 
                className="h-12 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
              PLDC (Professional Learning & Development Center) is a learning and development platform for individuals who aspire to grow beyond conventional boundaries—personally, professionally, and socially.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/20 flex items-center justify-center hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/20 flex items-center justify-center hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/20 flex items-center justify-center hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-accent transition-colors">Pathways</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-accent transition-colors">Masterclasses</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-accent transition-colors">Mentorship</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-accent transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-accent transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-accent transition-colors">Impact Report</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold mb-6">Stay Updated</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
              Get the latest insights and news from PLDC directly to your inbox.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full px-6 py-3 outline-none focus:border-brand-accent transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} PLDC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
