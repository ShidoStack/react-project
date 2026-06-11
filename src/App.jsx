import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function AppShell() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f9f9fa] text-[#1a1c1d]">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
