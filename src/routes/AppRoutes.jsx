import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import EventDiscovery from '../pages/EventDiscovery.jsx';
import EventDetails from '../pages/EventDetails.jsx';
import SeatSelection from '../pages/SeatSelection.jsx';
import Checkout from '../pages/Checkout.jsx';
import BookingSuccess from '../pages/BookingSuccess.jsx';
import VenueDiscovery from '../pages/VenueDiscovery.jsx';
import VenueDetail from '../pages/VenueDetail.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventDiscovery />} />
      <Route path="/events/:slug" element={<EventDetails />} />
      <Route path="/events/:slug/seats" element={<SeatSelection />} />
      <Route path="/events/:slug/checkout" element={<Checkout />} />
      <Route path="/events/:slug/success" element={<BookingSuccess />} />
      <Route path="/venues" element={<VenueDiscovery />} />
      <Route path="/venues/:id" element={<VenueDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
