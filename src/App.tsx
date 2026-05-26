import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { FlightBookingPage } from './pages/FlightBookingPage';
import { HotelBookingPage } from './pages/HotelBookingPage';
import { HolidayPackagesPage } from './pages/HolidayPackagesPage';
import { DestinationDetailsPage } from './pages/DestinationDetailsPage';
import { UserDashboard } from './pages/UserDashboard';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { VisaPage } from './pages/VisaPage';
import './App.css';

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
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="visa" element={<VisaPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
