import { motion } from "motion/react";
import { useState } from "react";

export function ImpactRipple() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodes = [
    { x: 50, y: 50, label: "Senior Care" },
    { x: 30, y: 30, label: "Volunteer" },
    { x: 70, y: 30, label: "Community" },
    { x: 20, y: 70, label: "Family" },
    { x: 50, y: 80, label: "Health" },
    { x: 80, y: 70, label: "Wellness" },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#D8CFE3]/10 to-[#FFF9F5]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
            Impact Ripple
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
            Every contribution creates expanding waves of positive change across our community.
          </p>
        </motion.div>

        <div className="relative aspect-video bg-gradient-to-br from-[#71648C]/5 to-[#D8CFE3]/10 rounded-3xl overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            {/* Connection lines */}
            {nodes.map((node, i) =>
              nodes.slice(i + 1).map((targetNode, j) => (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke="#71648C"
                  strokeWidth="1"
                  opacity="0.15"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              ))
            )}
          </svg>

          {/* Nodes */}
          {nodes.map((node, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="absolute"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveNode(index)}
                className="relative"
              >
                {/* Ripple effect */}
                {activeNode === index && (
                  <>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.3,
                          repeat: Infinity,
                        }}
                        className="absolute inset-0 rounded-full border-2 border-[#71648C]"
                      />
                    ))}
                  </>
                )}

                {/* Node circle */}
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#71648C] to-[#B7848C] flex items-center justify-center text-white shadow-lg relative z-10"
                  animate={
                    activeNode === index
                      ? { scale: [1, 1.1, 1], boxShadow: ['0 4px 12px rgba(113, 100, 140, 0.3)', '0 8px 24px rgba(113, 100, 140, 0.5)', '0 4px 12px rgba(113, 100, 140, 0.3)'] }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}
                  >
                    {node.label}
                  </div>
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: '#6F6A75',
            }}
          >
            Click on any node to see the ripple effect
          </p>
        </motion.div>
      </div>
    </section>
  );
}
