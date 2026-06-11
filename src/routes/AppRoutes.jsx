import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import EventDiscovery from '../pages/EventDiscovery.jsx';
import EventDetails from '../pages/EventDetails.jsx';
import SeatSelection from '../pages/SeatSelection.jsx';
import VenueDiscovery from '../pages/VenueDiscovery.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventDiscovery />} />
      <Route path="/events/:slug" element={<EventDetails />} />
      <Route path="/events/:slug/seats" element={<SeatSelection />} />
      <Route path="/venues" element={<VenueDiscovery />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
