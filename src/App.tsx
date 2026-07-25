import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { FlightBookingPage } from './pages/FlightBookingPage';
import { HotelBookingPage } from './pages/HotelBookingPage';
import { HolidayPackagesPage } from './pages/HolidayPackagesPage';
import { DestinationDetailsPage } from './pages/DestinationDetailsPage';
import { PackageDetailsPage } from './pages/PackageDetailsPage';
import { HotelDetailsPage } from './pages/HotelDetailsPage';
import { BlogDetailsPage } from './pages/BlogDetailsPage';
import { UserDashboard } from './pages/UserDashboard';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { CabsPage } from './pages/CabsPage';
import { CabDetailsPage } from './pages/CabDetailsPage';
import { TrainsPage } from './pages/TrainsPage';
import { LoginPage } from './pages/LoginPage';
import { AdminLoginPage } from './admin/pages/AdminLoginPage.tsx';
import { AdminDashboard } from './admin/pages/AdminDashboard.tsx';

import AdminLayout from "./admin/layouts/AdminLayout";

import Flights from "./admin/pages/Flights";
import Hotels from "./admin/pages/Hotels";
import Bookings from "./admin/pages/Bookings";
import HolidayPackages from "./admin/pages/HolidayPackages";
import Destinations from "./admin/pages/Destinations";
import Cabs from "./admin/pages/Cabs";
import Drivers from "./admin/pages/Drivers";
import Trains from "./admin/pages/Trains";
import Customers from "./admin/pages/Customers";
import Enquiries from "./admin/pages/Enquiries";
import Blogs from "./admin/pages/Blogs";
import Gallery from "./admin/pages/Gallery";
import Reports from "./admin/pages/Reports";
import Notifications from "./admin/pages/Notifications";
import Settings from "./admin/pages/Settings";
import Profile from "./admin/pages/Profile";

import './App.css';
import { HolidayDetails } from './components/HolidayDetails';
import Offers from './admin/pages/Offers.tsx';
import Payments from './admin/pages/Payments.tsx';
import ProtectedAdminRoute from './admin/services/AdminProtectedRoute.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="flights" element={<FlightBookingPage />} />
          <Route path="hotels" element={<HotelBookingPage />} />
          <Route path="packages" element={<HolidayPackagesPage />} />
          <Route path="destination/:id" element={<DestinationDetailsPage />} />
          <Route path="package/:id" element={<PackageDetailsPage />} />
          <Route path="hotel/:id" element={<HotelDetailsPage />} />
          <Route path="journal/:id" element={<BlogDetailsPage />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="holiday-itinerary/:id" element={<HolidayDetails />} />

          {/* New extension routes */}
          <Route path="cabs" element={<CabsPage />} />
          <Route path="cab/:id" element={<CabDetailsPage />} />
          <Route path="trains" element={<TrainsPage />} />

          {/* Auth and Admin routes */}
          <Route path="login" element={<LoginPage />} />
        </Route>
        {/* Admin Login (No Sidebar/Header) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="flights" element={<Flights />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="packages" element={<HolidayPackages />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="cabs" element={<Cabs />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="trains" element={<Trains />} />
            <Route path="customers" element={<Customers />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="reports" element={<Reports />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="offers" element={<Offers />} />
            <Route path="payments" element={<Payments />} />

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
