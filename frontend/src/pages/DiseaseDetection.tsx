import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Alert } from '../components/ui';
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  BrainCircuit, 
  Sparkles, 
  FileText, 
  RefreshCw,
  Scan,
  Camera,
  Layers,
  ArrowLeftRight,
  ShieldCheck,
  Video
} from 'lucide-react';
import { api } from '../services/api';

export const DiseaseDetection: React.FC = () => {
  const [crop, setCrop] = useState('tomato');
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Camera capture states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  // Scanning & API States
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // API response results
  const [results, setResults] = useState<{
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
  } | null>(null);

  // Slider position (0 - 100) for side-by-side comparison
  const [sliderPosition, setSliderPosition] = useState(50);

  // Drag and Drop handlers
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    setError(null);
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Unsupported file type. Please upload a JPEG, JPG, PNG, or WEBP image.');
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setResults(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  // Camera integration
  const startCamera = async () => {
    setError(null);
    setIsCameraActive(true);
    setImagePreview(null);
    setImageFile(null);
    setResults(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access failed: ", err);
      setError("Could not access camera. Please verify permission settings.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            setImageFile(blob);
            setImagePreview(URL.createObjectURL(blob));
            stopCamera();
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const triggerScan = async () => {
    if (!imageFile) return;
    setIsScanning(true);
    setError(null);
    setResults(null);

    // Dynamic loader steps
    const loaderSteps = [
      { p: 15, text: 'Preprocessing image contours...' },
      { p: 40, text: 'Segmenting green leaf from background...' },
      { p: 70, text: 'Executing YOLOv11 foliage networks...' },
      { p: 90, text: 'Calculating necrotic spot indices...' },
      { p: 100, text: 'Formulating generative agronomy guidelines...' }
    ];

    try {
      // Animated loader run
      for (const step of loaderSteps) {
        setScanProgress(step.p);
        setScanStep(step.text);
        await new Promise((resolve) => setTimeout(resolve, 350));
      }

      // API Call to FastAPI CV endpoint
      const res = await api.uploadScan(imageFile, crop);
      setResults(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to complete analysis. Verify backend is active.');
    } finally {
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setImageFile(null);
    setImagePreview(null);
    setResults(null);
    setScanProgress(0);
    setScanStep('');
    setError(null);
  };
  
  const downloadPDF = async () => {
  if (!reportRef.current) return;

  try {
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`${results?.disease_name || "Leaf_Diagnosis_Report"}.pdf`);
  } catch (err) {
    console.error(err);
    alert("Failed to generate PDF.");
  }
};

  // Format backend server absolute URLs
  const getAbsoluteUrl = (urlPath: string) => {
    if (!urlPath) return '';
    return `http://localhost:8000${urlPath}`;
  };

  return (
   <div className="space-y-6" ref={reportRef}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Control Panel */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader className="border-b border-slate-50 pb-4 mb-4">
              <CardTitle>AI Diagnostic Input</CardTitle>
              <CardDescription>Upload crop leaf photos to run the segmentation pipeline.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {error && (
                <Alert variant="error" title="Analysis Error">
                  {error}
                </Alert>
              )}

              {/* Crop selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 pl-1">Target Crop</label>
                <select
                  value={crop}
                  onChange={(e) => {
                    setCrop(e.target.value);
                    setResults(null);
                  }}
                  className="w-full px-4 py-3 glass-input text-slate-800 text-sm focus:ring-2 focus:ring-forest-500/20"
                  disabled={isScanning || isCameraActive}
                >
                  <option value="tomato">Tomato (Solanum lycopersicum)</option>
                  <option value="potato">Potato (Solanum tuberosum)</option>
                  <option value="apple">Apple (Malus domestica)</option>
                  <option value="general">Other / General Variety</option>
                </select>
              </div>

              {/* Interactive Upload Room */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-semibold text-slate-700">Source Image</label>
                  {!isCameraActive && !imagePreview && (
                    <button
                      onClick={startCamera}
                      className="text-xs font-bold text-forest-600 hover:text-forest-700 flex items-center gap-1 hover:underline"
                    >
                      <Camera className="h-3.5 w-3.5" />
                      Use Live Camera
                    </button>
                  )}
                </div>

                {/* Case 1: Active camera webcam stream */}
                {isCameraActive && (
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-black aspect-[4/3] flex items-center justify-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                      <Button variant="danger" size="sm" onClick={stopCamera}>
                        Cancel
                      </Button>
                      <Button variant="secondary" size="sm" className="font-bold" onClick={capturePhoto}>
                        Capture Photo
                      </Button>
                    </div>
                  </div>
                )}

                {/* Case 2: No image, show drag & dropzone */}
                {!isCameraActive && !imagePreview && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-dashed border-2 rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative group ${
                      isDragOver ? 'border-forest-500 bg-forest-50/20' : 'border-slate-200 hover:border-forest-500 hover:bg-forest-50/10'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="h-10 w-10 text-slate-400 group-hover:text-forest-600 transition-colors mb-3" />
                    <h5 className="font-bold text-slate-800 text-sm">Drag leaf image here</h5>
                    <p className="text-[10px] text-slate-400 mt-1">or click to browse filesystem</p>
                    <p className="text-[9px] text-slate-400 opacity-80 mt-2 uppercase font-bold">JPG, PNG, JPEG</p>
                  </div>
                )}

                {/* Case 3: Image snaped/loaded preview */}
                {!isCameraActive && imagePreview && (
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50 aspect-[4/3]">
                    <img
                      src={imagePreview}
                      alt="Crop leaf preview"
                      className="w-full h-full object-cover"
                    />
                    {!isScanning && (
                      <button
                        onClick={resetScan}
                        className="absolute top-3 right-3 p-2 bg-red-600/90 hover:bg-red-700 text-white rounded-xl shadow-lg transition-colors"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Action Trigger Buttons */}
              {imageFile && !results && !isScanning && (
                <Button 
                  onClick={triggerScan}
                  className="w-full gap-2 font-bold shadow-md shadow-forest-600/10"
                >
                  <Scan className="h-4.5 w-4.5" />
                  Analyze Foliage Image
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Diagnostic Load bar overlay */}
          {isScanning && (
            <Card className="bg-forest-950 text-white p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-lightgreen-400 uppercase tracking-widest">Segmentation Pipeline Active</span>
                <span className="text-xs font-black text-lightgreen-400">{scanProgress}%</span>
              </div>
              
              <div className="w-full bg-forest-900 rounded-full h-2">
                <div 
                  className="bg-lightgreen-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <RefreshCw className="h-4 w-4 text-lightgreen-400 animate-spin" />
                <span className="text-[11px] text-forest-100 font-medium leading-none">{scanStep}</span>
              </div>
            </Card>
          )}
        </div>

        {/* Right Bounding-box comparison & Results view */}
        <div className="lg:col-span-7">
          {results ? (
            <div className="space-y-6">
              
              {/* Dynamic comparison slider overlay */}
              <Card className="p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-3.5">
                  <Layers className="h-4.5 w-4.5 text-forest-600" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">AI Highlight Bounding Boxes</span>
                </div>
                
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 select-none">
                  {/* Base original image */}
                  <img
                    src={getAbsoluteUrl(results.image_url)}
                    alt="Original Uploaded Leaf"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />

                  {/* Clipped overlay processed/highlighted image */}
                  <div 
                    className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={getAbsoluteUrl(results.highlighted_image_url)}
                      alt="Highlighted Bounding Boxes"
                      className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>

                  {/* Vertical separator line */}
                  <div 
                    className="absolute inset-y-0 w-0.5 bg-white shadow-2xl z-10 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-forest-600 text-white border-2 border-white flex items-center justify-center shadow-lg">
                      <ArrowLeftRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Invisible range slider input to manipulate positioning */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>
                
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-3.5 px-1">
                  <span>← Swipe Left for Highlighted Spots</span>
                  <span>Original Image (Right) →</span>
                </div>
              </Card>

              {/* Severity & Classification scores */}
              <Card className="shadow-lg border-forest-100 bg-[#f6fbf8]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-forest-100/50 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] text-forest-600 font-bold uppercase tracking-wider">Detection Verdict</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">{results.disease_name}</h3>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-forest-600 text-white px-3.5 py-2 rounded-2xl flex flex-col items-center shadow-md">
                      <span className="text-[9px] font-bold uppercase opacity-80 leading-none">Confidence</span>
                      <span className="text-base font-black leading-none mt-1">{(results.confidence_score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="bg-red-600 text-white px-3.5 py-2 rounded-2xl flex flex-col items-center shadow-md">
                      <span className="text-[9px] font-bold uppercase opacity-80 leading-none">Severity</span>
                      <span className="text-base font-black leading-none mt-1">{(results.severity * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-semibold text-slate-700">
                  <div className="space-y-1">
                    <h5 className="text-slate-800 font-bold flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-slate-500" />
                      Possible Causes:
                    </h5>
                    <p className="text-slate-500 font-medium leading-relaxed pl-5.5">
                      {results.possible_causes}
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-forest-100/30 pt-3.5">
                    <h5 className="text-slate-800 font-bold flex items-center gap-1.5">
                      <BrainCircuit className="h-4 w-4 text-slate-500" />
                      AI Recommended Next Steps:
                    </h5>
                    <div className="pl-5.5 text-slate-500 font-medium leading-relaxed whitespace-pre-line">
                      {results.recommended_steps}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Action buttons */}
              <Card className="shadow-lg">
                <CardContent className="flex flex-wrap gap-4.5 justify-end">
                  <Button variant="outline" size="sm" className="font-bold" onClick={resetScan}>
                    Start New Scan
                  </Button>
                  <Button
    variant="primary"
    size="sm"
    className="gap-1.5 font-bold shadow-md"
    onClick={downloadPDF}
>
    <FileText className="h-4 w-4" />
    Download PDF Report
</Button>
                </CardContent>
              </Card>

            </div>
          ) : (
            <div className="h-full min-h-[400px] rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-8 bg-slate-50/20">
              <ImageIcon className="h-10 w-10 text-slate-300 mb-2" />
              <h4 className="font-bold text-slate-800 text-sm">Awaiting Foliage Upload</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Feed leaf frames via drag & drop, file browse, or live webcam, then press analyze. AI segmentations and bounding box highlights will show here.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
