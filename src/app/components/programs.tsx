import { motion } from "motion/react";
import { Home, Users, Activity } from "lucide-react";
import type { FC, SVGProps } from "react";

type Program = {
  icon: FC<SVGProps<SVGSVGElement> & { size?: number | string }>;
  title: string;
  slug: string;
  description: string;
  gradient: string;
};

const programs: Program[] = [
  {
    icon: Home,
    title: "Home Visits",
    slug: "home-visits",
    description: "Regular companionship visits bringing warmth and conversation to isolated seniors.",
    gradient: "from-[#71648C]/10 to-[#71648C]/5",
  },
  {
    icon: Activity,
    title: "Wellness Support",
    slug: "wellness-support",
    description: "Comprehensive health monitoring, exercise programs, and medical assistance.",
    gradient: "from-[#B7848C]/10 to-[#B7848C]/5",
  },
  {
    icon: Users,
    title: "Community Circles",
    slug: "community-gatherings",
    description: "Weekly gatherings fostering connection, friendship, and shared experiences.",
    gradient: "from-[#D8CFE3]/20 to-[#D8CFE3]/10",
  },
];

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const Icon = program.icon;
  const cls =
    "bg-gradient-to-br " +
    program.gradient +
    " backdrop-blur rounded-3xl border border-white/50 shadow-sm hover:shadow-xl transition-shadow cursor-pointer block p-8";

  return (
    <motion.a
      href={"/programs/" + program.slug}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={cls}
      style={{ textDecoration: "none" }}
    >
      <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center mb-6 shadow-sm">
        <Icon className="w-8 h-8 text-[#71648C]" />
      </div>

      <h3
        className="mb-3"
        style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}
      >
        {program.title}
      </h3>

      <p style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.6, color: "#6F6A75" }}>
        {program.description}
      </p>

      <span
        className="mt-6 inline-block text-[#71648C] hover:text-[#5d5373] transition-colors"
        style={{ fontWeight: 600 }}
      >
        Learn More &#8594;
      </span>
    </motion.a>
  );
}

export function Programs({ preview = false }: { preview?: boolean }) {
  const displayPrograms = preview ? programs.slice(0, 3) : programs;

  return (
    <section id="programs" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#2A2730",
            }}
          >
            Our Programs
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.7, color: "#6F6A75" }}
          >
            Comprehensive support designed to bring joy, health, and connection to every senior we serve.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayPrograms.map((program, index) => (
            <ProgramCard key={program.slug} program={program} index={index} />
          ))}
        </div>

        {preview && (
          <div className="text-center mt-12">
            <a
              href="/programs"
              className="inline-block px-8 py-4 bg-white text-[#71648C] border border-[#71648C]/20 rounded-xl hover:bg-[#71648C]/5 transition-all"
              style={{ fontWeight: 600 }}
            >
              View All Programs &#8594;
            </a>
          </div>
        )}
      </div>
    </section>
  );
}