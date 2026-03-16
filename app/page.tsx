"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
  type Variants,
} from "framer-motion";

/* ─────────────────────────────────────────────
   Reusable Animation Variants
   ───────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const fadeFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 0 0 rgba(249,115,22,0)",
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 60px rgba(249,115,22,0.25)",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.3,
    },
  },
};

/* ─────────────────────────────────────────────
   Animated Counter Hook
   ───────────────────────────────────────────── */

function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startCounting || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [startCounting, end, duration]);

  return count;
}

/* ─────────────────────────────────────────────
   Scroll-triggered wrapper
   ───────────────────────────────────────────── */

function ScrollReveal({
  children,
  variants = fadeUp,
  custom = 0,
  className = "",
}: {
  children: React.ReactNode;
  variants?: Variants;
  custom?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Stat Counter Component
   ───────────────────────────────────────────── */

function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={delay}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold text-orange-500 tabular-nums">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-zinc-400 text-lg">{label}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Floating Particle Orbs
   ───────────────────────────────────────────── */

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="floating-orb absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-orange-500/[0.04] blur-3xl" />
      <div className="floating-orb-2 absolute top-[60%] right-[10%] w-80 h-80 rounded-full bg-red-500/[0.04] blur-3xl" />
      <div className="floating-orb-3 absolute top-[40%] left-[60%] w-48 h-48 rounded-full bg-orange-600/[0.05] blur-3xl" />
      <div className="floating-orb-4 absolute bottom-[20%] left-[30%] w-56 h-56 rounded-full bg-amber-500/[0.03] blur-3xl" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Competition Type Data
   ───────────────────────────────────────────── */

const competitionTypes = [
  {
    icon: "🏋️",
    title: "Weight Loss %",
    description: "Lose the highest percentage of body weight. Weekly weigh-ins with photo proof keep everyone honest.",
  },
  {
    icon: "🏃",
    title: "Distance",
    description: "Run, walk, or cycle the most miles. GPS-tracked and synced automatically from your fitness device.",
  },
  {
    icon: "⏱️",
    title: "Active Minutes",
    description: "Stay active the longest. Any movement counts — gym sessions, yoga, hikes, pickup games.",
  },
  {
    icon: "🏆",
    title: "Custom Goals",
    description: "Set your own metric and challenge friends. Flexibility to compete on what matters to you.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Create or Join",
    description: "Start a competition or join one with a code. Set the buy-in, duration, and rules.",
  },
  {
    step: 2,
    title: "Put Money Down",
    description: "Everyone puts their stake in the pot. Secure payments handled through Stripe.",
  },
  {
    step: 3,
    title: "Compete",
    description: "Track your progress daily. See the live leaderboard. Push each other with in-app chat.",
  },
  {
    step: 4,
    title: "Win the Pot",
    description: "Top performers split the prize pool. Automatic payouts — no awkward Venmo requests.",
  },
];

/* ─────────────────────────────────────────────
   Step Number Component (counts up)
   ───────────────────────────────────────────── */

function StepNumber({ number, inView }: { number: number; inView: boolean }) {
  const count = useCountUp(number, 800, inView);
  return (
    <span className="text-5xl font-black text-orange-500/20 tabular-nums">
      {String(count).padStart(2, "0")}
    </span>
  );
}

/* ═════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═════════════════════════════════════════════ */

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const headlineWords = "Fitness competitions with real money on the line.".split(" ");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden"
      >
        {/* ─── HERO SECTION ─── */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col items-center justify-center px-6 animated-gradient-bg"
        >
          <FloatingOrbs />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="mb-6"
            >
              <span className="text-sm tracking-[0.4em] uppercase text-orange-500 font-semibold">
                Podium
              </span>
            </motion.div>

            {/* App Store Badge */}
            <motion.div
              variants={bounceIn}
              initial="hidden"
              animate="visible"
              className="mb-10"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-sm text-zinc-400 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Coming to the App Store
              </span>
            </motion.div>

            {/* Headline — word by word */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.08,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className={`inline-block mr-[0.3em] ${
                    word === "real" || word === "money"
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" as const }}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10"
            >
              Create challenges, stake your entry fee, and compete against friends.
              Top performers take home the pot. No excuses.
            </motion.p>

            {/* Email Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 2.0, ease: [0.25, 0.4, 0.25, 1] }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 text-center py-3 px-6 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400"
                >
                  You&apos;re on the list. We&apos;ll be in touch.
                </motion.div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-5 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-400 hover:to-red-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] cursor-pointer"
                  >
                    Get Early Access
                  </button>
                </>
              )}
            </motion.form>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 rounded-full bg-white/40" />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── COMPETITION TYPES ─── */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                Choose Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Battle
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal custom={1}>
              <p className="text-zinc-400 text-center text-lg max-w-2xl mx-auto mb-16">
                Four competition types. One goal: be the best and get paid for it.
              </p>
            </ScrollReveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {competitionTypes.map((comp, i) => (
                <motion.div
                  key={comp.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="group relative"
                >
                  <motion.div
                    variants={cardHover}
                    className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm transition-colors hover:border-orange-500/20"
                  >
                    <div className="text-4xl mb-4">{comp.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {comp.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {comp.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                How It{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Works
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal custom={1}>
              <p className="text-zinc-400 text-center text-lg max-w-2xl mx-auto mb-20">
                From challenge to cashout in four simple steps.
              </p>
            </ScrollReveal>

            <div className="space-y-16">
              {howItWorks.map((item, i) => {
                const ref = useRef(null);
                const isInView = useInView(ref, { once: true, margin: "-80px" });

                return (
                  <motion.div
                    key={item.step}
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeFromLeft}
                    custom={i * 0.5}
                    className="flex items-start gap-6"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <StepNumber number={item.step} inView={isInView} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2 text-white">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── STATS SECTION ─── */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                Built for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Results
                </span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCounter value={10000} suffix="+" label="Beta Signups" delay={0} />
              <StatCounter value={500} prefix="$" suffix="K" label="Projected Payouts" delay={1} />
              <StatCounter value={98} suffix="%" label="Completion Rate" delay={2} />
              <StatCounter value={4} suffix=".9" label="App Store Goal" delay={3} />
            </div>
          </div>
        </section>

        {/* ─── FITNESS TIERS ─── */}
        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Compete at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  your level
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal custom={1}>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-16">
                Podium syncs with Apple Health to automatically place you in the right tier based on your real fitness data. No manual input. No guessing.
              </p>
            </ScrollReveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { tier: "Beginner", emoji: "🟢", desc: "Building a fitness habit", borderColor: "border-green-500/30" },
                { tier: "Active",   emoji: "🔵", desc: "Regularly moving & exercising", borderColor: "border-blue-500/30" },
                { tier: "Athlete",  emoji: "🟡", desc: "Seriously active, consistent workouts", borderColor: "border-yellow-500/30" },
                { tier: "Elite",    emoji: "🔴", desc: "Peak performance, daily training", borderColor: "border-red-500/30" },
              ].map((t, i) => (
                <motion.div
                  key={t.tier}
                  variants={fadeUp}
                  custom={i}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  <motion.div
                    variants={cardHover}
                    className={"p-6 rounded-2xl bg-white/[0.03] border backdrop-blur-sm " + t.borderColor}
                  >
                    <div className="text-4xl mb-3">{t.emoji}</div>
                    <h3 className="text-lg font-bold mb-1">{t.tier}</h3>
                    <p className="text-zinc-500 text-xs">{t.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            <ScrollReveal custom={4}>
              <p className="text-zinc-600 text-sm mt-8">Tiers are calculated automatically from your Apple Health history. Creators can optionally lock competitions to their tier only.</p>
            </ScrollReveal>
          </div>
        </section>

                {/* ─── FINAL CTA ─── */}
        <section className="py-32 px-6 relative">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Put Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Money
                </span>{" "}
                Where Your Mouth Is?
              </h2>
            </ScrollReveal>
            <ScrollReveal custom={1}>
              <p className="text-zinc-400 text-lg mb-10">
                Join the waitlist. Be first to compete when we launch.
              </p>
            </ScrollReveal>
            <ScrollReveal custom={2}>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg hover:from-orange-400 hover:to-red-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]"
              >
                Get Early Access
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="py-12 px-6 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm tracking-[0.3em] uppercase text-orange-500 font-semibold">
              Podium
            </span>
            <p className="text-zinc-500 text-sm">
              &copy; {new Date().getFullYear()} Podium. All rights reserved.
            </p>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
