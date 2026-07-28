import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  className = ''
}) => {
  const styles = {
    info: 'bg-blue-50/60 border-blue-200/50 text-blue-800',
    success: 'bg-forest-50/60 border-forest-200/50 text-forest-800',
    warning: 'bg-amber-50/60 border-amber-200/50 text-amber-800',
    error: 'bg-red-50/60 border-red-200/50 text-red-800'
  };

  const icons = {
    info: <Info className="h-5 w-5 text-blue-500 shrink-0" />,
    success: <CheckCircle className="h-5 w-5 text-forest-500 shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
  };

  return (
    <div className={`flex gap-3 p-4 rounded-2xl border backdrop-blur-xs ${styles[variant]} ${className}`}>
      {icons[variant]}
      <div className="flex-1">
        {title && <h5 className="font-bold text-sm leading-tight mb-1">{title}</h5>}
        <div className="text-xs font-medium leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
};
