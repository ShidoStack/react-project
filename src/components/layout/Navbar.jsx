import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/screen.png';
import Icon from '../common/Icon.jsx';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Explore Events', to: '/events' },
  { label: 'Venues', to: '/venues' },
];

export default function Navbar() {
  return (
    <header className="nav-glass fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 md:px-10">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-3" aria-label="MehfilX home">
            <img src={logo} alt="MehfilX logo" className="h-10 w-10 rounded-xl object-contain" />
            <span className="hidden text-2xl font-extrabold tracking-tight text-on-surface sm:block">MehfilX</span>
          </NavLink>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-link text-sm font-semibold ${isActive ? 'nav-link-active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">

          <Link to="/login" className="hidden text-sm font-semibold text-on-surface-variant transition hover:text-brand-indigo sm:inline-flex">
            Log In
          </Link>
          <Link to="/signup" className="btn-primary rounded-full px-6 py-2.5 text-sm font-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
