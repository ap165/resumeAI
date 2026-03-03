import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Resume Builder", to: "/resume-builder" },
  { label: "ATS Score Checker", to: "/ats-score-checker" },
  { label: "About", to: "/about" },
];

const Navbar = ({ logo = "ResumeAI" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
        >
          {isMenuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            R
          </span>
          {logo}
        </Link>

        <nav className="mx-auto hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 p-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive ? "bg-white text-indigo-700 shadow-sm" : "text-slate-700 hover:bg-white hover:text-indigo-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 md:inline-flex"
          >
            Sign in
          </button>
          <button
            type="button"
            className="hidden rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 md:inline-flex"
          >
            Get started
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
              Sign in
            </button>
            <button type="button" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
              Get started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
