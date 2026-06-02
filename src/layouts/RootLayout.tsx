import React from 'react';
import { Outlet } from 'react-router-dom';
// import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { ScrollToTop } from '../components/ScrollToTop';

export const RootLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <ScrollToTop />
      {/* <Navbar /> */}
      
      {/* Page Content */}
      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};
