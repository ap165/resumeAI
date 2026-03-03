import React, { useState } from "react";

// Usage:
// - Drop this file into your React project (e.g. src/components/Navbar.jsx)
// - Requires Tailwind CSS configured in your project
// - Swap <a> tags to react-router <Link> if you use react-router

export default function Navbar({ logo = "ResumeAI" }) {
  const [open, setOpen] = useState(false);

  const LINKS = [
    { name: "Home", href: "#home" },
    { name: "Resume Builder", href: "#builder" },
    { name: "ATS Score Checker", href: "#ats" },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="bg-white/70 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center">
          {/* Mobile: menu button on left */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {/* Menu Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Logo - centered on mobile, left on desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:left-0 flex items-center">
            <a href="/" className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 14l3-3 3 3 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline-block">{logo}</span>
            </a>
          </div>

          {/* Desktop nav - center */}
          <nav className="hidden md:flex md:flex-1 md:justify-center" aria-label="Main navigation">
            <ul className="flex items-center space-x-8">
              {LINKS.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right actions */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 md:static md:ml-4 md:flex md:items-center md:gap-4">
            <a
              href="#signin"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-md border border-transparent bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
              Sign in
            </a>

            {/* small signin icon on mobile */}
            <a
              href="#signin"
              className="md:hidden inline-flex items-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Sign in"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 12H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay / drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* backdrop */}
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <aside className="relative w-72 max-w-xs h-full bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 14l3-3 3 3 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-semibold">{logo}</span>
              </div>

              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {/* Close Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <nav className="mt-8" aria-label="Mobile navigation">
              <ul className="flex flex-col gap-4">
                {LINKS.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block text-base font-medium text-gray-800 py-2 rounded-md hover:bg-gray-50"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 border-t pt-4">
              <a
                href="#signin"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md border border-transparent bg-indigo-600 text-white font-medium hover:bg-indigo-700"
              >
                Sign in
              </a>
            </div>

            {/* optional: add other actions */}
          </aside>
        </div>
      )}
    </header>
  );
}
