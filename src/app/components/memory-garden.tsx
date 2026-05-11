import { motion } from "motion/react";
import { Flower, Sparkles, Star, Heart } from "lucide-react";
import { useState } from "react";

const icons = [Flower, Sparkles, Star, Heart];

export function MemoryGarden() {
  const [gardenItems, setGardenItems] = useState<{ id: number; x: number; y: number; icon: number; scale: number }[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      icon: Math.floor(Math.random() * icons.length),
      scale: Math.random() * 0.5 + 0.7,
    }))
  );

  const handlePlant = () => {
    const newItem = {
      id: Date.now(),
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      icon: Math.floor(Math.random() * icons.length),
      scale: Math.random() * 0.5 + 0.7,
    };
    setGardenItems([...gardenItems, newItem]);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#FFF9F5] via-[#D8CFE3]/5 to-[#71648C]/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(113,100,140,0.05),transparent)]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#2A2730',
            }}
          >
            Memory Garden
          </h2>
          <p
            className="max-w-2xl mx-auto mb-8"
            style={{
              fontSize: '1.125rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#6F6A75',
            }}
          >
            Every donation plants a symbol of hope in our growing garden of compassion.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlant}
            className="px-8 py-4 bg-[#71648C] text-white rounded-2xl hover:bg-[#5d5373] transition-all shadow-lg hover:shadow-xl"
            style={{ fontWeight: 600 }}
          >
            Plant Your Symbol of Hope
          </motion.button>
        </motion.div>

        {/* Garden visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/10] bg-gradient-to-b from-[#D8CFE3]/20 to-[#71648C]/10 rounded-3xl overflow-hidden border border-white/50 shadow-xl backdrop-blur"
        >
          {/* Background glow effects */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  delay: i * 1.3,
                  repeat: Infinity,
                }}
                className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#71648C]/20 to-transparent blur-3xl"
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${20 + i * 15}%`,
                }}
              />
            ))}
          </div>

          {/* Garden items */}
          {gardenItems.map((item) => {
            const IconComponent = icons[item.icon];
            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: item.scale, opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="absolute"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <IconComponent
                    className="w-8 h-8 text-[#71648C] drop-shadow-lg"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(113, 100, 140, 0.4))',
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}

          {/* Particle effects */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [100, -20],
                x: [0, (Math.random() - 0.5) * 40],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
              className="absolute w-1 h-1 bg-[#71648C] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: '#6F6A75',
            }}
          >
            {gardenItems.length} symbols planted • Growing with every act of kindness
          </p>
        </motion.div>
      </div>
    </section>
  );
}
