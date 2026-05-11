import { motion } from "motion/react";
import { Heart, Users, Calendar, Home, Activity, Utensils, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const programData = {
  "home-visits": {
    category: "COMPANIONSHIP PROGRAM",
    title: "Home Visits",
    subtitle: "Regular companionship visits that transform isolation into connection, bringing warmth and conversation to seniors who need it most.",
    challenge: "Millions of seniors face social isolation every day. As families grow busier and communities become more dispersed, elderly individuals often spend days without meaningful human interaction. This isolation doesn't just affect happiness—it impacts physical health, cognitive function, and overall wellbeing.\n\nStudies show that social isolation among seniors is as harmful to health as smoking 15 cigarettes a day. Yet it remains one of the most overlooked challenges in our aging population.",
    approach: "Our Home Visits program pairs trained volunteers with seniors for regular, meaningful companionship. These aren't just check-ins—they're genuine relationships built on trust, empathy, and shared experiences.",
    features: [
      { title: "Weekly Visits", desc: "Consistent schedule builds trust and routine" },
      { title: "Trained Volunteers", desc: "Background-checked and compassion-trained" },
      { title: "Personalized Matching", desc: "Interests and personalities carefully paired" },
      { title: "Ongoing Support", desc: "Regular check-ins and volunteer mentoring" },
    ],
    stats: [
      { icon: Heart, value: "450+", label: "Seniors Connected" },
      { icon: Users, value: "320+", label: "Active Volunteers" },
      { icon: Calendar, value: "12,000+", label: "Visits Completed" },
    ],
    testimonials: [
      { quote: "My volunteer Sarah visits every Thursday. I look forward to it all week. She's become like family to me.", name: "Margaret, 78", role: "Program Recipient" },
      { quote: "This program changed my perspective on aging and community. The wisdom I've gained from spending time with seniors is invaluable.", name: "Priya, 29", role: "Volunteer" },
    ],
    funding: 78,
    impactMap: { 500: "1 wellness visit", 1500: "3 home visits", 3000: "1 week of visits", 5000: "2 weeks of visits" },
    related: [
      { title: "Wellness Support", url: "/programs/wellness-support" },
      { title: "Community Circles", url: "/programs/community-gatherings" },
    ],
  },
  "wellness-support": {
    category: "HEALTH PROGRAM",
    title: "Wellness Support",
    subtitle: "Comprehensive health monitoring, exercise programs, and medical assistance ensuring every senior lives their healthiest life.",
    challenge: "Many seniors struggle to manage chronic conditions, maintain physical fitness, and navigate complex healthcare systems without support. Without proper guidance, minor health issues can escalate into serious complications.\n\nAccessible, consistent wellness support can dramatically improve quality of life, reduce hospitalizations, and help seniors maintain independence longer.",
    approach: "Our Wellness Support program provides holistic health monitoring, guided exercise sessions, and direct assistance coordinating medical care. We meet seniors where they are and build plans around their unique needs.",
    features: [
      { title: "Health Monitoring", desc: "Regular vitals checks and health assessments" },
      { title: "Exercise Programs", desc: "Gentle, senior-appropriate fitness routines" },
      { title: "Medical Coordination", desc: "Help navigating appointments and prescriptions" },
      { title: "Nutrition Guidance", desc: "Personalized dietary advice and support" },
    ],
    stats: [
      { icon: Heart, value: "320+", label: "Seniors Supported" },
      { icon: Users, value: "80+", label: "Health Volunteers" },
      { icon: Calendar, value: "5,000+", label: "Sessions Completed" },
    ],
    testimonials: [
      { quote: "The wellness team helped me get my blood pressure under control. I feel stronger and more confident than I have in years.", name: "Rajan, 72", role: "Program Recipient" },
      { quote: "Volunteering here taught me more about compassionate care than any textbook ever could.", name: "Ananya, 24", role: "Volunteer" },
    ],
    funding: 65,
    impactMap: { 500: "1 health check", 1500: "3 wellness sessions", 3000: "1 week of support", 5000: "2 weeks of support" },
    related: [
      { title: "Home Visits", url: "/programs/home-visits" },
      { title: "Community Circles", url: "/programs/community-gatherings" },
    ],
  },
  "community-gatherings": {
    category: "SOCIAL PROGRAM",
    title: "Community Circles",
    subtitle: "Weekly gatherings fostering connection, friendship, and shared experiences among seniors and volunteers.",
    challenge: "Even seniors who live with family or in care facilities often lack meaningful peer connection. Without a community of equals, feelings of irrelevance and loneliness persist and deepen over time.\n\nRegular social gatherings provide structure, purpose, and belonging — all of which are critical to mental and emotional health in later life.",
    approach: "Community Circles brings seniors together in warm, welcoming group settings for activities, conversation, and shared meals. Each circle is facilitated by trained volunteers who ensure everyone feels included and valued.",
    features: [
      { title: "Weekly Gatherings", desc: "Structured social events every week" },
      { title: "Group Activities", desc: "Games, crafts, music, and storytelling" },
      { title: "Shared Meals", desc: "Breaking bread builds lasting bonds" },
      { title: "Intergenerational", desc: "Young volunteers bridge generational gaps" },
    ],
    stats: [
      { icon: Heart, value: "280+", label: "Regular Attendees" },
      { icon: Users, value: "60+", label: "Circle Facilitators" },
      { icon: Calendar, value: "3,200+", label: "Gatherings Held" },
    ],
    testimonials: [
      { quote: "Thursday circles are the highlight of my week. I've made real friends here — people who truly understand me.", name: "Lakshmi, 81", role: "Program Recipient" },
      { quote: "I started volunteering to give back. I didn't expect to receive so much wisdom and joy in return.", name: "Karthik, 26", role: "Volunteer" },
    ],
    funding: 82,
    impactMap: { 500: "1 circle gathering", 1500: "3 group sessions", 3000: "1 week of circles", 5000: "2 weeks of circles" },
    related: [
      { title: "Home Visits", url: "/programs/home-visits" },
      { title: "Wellness Support", url: "/programs/wellness-support" },
    ],
  },
  "nutrition-assistance": {
    category: "HEALTH PROGRAM",
    title: "Nutrition Assistance",
    subtitle: "Meal delivery and nutritional support ensuring seniors maintain healthy, balanced diets every day.",
    challenge: "Poor nutrition is one of the leading yet least visible health risks among seniors. Mobility limitations, fixed incomes, and cognitive decline can make consistent healthy eating nearly impossible without support.\n\nMalnutrition in seniors accelerates physical decline, weakens immunity, and worsens chronic conditions.",
    approach: "We deliver nutritious, freshly prepared meals directly to seniors' homes and provide ongoing dietary guidance tailored to each individual's health conditions and preferences.",
    features: [
      { title: "Daily Meal Delivery", desc: "Fresh, balanced meals delivered to the door" },
      { title: "Dietary Planning", desc: "Customized plans for health conditions" },
      { title: "Cooking Support", desc: "Help preparing simple nutritious meals" },
      { title: "Grocery Assistance", desc: "Support accessing fresh, affordable food" },
    ],
    stats: [
      { icon: Heart, value: "380+", label: "Seniors Fed Daily" },
      { icon: Users, value: "90+", label: "Nutrition Volunteers" },
      { icon: Calendar, value: "50,000+", label: "Meals Delivered" },
    ],
    testimonials: [
      { quote: "Before this program, I was skipping meals. Now I eat properly every day and my energy has come back.", name: "Meena, 76", role: "Program Recipient" },
      { quote: "Delivering meals is the smallest act with the biggest impact. You can see it on their faces.", name: "Rohan, 22", role: "Volunteer" },
    ],
    funding: 70,
    impactMap: { 500: "5 meals delivered", 1500: "15 meals delivered", 3000: "1 week of meals", 5000: "2 weeks of meals" },
    related: [
      { title: "Wellness Support", url: "/programs/wellness-support" },
      { title: "Home Visits", url: "/programs/home-visits" },
    ],
  },
  "emergency-care": {
    category: "HEALTH PROGRAM",
    title: "Emergency Care",
    subtitle: "24/7 emergency response and urgent medical support for vulnerable seniors when they need it most.",
    challenge: "Medical emergencies don't follow schedules. For seniors living alone or without nearby family, a fall, sudden illness, or acute episode can become life-threatening without rapid response.\n\nDelays in emergency care for seniors significantly increase mortality rates and long-term complications.",
    approach: "Our Emergency Care network provides round-the-clock monitoring, rapid response coordination, and direct support during medical crises. We work alongside healthcare providers to ensure no senior faces an emergency alone.",
    features: [
      { title: "24/7 Monitoring", desc: "Always-on watch for emergencies" },
      { title: "Rapid Response", desc: "Trained responders within minutes" },
      { title: "Hospital Liaison", desc: "Coordinating care with medical teams" },
      { title: "Family Notification", desc: "Keeping loved ones informed always" },
    ],
    stats: [
      { icon: Heart, value: "150+", label: "Seniors Protected" },
      { icon: Users, value: "40+", label: "Emergency Responders" },
      { icon: Calendar, value: "800+", label: "Incidents Handled" },
    ],
    testimonials: [
      { quote: "They reached me within minutes of my fall. I truly believe they saved my life.", name: "Suresh, 83", role: "Program Recipient" },
      { quote: "Every call matters. Every second counts. This work is the most meaningful thing I've ever done.", name: "Divya, 31", role: "Emergency Volunteer" },
    ],
    funding: 55,
    impactMap: { 500: "1 day of monitoring", 1500: "3 days of coverage", 3000: "1 week of protection", 5000: "2 weeks of coverage" },
    related: [
      { title: "Wellness Support", url: "/programs/wellness-support" },
      { title: "Home Visits", url: "/programs/home-visits" },
    ],
  },
  "therapy-circles": {
    category: "MENTAL HEALTH PROGRAM",
    title: "Therapy Circles",
    subtitle: "Group therapy sessions and mental health support in a safe, nurturing environment for seniors.",
    challenge: "Mental health challenges among seniors — including depression, anxiety, and grief — are vastly underdiagnosed and undertreated. Stigma, access barriers, and a lack of age-appropriate services leave many without support.\n\nUntreated mental health conditions in seniors directly worsen physical health outcomes and shorten life expectancy.",
    approach: "Therapy Circles offers structured, professionally guided group sessions that create safe space for seniors to process emotions, share experiences, and build resilience together — complemented by one-on-one support when needed.",
    features: [
      { title: "Group Sessions", desc: "Facilitated by trained mental health professionals" },
      { title: "Grief Support", desc: "Dedicated space to process loss and change" },
      { title: "One-on-One Care", desc: "Individual sessions for deeper support" },
      { title: "Mindfulness", desc: "Calming techniques for daily resilience" },
    ],
    stats: [
      { icon: Heart, value: "200+", label: "Seniors Supported" },
      { icon: Users, value: "30+", label: "Therapy Facilitators" },
      { icon: Calendar, value: "1,500+", label: "Sessions Completed" },
    ],
    testimonials: [
      { quote: "After losing my husband, I felt hopeless. The therapy circle gave me a reason to keep going.", name: "Vasantha, 74", role: "Program Recipient" },
      { quote: "Facilitating these circles has deepened my understanding of human resilience in ways I never expected.", name: "Nithya, 35", role: "Facilitator" },
    ],
    funding: 60,
    impactMap: { 500: "1 therapy session", 1500: "3 group sessions", 3000: "1 week of support", 5000: "2 weeks of care" },
    related: [
      { title: "Community Circles", url: "/programs/community-gatherings" },
      { title: "Home Visits", url: "/programs/home-visits" },
    ],
  },
};

const fallbackProgram = programData["home-visits"];

export function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>();
  const program = (id && programData[id as keyof typeof programData]) || fallbackProgram;
  const [donationAmount, setDonationAmount] = useState(1500);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#71648C]/20 via-[#D8CFE3]/30 to-[#B7848C]/20" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="text-[#71648C] mb-4"
              style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
            >
              {program.category}
            </div>
            <h1
              className="mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.05em", color: "#2A2730" }}
            >
              {program.title}
            </h1>
            <p
              className="max-w-2xl mx-auto"
              style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.7, color: "#6F6A75" }}
            >
              {program.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6" style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}>
                The Challenge
              </h2>
              {program.challenge.split("\n\n").map((para, i) => (
                <p key={i} className="mb-4" style={{ fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.7, color: "#6F6A75" }}>
                  {para}
                </p>
              ))}
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6" style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}>
                Our Approach
              </h2>
              <p className="mb-6" style={{ fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.7, color: "#6F6A75" }}>
                {program.approach}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {program.features.map((item) => (
                  <div key={item.title} className="bg-gradient-to-br from-[#D8CFE3]/20 to-[#71648C]/10 rounded-2xl p-6">
                    <h4 className="mb-2" style={{ fontSize: "1.125rem", fontWeight: 700, color: "#2A2730" }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: "1rem", fontWeight: 400, color: "#6F6A75" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6" style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}>
                Measured Impact
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {program.stats.map((stat) => (
                  <div key={stat.label} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-[#71648C]/10">
                    <div className="w-14 h-14 rounded-xl bg-[#71648C]/10 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-7 h-7 text-[#71648C]" />
                    </div>
                    <div className="mb-2" style={{ fontSize: "2rem", fontWeight: 800, color: "#2A2730" }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#6F6A75" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6" style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}>
                Stories from Our Community
              </h2>
              <div className="space-y-6">
                {program.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gradient-to-br from-[#D8CFE3]/10 to-[#71648C]/5 rounded-2xl p-8">
                    <p className="mb-4" style={{ fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.7, color: "#2A2730", fontStyle: "italic" }}>
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#71648C] to-[#B7848C]" />
                      <div>
                        <div style={{ fontSize: "1rem", fontWeight: 600, color: "#2A2730" }}>{testimonial.name}</div>
                        <div style={{ fontSize: "0.875rem", fontWeight: 400, color: "#6F6A75" }}>{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#71648C]/10">
                <h3 className="mb-6" style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}>
                  Support This Program
                </h3>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                      {program.funding}% Funded
                    </span>
                  </div>
                  <div className="h-3 bg-[#FFF9F5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#71648C] rounded-full" style={{ width: program.funding + "%" }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[500, 1500, 3000, 5000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount)}
                      className={"py-3 rounded-xl transition-all " + (donationAmount === amount ? "bg-[#71648C] text-white" : "bg-[#FFF9F5] text-[#2A2730] border border-[#71648C]/10")}
                      style={{ fontWeight: 600 }}
                    >
                      Rs.{amount}
                    </button>
                  ))}
                </div>

                <div className="mb-6 p-4 bg-gradient-to-br from-[#71648C]/10 to-[#71648C]/5 rounded-xl">
                  <div className="mb-1" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#71648C" }}>
                    YOUR IMPACT
                  </div>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#2A2730" }}>
                    Rs.{donationAmount} = {program.impactMap[donationAmount as keyof typeof program.impactMap] || "meaningful support"}
                  </p>
                </div>

                <a
                  href="/donate"
                  className="block w-full text-center py-4 bg-[#71648C] text-white rounded-xl hover:bg-[#5d5373] transition-all shadow-lg"
                  style={{ fontWeight: 700 }}
                >
                  Donate Now
                </a>

                <div className="mt-6 pt-6 border-t border-[#71648C]/10">
                  <h4 className="mb-3" style={{ fontSize: "1rem", fontWeight: 600, color: "#2A2730" }}>
                    Related Programs
                  </h4>
                  <div className="space-y-2">
                    {program.related.map((p) => (
                      <a
                        key={p.url}
                        href={p.url}
                        className="block p-3 bg-[#FFF9F5] rounded-xl hover:bg-[#71648C]/5 transition-all"
                        style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#2A2730" }}
                      >
                        {p.title} &#8594;
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}