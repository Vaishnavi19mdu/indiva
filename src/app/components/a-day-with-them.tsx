import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Coffee, BookOpen, Phone, Heart, Users } from "lucide-react";

export function ADayWithThem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const warmth = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const saturation = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1]);

  return (
    <section ref={containerRef} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F5] via-[#D8CFE3]/10 to-[#FFF9F5]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className="mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#2A2730',
            }}
          >
            A Day With Them
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontSize: '1.125rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#6F6A75',
            }}
          >
            See how companionship transforms an ordinary day into something extraordinary.
          </p>
        </motion.div>

        <div className="space-y-32">
          {/* Before */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.3]),
            }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div
                className="text-[#6F6A75] mb-3"
                style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em' }}
              >
                BEFORE
              </div>
              <h3
                className="mb-4"
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: '#2A2730',
                }}
              >
                Isolation
              </h3>
              <p
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: '#6F6A75',
                }}
              >
                Days pass in silence. Meals eaten alone. No one to share stories with. The phone never rings.
              </p>
            </div>

            <motion.div
              className="aspect-video rounded-3xl bg-gradient-to-br from-gray-300 to-gray-200 relative overflow-hidden"
              style={{
                filter: "grayscale(0.7) brightness(0.8)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <Coffee className="w-12 h-12 text-gray-500 mx-auto opacity-50" />
                  <p className="text-gray-600">Empty chair, untouched tea</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Transition */}
          <motion.div
            style={{
              opacity: warmth,
              scale: useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]),
            }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#71648C] to-[#B7848C] text-white shadow-xl">
              <Heart className="w-10 h-10" />
            </div>
            <p
              className="mt-4"
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#71648C',
              }}
            >
              Then INDIVA arrived
            </p>
          </motion.div>

          {/* After */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.8], [0.3, 1]),
            }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              className="aspect-video rounded-3xl bg-gradient-to-br from-[#D8CFE3]/30 to-[#71648C]/20 relative overflow-hidden order-2 md:order-1"
              style={{
                filter: `saturate(${saturation}) brightness(1.1)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <Users className="w-12 h-12 text-[#71648C] mx-auto" />
                  <p className="text-[#2A2730]" style={{ fontWeight: 600 }}>
                    Shared laughter, warm conversations
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="order-1 md:order-2">
              <div
                className="text-[#71648C] mb-3"
                style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em' }}
              >
                AFTER
              </div>
              <h3
                className="mb-4"
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: '#2A2730',
                }}
              >
                Connection
              </h3>
              <p
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: '#6F6A75',
                }}
              >
                Weekly visits bring joy. Shared meals and stories. Someone who cares. A reason to smile every day.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { icon: Phone, text: "Regular check-ins" },
                  { icon: BookOpen, text: "Shared activities" },
                  { icon: Heart, text: "Genuine companionship" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#71648C]/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#71648C]" />
                    </div>
                    <span style={{ fontWeight: 500, color: '#2A2730' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
