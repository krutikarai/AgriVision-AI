import { getWeather } from "../services/weather";
import React, { useEffect, useState } from 'react';
import { api } from "../services/api";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '../components/ui';
import { 
  Sun,
Cloud,
CloudRain,
CloudLightning,
Snowflake,
  Upload, 
  Scan, 
  CloudSun, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  Activity, 
  ArrowRight,
  TrendingDown,
  Clock
} from 'lucide-react';
export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const [loadingScans, setLoadingScans] = useState(true);
  const [weather, setWeather] = useState<any>(null);
  const totalScans = recentScans.length;

const healthyScans = recentScans.filter(
  scan => scan.severity < 0.2
).length;

const infectedScans = totalScans - healthyScans;

const healthyRate =
  totalScans > 0
    ? ((healthyScans / totalScans) * 100).toFixed(1)
    : "0.0";
  useEffect(() => {
  const loadHistory = async () => {
    const data = await api.getHistory();
    setRecentScans(data);
    setLoadingScans(false);
  };

  const loadWeather = async () => {
    try {
      const data = await getWeather();
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadHistory();
  loadWeather();
}, []);

 

  const getWeatherIcon = () => {
  if (!weather) return <CloudSun className="h-6 w-6" />;

  const condition = weather.weather[0].main.toLowerCase();

  if (condition.includes("clear")) {
    return <Sun className="h-6 w-6" />;
  }

  if (condition.includes("cloud")) {
    return <Cloud className="h-6 w-6" />;
  }

  if (condition.includes("rain") || condition.includes("drizzle")) {
    return <CloudRain className="h-6 w-6" />;
  }

  if (condition.includes("thunder")) {
    return <CloudLightning className="h-6 w-6" />;
  }

  if (condition.includes("snow")) {
    return <Snowflake className="h-6 w-6" />;
  }

  return <CloudSun className="h-6 w-6" />;
};

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-forest-900 text-white rounded-3xl p-6.5 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-forest-700/20 blur-2xl pointer-events-none" />
        <div className="space-y-2">
          <h2 className="text-2xl font-black">Welcome Back, {user?.fullName || 'Farmer'}!</h2>
          <p className="text-xs text-forest-100 opacity-90 font-medium">
            AgriVision scan node is active. You have completed {recentScans.length} diagnostic scans this week.
          </p>
        </div>
        <Link to="/disease-detection">
          <Button variant="secondary" className="gap-2 font-bold whitespace-nowrap shadow-lg">
            <Scan className="h-4.5 w-4.5" />
            Perform New Scan
          </Button>
        </Link>
      </div>

      {/* Grid: Main metrics (Quick cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Card */}
        <Card>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Field Weather</span>
              <h4 className="text-2xl font-black text-slate-900">
  {weather ? `${Math.round(weather.main.temp)}°C` : "--"}
</h4>
              <p className="text-xs text-slate-500 font-medium">{weather
  ? `${weather.weather[0].main} • Humidity ${weather.main.humidity}%`
  : "Loading..."}</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 text-blue-500 rounded-2xl">
              {getWeatherIcon()}
            </div>
          </div>
          <div className="border-t border-slate-50 mt-4 pt-3 flex justify-between items-center text-[10px] text-slate-400 font-semibold">
            <span>Wind: {weather ? `${Math.round(weather.wind.speed * 3.6)} km/h` : "--"}</span>
            <span className="text-blue-600">Perfect Spray Window: {
  weather &&
  weather.wind.speed < 5 &&
  weather.main.humidity < 80
    ? "Yes"
    : "No"
}</span>
          </div>
        </Card>

        {/* AI Assistant Promo Card */}
        <Card>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Copilot</span>
              <h4 className="text-base font-bold text-slate-900 mt-1">Need leaf diagnosis help?</h4>
              <p className="text-xs text-slate-500 font-medium">Ask natural questions about dosage and organic treatments.</p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-100 text-purple-500 rounded-2xl shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <div className="border-t border-slate-50 mt-4.5 pt-3">
            <Link to="/treatment"  className="text-xs text-forest-600 font-bold hover:text-forest-700 flex items-center gap-1">
              Chat with AI Assistant
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Card>

        {/* Analytics Card */}
        <Card>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Yield Protection</span>
              <h4 className="text-2xl font-black text-slate-900">{healthyRate}%</h4>
              <p className="text-xs text-forest-600 font-bold flex items-center gap-1 mt-0.5">
                <TrendingUp className="h-3.5 w-3.5" />
                +2.3% Healthy Yield
              </p>
            </div>
            <div className="p-3 bg-forest-50 border border-forest-100 text-forest-600 rounded-2xl">
              <Activity className="h-6 w-6" />
            </div>
          </div>
          <div className="border-t border-slate-50 mt-4 pt-3 flex justify-between items-center text-[10px] text-slate-400 font-semibold">
            <span>Scans: {totalScans} total</span>
            <span>Healthy Crop Rate: {healthyRate}%</span>
          </div>
        </Card>
      </div>

      {/* Grid: Main sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Recent Scans & Upload Trigger */}
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center border-b border-slate-50 pb-4 mb-4">
              <div>
                <CardTitle>Recent Leaf Diagnostics</CardTitle>
                <CardDescription>Review the latest uploads and classification scores.</CardDescription>
              </div>
              <Link to="/history" className="text-xs font-bold text-forest-600 hover:underline">
                View History
              </Link>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-slate-50">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={`https://agrivision-backend-lhni.onrender.com${scan.image_url}`}
                        alt={scan.crop}
                        className="h-12 w-12 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-slate-800 text-sm">{scan.disease_name}</h5>
                        <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                          <span>{scan.crop_type}</span>
                          <span className="text-[10px] opacity-40">•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(scan.created_at).toLocaleDateString()} • {new Date(scan.created_at).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit"
})}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        scan.severity < 0.2 
                          ? 'bg-forest-50 text-forest-700 border border-forest-100' 
                          : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {scan.severity < 0.2 ? "Healthy" : "Infected"}
                      </span>
                      <span className="text-xs font-black text-slate-700">{(scan.confidence_score * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick upload container card */}
          <Card className="border-dashed border-2 border-slate-200 hover:border-forest-400 transition-colors cursor-pointer group">
            <Link to="/disease-detection" className="flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="p-4 bg-slate-50 group-hover:bg-forest-50 border border-slate-100 group-hover:border-forest-100 rounded-2xl text-slate-500 group-hover:text-forest-600 transition-colors">
                <Upload className="h-7 w-7" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-forest-700 transition-colors">Quick Diagnostic Upload</h4>
                <p className="text-xs text-slate-400 font-semibold mt-1">Drag and drop or click to upload crop leaf images.</p>
              </div>
            </Link>
          </Card>
        </div>

        {/* Right Side: Reports & Visual Analytics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Reports Card */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center border-b border-slate-50 pb-4 mb-4">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Agronomy compilations.</CardDescription>
              </div>
              <Link to="/reports" className="text-xs font-bold text-forest-600 hover:underline">
                All Reports
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentScans.slice(0, 5).map((rep) => (
                  <div key={rep.id} className="p-3 bg-slate-50/60 border border-slate-100 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-forest-50 rounded-xl text-forest-600 shrink-0">
                        <FileText className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-bold text-slate-800 text-xs truncate leading-normal">{rep.disease_name}</h5>
                        <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{new Date(rep.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-black whitespace-nowrap">
  {(rep.confidence_score * 100).toFixed(1)}%
</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Styled SVG Visual Analytics */}
          <Card>
            <CardHeader className="border-b border-slate-50 pb-4 mb-4">
              <CardTitle>Pathogen Trends</CardTitle>
              <CardDescription>Historical scans chart.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Custom SVG Line Chart */}
              <div className="h-28 w-full flex items-end">
                <svg className="w-full h-full text-forest-500 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.5" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
                  {/* Fill Under Line */}
                  <path d="M 0,30 L 0,25 Q 20,5 40,18 Q 60,25 80,10 L 100,12 L 100,30 Z" fill="url(#grad)" opacity="0.15" />
                  {/* Line Chart */}
                  <path d="M 0,25 Q 20,5 40,18 Q 60,25 80,10 L 100,12" fill="none" stroke="#2f8150" strokeWidth="1.5" />
                  {/* Dots */}
                  <circle cx="0" cy="25" r="1.2" fill="#2f8150" />
                  <circle cx="40" cy="18" r="1.2" fill="#2f8150" />
                  <circle cx="80" cy="10" r="1.2" fill="#2f8150" />
                  <circle cx="100" cy="12" r="1.2" fill="#2f8150" />
                  
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2f8150" />
                      <stop offset="100%" stopColor="#2f8150" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>May</span>
                <span>June</span>
                <span>July</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};
