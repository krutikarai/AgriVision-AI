import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card, Button } from '../components/ui';
import { ShieldAlert, Users, Award, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-gradient-mesh bg-[#fafdfb] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Protecting Crops, <span className="text-forest-600">Empowering Farmers</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              AgriVision AI is built by agronomy researchers and AI developers to help identify crop anomalies, increase yields, and promote ecological soil management.
            </p>
          </div>

          {/* Cards section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:scale-[1.01]">
              <div className="p-3 bg-forest-50 border border-forest-100 rounded-2xl w-fit mb-5">
                <ShieldAlert className="h-6 w-6 text-forest-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                To build accessible, enterprise-grade AI models that spot crop disease early, allowing farmers to prevent devastating yield loss.
              </p>
            </Card>

            <Card className="hover:scale-[1.01]">
              <div className="p-3 bg-forest-50 border border-forest-100 rounded-2xl w-fit mb-5">
                <Sparkles className="h-6 w-6 text-forest-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Technology</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                By fusing Computer Vision (YOLOv11 object boundaries) with Generative LLMs (Gemini API), we offer diagnosis details and actionable prescriptions instantly.
              </p>
            </Card>

            <Card className="hover:scale-[1.01]">
              <div className="p-3 bg-forest-50 border border-forest-100 rounded-2xl w-fit mb-5">
                <Heart className="h-6 w-6 text-forest-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ecological Goal</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                We prioritize organic cultural controls, crop rotation, and precise bio-fungicides to help maintain healthy ecosystems and clean water tables.
              </p>
            </Card>
          </div>

          {/* Team / Timeline mockup banner */}
          <div className="bg-forest-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-forest-700/20 blur-2xl" />
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-bold text-lightgreen-400 uppercase tracking-widest block">Core Team</span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">Driven by passion for Sustainable Agriculture</h2>
              <p className="text-xs text-forest-100 leading-relaxed opacity-90 font-medium">
                Our team represents developers, researchers, and agronomists coming together to democratize computer vision tools for farmers globally.
              </p>
            </div>
            <Link to="/register" className="shrink-0">
              <Button variant="secondary" size="lg" className="font-bold">
                Join our Platform
              </Button>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
