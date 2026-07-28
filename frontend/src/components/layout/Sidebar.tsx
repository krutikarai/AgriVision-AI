import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Scan, 
  History, 
  Sparkles, 
  FileText, 
  User, 
  Settings, 
  LogOut, 
  Sprout
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const sidebarLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Disease Detection', path: '/disease-detection', icon: <Scan className="h-5 w-5" /> },
    { label: 'Scan History', path: '/history', icon: <History className="h-5 w-5" /> },
    { label: 'AI Treatment Assistant', path: '/treatment', icon: <Sparkles className="h-5 w-5" /> },
    { label: 'Agronomy Reports', path: '/reports', icon: <FileText className="h-5 w-5" /> },
    { label: 'Farmer Profile', path: '/profile', icon: <User className="h-5 w-5" /> },
    { label: 'System Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-68 h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4.5 text-slate-400 shrink-0">
      <div className="space-y-8">
        
        {/* Brand/Logo */}
        <div className="flex items-center gap-2.5 px-3 py-2 text-white font-bold text-lg tracking-tight">
          <Sprout className="h-6 w-6 text-lightgreen-400 shrink-0 animate-bounce" />
          <span>AgriVision <span className="text-lightgreen-400">AI</span></span>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-1.5">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-forest-600 text-white shadow-md shadow-forest-600/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User profile & Logout */}
      <div className="border-t border-slate-800/80 pt-4.5 space-y-4">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="h-10 w-10 rounded-full border border-slate-700 bg-slate-800 object-cover"
            />
            <div className="min-w-0 flex-1">
              <h5 className="font-bold text-white text-sm truncate leading-tight">{user.fullName}</h5>
              <span className="text-xs text-slate-500 truncate block mt-0.5">{user.email}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
