import { jsPDF } from "jspdf";
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '../components/ui';
import { 
  FileText, 
  Download, 
  Trash2, 
  Plus, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';


export const Reports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [crop, setCrop] = useState('All');
  const [dateRange, setDateRange] = useState('15');
  const [isGenerating, setIsGenerating] = useState(false);
useEffect(() => {
  const loadReports = async () => {
    try {
      const data = await api.getHistory();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  loadReports();
}, []);
  

  const handleDelete = (id: string) => {
    setReports((prev) => prev.filter(r => r.id !== id));
  };
const handleDownload = (rep: any) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("AgriVision AI Report", 20, 20);

  doc.setFontSize(12);

  let y = 40;

  doc.text(`Report ID: ${rep.id}`, 20, y);
  y += 10;

  doc.text(`Disease: ${rep.disease_name}`, 20, y);
  y += 10;

  doc.text(`Crop: ${rep.crop_type}`, 20, y);
  y += 10;

  doc.text(
    `Confidence: ${(rep.confidence_score * 100).toFixed(1)}%`,
    20,
    y
  );
  y += 10;

  doc.text(
    `Date: ${new Date(rep.created_at).toLocaleDateString()}`,
    20,
    y
  );
  y += 20;

  if (rep.diagnosis_details) {
    doc.setFontSize(14);
    doc.text("Diagnosis", 20, y);
    y += 10;

    doc.setFontSize(11);
    const diagnosis = doc.splitTextToSize(rep.diagnosis_details, 170);
    doc.text(diagnosis, 20, y);
    y += diagnosis.length * 7 + 10;
  }

  if (rep.possible_causes) {
    doc.setFontSize(14);
    doc.text("Possible Causes", 20, y);
    y += 10;

    doc.setFontSize(11);
    const causes = doc.splitTextToSize(rep.possible_causes, 170);
    doc.text(causes, 20, y);
    y += causes.length * 7 + 10;
  }

  if (rep.treatment_plan) {
    doc.setFontSize(14);
    doc.text("Treatment Plan", 20, y);
    y += 10;

    doc.setFontSize(11);
    const treatment = doc.splitTextToSize(rep.treatment_plan, 170);
    doc.text(treatment, 20, y);
    y += treatment.length * 7 + 10;
  }

  if (rep.recommended_steps) {
    doc.setFontSize(14);
    doc.text("Recommended Steps", 20, y);
    y += 10;

    doc.setFontSize(11);
    const steps = doc.splitTextToSize(rep.recommended_steps, 170);
    doc.text(steps, 20, y);
  }

  doc.save(`AgriVision_Report_${rep.id}.pdf`);
};
  return (
    <div className="space-y-6">
      
      {/* Reports configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Create Report form */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader className="border-b border-slate-50 pb-4 mb-4">
              <CardTitle>Report Generator</CardTitle>
              <CardDescription>Compile historic data logs and recommendations into PDF formats.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 pl-1">Crop Subject</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-4 py-3 glass-input text-slate-800 text-sm focus:ring-2 focus:ring-forest-500/20"
                  disabled={isGenerating}
                >
                  <option value="All">All Supported Crops</option>
                  <option value="Tomato">Tomatoes Only</option>
                  <option value="Potato">Potatoes Only</option>
                  <option value="Apple">Apples Only</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 pl-1">Time Horizon</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-3 glass-input text-slate-800 text-sm focus:ring-2 focus:ring-forest-500/20"
                  disabled={isGenerating}
                >
                  <option value="7">Last 7 Days</option>
                  <option value="15">Last 15 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                </select>
              </div>

              <Button
  disabled
  className="w-full gap-2 font-bold"
>
  Reports are generated from Scan History
</Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Reports Archive List */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader className="border-b border-slate-50 pb-4 mb-4">
              <CardTitle>Reports Archive</CardTitle>
              <CardDescription>Retrieve previously generated PDF summaries.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.length > 0 ? (
                  reports.map((rep) => (
                    <div 
                      key={rep.id} 
                      className="p-4 bg-slate-50/60 border border-slate-100 hover:border-forest-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex gap-3.5 min-w-0">
                        <div className="p-3 bg-forest-50 border border-forest-100 rounded-xl text-forest-600 shrink-0">
                          <FileText className="h-5.5 w-5.5" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-bold text-slate-800 text-sm truncate leading-snug">{rep.disease_name}</h5>
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-slate-400 font-semibold mt-1">
                            <span>ID: {rep.id}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(rep.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                        <div className="text-right hidden sm:block">
                          <span className="text-[10px] text-slate-400 font-bold block">{(rep.confidence_score * 100).toFixed(1)}%</span>
                          <span className="text-[9px] text-forest-600 font-bold block mt-0.5">{rep.crop_type}</span>
                        </div>
                        
                        <Button
  variant="outline"
  size="sm"
  className="p-2 h-9 w-9 rounded-xl hover:bg-forest-50 hover:text-forest-600 hover:border-forest-200"
  onClick={() => handleDownload(rep)}
>
  <Download className="h-4.5 w-4.5" />
</Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="p-2 h-9 w-9 rounded-xl border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200"
                          onClick={() => handleDelete(rep.id)}
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 rounded-2xl border border-slate-100 bg-white/60">
                    <FileText className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-800 text-sm">No Reports Found</h4>
                    <p className="text-xs text-slate-400 mt-1">Compile a new report using the form on the left.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};
