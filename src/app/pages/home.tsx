import { Hero } from "../components/hero";
import { Mission } from "../components/mission";
import { Programs } from "../components/programs";
import { DonationCTA } from "../components/donation-cta";
import { motion } from "motion/react";
import { Users, Heart, TrendingUp, MapPin } from "lucide-react";

function ImpactStats() {
  const stats = [
    { icon: Heart, value: "2,500+", label: "Seniors Supported" },
    { icon: Users, value: "850+", label: "Active Volunteers" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
    { icon: MapPin, value: "45+", label: "Cities Reached" },
  ];

  return (
    <section className="py-24 px-6 bg-white">
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
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#2A2730',
            }}
          >
            Our Impact
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#71648C]/10 to-[#71648C]/5 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-[#71648C]" />
              </div>
              <div
                className="mb-2"
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: '#2A2730',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#6F6A75',
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VolunteerCTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-[#D8CFE3]/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="mb-6"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#2A2730',
            }}
          >
            Join Our Community of Caregivers
          </h2>
          <p
            className="mb-8 max-w-2xl mx-auto"
            style={{
              fontSize: '1.125rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#6F6A75',
            }}
          >
            Become a volunteer and make a meaningful difference in a senior's life. Just a few hours a week can transform someone's world.
          </p>
          <a
            href="/volunteer"
            className="inline-block px-8 py-4 bg-[#71648C] text-white rounded-xl shadow-lg hover:bg-[#5d5373] hover:shadow-xl transition-all hover:-translate-y-0.5"
            style={{ fontWeight: 700 }}
          >
            Become a Volunteer
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <Programs preview={true} />
      <ImpactStats />
      <VolunteerCTA />
      <DonationCTA />
    </>
  );
}
