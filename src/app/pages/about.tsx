import { motion } from "motion/react";
import { Heart, Users, Star, Globe, ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { value: "12,000+", label: "Seniors Supported" },
  { value: "3,400+", label: "Active Volunteers" },
  { value: "48", label: "Cities Reached" },
  { value: "9 yrs", label: "Of Service" },
];

const team = [
  {
    name: "Vaishnavi N",
    role: "Developer & Lead",
    bio: "Building technology with heart, one compassionate line of code at a time.",
    initial: "V",
  },
];

const values = [
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Dignity First",
    desc: "Every senior deserves to be seen, heard, and respected — not just cared for.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Community Over Institution",
    desc: "We believe warmth comes from people, not programs. Human connection is the medicine.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Excellence in Care",
    desc: "High standards in volunteer training and matching ensure every interaction genuinely helps.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Inclusive Reach",
    desc: "Urban or rural, wealthy or not — aging touches everyone, and so do we.",
  },
];

const milestones = [
  { year: "2017", event: "INDIVA founded in Chennai with 12 volunteers and a single care home." },
  { year: "2019", event: "Expanded to 5 cities; launched the Companionship Visits program." },
  { year: "2021", event: "Crossed 1,000 active volunteers. Launched Technology Help initiative." },
  { year: "2023", event: "Partnered with 60+ hospitals for post-discharge senior support." },
  { year: "2025", event: "12,000 seniors supported. Reached 48 cities across India." },
  { year: "2026", event: "Launching INDIVA Connect — a live helpline for isolated seniors." },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        {/* Decorative blob */}
        <div
          className="absolute top-16 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, #D8CFE3 0%, transparent 70%)",
            opacity: 0.35,
            transform: "translate(30%, -20%)",
          }}
        />
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "#F0EBF8", border: "1px solid #D8CFE3" }}>
            <Sparkles className="w-4 h-4 text-[#71648C]" />
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#71648C", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Our Story
            </span>
          </motion.div>

          <motion.h1 {...fade(0.08)}
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#2A2730", lineHeight: 1.1 }}>
            We exist so no senior<br />
            <span style={{ color: "#71648C" }}>feels forgotten.</span>
          </motion.h1>

          <motion.p {...fade(0.16)} className="mt-6 max-w-2xl"
            style={{ fontSize: "1.125rem", lineHeight: 1.75, color: "#6F6A75", fontWeight: 400 }}>
            INDIVA was born from a simple belief: the later years of life should be filled with dignity, warmth, and connection. We bridge generations — pairing compassionate volunteers with seniors across India who need companionship, practical help, and someone who genuinely cares.
          </motion.p>

          <motion.a {...fade(0.22)} href="/volunteer"
            className="inline-flex items-center gap-2 mt-10 px-7 py-4 rounded-xl text-white transition-all hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: "#71648C", fontWeight: 700, fontSize: "1rem" }}>
            Join Our Mission <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ background: "#71648C" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fade(i * 0.08)} className="text-center">
              <p style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>
                {s.value}
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.65)", marginTop: "4px" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission + Values ───────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <motion.h2 {...fade(0)}
                style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#2A2730", lineHeight: 1.2 }}>
                Why we do<br />what we do
              </motion.h2>
              <motion.p {...fade(0.08)} className="mt-5"
                style={{ fontSize: "1rem", lineHeight: 1.75, color: "#6F6A75" }}>
                India is home to over 140 million seniors. A staggering number live alone, with limited mobility, fading health, and — most painfully — shrinking social worlds. INDIVA exists to close that gap, one visit, one phone call, one meal at a time.
              </motion.p>
              <motion.p {...fade(0.14)} className="mt-4"
                style={{ fontSize: "1rem", lineHeight: 1.75, color: "#6F6A75" }}>
                We don't replace family. We complement it. And for seniors without family nearby, we become the community they deserve.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {values.map((v, i) => (
                <motion.div key={v.title} {...fade(i * 0.07)}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{ background: "#fff", border: "1px solid #F0EBF8", boxShadow: "0 2px 12px rgba(113,100,140,0.06)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#F0EBF8", color: "#71648C" }}>
                    {v.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: "#2A2730", fontSize: "0.9375rem" }}>{v.title}</p>
                    <p style={{ fontSize: "0.875rem", color: "#6F6A75", marginTop: "3px", lineHeight: 1.6 }}>{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: "linear-gradient(180deg, #F0EBF8 0%, #FFF9F5 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fade(0)} className="text-center mb-16"
            style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#2A2730" }}>
            How we got here
          </motion.h2>
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-[18px] left-0 right-0 h-px" style={{ background: "#D8CFE3" }} />
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {milestones.map((m, i) => (
                <motion.div key={m.year} {...fade(i * 0.07)} className="flex flex-col items-center text-center">
                  {/* Dot */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10 mb-4"
                    style={{
                      background: i === milestones.length - 1 ? "#71648C" : "#fff",
                      border: "2px solid #71648C",
                    }}>
                    <div className="w-2 h-2 rounded-full"
                      style={{ background: i === milestones.length - 1 ? "#fff" : "#71648C" }} />
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#71648C", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {m.year}
                  </span>
                  <p style={{ fontSize: "0.78rem", color: "#2A2730", marginTop: "4px", lineHeight: 1.5, fontWeight: 500 }}>
                    {m.event}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 {...fade(0)} className="text-center mb-4"
            style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#2A2730" }}>
            The people behind INDIVA
          </motion.h2>
          <motion.p {...fade(0.08)} className="text-center mb-14 max-w-xl mx-auto"
            style={{ fontSize: "1rem", color: "#6F6A75" }}>
            A small team driven by a very large conviction that every life deserves to be honoured.
          </motion.p>
          <div className="flex justify-center">
            {team.map((member, i) => (
              <motion.div key={member.name} {...fade(i * 0.08)}
                className="p-8 rounded-2xl flex flex-col items-center text-center max-w-sm w-full"
                style={{ background: "#fff", border: "1px solid #F0EBF8", boxShadow: "0 2px 16px rgba(113,100,140,0.07)" }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4"
                  style={{ background: "#71648C", fontWeight: 800, fontSize: "1.5rem" }}>
                  {member.initial}
                </div>
                <p style={{ fontWeight: 700, color: "#2A2730", fontSize: "1.1rem" }}>{member.name}</p>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#71648C", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {member.role}
                </p>
                <p style={{ fontSize: "0.9rem", color: "#6F6A75", marginTop: "10px", lineHeight: 1.6 }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <motion.div {...fade(0)} className="max-w-3xl mx-auto text-center rounded-3xl px-10 py-16"
          style={{ background: "linear-gradient(135deg, #71648C 0%, #5d5373 100%)", boxShadow: "0 20px 60px rgba(113,100,140,0.3)" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
            Ready to make a difference?
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", marginTop: "0.75rem", lineHeight: 1.7 }}>
            Whether you have an hour a week or a whole weekend, your time matters to someone who needs it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="/volunteer"
              className="px-7 py-4 rounded-xl font-bold text-[#71648C] hover:opacity-90 transition-all"
              style={{ background: "#fff", fontSize: "1rem" }}>
              Become a Volunteer
            </a>
            <a href="/donate"
              className="px-7 py-4 rounded-xl font-bold text-white hover:opacity-90 transition-all"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", fontSize: "1rem" }}>
              Support Our Work
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}