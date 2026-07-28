import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight mb-4">
              <Sprout className="h-6 w-6 text-lightgreen-400" />
              <span>AgriVision <span className="text-lightgreen-400">AI</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Empowering farmers with advanced computer vision and generative AI to detect plant diseases and apply targeted treatments.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200">
                <Twitter className="h-4.5 w-4.5 text-white" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200">
                <Github className="h-4.5 w-4.5 text-white" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200">
                <Linkedin className="h-4.5 w-4.5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-lightgreen-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-lightgreen-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lightgreen-400 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-lightgreen-400 transition-colors">Sign In</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Disease Catalog</li>
              <li>Farmer Guides</li>
              <li>Scientific Research</li>
              <li>Terms & Privacy Policy</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-lightgreen-400 shrink-0" />
                <span>support@agrivision.ai</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-lightgreen-400 shrink-0" />
                <span>+1 (555) 327-6377</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-lightgreen-400 shrink-0" />
                <span className="text-slate-400 leading-tight">100 Biotech Parkway, Suite 300, California</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AgriVision AI. All rights reserved.</p>
          <p className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Settings</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
