import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card, Button, Input, Alert } from '../components/ui';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-gradient-mesh bg-[#fafdfb] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Contact Support</h1>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                Have questions about scanning accuracy, crop support, or premium integration? Get in touch with our tech and agronomy support teams.
              </p>
            </div>

            <div className="space-y-5 text-sm font-medium">
              <div className="flex items-center gap-4.5 p-4 bg-white/60 border border-slate-100 rounded-2xl shadow-sm">
                <div className="p-2.5 bg-forest-50 border border-forest-100 rounded-xl text-forest-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Email Address</h4>
                  <span className="text-slate-500 text-xs mt-0.5 block">support@agrivision.ai</span>
                </div>
              </div>

              <div className="flex items-center gap-4.5 p-4 bg-white/60 border border-slate-100 rounded-2xl shadow-sm">
                <div className="p-2.5 bg-forest-50 border border-forest-100 rounded-xl text-forest-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Office Phone</h4>
                  <span className="text-slate-500 text-xs mt-0.5 block">+1 (555) 327-6377</span>
                </div>
              </div>

              <div className="flex items-center gap-4.5 p-4 bg-white/60 border border-slate-100 rounded-2xl shadow-sm">
                <div className="p-2.5 bg-forest-50 border border-forest-100 rounded-xl text-forest-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Headquarters</h4>
                  <span className="text-slate-500 text-xs mt-0.5 block leading-tight">100 Biotech Parkway, Suite 300, California</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <Card className="shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-3">Send a Message</h3>

                {success && (
                  <Alert variant="success" title="Message Received">
                    Thank you! Your message has been sent to our team. We'll reply within 24 hours.
                  </Alert>
                )}

                <Input
                  label="Your Name"
                  type="text"
                  placeholder="Jatin Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={success}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="farmer@agrivision.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={success}
                />

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700 pl-1">
                    Describe your request
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your question or issue in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 glass-input text-slate-800 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-forest-500/20"
                    required
                    disabled={success}
                  />
                </div>

                {!success && (
                  <Button type="submit" className="w-full gap-2" isLoading={isLoading}>
                    <Send className="h-4 w-4" />
                    Submit Message
                  </Button>
                )}
                
                {success && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                )}
              </form>
            </Card>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
