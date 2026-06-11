import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { ScrollToTop } from "../components/ScrollToTop";

export const RootLayout: React.FC = () => {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <ScrollToTop />

      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
      {!hideFooter && <MobileBottomNav />}
    </div>
  );
};