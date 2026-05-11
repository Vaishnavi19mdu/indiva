import { Logo } from "./logo";
import { motion } from "motion/react";
import { useState } from "react";
import { Menu, X, ChevronLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showBack = location.pathname !== "/";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/community", label: "Community" },
    { href: "/volunteer", label: "Volunteer" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-[#71648C]/10 px-6 py-3 flex items-center justify-between">
          {/* Left side: back button + logo */}
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-[#71648C] hover:text-[#5d5373] transition-colors mr-1"
                style={{ fontWeight: 500 }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Back</span>
              </button>
            )}
            <Link to="/" className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <span
                className="tracking-tight"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: '#2A2730',
                }}
              >
                INDIVA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-[#6F6A75] hover:text-[#2A2730] transition-colors"
                style={{ fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/donate"
              className="px-5 py-2.5 bg-[#71648C] text-white hover:bg-[#5d5373] transition-all rounded-xl shadow-sm"
              style={{ fontWeight: 600 }}
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#71648C]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-[#71648C]/10 p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[#2A2730] hover:text-[#71648C] transition-colors py-2"
                  style={{ fontWeight: 500, fontSize: '1.125rem' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#71648C]/10 space-y-3">
                <Link
                  to="/donate"
                  className="block w-full text-center px-5 py-3 bg-[#71648C] text-white rounded-xl shadow-sm"
                  style={{ fontWeight: 600 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}