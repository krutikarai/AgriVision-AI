import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input } from '../components/ui';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  RefreshCw, 
  HelpCircle,
  BrainCircuit,
  Sprout
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const TreatmentAssistant: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'ai',
      text: `Hello ${user?.fullName || 'Farmer'}! I am your AgriVision AI Agronomy Assistant. Ask me any questions regarding plant symptoms, chemical dilutions, bio-fungicides, or crop rotation strategies.`,
      timestamp: '11:15 AM'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chats
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Mock AI response generation based on keyword matches
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    let aiResponse = `I received your query about "${query}". To provide the best agronomic advice, please ensure you have uploaded a leaf scan. Generally, for foliage spot issues, ensure you avoid overhead watering, prune infected stems, and apply standard copper-based fungicides during morning dry periods.`;

    const normQuery = query.toLowerCase();
    if (normQuery.includes('blight') || normQuery.includes('tomato')) {
      aiResponse = `Regarding **Tomato Late Blight**: 
1. **Immediate Spray**: Spray copper hydroxide or chlorothalonil immediately if spots are enlarging rapidly.
2. **Moisture Control**: Switch from sprinkler irrigation to drip irrigation. Late Blight spreads through water droplets.
3. **Pruning**: Cut off lower yellow/spotty foliage (up to 12 inches from the ground) to increase airflow.
4. **Disinfection**: Always clean your shears with 70% isopropyl alcohol between plants to prevent spread.`;
    } else if (normQuery.includes('dilution') || normQuery.includes('copper') || normQuery.includes('dosage')) {
      aiResponse = `For copper fungicide spray dilutions:
- **Standard Dosage**: Mix 2 to 4 level tablespoons (approx. 1 to 2 ounces) of copper fungicide powder per 1 gallon of clean water.
- **Application Frequency**: Repeat every 7 to 10 days during rainy spells or high humidity.
- **Best Time**: Apply during early mornings or late evenings when wind speed is under 5 km/h to prevent spray drift.`;
    } else if (normQuery.includes('organic') || normQuery.includes('biological')) {
      aiResponse = `Organic bio-fungicide options:
- **Bacillus subtilis**: A highly effective soil/leaf bacterium that competes with fungal spores.
- **Neem Oil (Cold-pressed)**: Good for general mild fungal spots and insect deterrent. Mix 2 tablespoons neem oil + 1 teaspoon mild soap per gallon of water.
- **Potassium Bicarbonate**: Modifies the leaf surface pH, rendering it hostile to spores. Mix 1 tablespoon per gallon.`;
    }

    const aiMsg: Message = {
      id: String(Date.now() + 1),
      sender: 'ai',
      text: aiResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  const sampleQuestions = [
    "How do I dilute copper fungicide?",
    "What organic treatments exist for Blight?",
    "Best watering practices to avoid fungus?"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-12rem)] min-h-[480px]">
      
      {/* Left Column: Context panel */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <Card className="h-full flex flex-col justify-between">
          <CardHeader className="border-b border-slate-50 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5.5 w-5.5 text-forest-600" />
              <div>
                <CardTitle>AI Agronomist</CardTitle>
                <CardDescription>Generative Copilot Support.</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 flex-1 overflow-y-auto">
            <div className="p-4 bg-purple-50/60 border border-purple-100/50 rounded-2xl">
              <h5 className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-purple-700 animate-pulse" />
                Active Model
              </h5>
              <p className="text-[11px] text-purple-800/90 leading-relaxed mt-1 font-medium">
                Connected to AgriVision-LLM (v1.4) optimized on agricultural databases and pesticide labeling sheets.
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <HelpCircle className="h-4 w-4 text-slate-400" />
                Frequently Asked Queries
              </h4>
              <div className="space-y-2">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(q)}
                    className="w-full text-left p-3 border border-slate-100 hover:border-forest-300 bg-slate-50/50 hover:bg-forest-50/20 rounded-2xl text-[11px] text-slate-600 font-bold transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
          
          <div className="border-t border-slate-50 pt-4 text-[10px] text-slate-400 text-center font-semibold">
            Pesticide laws vary. Always verify local bottle labels.
          </div>
        </Card>
      </div>

      {/* Right Column: Active Chat Bubble Room */}
      <div className="lg:col-span-8 flex flex-col h-full">
        <Card className="flex flex-col h-full p-4 justify-between">
          {/* Scrollable messages box */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 min-h-[300px]">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div 
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isAi ? 'self-start' : 'self-end ml-auto flex-row-reverse'}`}
                >
                  <div className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 ${
                    isAi 
                      ? 'bg-forest-50 border-forest-100 text-forest-600' 
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}>
                    {isAi ? <Sprout className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed ${
                    isAi 
                      ? 'bg-forest-50/50 text-slate-700 border border-forest-100/50' 
                      : 'bg-forest-600 text-white border border-forest-700'
                  }`}>
                    {/* Simplified markdown format rendering */}
                    <div className="whitespace-pre-line">
                      {msg.text}
                    </div>
                    <span className={`block text-[9px] mt-1.5 text-right font-medium opacity-60 ${isAi ? 'text-slate-400' : 'text-forest-100'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 items-center">
                <div className="h-8 w-8 rounded-full border bg-forest-50 border-forest-100 text-forest-600 flex items-center justify-center">
                  <Sprout className="h-4 w-4 animate-spin" />
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex gap-1 items-center">
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form input bar */}
          <form onSubmit={handleSend} className="flex gap-3 border-t border-slate-50 pt-4 mt-4">
            <input
  type="text"
  placeholder="Ask AI Agronomist..."
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!isTyping && inputValue.trim()) {
        handleSend(e as unknown as React.FormEvent);
      }
    }
  }}
  className="flex-1 px-4 py-3.5 glass-input text-slate-800 text-xs focus:ring-2 focus:ring-forest-500/20"
  disabled={isTyping}
/>
            <Button type="submit" className="px-4.5 shrink-0" disabled={isTyping || !inputValue.trim()}>
              <Send className="h-4.5 w-4.5" />
            </Button>
          </form>
        </Card>
      </div>

    </div>
  );
};
