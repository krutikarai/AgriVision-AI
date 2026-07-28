import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from './Sidebar';
import { Menu, X, Bell, User, LogOut, Sprout } from 'lucide-react';
import { Card } from '../ui';

export const Layout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#fafdfb]">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-forest-600"></div>
          <Sprout className="h-6 w-6 text-forest-600 absolute animate-pulse" />
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-500">Preparing AgriVision Workspace...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Generate page heading text based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'Dashboard Overview';
    if (path.startsWith('/disease-detection')) return 'Disease Detection';
    if (path.startsWith('/history')) return 'Scan History';
    if (path.startsWith('/treatment')) return 'AI Treatment Assistant';
    if (path.startsWith('/reports')) return 'Agronomy Reports';
    if (path.startsWith('/profile')) return 'Farmer Profile';
    if (path.startsWith('/settings')) return 'System Settings';
    return 'AgriVision AI';
  };

  const mockNotifications = [
    { id: 1, text: 'Tomato Late Blight treatment plan generated.', time: '10m ago', unread: true },
    { id: 2, text: 'System update: Upgraded YOLO v11 model weights.', time: '2h ago', unread: false },
    { id: 3, text: 'Weekly Agronomy report ready for download.', time: '1d ago', unread: false }
  ];

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#fafdfb] bg-mesh">
      
      {/* Desktop Sidebar (visible md and up) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar overlay/drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Sidebar Drawer */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 border-r border-slate-800 animate-slideRight">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4.5 right-4.5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="h-full pt-4">
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
     <div className="flex-1 flex flex-col min-w-0 overflow-visible">
        
        {/* Top Header */}
        <header className="h-18 bg-white/70 backdrop-blur-md border-b border-slate-100/80 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger for mobile */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center gap-4">
            
            
            <DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <button className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100/60 relative text-slate-600 transition-colors">
      <Bell className="h-5 w-5" />

      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-forest-600 animate-ping"></span>
      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-forest-600"></span>
    </button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal>
    <DropdownMenu.Content
      sideOffset={8}
      align="end"
      className="z-[99999] w-80 rounded-3xl bg-white border border-slate-100 p-2.5 shadow-2xl"
    >
      <div className="px-3 py-2 border-b border-slate-100 mb-2 flex justify-between items-center">
        <span className="font-bold text-slate-800 text-sm">
          Notifications
        </span>

        <button className="text-xs text-forest-600 hover:underline">
          Mark all read
        </button>
      </div>

      <div className="space-y-2">
        {mockNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`rounded-xl p-3 text-xs ${
              notif.unread
                ? "bg-forest-50"
                : "hover:bg-slate-50"
            }`}
          >
            <p
              className={`${
                notif.unread ? "font-semibold" : ""
              } text-slate-700`}
            >
              {notif.text}
            </p>

            <span className="text-[10px] text-slate-400">
              {notif.time}
            </span>
          </div>
        ))}
      </div>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>

            {/* Quick avatar link */}
            <Link to="/profile">
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="h-9 w-9 rounded-full border border-slate-200 bg-forest-50 object-cover hover:border-forest-400 transition-colors"
              />
            </Link>
          </div>
        </header>

        {/* Main nested route views */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
