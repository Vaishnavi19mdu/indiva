import { motion } from "motion/react";
import { useState } from "react";
import { Heart, Shield, Lock, TrendingUp, Check, AlertCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const MIN_AMOUNT = 20;

export function DonatePage() {
  const location = useLocation();
  const preselected = location.state?.amount ?? 1500;

  const [amount, setAmount] = useState(preselected);
  const [customInput, setCustomInput] = useState(String(preselected));
  const [isRecurring, setIsRecurring] = useState(false);
  const [dedication, setDedication] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [amountError, setAmountError] = useState("");

  const presetAmounts = [500, 1500, 3000, 5000];

  const getImpact = (amt: number) => {
    if (amt >= 5000) return "Full month of care for 1 senior";
    if (amt >= 3000) return "1 week of wellness visits + therapy";
    if (amt >= 1500) return "3 home visits + health checkup";
    if (amt >= MIN_AMOUNT) return "1 wellness visit + meal support";
    return "";
  };

  const handlePreset = (preset: number) => {
    setAmount(preset);
    setCustomInput(String(preset));
    setAmountError("");
  };

  const handleCustomChange = (val: string) => {
    setCustomInput(val);
    const num = Number(val);
    if (!val || isNaN(num)) {
      setAmountError("Please enter a valid amount.");
      return;
    }
    if (num <= MIN_AMOUNT) {
      setAmountError(`Minimum donation amount is ₹${MIN_AMOUNT + 1}.`);
      setAmount(num);
      return;
    }
    setAmountError("");
    setAmount(num);
  };

  const isValid = amount > MIN_AMOUNT;

  const handleDonate = () => {
    if (!isValid) {
      setAmountError(`Minimum donation amount is ₹${MIN_AMOUNT + 1}.`);
      return;
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="pt-36 pb-24 px-4 sm:px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">

          {/* Left: Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="mb-6"
              style={{
                fontSize: "clamp(1.75rem, 5vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#2A2730",
              }}
            >
              Your Generosity Changes Lives
            </h1>

            <p
              className="mb-8"
              style={{
                fontSize: "1.0625rem",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "#6F6A75",
              }}
            >
              Every contribution brings warmth, dignity, and companionship to seniors who need it most. 100% of your donation goes directly to supporting our programs.
            </p>

            {/* Trust indicators */}
            <div className="space-y-3 mb-10">
              {[
                { icon: Shield,     text: "100% Transparent — Every rupee tracked" },
                { icon: Lock,       text: "Secure Payment — Bank-level encryption" },
                { icon: TrendingUp, text: "Tax Deductible — 80G certified" },
                { icon: Heart,      text: "Direct Impact — No administrative overhead" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#71648C]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#71648C]" />
                  </div>
                  <span style={{ fontWeight: 500, color: "#2A2730", fontSize: "0.9375rem" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Impact stats */}
            <div className="bg-gradient-to-br from-[#D8CFE3]/20 to-[#71648C]/10 rounded-3xl p-6 sm:p-8">
              <h3 className="mb-4" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#2A2730" }}>
                Last Month's Impact
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Seniors Supported", value: "2,847" },
                  { label: "Home Visits",        value: "1,245" },
                  { label: "Meals Provided",     value: "4,532" },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between">
                    <span style={{ fontWeight: 500, color: "#6F6A75" }}>{stat.label}</span>
                    <span style={{ fontWeight: 700, color: "#2A2730" }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Donation form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#71648C]/10"
              style={{ boxShadow: "0 8px 40px rgba(113,100,140,0.12)" }}
            >
              <h2
                className="mb-6"
                style={{
                  fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "#2A2730",
                }}
              >
                Make Your Contribution
              </h2>

              {/* Preset amounts */}
              <div className="mb-5">
                <label className="block mb-3" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                  Select Amount
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handlePreset(preset)}
                      style={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        padding: "14px 0",
                        borderRadius: 12,
                        border: amount === preset ? "none" : "1px solid rgba(113,100,140,0.12)",
                        background: amount === preset ? "#71648C" : "#FFF9F5",
                        color: amount === preset ? "#fff" : "#2A2730",
                        cursor: "pointer",
                        touchAction: "manipulation",
                        transition: "background 0.18s, color 0.18s",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      ₹{preset.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom amount */}
              <div className="mb-5">
                <label className="block mb-3" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                  Or Enter Custom Amount
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ fontSize: "1.2rem", fontWeight: 600, color: "#6F6A75", pointerEvents: "none" }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={customInput}
                    onChange={(e) => handleCustomChange(e.target.value)}
                    className="w-full pl-10 pr-4 bg-[#FFF9F5] rounded-xl border focus:outline-none transition-all"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#2A2730",
                      padding: "14px 14px 14px 40px",
                      border: amountError
                        ? "1.5px solid #e05252"
                        : "1px solid rgba(113,100,140,0.12)",
                      borderRadius: 12,
                      WebkitAppearance: "none",
                    }}
                  />
                </div>
                {amountError && (
                  <div className="flex items-center gap-2 mt-2" style={{ color: "#c0392b", fontSize: "0.82rem", fontWeight: 500 }}>
                    <AlertCircle size={14} />
                    {amountError}
                  </div>
                )}
              </div>

              {/* Recurring toggle */}
              <div className="mb-5 flex items-center justify-between p-4 bg-[#FFF9F5] rounded-xl">
                <span style={{ fontWeight: 600, color: "#2A2730", fontSize: "0.9375rem" }}>
                  Make this monthly
                </span>
                <button
                  onClick={() => setIsRecurring(!isRecurring)}
                  role="switch"
                  aria-checked={isRecurring}
                  style={{
                    width: 52,
                    height: 30,
                    borderRadius: 99,
                    background: isRecurring ? "#71648C" : "#D8CFE3",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.2s",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      background: "#fff",
                      borderRadius: "50%",
                      position: "absolute",
                      top: 4,
                      left: isRecurring ? 26 : 4,
                      transition: "left 0.2s",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                    }}
                  />
                </button>
              </div>

              {/* Impact preview */}
              {isValid && (
                <div className="mb-5 p-4 bg-gradient-to-br from-[#71648C]/10 to-[#71648C]/5 rounded-xl">
                  <div className="mb-1" style={{ fontSize: "0.78rem", fontWeight: 600, color: "#71648C", letterSpacing: "0.06em" }}>
                    YOUR IMPACT
                  </div>
                  <p style={{ fontWeight: 600, color: "#2A2730", fontSize: "0.9375rem" }}>
                    {getImpact(amount)}
                  </p>
                </div>
              )}

              {/* Dedication note */}
              <div className="mb-6">
                <label className="block mb-3" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                  Dedication Note <span style={{ fontWeight: 400, color: "#6F6A75" }}>(Optional)</span>
                </label>
                <textarea
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  placeholder="In honor of someone special..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "#FFF9F5",
                    borderRadius: 12,
                    border: "1px solid rgba(113,100,140,0.12)",
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "#2A2730",
                    resize: "none",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Donate button */}
              <button
                onClick={handleDonate}
                disabled={!isValid}
                style={{
                  width: "100%",
                  padding: "16px 0",
                  background: isValid ? "#71648C" : "#c5bcd4",
                  color: "#fff",
                  borderRadius: 14,
                  border: "none",
                  fontWeight: 700,
                  fontSize: "1.0625rem",
                  cursor: isValid ? "pointer" : "not-allowed",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                  transition: "background 0.2s, box-shadow 0.2s",
                  boxShadow: isValid ? "0 4px 20px rgba(113,100,140,0.3)" : "none",
                }}
              >
                {isValid
                  ? `Donate ₹${amount.toLocaleString("en-IN")}${isRecurring ? " / month" : " now"}`
                  : `Minimum donation is ₹${MIN_AMOUNT + 1}`}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: 24,
          }}
          onClick={() => setShowSuccess(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: "#fff",
              borderRadius: 28,
              padding: "clamp(32px, 6vw, 56px)",
              maxWidth: 420,
              width: "100%",
              textAlign: "center",
              boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 72,
                height: 72,
                background: "linear-gradient(135deg, #71648C, #B7848C)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <Check style={{ width: 36, height: 36, color: "#fff" }} />
            </div>
            <h3
              className="mb-4"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#2A2730",
              }}
            >
              You made someone smile today.
            </h3>
            <p style={{ fontSize: "1.0625rem", fontWeight: 400, lineHeight: 1.6, color: "#6F6A75" }}>
              Thank you for your generous contribution of ₹{amount.toLocaleString("en-IN")}. Your kindness will bring warmth and joy to those who need it most.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}