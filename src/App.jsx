import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function AppShell() {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="relative min-h-screen overflow-x-hidden text-on-surface">
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none" style={{ zIndex: -2 }} />
      {!hideNavFooter && <Navbar />}
      <AppRoutes />
      {!hideNavFooter && <Footer />}
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
