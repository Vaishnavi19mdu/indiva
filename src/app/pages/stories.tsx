import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Heart, ArrowRight, X, Play, MapPin, Calendar } from "lucide-react";

const STORIES = [
  {
    id: 1,
    name: "Margaret D'Souza",
    age: 78,
    location: "Chennai, Tamil Nadu",
    type: "Senior",
    tag: "SENIOR STORY",
    tagColor: "#71648C",
    gradient: "from-[#71648C]/10 to-[#71648C]/5",
    avatarGradient: "from-[#71648C] to-[#B7848C]",
    shortQuote: "The volunteers don't just visit — they listen. For the first time in years, I feel truly seen.",
    fullStory: `I lost my husband in 2019, and after that my world became very small. My children live abroad and call when they can, but the silence in the evenings was the hardest part.

When Indivaa first reached out, I almost said no. I didn't want pity. But Priya, my volunteer, didn't bring pity — she brought a chess board. And arguments about old Tamil films. And questions about my life that nobody had thought to ask in years.

Now I have someone who knows that I prefer filter coffee to instant, that I was a school teacher for 34 years, and that I still write poetry every Thursday morning. She doesn't just visit — she witnesses my life.

That is something I didn't know I was missing until I found it again.`,
    joined: "March 2022",
    visits: "48 visits",
    highlight: "Former school teacher, poet",
  },
  {
    id: 2,
    name: "Rajan Krishnaswamy",
    age: 82,
    location: "Coimbatore, Tamil Nadu",
    type: "Senior",
    tag: "SENIOR STORY",
    tagColor: "#71648C",
    gradient: "from-[#71648C]/10 to-[#71648C]/5",
    avatarGradient: "from-[#71648C] to-[#9A7FB0]",
    shortQuote: "I thought I had nothing left to teach. Turns out I had a classroom full of things.",
    fullStory: `My knees don't work the way they used to. My eyesight isn't what it was. But my mind — my mind is still full.

When Arjun started visiting, he asked me about my work as an engineer. I spent 40 years building bridges across South India. I thought that chapter was closed. But Arjun kept asking questions, kept pulling stories out of me — about the floods of 1984, about the team that worked through two monsoons to finish the Kaveri bridge.

He brought a notebook. He said he wanted to write it all down. Now we are working on something together — a small record of what it felt like to build things with your hands in a different era.

I feel useful again. That is not a small thing.`,
    joined: "June 2021",
    visits: "67 visits",
    highlight: "Retired civil engineer, bridge builder",
  },
  {
    id: 3,
    name: "Priya Venkataraman",
    age: 29,
    location: "Chennai, Tamil Nadu",
    type: "Volunteer",
    tag: "VOLUNTEER JOURNEY",
    tagColor: "#B7848C",
    gradient: "from-[#B7848C]/10 to-[#B7848C]/5",
    avatarGradient: "from-[#B7848C] to-[#D4A0A8]",
    shortQuote: "Every visit reminds me what truly matters. Their stories have taught me more than any book.",
    fullStory: `I signed up to volunteer because I thought it would look good on my resume. I'm embarrassed to admit that now.

My first visit to Margaret aunty was terrifying. I didn't know what to say. She made it easy — she just started talking about a Sivaji Ganesan film and asked me my opinion. I had the wrong opinion, apparently. We argued for twenty minutes. I came back the next week.

Three years later, I can't imagine my month without her. She's taught me how to sit with silence, how to ask real questions, how to hold space for someone who is grieving and still full of life at the same time.

I became a better designer because of her — she told me once that a good teacher, like a good design, makes you feel comfortable before it challenges you. I use that every day.

I didn't do this for my resume. I do it because Margaret aunty is one of the most interesting people I have ever met, and I am lucky to know her.`,
    joined: "January 2022",
    visits: "51 visits",
    highlight: "UX Designer, 3-year volunteer",
  },
  {
    id: 4,
    name: "Aarav Sharma",
    age: 14,
    location: "Bengaluru, Karnataka",
    type: "Young Volunteer",
    tag: "YOUNG VOLUNTEER",
    tagColor: "#5A4C80",
    gradient: "from-[#D8CFE3]/20 to-[#D8CFE3]/10",
    avatarGradient: "from-[#5A4C80] to-[#71648C]",
    shortQuote: "Grandma Rose taught me chess and tells the best stories. I can't wait for our next visit.",
    fullStory: `My school started a community service programme and I picked this one because my mum said it would be meaningful. I thought it would be boring.

Rose aunty is 79 and she destroyed me at chess in seven minutes on our first meeting. I didn't let her win. She just won.

We've been meeting every two weeks for almost a year now. She taught me chess properly — the history of it, the strategy, how to think three moves ahead. She said that's also how you get through life.

She was a librarian for 30 years in Bengaluru. She knows things about practically every book ever written. Now when I read something, I tell her about it and she tells me what else I should read next. My English teacher says my essays have improved a lot this year.

I used to think old people just wanted someone to talk at them. Rose aunty talks with me. It's different.`,
    joined: "September 2023",
    visits: "22 visits",
    highlight: "Student, chess enthusiast",
  },
  {
    id: 5,
    name: "Lakshmi Iyer",
    age: 75,
    location: "Madurai, Tamil Nadu",
    type: "Senior",
    tag: "SENIOR STORY",
    tagColor: "#71648C",
    gradient: "from-[#71648C]/10 to-[#71648C]/5",
    avatarGradient: "from-[#B7848C] to-[#71648C]",
    shortQuote: "I had forgotten what it felt like to laugh until my stomach hurt. Now I remember every week.",
    fullStory: `My daughter worried about me. After my bypass surgery I stopped going out, stopped cooking, stopped doing much of anything. Fear does that to you — it shrinks your world until all you can see are the walls.

Sofia was assigned to me and she arrived at my door with jasmine for my hair and absolutely no idea how to make proper rasam. We spent three visits teaching her. Her rasam is still too thin but she's getting there.

The programme gave me back my purpose. I am teaching again — teaching cooking, teaching how to sit on the floor properly, teaching why you should always add the curry leaves before the tomatoes.

I had my one-year post-surgery checkup last month. My doctor said my blood pressure is the best it has been in five years. He asked what I had changed. I said I had found someone to cook for again.`,
    joined: "August 2022",
    visits: "39 visits",
    highlight: "Retired homemaker, Carnatic music lover",
  },
  {
    id: 6,
    name: "Meera & Sofia",
    age: 0,
    location: "Madurai → Chennai",
    type: "Bond Story",
    tag: "A BOND STORY",
    tagColor: "#5A4C80",
    gradient: "from-[#5A4C80]/8 to-[#B7848C]/8",
    avatarGradient: "from-[#5A4C80] to-[#B7848C]",
    shortQuote: "We were matched by an algorithm. What grew between us was entirely human.",
    fullStory: `Sofia was a 26-year-old software engineer who hadn't spoken to her own grandmother in four years — distance, time zones, the usual excuses.

Meera aunty was 75, post-surgery, and scared.

They were matched in August 2022. Their first visit lasted eleven minutes. Sofia didn't know what to say and Meera aunty was tired and a little suspicious of this young woman who had shown up with flowers and nervous energy.

The second visit, Sofia brought her laptop and asked Meera aunty to teach her how to make rasam. The camera went on. Her mother was on the other end, watching, crying a little.

That was eighteen months ago. Meera aunty has now taught Sofia seventeen dishes. Sofia has taught Meera aunty how to use voice messages on her phone to talk to her daughter in Singapore. They speak every week.

At their last visit, Sofia was going through a hard time at work. Meera aunty made her sit, made her tea, and said: "Tell me everything. I'm not going anywhere."

That is exactly what this programme is supposed to do.`,
    joined: "August 2022",
    visits: "39 visits together",
    highlight: "A match that changed both of them",
  },
];

