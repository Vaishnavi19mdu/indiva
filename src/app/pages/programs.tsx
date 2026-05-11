import { motion } from "motion/react";
import { useState } from "react";
import { Home, Activity, Users, Utensils, Heart, MessageCircle, Search, type LucideIcon } from "lucide-react";

const allPrograms = [
  {
    id: "home-visits",
    icon: Home,
    title: "Home Visits",
    description: "Regular companionship visits bringing warmth and conversation to isolated seniors.",
    category: "Companionship",
    funding: 78,
    beneficiaries: 450,
    gradient: "from-[#71648C]/10 to-[#71648C]/5",
  },
  {
    id: "wellness-support",
    icon: Activity,
    title: "Wellness Support",
    description: "Comprehensive health monitoring, exercise programs, and medical assistance.",
    category: "Health",
    funding: 65,
    beneficiaries: 320,
    gradient: "from-[#B7848C]/10 to-[#B7848C]/5",
  },
  {
    id: "community-gatherings",
    icon: Users,
    title: "Community Circles",
    description: "Weekly gatherings fostering connection, friendship, and shared experiences.",
    category: "Social",
    funding: 82,
    beneficiaries: 280,
    gradient: "from-[#D8CFE3]/20 to-[#D8CFE3]/10",
  },
  {
    id: "nutrition-assistance",
    icon: Utensils,
    title: "Nutrition Assistance",
    description: "Meal delivery and nutritional support ensuring seniors maintain healthy diets.",
    category: "Health",
    funding: 70,
    beneficiaries: 380,
    gradient: "from-[#71648C]/10 to-[#71648C]/5",
  },
  {
    id: "emergency-care",
    icon: Heart,
    title: "Emergency Care",
    description: "24/7 emergency response and urgent medical support for vulnerable seniors.",
    category: "Health",
    funding: 55,
    beneficiaries: 150,
    gradient: "from-[#B7848C]/10 to-[#B7848C]/5",
  },
  {
    id: "therapy-circles",
    icon: MessageCircle,
    title: "Therapy Circles",
    description: "Group therapy sessions and mental health support in a safe, nurturing environment.",
    category: "Mental Health",
    funding: 60,
    beneficiaries: 200,
    gradient: "from-[#D8CFE3]/20 to-[#D8CFE3]/10",
  },
];

type Program = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
  funding: number;
  beneficiaries: number;
  gradient: string;
};

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const Icon = program.icon;
  const cls = "bg-gradient-to-br " + program.gradient + " backdrop-blur rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-xl transition-all cursor-pointer block";

  return (
    <motion.a
      key={program.id}
      href={"/programs/" + program.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={cls}
      style={{ textDecoration: "none" }}
    >
      <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center mb-6 shadow-sm">
        <Icon className="w-8 h-8 text-[#71648C]" />
      </div>

      <div
        className="text-[#71648C] mb-2"
        style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em" }}
      >
        {program.category.toUpperCase()}
      </div>

      <h3
        className="mb-3"
        style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}
      >
        {program.title}
      </h3>

      <p
        className="mb-6"
        style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.6, color: "#6F6A75" }}
      >
        {program.description}
      </p>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
            {program.funding}% Funded
          </span>
          <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#6F6A75" }}>
            {program.beneficiaries} beneficiaries
          </span>
        </div>
        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: program.funding + "%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className="h-full bg-[#71648C] rounded-full"
          />
        </div>
      </div>

      <div
        className="text-[#71648C] hover:text-[#5d5373] transition-colors"
        style={{ fontWeight: 600 }}
      >
        Learn More &#8594;
      </div>
    </motion.a>
  );
}

export function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Companionship", "Health", "Social", "Mental Health"];

  const filteredPrograms = allPrograms.filter((program) => {
    const matchesCategory = selectedCategory === "All" || program.category === selectedCategory;
    const matchesSearch =
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            className="mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.05em", color: "#2A2730" }}
          >
            Our Programs
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.7, color: "#6F6A75" }}
          >
            Comprehensive support programs designed to bring joy, health, and connection to every senior we serve.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6F6A75]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs..."
                className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl border border-[#71648C]/10 focus:outline-none focus:ring-2 focus:ring-[#71648C]/20 transition-all"
                style={{ fontSize: "1rem", fontWeight: 400, color: "#2A2730" }}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={"px-6 py-3 rounded-xl transition-all " + (selectedCategory === category ? "bg-[#71648C] text-white shadow-lg" : "bg-white text-[#6F6A75] border border-[#71648C]/10 hover:bg-[#71648C]/5")}
                style={{ fontWeight: 600 }}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}