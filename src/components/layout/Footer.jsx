import { Link } from 'react-router-dom';

const columns = [
  ['Discover', ['Concerts', 'Stand-up Comedy', 'Festivals', 'Classical Music', 'Jazz & Blues']],
  ['Cities', ['Mumbai', 'Delhi NCR', 'Bangalore', 'Pune', 'Hyderabad']],
  ['Company', ['About Us', 'Careers', 'Blog', 'Press Kit']],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080808] px-5 py-12 text-white md:px-10 md:py-16">
      <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex text-2xl font-black tracking-tight text-white transition-colors duration-200 hover:text-indigo-400">
            MehfilX
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
            Every great night starts with a Mehfil. Discover, book, and experience India's finest live events.
          </p>
        </div>
        {columns.map(([title, links]) => (
          <div key={title}>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/35">{title}</h3>
            <div className="grid gap-3 text-sm text-white/45">
              {links.map((link) => (
                <a key={link} href="#" className="transition-colors duration-200 hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-[1280px] flex-col gap-4 border-t border-white/5 pt-6 text-xs text-white/30 md:flex-row md:items-center md:justify-between">
        <p>© 2025 MehfilX Technologies Pvt. Ltd. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          <a href="#privacy" className="transition-colors duration-200 hover:text-white">Privacy Policy</a>
          <a href="#terms" className="transition-colors duration-200 hover:text-white">Terms of Use</a>
          <a href="#cookies" className="transition-colors duration-200 hover:text-white">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}

