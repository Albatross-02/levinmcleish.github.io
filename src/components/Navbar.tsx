import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import useClickSound from '../hooks/useClickSound';

const links = [
  { label: 'About', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Certification', href: '#certification' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const playClick = useClickSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    playClick(); // 🔥 sound here
    setActive(href);
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-[rgba(0,191,255,0.12)] py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => handleNav('#hero')}
          className="font-display text-xl tracking-widest text-gradient"
          style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}
        >
          LEVIN<span className="text-white opacity-40">.</span>MCLEISH
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className={`relative text-sm tracking-wider transition-all duration-300 group ${
                active === href
                  ? 'text-[#00bfff]'
                  : 'text-slate-400 hover:text-[#00bfff]'
              }`}
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#00bfff] to-[#00ffff] transition-all duration-300 ${
                  active === href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-[#00bfff] transition-colors"
          onClick={() => {
            playClick(); // 🔥 sound for menu toggle
            setOpen(!open);
          }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden glass border-t border-[rgba(0,191,255,0.1)] mt-2">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className="text-left text-slate-300 hover:text-[#00bfff] transition-colors text-base tracking-wider"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}