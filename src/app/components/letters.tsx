import { motion } from "motion/react";
import { Quote } from "lucide-react";

const letters = [
  {
    from: "Margaret, 78",
    type: "Senior",
    text: "The volunteers don't just visit—they listen. For the first time in years, I feel truly seen.",
    gradient: "from-[#71648C]/10 to-[#71648C]/5",
  },
  {
    from: "Priya, Volunteer",
    type: "Volunteer",
    text: "Every visit reminds me what truly matters. Their stories have taught me more than any book.",
    gradient: "from-[#B7848C]/10 to-[#B7848C]/5",
  },
  {
    from: "Aarav, 12",
    type: "Young Volunteer",
    text: "Grandma Rose taught me chess and tells the best stories. I can't wait for our next visit!",
    gradient: "from-[#D8CFE3]/20 to-[#D8CFE3]/10",
  },
];

export function LettersAcrossGenerations() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#FFF9F5] to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
            Letters Across Generations
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
            Real voices, real connections. Hear from those whose lives have been touched.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`bg-gradient-to-br ${letter.gradient} backdrop-blur rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-xl transition-all cursor-pointer relative overflow-hidden`}
            >
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-[#71648C]" />
              </div>

              <div className="relative">
                <div
                  className="text-[#71648C] mb-2"
                  style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em' }}
                >
                  {letter.type.toUpperCase()}
                </div>

                <p
                  className="mb-6"
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#2A2730',
                    fontStyle: 'italic',
                  }}
                >
                  "{letter.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#71648C] to-[#B7848C]" />
                  <div>
                    <div
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#2A2730',
                      }}
                    >
                      {letter.from}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
