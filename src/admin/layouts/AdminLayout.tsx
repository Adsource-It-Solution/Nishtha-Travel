import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full rounded-lg shadow-xl
          w-72 bg-white border-r border-slate-200
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex-shrink-0
        `}
            >
                <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 min-h-screen">

                {/* Header */}
                <div className="sticky top-0 z-30 bg-white border-b border-slate-200">

                    <div className="flex items-center h-16 px-4">

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden mr-4 rounded-lg p-2 hover:bg-slate-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <Header />

                    </div>

                </div>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}