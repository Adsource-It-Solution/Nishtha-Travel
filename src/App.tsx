import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Import new extension pages
import { CabsPage } from './pages/CabsPage';
import { CabDetailsPage } from './pages/CabDetailsPage';
import { TrainsPage } from './pages/TrainsPage';
import { LoginPage } from './pages/LoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

import './App.css';
import { HolidayDetails } from './components/HolidayDetails';

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
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
