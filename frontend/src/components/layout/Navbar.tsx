import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sprout, Menu, X, Bell, User, LogOut, ChevronDown, Settings } from 'lucide-react';
import { Button } from '../ui';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isAuthRoute = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || 
                           location.pathname.startsWith('/disease-detection') ||
                           location.pathname.startsWith('/history') ||
                           location.pathname.startsWith('/treatment') ||
                           location.pathname.startsWith('/reports') ||
                           location.pathname.startsWith('/profile') ||
                           location.pathname.startsWith('/settings');

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileDropdownOpen(false);
  };

  // If inside the dashboard layout, the top bar is managed differently by Layout.tsx.
  // This navbar is for the landing/public pages.
  if (isDashboardRoute) return null;

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100/80">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-slate-900 font-bold text-xl tracking-tight">
          <Sprout className="h-6.5 w-6.5 text-forest-600 animate-pulse" />
          <span>AgriVision <span className="text-forest-600">AI</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive 
                    ? 'text-forest-600' 
                    : 'text-slate-600 hover:text-forest-500'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 transition-all text-slate-700 font-medium"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="h-8.5 w-8.5 rounded-full border border-slate-100 bg-forest-50 object-cover"
                />
                <span className="text-sm">{user.fullName}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-100 p-2 shadow-xl ring-1 ring-black/5 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-slate-50 mb-1">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:text-forest-700 hover:bg-forest-50 rounded-xl transition-all"
                  >
                    <Sprout className="h-4.5 w-4.5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:text-forest-700 hover:bg-forest-50 rounded-xl transition-all"
                  >
                    <User className="h-4.5 w-4.5" />
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {!isAuthRoute && (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm">Get Started</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-6 py-6 space-y-4 animate-slideDown absolute top-18 left-0 right-0 z-30 shadow-lg">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-700 hover:text-forest-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="h-10 w-10 rounded-full border border-slate-100 object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-slate-800 leading-tight">{user.fullName}</h5>
                    <span className="text-xs text-slate-400">{user.email}</span>
                  </div>
                </div>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Go to Dashboard</Button>
                </Link>
                <Button variant="danger" className="w-full" onClick={handleLogout}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
