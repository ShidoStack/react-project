import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/screen.png';
import Icon from '../common/Icon.jsx';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Explore Events', to: '/events' },
  { label: 'Venues', to: '/venues' },
];

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="nav-glass fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 md:px-10">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-3" aria-label="MehfilX home">
            <img src={logo} alt="MehfilX logo" className="h-10 w-10 rounded-xl object-contain" />
            <span className="hidden text-2xl font-extrabold tracking-tight text-[#1a1c1d] sm:block">MehfilX</span>
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
          <label className={`relative hidden items-center transition-all duration-300 lg:flex ${searchFocused ? 'w-64' : 'w-48'}`}>
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777587]" style={{ fontSize: 18 }} />
            <input
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full rounded-full border border-gray-200 bg-white/50 py-2 pl-10 pr-4 text-sm font-medium outline-none transition focus:border-[#3730a3] focus:bg-white focus:ring-1 focus:ring-[#3730a3]"
              placeholder="Search events, venues..."
              aria-label="Quick search"
            />
          </label>
          <button type="button" className="hidden text-sm font-semibold text-[#464555] transition hover:text-[#3730a3] sm:inline-flex">
            Log In
          </button>
          <button type="button" className="btn-primary rounded-full px-6 py-2.5 text-sm font-semibold">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
