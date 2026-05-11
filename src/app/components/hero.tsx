import { motion } from "motion/react";
import { Heart, Users, Smile } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D8CFE3]/20 via-[#FFF9F5] to-[#FFF9F5]" />

      <div className="relative max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1.1,
              color: '#2A2730',
            }}
          >
            Compassion should grow with age,{' '}
            <span className="text-[#71648C]">not fade.</span>
          </motion.h1>

          <p
            className="mb-8 max-w-lg"
            style={{
              fontSize: '1.125rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#6F6A75',
            }}
          >
            Every senior deserves companionship, dignity, and warmth. We bridge
            the gap between isolation and connection, bringing joy to those who
            need it most.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/donate")}
              className="px-8 py-4 bg-[#71648C] text-white rounded-xl shadow-lg hover:bg-[#5d5373] hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ fontWeight: 700, touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              Support a Senior
            </button>
            <button
              onClick={() => navigate("/stories")}
              className="px-8 py-4 bg-white/50 backdrop-blur text-[#71648C] rounded-xl border border-[#71648C]/20 hover:bg-white hover:border-[#71648C]/40 transition-all"
              style={{ fontWeight: 600, touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              Explore Stories
            </button>
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-[#71648C]/20 to-[#D8CFE3]/30 p-8 backdrop-blur">
            <div className="absolute inset-0 bg-gradient-to-br from-[#71648C]/10 to-transparent rounded-3xl" />

            {/* Floating stats cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-8 bg-white rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#71648C]/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#71648C]" />
                </div>
                <div>
                  <div className="text-[#2A2730]" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    2,500+
                  </div>
                  <div className="text-[#6F6A75]" style={{ fontSize: '0.875rem' }}>
                    Seniors Supported
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 left-8 bg-white rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#B7848C]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#B7848C]" />
                </div>
                <div>
                  <div className="text-[#2A2730]" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    850+
                  </div>
                  <div className="text-[#6F6A75]" style={{ fontSize: '0.875rem' }}>
                    Active Volunteers
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 right-12 -translate-y-1/2 bg-white rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#D8CFE3]/30 flex items-center justify-center">
                  <Smile className="w-6 h-6 text-[#71648C]" />
                </div>
                <div>
                  <div className="text-[#2A2730]" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    98%
                  </div>
                  <div className="text-[#6F6A75]" style={{ fontSize: '0.875rem' }}>
                    Satisfaction
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}