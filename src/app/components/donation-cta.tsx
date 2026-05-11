import { motion } from "motion/react";
import { ArrowRight, Heart, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DonationCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#71648C]/5 to-[#FFF9F5]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#71648C] to-[#5d5373] rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2
                className="mb-4"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: 'white',
                }}
              >
                Be the Reason Someone Smiles Today
              </h2>
              <p
                className="max-w-2xl mx-auto"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                Your contribution transforms lives. Every donation brings warmth, dignity, and companionship to seniors who need it most.
              </p>
            </motion.div>

            {/* Impact preview cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Heart,
                  amount: "₹500",
                  value: 500,
                  impact: "1 wellness visit + meal support",
                  clickable: true,
                },
                {
                  icon: Shield,
                  amount: "₹1,500",
                  value: 1500,
                  impact: "3 home visits + health checkup",
                  clickable: true,
                },
                {
                  icon: TrendingUp,
                  amount: "₹5,000",
                  value: 5000,
                  impact: "Full month of care for 1 senior",
                  clickable: true,
                },
              ].map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() =>
                    option.clickable &&
                    navigate("/donate", { state: { amount: option.value } })
                  }
                  className={`bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all ${
                    option.clickable ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className="mb-2"
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    {option.amount}
                  </div>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: 'rgba(255, 255, 255, 0.85)',
                    }}
                  >
                    {option.impact}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate("/donate", { state: { amount: 500 } })}
                className="px-10 py-5 bg-white text-[#71648C] rounded-2xl hover:bg-white/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                style={{ fontWeight: 700, fontSize: '1.125rem' }}
              >
                Donate Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/volunteer")}
                className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                style={{ fontWeight: 600, fontSize: '1.125rem' }}
              >
                Become a Volunteer
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-wrap justify-center gap-8 text-center"
            >
              {[
                "100% Transparent",
                "Tax Deductible",
                "Secure Payments",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}