import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'dark' | 'outline';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'glass', 
  ...props 
}) => {
  const baseStyle = 'rounded-3xl p-6 transition-all duration-300';
  
  const variants = {
    glass: 'glass-card',
    dark: 'glass-card-dark text-slate-100 bg-forest-950/80 border-forest-900/20',
    outline: 'border border-slate-100 bg-white shadow-sm hover:shadow-md'
  };

  return (
    <div 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>{children}</div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-bold tracking-tight text-slate-900 ${className}`} {...props}>{children}</h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-slate-500 mt-1 ${className}`} {...props}>{children}</p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>{children}</div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`mt-6 flex items-center ${className}`} {...props}>{children}</div>
);
