import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Scan, 
  BrainCircuit, 
  History, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight, 
  Play, 
  FileText, 
  Activity, 
  MessageSquareQuote
} from 'lucide-react';
import { Button, Card } from '../components/ui';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';

export const Home: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Scan className="h-6 w-6 text-forest-600" />,
      title: "Real-Time Crop Scanning",
      description: "Upload photos of damaged plant leaves and obtain instant identifications of fungal, viral, or bacterial pathogens."
    },
    {
      icon: <BrainCircuit className="h-6 w-6 text-forest-600" />,
      title: "Generative AI Diagnostics",
      description: "Receive custom-curated, step-by-step treatment plans powered by Gemini, outlining cultural, chemical, and biological remedies."
    },
    {
      icon: <History className="h-6 w-6 text-forest-600" />,
      title: "Auditable Scan History",
      description: "Track disease spread and monitor treatment effectiveness over time with localized filters and temporal metrics."
    },
    {
      icon: <FileText className="h-6 w-6 text-forest-600" />,
      title: "Agronomy PDF Reports",
      description: "Compile diagnostic details, treatment parameters, and weather logs into structured PDFs ready to share with advisors."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Take a Photo",
      description: "Capture a clear image of the affected plant leaf focusing on the spot or lesion."
    },
    {
      num: "02",
      title: "Run CV Diagnosis",
      description: "Our YOLOv11/EfficientNet models instantly identify the specific plant disease with high confidence."
    },
    {
      num: "03",
      title: "Get AI Action Plan",
      description: "Receive customized treatment guidelines, watering modifications, and preventions for future cycles."
    }
  ];

  const techs = [
    { name: "React 19", category: "Frontend" },
    { name: "FastAPI", category: "Backend" },
    { name: "YOLO v11 / PyTorch", category: "AI Models" },
    { name: "Gemini API / LangChain", category: "LLM Orchestration" },
    { name: "SQLAlchemy & Postgres", category: "Data Storage" },
    { name: "Docker", category: "DevOps" }
  ];

  const testimonials = [
    {
      quote: "AgriVision AI saved my entire tomato harvest this season. It spotted Late Blight 3 weeks earlier than normal, and the copper treatment plan was extremely clear.",
      author: "Rajesh Sharma",
      role: "Tomato Farmer, 15 Acres",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=rajesh"
    },
    {
      quote: "As an agricultural advisor, I recommend AgriVision to all my clients. The multi-modal reports allow us to act fast, and the treatment plans are scientific and ecological.",
      author: "Dr. Sarah Jenkins",
      role: "Agronomist & Researcher",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=sarah"
    }
  ];

  const faqs = [
    {
      question: "Which crops are currently supported by the AI scanner?",
      answer: "We support a wide array of high-value crops including tomatoes, potatoes, apples, corn, wheat, grapes, and citrus fruit. We are continuously adding new crop model parameters monthly."
    },
    {
      question: "How accurate is the computer vision detection model?",
      answer: "Under proper lighting conditions and clear focus, our trained YOLOv11 and custom Convolutional Neural Networks achieve over 94.5% classification accuracy across our crop disease database."
    },
    {
      question: "Can I download and print the diagnosis reports?",
      answer: "Yes! Every scanned result creates a comprehensive diagnostic dashboard and is formatted for immediate export as a clean, shareable PDF agronomy report."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-mesh bg-[#fafdfb]">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-lightgreen-200/40 blur-3xl" />
        <div className="absolute bottom-1/5 right-1/10 h-96 w-96 rounded-full bg-forest-100/30 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-100/80 text-forest-800 text-xs font-bold uppercase tracking-wider">
              <Sprout className="h-4 w-4 text-forest-600 animate-bounce" />
              <span>Next-Gen Smart Farming</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
              Protect Your Harvests with <span className="text-forest-600 relative">AI-Powered</span> Agronomy
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Upload leaf images, detect plant diseases instantly with high-fidelity computer vision models, and receive personalized treatment plans created by generative AI.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="gap-2">
                  <Play className="h-4.5 w-4.5 fill-current" />
                  How It Works
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 pt-6 text-sm text-slate-500 font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-forest-600" />
                <span>94.5% CV Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-forest-600" />
                <span>Immediate Action Plans</span>
              </div>
            </div>
          </div>

          {/* Interactive Mockup Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <Card className="w-full max-w-sm glass-card border-white/60 p-5 shadow-2xl relative rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Mock Leaf Scan Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-ping"></div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">AI Leaf Diagnostic</span>
                </div>
                <span className="text-xs font-bold bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full">Blight Detected</span>
              </div>

              {/* Mock Upload Image Preview */}
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center border border-slate-100 relative overflow-hidden group shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400"
                  alt="Tomato leaf"
                  className="w-full h-full object-cover"
                />
                {/* Bounding box mock */}
                <div className="absolute top-1/4 left-1/3 right-1/4 bottom-1/3 border-2 border-red-500 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.3)] pointer-events-none flex flex-col justify-between p-1.5">
                  <span className="text-[9px] text-white bg-red-500 px-1 py-0.5 rounded self-start font-black">Late Blight: 94.2%</span>
                </div>
              </div>

              {/* Mock Treatment Prescription snippet */}
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Target Crop</span>
                  <span className="font-bold text-slate-700">Tomato (Solanum lycopersicum)</span>
                </div>
                <div className="p-3 bg-forest-50/70 border border-forest-100/60 rounded-xl">
                  <h5 className="text-xs font-bold text-forest-900 flex items-center gap-1.5">
                    <BrainCircuit className="h-3.5 w-3.5 text-forest-700" />
                    AI Treatment Summary:
                  </h5>
                  <p className="text-[11px] text-forest-800/90 leading-relaxed mt-1 font-medium">
                    Apply preventive copper-based fungicides immediately. Prune lower stems to decrease relative humidity inside the foliage.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-forest-600 uppercase tracking-widest pl-1">Comprehensive Platform</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              All-In-One AI Agriculture Assistant
            </h3>
            <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
              Our framework covers everything from field diagnostics to archival history, allowing you to optimize yields and prevent pest outbreaks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="hover:scale-[1.02] hover:-translate-y-1">
                <div className="p-3 bg-forest-50 rounded-2xl w-fit border border-forest-100 mb-5">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#fafdfb] bg-mesh border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-forest-600 uppercase tracking-widest">Workflow</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get Results in 3 Easy Steps
            </h3>
            <p className="text-sm text-slate-500">
              No complex settings required. Snap, upload, and treat within a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center space-y-4">
                <div className="text-6xl font-black text-forest-100/70 absolute -top-10 leading-none select-none">
                  {step.num}
                </div>
                <div className="h-14 w-14 rounded-full bg-forest-600 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-lg relative z-10">
                  {idx + 1}
                </div>
                <h4 className="text-lg font-bold text-slate-900 relative z-10">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Used */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-xs font-bold text-forest-600 uppercase tracking-widest">Architecture</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Production-Ready Tech Stack
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4.5 max-w-4xl mx-auto">
            {techs.map((tech, i) => (
              <div 
                key={i} 
                className="px-5 py-3 rounded-2xl border border-slate-100 bg-[#fbfdfc] shadow-sm flex flex-col items-center hover:border-forest-300 transition-all cursor-default"
              >
                <span className="text-sm font-bold text-slate-800">{tech.name}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-[#fafdfb] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-forest-600 uppercase tracking-widest">Feedback</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Endorsed by Farmers and Agronomists
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((test, idx) => (
              <Card key={idx} className="flex flex-col justify-between shadow-lg">
                <p className="text-sm text-slate-600 leading-relaxed italic relative">
                  <MessageSquareQuote className="h-8 w-8 text-forest-200/50 absolute -top-4 -left-4 -z-10" />
                  "{test.quote}"
                </p>
                <div className="flex items-center gap-3.5 mt-6 border-t border-slate-50 pt-4">
                  <img
                    src={test.avatar}
                    alt={test.author}
                    className="h-10 w-10 rounded-full bg-forest-50 object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm leading-tight">{test.author}</h5>
                    <span className="text-xs text-slate-400 font-semibold">{test.role}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-xs font-bold text-forest-600 uppercase tracking-widest">Support</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="rounded-2xl border border-slate-100 bg-[#fbfdfc] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 text-sm hover:text-forest-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-forest-500' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs font-medium text-slate-500 leading-relaxed border-t border-slate-50 pt-3 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