const STATS = [
  { number: "2,847", label: "Seniors supported", sub: "across 6 cities" },
  { number: "850+",  label: "Active volunteers", sub: "and growing every month" },
  { number: "41,000+", label: "Hours of connection", sub: "logged since 2020" },
  { number: "98%",   label: "Say they feel less lonely", sub: "after 3 months" },
];

function StoryModal({ story, onClose }: { story: typeof STORIES[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(42,39,48,0.6)",
        backdropFilter: "blur(6px)",
        zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 28,
          maxWidth: 620,
          width: "100%",
          padding: "clamp(28px, 5vw, 48px)",
          position: "relative",
          margin: "auto",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 20,
            width: 36, height: 36, borderRadius: "50%",
            background: "#f4f1f8", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={16} color="#71648C" />
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%",
            background: `linear-gradient(135deg, var(--from), var(--to))`,
            backgroundImage: `linear-gradient(135deg, #71648C, #B7848C)`,
            flexShrink: 0,
          }} />
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: story.tagColor, letterSpacing: "0.1em", marginBottom: 2 }}>
              {story.tag}
            </div>
            <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#2A2730" }}>{story.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <MapPin size={12} color="#6F6A75" />
              <span style={{ fontSize: "0.8rem", color: "#6F6A75" }}>{story.location}</span>
              <span style={{ color: "#D8CFE3" }}>·</span>
              <Calendar size={12} color="#6F6A75" />
              <span style={{ fontSize: "0.8rem", color: "#6F6A75" }}>{story.joined}</span>
            </div>
          </div>
        </div>

        {/* Pull quote */}
        <div style={{
          background: "linear-gradient(135deg, #f4f1f8, #fdf8f9)",
          borderRadius: 16, padding: "16px 20px",
          marginBottom: 24, position: "relative",
        }}>
          <Quote size={20} color="#71648C" style={{ opacity: 0.3, position: "absolute", top: 12, right: 16 }} />
          <p style={{ fontSize: "1.0625rem", fontStyle: "italic", color: "#2A2730", lineHeight: 1.6, margin: 0 }}>
            "{story.shortQuote}"
          </p>
        </div>

        {/* Full story */}
        <div style={{ marginBottom: 24 }}>
          {story.fullStory.split("\n\n").map((para, i) => (
            <p key={i} style={{
              fontSize: "0.9375rem", lineHeight: 1.75, color: "#4A4550",
              marginBottom: i < story.fullStory.split("\n\n").length - 1 ? 14 : 0,
            }}>
              {para}
            </p>
          ))}
        </div>

        {/* Meta chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[story.visits, story.highlight].map((chip) => (
            <span key={chip} style={{
              fontSize: "0.78rem", fontWeight: 500,
              background: "#f4f1f8", color: "#71648C",
              borderRadius: 99, padding: "5px 12px",
            }}>
              {chip}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StoryCard({ story, onClick }: { story: typeof STORIES[0]; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        borderRadius: 24,
        padding: "clamp(20px, 3vw, 32px)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 2px 16px rgba(113,100,140,0.07)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 260,
      }}
      className={`bg-gradient-to-br ${story.gradient}`}
    >
      <Quote
        size={56}
        color="#71648C"
        style={{ position: "absolute", top: 16, right: 16, opacity: 0.08 }}
      />

      <div>
        <div style={{
          fontSize: "0.7rem", fontWeight: 600,
          color: story.tagColor, letterSpacing: "0.1em",
          marginBottom: 10,
        }}>
          {story.tag}
        </div>
        <p style={{
          fontSize: "1.0625rem", fontStyle: "italic",
          lineHeight: 1.6, color: "#2A2730",
          marginBottom: 20,
        }}>
          "{story.shortQuote}"
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            backgroundImage: `linear-gradient(135deg, #71648C, #B7848C)`,
          }} />
          <div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
              {story.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
              <MapPin size={10} color="#6F6A75" />
              <span style={{ fontSize: "0.75rem", color: "#6F6A75" }}>{story.location}</span>
            </div>
          </div>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(255,255,255,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ArrowRight size={14} color="#71648C" />
        </div>
      </div>
    </motion.div>
  );
}

export function StoriesPage() {
  const [selected, setSelected] = useState<typeof STORIES[0] | null>(null);
  const [filter, setFilter] = useState<"All" | "Senior" | "Volunteer" | "Young Volunteer" | "Bond Story">("All");

  const filters = ["All", "Senior", "Volunteer", "Young Volunteer", "Bond Story"] as const;

  const filtered = filter === "All"
    ? STORIES
    : STORIES.filter(s => s.type === filter);

  return (
    <div style={{ background: "#FFF9F5", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
        paddingInline: "clamp(16px, 4vw, 48px)",
        background: "linear-gradient(160deg, #EDE8F4 0%, #FFF9F5 55%)",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div style={{
              display: "inline-block",
              fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em",
              color: "#71648C", background: "rgba(113,100,140,0.1)",
              borderRadius: 99, padding: "5px 14px", marginBottom: 20,
            }}>
              REAL VOICES
            </div>
            <h1 style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
              fontWeight: 800, letterSpacing: "-0.04em",
              lineHeight: 1.1, color: "#2A2730",
              marginBottom: 20,
            }}>
              Stories that cross<br />
              <span style={{ color: "#71648C" }}>generations.</span>
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              lineHeight: 1.75, color: "#6F6A75", maxWidth: 560, margin: "0 auto",
            }}>
              Behind every number is a person. Here are some of the people whose lives have been touched — in their own words.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{
        background: "#fff",
        borderTop: "1px solid rgba(113,100,140,0.08)",
        borderBottom: "1px solid rgba(113,100,140,0.08)",
        paddingBlock: "clamp(28px, 4vw, 44px)",
        paddingInline: "clamp(16px, 4vw, 48px)",
      }}>
        <div style={{
          maxWidth: 960, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "clamp(20px, 3vw, 40px)",
        }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#2A2730", letterSpacing: "-0.03em" }}>
                {stat.number}
              </div>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730", marginTop: 2 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#6F6A75", marginTop: 2 }}>
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stories grid */}
      <section style={{
        paddingBlock: "clamp(48px, 7vw, 96px)",
        paddingInline: "clamp(16px, 4vw, 48px)",
        maxWidth: 1200, margin: "0 auto",
      }}>
        {/* Filter pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 18px",
                borderRadius: 99,
                border: filter === f ? "none" : "1px solid rgba(113,100,140,0.2)",
                background: filter === f ? "#71648C" : "transparent",
                color: filter === f ? "#fff" : "#71648C",
                fontWeight: 600,
                fontSize: "0.8125rem",
                cursor: "pointer",
                transition: "all 0.18s",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: "clamp(14px, 2.5vw, 24px)",
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((story) => (
              <StoryCard key={story.id} story={story} onClick={() => setSelected(story)} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA banner */}
      <section style={{
        paddingBlock: "clamp(48px, 6vw, 80px)",
        paddingInline: "clamp(16px, 4vw, 48px)",
        background: "linear-gradient(135deg, #71648C 0%, #5A4C80 100%)",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <Heart size={36} color="rgba(255,255,255,0.4)" style={{ marginBottom: 16 }} />
          <h2 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800, letterSpacing: "-0.03em",
            color: "#fff", marginBottom: 16,
          }}>
            Your story could be next.
          </h2>
          <p style={{
            fontSize: "1.0625rem", lineHeight: 1.7,
            color: "rgba(255,255,255,0.75)", marginBottom: 32,
          }}>
            Whether you want to volunteer, support a senior, or just learn more — there's a place for you here.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {["Become a Volunteer", "Support a Senior"].map((label, i) => (
              <button
                key={label}
                style={{
                  padding: "14px 28px",
                  borderRadius: 12,
                  border: i === 0 ? "none" : "1.5px solid rgba(255,255,255,0.4)",
                  background: i === 0 ? "#fff" : "transparent",
                  color: i === 0 ? "#71648C" : "#fff",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  cursor: "pointer",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Story modal */}
      <AnimatePresence>
        {selected && <StoryModal story={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}