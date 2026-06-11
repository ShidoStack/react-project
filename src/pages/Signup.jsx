import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/common/Icon.jsx';
import logo from '../assets/screen.png';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Simulate signup
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-3">
          <img src={logo} alt="MehfilX" className="h-12 w-12 rounded-xl object-contain shadow-sm" />
          <span className="text-3xl font-extrabold tracking-tight text-on-surface">MehfilX</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-on-surface">Create your account</h2>
        <p className="mt-2 text-center text-sm text-outline">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-indigo hover:text-indigo-500">
            Log In
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-on-surface">Full Name</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="person" className="text-gray-400" style={{ fontSize: 18 }} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-surface text-sm focus:bg-white focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo transition outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface">Email address</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="mail" className="text-gray-400" style={{ fontSize: 18 }} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-surface text-sm focus:bg-white focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo transition outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface">Password</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="lock" className="text-gray-400" style={{ fontSize: 18 }} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-surface text-sm focus:bg-white focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo transition outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface">Confirm Password</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="lock_outline" className="text-gray-400" style={{ fontSize: 18 }} />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-surface text-sm focus:bg-white focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo transition outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-brand-indigo focus:ring-brand-indigo border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-outline">
                I agree to the <a href="#" className="font-semibold text-brand-indigo">Terms</a> and <a href="#" className="font-semibold text-brand-indigo">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex justify-center py-3.5 px-4 rounded-xl text-sm"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500 text-xs font-semibold uppercase tracking-wider">or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex justify-center items-center gap-2 w-full py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-bold text-on-surface-variant hover:bg-gray-50 transition">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
                Google
              </button>
              <button className="flex justify-center items-center gap-2 w-full py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-bold text-on-surface-variant hover:bg-gray-50 transition">
                <Icon name="apple" style={{ fontSize: 20 }} className="text-black" />
                Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
