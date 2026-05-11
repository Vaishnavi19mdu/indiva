import { Logo } from "./logo";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks: { label: string; to: string }[] = [
  { label: "Programs", to: "/programs" },
  { label: "Community", to: "/community" },
  { label: "Volunteer", to: "/volunteer" },
  { label: "Donate", to: "/donate" },
  { label: "About Us", to: "/about" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#FFF9F5] to-[#D8CFE3]/20 py-16 px-6 border-t border-[#71648C]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo className="w-12 h-12" />
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: '#2A2730',
                }}
              >
                INDIVA
              </span>
            </div>
            <p
              className="max-w-md mb-6"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.6,
                color: '#6F6A75',
              }}
            >
              Bridging generations through compassion, bringing warmth and dignity to every senior we serve.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#71648C]/10 hover:bg-[#71648C]/20 flex items-center justify-center transition-colors"
              >
                <Heart className="w-5 h-5 text-[#71648C]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#2A2730',
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[#6F6A75] hover:text-[#71648C] transition-colors"
                    style={{ fontWeight: 400 }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#2A2730',
              }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[#6F6A75]">
                <Mail className="w-5 h-5 mt-0.5 text-[#71648C]" />
                <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>
                  onlinesupport@indiva.org
                </span>
              </li>
              <li className="flex items-start gap-2 text-[#6F6A75]">
                <Phone className="w-5 h-5 mt-0.5 text-[#71648C]" />
                <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-start gap-2 text-[#6F6A75]">
                <MapPin className="w-5 h-5 mt-0.5 text-[#71648C]" />
                <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>
                  4R, Care Street,
                  <br />
                  Chennai, Tamil Nadu, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#71648C]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            style={{
              fontSize: '0.875rem',
              fontWeight: 400,
              color: '#6F6A75',
            }}
          >
            © 2026 INDIVA. All rights reserved. Made with{' '}
            <Heart className="inline w-4 h-4 text-[#B7848C]" /> for seniors everywhere.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Transparency'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[#6F6A75] hover:text-[#71648C] transition-colors"
                style={{ fontSize: '0.875rem', fontWeight: 400 }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}