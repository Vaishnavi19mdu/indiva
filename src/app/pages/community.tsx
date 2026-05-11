import { motion } from "motion/react";
import { LettersAcrossGenerations } from "../components/letters";
import { SendWarmth } from "../components/send-warmth";
import { ImpactRipple } from "../components/impact-ripple";
import { MemoryGarden } from "../components/memory-garden";

function CommunityHero() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              color: '#2A2730',
            }}
          >
            Our Community
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontSize: '1.25rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#6F6A75',
            }}
          >
            A space where generations connect, stories are shared, and every contribution creates ripples of positive change.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function CommunityPage() {
  return (
    <>
      <CommunityHero />
      <LettersAcrossGenerations />
      <SendWarmth />
      <ImpactRipple />
      <MemoryGarden />
    </>
  );
}
