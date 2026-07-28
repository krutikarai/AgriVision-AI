import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Alert } from '../components/ui';
import { Bell, ShieldCheck, HelpCircle, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [model, setModel] = useState('yolov11-std');
  const [units, setUnits] = useState('metric');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    setSuccess(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <form onSubmit={handleSave}>
          <CardHeader className="border-b border-slate-50 pb-4 mb-4">
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Adjust your scanning parameters and dashboard metrics.</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            
            {success && (
              <Alert variant="success" title="Settings Saved">
                Your configurations have been successfully updated.
              </Alert>
            )}

            {/* AI Diagnostics Configuration */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-forest-600" />
                AI Model Weights
              </h4>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 pl-1 block">Active Classification Network</label>
                <select
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    setSuccess(false);
                  }}
                  className="w-full px-4 py-3 glass-input text-slate-800 text-xs focus:ring-2 focus:ring-forest-500/20"
                >
                  <option value="yolov11-std">YOLOv11 Standard (Recommended - Fast & Lightweight)</option>
                  <option value="yolov11-lrg">YOLOv11 Large (Accurate - Slower processing)</option>
                  <option value="efficientnet">EfficientNet-B4 (Foliage Classification Specialist)</option>
                </select>
                <span className="text-[10px] text-slate-400 font-medium pl-1 block leading-normal">
                  Large weights improve diagnosis confidence intervals by ~1.2% but increase latency during leaf analysis.
                </span>
              </div>
            </div>

            {/* General parameters */}
            <div className="space-y-4 border-t border-slate-50 pt-5">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Save className="h-4.5 w-4.5 text-forest-600" />
                Regional Parameters
              </h4>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 pl-1 block">Measurement Units</label>
                <div className="flex gap-4 pl-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="units"
                      value="metric"
                      checked={units === 'metric'}
                      onChange={() => {
                        setUnits('metric');
                        setSuccess(false);
                      }}
                      className="accent-forest-600"
                    />
                    Metric (Hectares, Celsius, kg)
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="units"
                      value="imperial"
                      checked={units === 'imperial'}
                      onChange={() => {
                        setUnits('imperial');
                        setSuccess(false);
                      }}
                      className="accent-forest-600"
                    />
                    Imperial (Acres, Fahrenheit, lbs)
                  </label>
                </div>
              </div>
            </div>

            {/* Email Alerts */}
            <div className="space-y-4 border-t border-slate-50 pt-5">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Bell className="h-4.5 w-4.5 text-forest-600" />
                Notification Preferences
              </h4>

              <div className="space-y-3 pl-1">
                <label className="flex items-center gap-3 text-xs font-bold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => {
                      setEmailAlerts(e.target.checked);
                      setSuccess(false);
                    }}
                    className="h-4 w-4 rounded border-slate-300 text-forest-600 focus:ring-forest-500 accent-forest-600"
                  />
                  <span>Email me immediately when an infected scan is registered</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-bold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={weeklyReports}
                    onChange={(e) => {
                      setWeeklyReports(e.target.checked);
                      setSuccess(false);
                    }}
                    className="h-4 w-4 rounded border-slate-300 text-forest-600 focus:ring-forest-500 accent-forest-600"
                  />
                  <span>Email me weekly agronomy summaries</span>
                </label>
              </div>
            </div>

          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full sm:w-auto font-bold" isLoading={isLoading}>
              Save Settings
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
