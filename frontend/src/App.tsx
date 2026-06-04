import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import OffersPage from "./pages/OffersPage";
import OffersListPage from "./pages/OffersListPage";
import BookingPage from "./pages/BookingPage";
import BookingsPage from "./pages/BookingsPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import BusinessProfilePage from "./pages/BusinessProfilePage";
import OfferDetailPage from "./pages/OfferDetailPage";
import SlotsPage from "./pages/SlotsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/active-offers" element={<OffersListPage />} />
        <Route path="/booking/:offerId" element={<BookingPage />} />
        <Route
          path="/booking-success"
          element={<BookingSuccessPage />}
        />
        <Route path="/business-profile" element={<BusinessProfilePage />} />
        <Route path="/offer/:id" element={<OfferDetailPage />} />
        <Route path="/slots" element={<SlotsPage />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;