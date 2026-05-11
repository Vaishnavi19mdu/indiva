import { motion } from "motion/react";
import { useState, useRef } from "react";
import { Check, Upload, ChevronRight, ChevronLeft, X, FileText, User, Mail, Phone, MapPin, Calendar, Clock, Heart, Shield } from "lucide-react";

const steps = ["Welcome", "Personal Info", "Interests & Skills", "Availability", "Verification"];

function calcAge(dob: string): number | null {
  if (!dob) return null;
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function generateAppId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 9; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `INDIVA${id}`;
}

export function VolunteerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    city: "",
    email: "",
    interests: [] as string[],
    availability: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const interests = [
    "Companionship Visits",
    "Reading Assistance",
    "Wellness Support",
    "Technology Help",
    "Cooking & Meals",
    "Transportation",
    "Event Planning",
    "Administrative Support",
  ];

  const computedAge = calcAge(formData.dob);

  const toggleInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter((i) => i !== interest)
        : [...formData.interests, interest],
    });
    if (errors.interests) setErrors((e) => ({ ...e, interests: "" }));
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setUploadError("Only PDF or Word (.doc / .docx) files are accepted.");
      setUploadedFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File must be under 5MB.");
      setUploadedFile(null);
      return;
    }
    setUploadError("");
    setUploadedFile(file);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
      if (!formData.dob) {
        newErrors.dob = "Date of birth is required.";
      } else if (computedAge === null || computedAge < 13) {
        newErrors.dob = "You must be at least 13 years old to volunteer.";
      }
      if (!formData.gender) newErrors.gender = "Please select a gender.";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
      if (!formData.city.trim()) newErrors.city = "City is required.";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email.";
      }
    }

    if (currentStep === 2) {
      if (formData.interests.length === 0)
        newErrors.interests = "Please select at least one interest.";
    }

    if (currentStep === 3) {
      if (!formData.availability)
        newErrors.availability = "Please select your availability.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validate()) return;
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setErrors({});
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const id = generateAppId();
    setAppId(id);
    setSubmitted(true);
  };

  const ErrorMsg = ({ field }: { field: string }) =>
    errors[field] ? (
      <p className="mt-1.5" style={{ fontSize: "0.8rem", color: "#c0392b", fontWeight: 500 }}>
        {errors[field]}
      </p>
    ) : null;

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-[#FFF9F5] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#71648C]/20 ${
      errors[field] ? "border-red-400" : "border-[#71648C]/10"
    }`;

  const maxDob = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 13);
    return d.toISOString().split("T")[0];
  })();

  // ── Submission Confirmation Card ──────────────────────────────────────────
  if (submitted) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl shadow-xl border border-[#71648C]/10 overflow-hidden"
          >
            {/* Header band */}
            <div className="bg-gradient-to-r from-[#71648C] to-[#5d5373] px-8 py-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
                Application Submitted!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
                Thank you for signing up to make a difference.
              </p>

              {/* Application ID badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="inline-block mt-5 px-5 py-2.5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Application ID
                </p>
                <p style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff", letterSpacing: "0.05em", fontFamily: "monospace" }}>
                  {appId}
                </p>
              </motion.div>
            </div>

            {/* Details grid */}
            <div className="px-8 py-8">
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6F6A75", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Submitted Details
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Personal */}
                <DetailRow icon={<User className="w-4 h-4" />} label="Full Name" value={formData.fullName} />
                <DetailRow icon={<Mail className="w-4 h-4" />} label="Email" value={formData.email} />
                <DetailRow icon={<Phone className="w-4 h-4" />} label="Phone" value={formData.phone} />
                <DetailRow icon={<MapPin className="w-4 h-4" />} label="City" value={formData.city} />
                <DetailRow
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date of Birth"
                  value={`${formData.dob} (${computedAge} yrs)`}
                />
                <DetailRow
                  icon={<User className="w-4 h-4" />}
                  label="Gender"
                  value={formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1).replace(/-/g, " ")}
                />
                <DetailRow icon={<Clock className="w-4 h-4" />} label="Availability" value={formData.availability} />
                {uploadedFile && (
                  <DetailRow icon={<Shield className="w-4 h-4" />} label="ID Document" value={uploadedFile.name} />
                )}
              </div>

              {/* Interests */}
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#F0EBF8] flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5 text-[#71648C]" />
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6F6A75" }}>Interests & Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg"
                      style={{ background: "#F0EBF8", color: "#71648C", fontSize: "0.8rem", fontWeight: 600 }}
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer note */}
              <div className="mt-8 p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, #F0EBF8 0%, #E8E2F5 100%)" }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#2A2730", lineHeight: 1.6 }}>
                  We'll reach out to <strong>{formData.email}</strong> within 2–3 business days to confirm your onboarding. Keep your application ID <strong style={{ fontFamily: "monospace" }}>{appId}</strong> handy for reference.
                </p>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(0);
                  setFormData({ fullName: "", dob: "", gender: "", phone: "", city: "", email: "", interests: [], availability: "" });
                  setUploadedFile(null);
                  setAppId("");
                }}
                className="mt-6 w-full px-6 py-4 rounded-xl border border-[#71648C]/20 text-[#71648C] hover:bg-[#71648C]/5 transition-all"
                style={{ fontWeight: 600 }}
              >
                Submit Another Application
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Multi-step Form ───────────────────────────────────────────────────────
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    index <= currentStep
                      ? "bg-[#71648C] text-white"
                      : "bg-[#D8CFE3]/30 text-[#6F6A75]"
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-12 md:w-20 mx-2 rounded-full transition-all ${
                      index < currentStep ? "bg-[#71648C]" : "bg-[#D8CFE3]/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#6F6A75" }}>
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </p>
        </div>

        {/* Form container */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#71648C]/10"
        >
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center">
              <h2
                className="mb-4"
                style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#2A2730" }}
              >
                Welcome, Future Caregiver!
              </h2>
              <p
                className="mb-8"
                style={{ fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.7, color: "#6F6A75" }}
              >
                Thank you for choosing to make a difference. Your time and compassion will transform lives. This short process will help us match you with seniors who will benefit most from your unique skills and availability.
              </p>
              <div className="bg-gradient-to-br from-[#D8CFE3]/20 to-[#71648C]/10 rounded-2xl p-6 mb-8">
                <p style={{ fontSize: "1rem", fontWeight: 500, color: "#2A2730" }}>
                  This will only take 3-5 minutes to complete.
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div>
              <h2
                className="mb-6"
                style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}
              >
                Personal Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block mb-2" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors((er) => ({ ...er, fullName: "" }));
                    }}
                    className={inputClass("fullName")}
                    placeholder="Enter your full name"
                  />
                  <ErrorMsg field="fullName" />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                      Date of Birth * <span style={{ fontWeight: 400, color: "#6F6A75" }}>(min. age 13)</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dob}
                      max={maxDob}
                      onChange={(e) => {
                        setFormData({ ...formData, dob: e.target.value });
                        if (errors.dob) setErrors((er) => ({ ...er, dob: "" }));
                      }}
                      className={inputClass("dob")}
                    />
                    <ErrorMsg field="dob" />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                      Age <span style={{ fontWeight: 400, color: "#6F6A75" }}>(auto-calculated)</span>
                    </label>
                    <div
                      className="w-full px-4 py-3 rounded-xl border border-[#71648C]/10"
                      style={{
                        background: "#F0EBF8",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#71648C",
                        minHeight: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {computedAge !== null && computedAge >= 0 ? (
                        `${computedAge} years old`
                      ) : (
                        <span style={{ color: "#aaa", fontWeight: 400 }}>Auto-calculated</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => {
                      setFormData({ ...formData, gender: e.target.value });
                      if (errors.gender) setErrors((er) => ({ ...er, gender: "" }));
                    }}
                    className={inputClass("gender")}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  <ErrorMsg field="gender" />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors((er) => ({ ...er, phone: "" }));
                      }}
                      className={inputClass("phone")}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    <ErrorMsg field="phone" />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value });
                        if (errors.city) setErrors((er) => ({ ...er, city: "" }));
                      }}
                      className={inputClass("city")}
                      placeholder="Your city"
                    />
                    <ErrorMsg field="city" />
                  </div>
                </div>

                <div>
                  <label className="block mb-2" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2A2730" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors((er) => ({ ...er, email: "" }));
                    }}
                    className={inputClass("email")}
                    placeholder="your.email@example.com"
                  />
                  <ErrorMsg field="email" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Interests & Skills */}
          {currentStep === 2 && (
            <div>
              <h2
                className="mb-4"
                style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}
              >
                Interests & Skills
              </h2>
              <p className="mb-6" style={{ fontSize: "1rem", fontWeight: 400, color: "#6F6A75" }}>
                Select all areas where you'd like to contribute (select multiple)
              </p>
              {errors.interests && (
                <p className="mb-4" style={{ fontSize: "0.8rem", color: "#c0392b", fontWeight: 500 }}>
                  {errors.interests}
                </p>
              )}
              <div className="grid md:grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      formData.interests.includes(interest)
                        ? "bg-[#71648C] text-white shadow-lg"
                        : "bg-[#FFF9F5] text-[#2A2730] border border-[#71648C]/10 hover:bg-[#71648C]/5"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{interest}</span>
                      {formData.interests.includes(interest) && <Check className="w-5 h-5" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Availability */}
          {currentStep === 3 && (
            <div>
              <h2
                className="mb-4"
                style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}
              >
                Your Availability
              </h2>
              <p className="mb-6" style={{ fontSize: "1rem", fontWeight: 400, color: "#6F6A75" }}>
                How often can you volunteer?
              </p>
              {errors.availability && (
                <p className="mb-4" style={{ fontSize: "0.8rem", color: "#c0392b", fontWeight: 500 }}>
                  {errors.availability}
                </p>
              )}
              <div className="space-y-3">
                {["Once a week", "Twice a week", "Weekends only", "Flexible schedule", "Monthly events"].map(
                  (option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFormData({ ...formData, availability: option });
                        if (errors.availability) setErrors((er) => ({ ...er, availability: "" }));
                      }}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        formData.availability === option
                          ? "bg-[#71648C] text-white shadow-lg"
                          : "bg-[#FFF9F5] text-[#2A2730] border border-[#71648C]/10 hover:bg-[#71648C]/5"
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Step 4: Verification */}
          {currentStep === 4 && (
            <div>
              <h2
                className="mb-4"
                style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#2A2730" }}
              >
                Identity Verification
              </h2>
              <p className="mb-6" style={{ fontSize: "1rem", fontWeight: 400, color: "#6F6A75" }}>
                Upload a government ID for verification — PDF or Word only (optional but recommended)
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />

              {!uploadedFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileChange(e.dataTransfer.files?.[0] ?? null);
                  }}
                  className="border-2 border-dashed border-[#71648C]/30 rounded-2xl p-12 text-center bg-[#FFF9F5] hover:bg-[#71648C]/5 transition-all cursor-pointer"
                >
                  <Upload className="w-12 h-12 text-[#71648C] mx-auto mb-4" />
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "#2A2730" }}>
                    Click to upload or drag and drop
                  </p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 400, color: "#6F6A75", marginTop: "0.5rem" }}>
                    PDF or Word (.doc / .docx) — max 5MB
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-4 p-5 bg-[#F0EBF8] rounded-2xl border border-[#71648C]/20">
                  <div className="w-12 h-12 rounded-xl bg-[#71648C]/15 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#71648C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontWeight: 600, color: "#2A2730", fontSize: "0.9375rem" }} className="truncate">
                      {uploadedFile.name}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#6F6A75", marginTop: 2 }}>
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="p-2 hover:bg-[#71648C]/10 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5 text-[#71648C]" />
                  </button>
                </div>
              )}

              {uploadError && (
                <p className="mt-3" style={{ fontSize: "0.8rem", color: "#c0392b", fontWeight: 500 }}>
                  {uploadError}
                </p>
              )}

              <div className="mt-6 bg-gradient-to-br from-[#D8CFE3]/20 to-[#71648C]/10 rounded-2xl p-6">
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#2A2730" }}>
                  Your information is kept strictly confidential and used only for volunteer matching and safety purposes.
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex-1 px-6 py-4 bg-white border border-[#71648C]/20 text-[#71648C] rounded-xl hover:bg-[#71648C]/5 transition-all flex items-center justify-center gap-2"
                style={{ fontWeight: 600 }}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}
            <button
              onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
              className="flex-1 px-6 py-4 bg-[#71648C] text-white rounded-xl hover:bg-[#5d5373] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              style={{ fontWeight: 700 }}
            >
              {currentStep === steps.length - 1 ? "Submit Application" : "Continue"}
              {currentStep < steps.length - 1 && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Helper sub-component ──────────────────────────────────────────────────────
function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#FAFAFA", border: "1px solid #F0EBF8" }}>
      <div className="w-7 h-7 rounded-lg bg-[#F0EBF8] flex items-center justify-center flex-shrink-0 mt-0.5" style={{ color: "#71648C" }}>
        {icon}
      </div>
      <div className="min-w-0">
        <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#6F6A75", textTransform: "uppercase", letterSpacing: "0.07em" }}>
          {label}
        </p>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#2A2730", marginTop: "2px", wordBreak: "break-word" }}>
          {value}
        </p>
      </div>
    </div>
  );
}