import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Heart, Send } from "lucide-react";

const existingMessages = [
  "Sending love and warm thoughts your way! 💛",
  "You are valued and appreciated.",
  "Thank you for sharing your wisdom with us.",
  "Your smile brightens our day!",
  "You're never alone—we're thinking of you.",
];

export function SendWarmth() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(existingMessages);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([message, ...messages]);
      setMessage("");
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-[#D8CFE3]/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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
            Send Warmth
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{
              fontSize: '1.125rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#6F6A75',
            }}
          >
            Share a message of support. Your words will bring a smile to a senior today.
          </p>
        </motion.div>

        {/* Input area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-[#71648C]/10 mb-12"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your warm message here..."
              className="flex-1 px-6 py-4 bg-[#FFF9F5] rounded-2xl border border-[#71648C]/10 focus:outline-none focus:ring-2 focus:ring-[#71648C]/20 transition-all"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                color: '#2A2730',
              }}
            />
            <button
              onClick={handleSend}
              className="px-8 py-4 bg-[#71648C] text-white rounded-2xl hover:bg-[#5d5373] transition-all hover:shadow-lg flex items-center gap-2"
              style={{ fontWeight: 600 }}
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
        </motion.div>

        {/* Messages wall */}
        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence>
            {messages.slice(0, 8).map((msg, index) => (
              <motion.div
                key={`${msg}-${index}`}
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
                className="bg-gradient-to-br from-white to-[#D8CFE3]/10 backdrop-blur rounded-2xl p-6 border border-white/50 shadow-sm relative"
              >
                <Heart className="absolute top-4 right-4 w-5 h-5 text-[#B7848C]/30" />
                <p
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#2A2730',
                  }}
                >
                  {msg}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
