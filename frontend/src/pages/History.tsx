import { jsPDF } from "jspdf";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Alert } from '../components/ui';
import { 
  History as HistoryIcon, 
  Search, 
  Calendar, 
  FileText, 
  X, 
  ChevronRight, 
  BrainCircuit, 
  Layers,
  Clock
} from 'lucide-react';
import { api } from '../services/api';

interface ScanRecord {
  id: number;
  crop_type: string;
  image_url: string;
  highlighted_image_url: string;
  disease_name: string;
  confidence_score: number;
  severity: number;
  diagnosis_details: string;
  possible_causes: string;
  treatment_plan: string;
  recommended_steps: string;
  created_at: string;
}

export const History: React.FC = () => {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [cropFilter, setCropFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedScan, setSelectedScan] = useState<ScanRecord | null>(null);

  // Fetch scan records from live backend
  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getHistory();
      setScans(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve scan history logs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getAbsoluteUrl = (urlPath: string) => {
    if (!urlPath) return '';
    return `https://agrivision-backend-lhni.onrender.com${urlPath}`;
  };

  const getStatus = (severity: number) => {
    return severity > 0.05 ? 'Infected' : 'Healthy';
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return isoString;
    }
  };

  // Search & Filter Logic
  const filteredScans = scans.filter((scan) => {
    const matchesSearch = 
      scan.disease_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.crop_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(scan.id).includes(searchTerm);
      
    const matchesCrop = cropFilter === 'All' || scan.crop_type.toLowerCase() === cropFilter.toLowerCase();
    
    const status = getStatus(scan.severity);
    const matchesStatus = statusFilter === 'All' || status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCrop && matchesStatus;
  });

const handleDownloadPDF = () => {
  if (!selectedScan) return;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AgriVision AI - Disease Report", 20, 20);

  doc.setFontSize(12);
  doc.text(`Scan ID: ${selectedScan.id}`, 20, 40);
  doc.text(`Crop: ${selectedScan.crop_type}`, 20, 50);
  doc.text(`Disease: ${selectedScan.disease_name}`, 20, 60);
  doc.text(
    `Confidence: ${(selectedScan.confidence_score * 100).toFixed(1)}%`,
    20,
    70
  );
  doc.text(
    `Severity: ${(selectedScan.severity * 100).toFixed(1)}%`,
    20,
    80
  );

  doc.text("Diagnosis:", 20, 100);
  doc.text(doc.splitTextToSize(selectedScan.diagnosis_details, 170), 20, 110);

  doc.text("Possible Causes:", 20, 150);
  doc.text(doc.splitTextToSize(selectedScan.possible_causes, 170), 20, 160);

  doc.text("Recommended Steps:", 20, 200);
  doc.text(doc.splitTextToSize(selectedScan.recommended_steps, 170), 20, 210);

  doc.save(`Scan_${selectedScan.id}.pdf`);
};
  return (
    <div className="space-y-6 relative">
      
      {/* Filters Toolbar */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search scans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10.5 pr-4 py-2.5 glass-input text-slate-800 text-xs focus:ring-2 focus:ring-forest-500/20"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button 
            onClick={fetchLogs} 
            className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl text-slate-600 transition-colors text-xs font-bold"
            disabled={isLoading}
          >
            Refresh
          </button>
          
          <div className="flex items-center gap-2 flex-1 md:flex-initial">
            <span className="text-xs text-slate-400 font-bold hidden sm:inline">Crop:</span>
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="flex-1 md:flex-initial px-3.5 py-2.5 glass-input text-slate-700 text-xs focus:ring-2 focus:ring-forest-500/20"
            >
              <option value="All">All Crops</option>
              <option value="Tomato">Tomato</option>
              <option value="Potato">Potato</option>
              <option value="Apple">Apple</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-1 md:flex-initial">
            <span className="text-xs text-slate-400 font-bold hidden sm:inline">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 md:flex-initial px-3.5 py-2.5 glass-input text-slate-700 text-xs focus:ring-2 focus:ring-forest-500/20"
            >
              <option value="All">All Statuses</option>
              <option value="Healthy">Healthy</option>
              <option value="Infected">Infected</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-forest-600 mx-auto mb-2"></div>
            <span className="text-xs text-slate-400 font-bold">Querying database records...</span>
          </div>
        ) : error ? (
          <div className="col-span-2 p-6">
            <Alert variant="error" title="History Retrieval Failed">
              {error}
            </Alert>
          </div>
        ) : filteredScans.length > 0 ? (
          filteredScans.map((scan) => {
            const status = getStatus(scan.severity);
            return (
              <Card 
                key={scan.id} 
                className="hover:scale-[1.01] hover:border-forest-200 cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedScan(scan)}
              >
                <div className="flex gap-4">
                  <img
                    src={getAbsoluteUrl(scan.image_url)}
                    alt={scan.crop_type}
                    className="h-20 w-20 rounded-2xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>SCAN #{scan.id}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(scan.created_at)}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-slate-900 leading-snug">{scan.disease_name}</h4>
                    <p className="text-xs font-semibold text-slate-400">{scan.crop_type.toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 mt-4.5 pt-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      status === 'Healthy' 
                        ? 'bg-forest-50 text-forest-700 border border-forest-100' 
                        : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {status}
                    </span>
                    <span className="text-xs font-black text-slate-700">Confidence: {(scan.confidence_score * 100).toFixed(0)}%</span>
                  </div>
                  
                  <span className="text-xs text-forest-600 font-bold hover:text-forest-700 flex items-center gap-0.5">
                    Details
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-12 rounded-3xl border border-slate-100 bg-white/60">
            <HistoryIcon className="h-10 w-10 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-800 text-sm">No Scans Found</h4>
            <p className="text-xs text-slate-400 mt-1">Make sure you have analyzed a leaf image on the scanner page.</p>
          </div>
        )}
      </div>

      {/* Details Side-Drawer / Dialog Modal Overlay */}
      {selectedScan && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSelectedScan(null)}
          />
          {/* Drawer Panel */}
          <div className="relative max-w-lg w-full bg-white h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between animate-slideRight">
            
            {/* Header */}
            <div>
              <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-5">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SCAN #{selectedScan.id}</span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">{selectedScan.disease_name}</h3>
                </div>
                <button
                  onClick={() => setSelectedScan(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Scan Info Content */}
              <div className="space-y-6">
                
                {/* Image display */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Highlight Bounding Boxes</span>
                  <img
                    src={getAbsoluteUrl(selectedScan.highlighted_image_url || selectedScan.image_url)}
                    alt={selectedScan.crop_type}
                    className="w-full rounded-2xl aspect-[4/3] object-cover border border-slate-100 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3.5 text-xs font-semibold text-center">
                  <div className="p-3 bg-slate-50 rounded-2xl flex flex-col items-center">
                    <span className="text-slate-400 text-[10px] font-bold">CROP</span>
                    <span className="text-slate-800 font-black mt-1 uppercase">{selectedScan.crop_type}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl flex flex-col items-center">
                    <span className="text-slate-400 text-[10px] font-bold">CONFIDENCE</span>
                    <span className="text-slate-800 font-black mt-1">{(selectedScan.confidence_score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl flex flex-col items-center">
                    <span className="text-slate-400 text-[10px] font-bold">SEVERITY</span>
                    <span className="text-slate-850 font-black mt-1 text-red-600">{(selectedScan.severity * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-50 pt-4">
                  <h4 className="text-sm font-bold text-slate-800">Diagnostic Summary</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {selectedScan.diagnosis_details}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Layers className="h-4.5 w-4.5 text-slate-400" />
                    Possible Causes
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {selectedScan.possible_causes}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-50">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <BrainCircuit className="h-4.5 w-4.5 text-forest-600" />
                    AI Prescribed Remedies
                  </h4>
                  <div className="space-y-2 pl-1">
                    {selectedScan.recommended_steps.split('\n').map((step, i) => (
                      <p key={i} className="text-xs text-slate-600 leading-normal font-medium">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-slate-100 pt-5 mt-8 flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 font-bold text-xs" 
                onClick={() => setSelectedScan(null)}
              >
                Close Drawer
              </Button>
              <Button
  variant="primary"
  className="flex-1 gap-1.5 font-bold text-xs"
  onClick={handleDownloadPDF}
>
  <FileText className="h-4 w-4" />
  Download PDF
</Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
