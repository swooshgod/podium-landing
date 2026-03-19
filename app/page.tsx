"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";

/* ─── Variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Scroll Reveal ─── */
function Reveal({
  children, variants = fadeUp, custom = 0, className = "",
}: {
  children: React.ReactNode; variants?: Variants; custom?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={variants} custom={custom} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Count Up ─── */
function useCountUp(end: number, duration = 2000, active = false) {
  const [n, setN] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    if (!active || ran.current) return;
    ran.current = true;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, end, duration]);
  return n;
}

function Counter({ value, prefix = "", suffix = "", label }: {
  value: number; prefix?: string; suffix?: string; label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const n = useCountUp(value, 2000, inView);
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={fadeUp} className="text-center">
      <div className="text-5xl md:text-6xl font-black text-orange-400 tabular-nums">
        {prefix}{n.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-zinc-400 text-sm uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

/* ─── Live Prize Pool Ticker ─── */
// Shows example prize pools: players × entry fee, 90% to winner
const pools = [
  { players: 10, fee: 50 },
  { players: 20, fee: 25 },
  { players: 5,  fee: 100 },
  { players: 50, fee: 10 },
  { players: 15, fee: 50 },
  { players: 8,  fee: 100 },
];
function PrizeTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % pools.length), 2400);
    return () => clearInterval(t);
  }, []);
  const { players, fee } = pools[idx];
  const pot = Math.round(players * fee * 0.9);
  return (
    <span className="inline-block relative overflow-hidden h-[1.2em] align-middle w-36">
      <AnimatePresence mode="wait">
        <motion.span key={idx}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 text-center text-orange-400 font-black">
          ${pot.toLocaleString()}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── Phone Mockup ─── */
function PhoneMockup({ screen }: { screen: "home" | "compete" | "create" }) {
  return (
    <div className="relative w-[260px] h-[530px] rounded-[40px] border-2 border-white/10 bg-[#111] shadow-2xl overflow-hidden flex-shrink-0">
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black z-10" />

      {screen === "compete" && <CompeteScreen />}
      {screen === "home" && <HomeScreen />}
      {screen === "create" && <CreateScreen />}

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0d0d0d] border-t border-white/5 flex items-center justify-around px-8">
        <div className="flex flex-col items-center gap-1">
          <div className={`text-lg ${screen === "compete" ? "text-orange-400" : "text-zinc-500"}`}>🏆</div>
          <span className={`text-[9px] ${screen === "compete" ? "text-orange-400" : "text-zinc-500"}`}>Compete</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className={`text-lg ${screen === "home" ? "text-orange-400" : "text-zinc-500"}`}>👤</div>
          <span className={`text-[9px] ${screen === "home" ? "text-orange-400" : "text-zinc-500"}`}>Profile</span>
        </div>
      </div>
    </div>
  );
}

function CompeteScreen() {
  const competitions = [
    { title: "Step Race", date: "April 2026", prize: "$2,000", entry: "$100.00", free: false },
    { title: "Step Race", date: "April 2026", prize: null, free: true },
    { title: "Full Challenge", date: "April 2026", prize: "$200", entry: "$25.00", free: false },
    { title: "Weight Loss %", date: "April 2026", prize: "$500", entry: "$50.00", free: false },
  ];
  return (
    <div className="pt-10 px-3 pb-20 overflow-hidden h-full">
      <div className="flex justify-between items-center mb-3 px-1">
        <span className="text-xs tracking-[0.25em] uppercase text-orange-400 font-bold">PODIUM</span>
        <span className="text-sm">☀️</span>
      </div>
      <p className="text-sm text-white font-semibold mb-0.5">Good morning,</p>
      <p className="text-base text-orange-400 font-black mb-3">Champion 🔥</p>
      <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-3">Your Competitions</p>
      <div className="space-y-2">
        {competitions.map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] border-l-2 border-l-orange-500/60">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] text-white font-semibold">🏃 {c.title}</p>
                <p className="text-[9px] text-zinc-500">0 joined · {c.date}</p>
                {!c.free && (
                  <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
                    ${c.entry} entry
                  </span>
                )}
              </div>
              <span className={`text-sm font-black ${c.free ? "text-green-400 text-[11px]" : "text-yellow-400"}`}>
                {c.free ? "Free" : c.prize}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* FAB */}
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-20 right-4 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/40">
        +
      </motion.div>
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="pt-10 px-4 pb-20 h-full">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs tracking-[0.25em] uppercase text-orange-400 font-bold">PODIUM</span>
        <span className="text-sm">☀️</span>
      </div>
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-xl font-black mb-2">S</div>
        <p className="text-sm font-bold text-white">SwooshGod</p>
        <p className="text-[10px] text-orange-400">Tap to edit</p>
      </div>
      {/* Pro banner */}
      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] flex justify-between items-center mb-3">
        <div>
          <p className="text-[11px] text-white font-semibold">⭐ Upgrade to Pro</p>
          <p className="text-[9px] text-zinc-400">Keep 100% of winnings · $9.99/mo</p>
        </div>
        <span className="text-orange-400 text-xs">›</span>
      </div>
      {/* Balance */}
      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] flex justify-between mb-3">
        <div>
          <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Balance</p>
          <p className="text-base text-white font-black">$0.00</p>
          <p className="text-[9px] text-zinc-500">0 Credits</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Winnings</p>
          <p className="text-base text-yellow-400 font-black">Free</p>
          <p className="text-[9px] text-zinc-500">0 won</p>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[["0", "Competed"], ["0 🏆", "Won"], ["—", "Win Rate"]].map(([v, l], i) => (
          <div key={i} className={`p-2 rounded-xl text-center ${i === 1 ? "bg-yellow-500/10 border border-yellow-500/20" : "bg-white/[0.03] border border-white/[0.05]"}`}>
            <p className="text-sm font-black text-white">{v}</p>
            <p className="text-[9px] text-zinc-500">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreateScreen() {
  return (
    <div className="pt-10 px-4 pb-20 h-full overflow-hidden">
      <p className="text-xs text-white font-bold text-center mb-4">Create Competition</p>
      <p className="text-[11px] text-white font-semibold mb-2">What kind?</p>
      <div className="grid grid-cols-3 gap-1.5 mb-4">
        {[["🏃", "Step Race", true], ["📈", "% Improve", false], ["⚖️", "Weight Loss", false]].map(([e, t, sel], i) => (
          <div key={i} className={`p-2 rounded-xl border text-center ${sel ? "border-orange-500 bg-orange-500/10" : "border-white/[0.06] bg-white/[0.03]"}`}>
            <p className="text-lg">{e}</p>
            <p className={`text-[9px] font-semibold ${sel ? "text-orange-400" : "text-zinc-400"}`}>{t}</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-white font-semibold mb-2">Entry Fee</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {["Free", "$10", "$25", "$50", "$100", "Custom"].map((f, i) => (
          <span key={i} className={`text-[10px] px-2 py-1 rounded-full border ${f === "$100" ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-white/[0.08] text-zinc-400"}`}>{f}</span>
        ))}
      </div>
      <p className="text-[11px] text-white font-semibold mb-2">Duration</p>
      <div className="flex gap-1.5 mb-4">
        {["1 Week", "2 Weeks", "1 Month"].map((d, i) => (
          <span key={i} className={`text-[10px] px-2 py-1 rounded-full border ${d === "1 Month" ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-white/[0.08] text-zinc-400"}`}>{d}</span>
        ))}
      </div>
      <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-2 mb-3">
        <p className="text-[9px] text-orange-400">$100.00 entry · 15 players max · winner gets $1,350</p>
      </div>
      <div className="rounded-xl bg-orange-500 py-2 text-center">
        <p className="text-[11px] text-white font-bold">Create · $100.00 →</p>
      </div>
    </div>
  );
}

/* ─── Glowing Orbs ─── */
function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb1 absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-orange-500/[0.07] blur-3xl" />
      <div className="orb2 absolute bottom-[20%] right-[5%] w-80 h-80 rounded-full bg-orange-600/[0.05] blur-3xl" />
      <div className="orb3 absolute top-[50%] left-[40%] w-64 h-64 rounded-full bg-yellow-500/[0.04] blur-3xl" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN
═══════════════════════════════════════════ */
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const words = ["Compete.", "Sweat.", "Win."];
  const sub = "Someone creates a competition, sets the entry fee, and shares a code. Everyone who joins puts their fee in the pot. Best score at the end wins it all — automatically paid out.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

        {/* ── NAV ── */}
        <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.04]">
          <span className="text-sm tracking-[0.4em] uppercase text-orange-400 font-black">PODIUM</span>
          <div className="flex items-center gap-6">
            <a href="#how" className="text-sm text-zinc-400 hover:text-white transition-colors hidden md:block">How it works</a>
            <a href="#compete" className="text-sm text-zinc-400 hover:text-white transition-colors hidden md:block">Compete</a>
            <motion.a href="#waitlist" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="text-sm px-5 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-colors">
              Join Waitlist
            </motion.a>
          </div>
        </motion.nav>

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <Orbs />
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
            {/* Left: copy */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-8">
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-2 rounded-full bg-orange-400" />
                Now in Beta — iOS & Android
              </motion.div>

              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight mb-4">
                {words.map((w, i) => (
                  <motion.span key={w} initial={{ opacity: 0, x: -40 }}
                    animate={heroInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`block ${i === 2 ? "text-orange-400" : "text-white"}`}>
                    {w}
                  </motion.span>
                ))}
              </h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="text-2xl md:text-3xl font-black text-white mb-3 flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                The pot grows with every entry. Winner takes it all.
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="text-lg text-zinc-400 mb-6 flex items-center gap-2 justify-center lg:justify-start">
                Example pool right now:
                <span className="text-2xl font-black"><PrizeTicker /></span>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-zinc-400 text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                {sub}
              </motion.p>

              <motion.form id="waitlist" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }} onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                {submitted ? (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                    className="flex-1 py-3 px-6 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-center">
                    🔥 You&apos;re on the list. See you on the podium.
                  </motion.div>
                ) : (
                  <>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com" required
                      className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/40 transition-all text-sm" />
                    <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="px-7 py-3.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20 cursor-pointer whitespace-nowrap">
                      Get Early Access →
                    </motion.button>
                  </>
                )}
              </motion.form>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                className="text-zinc-600 text-xs mt-4">
                Free to join competitions · Stripe + USDC payouts · Apple Health sync
              </motion.p>
            </div>

            {/* Right: phone mockups */}
            <div className="flex-1 flex items-center justify-center lg:justify-end">
              <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-end gap-4">
                {/* Back phone */}
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                  className="opacity-60 scale-90 origin-bottom mb-4">
                  <PhoneMockup screen="home" />
                </motion.div>
                {/* Front phone */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative z-10 shadow-2xl shadow-orange-500/10">
                  <PhoneMockup screen="compete" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div className="w-0.5 h-2 rounded-full bg-white/30" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── LOGO BAR ── */}
        <section className="py-12 px-6 border-y border-white/[0.04] overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-16 items-center whitespace-nowrap">
            {[...Array(2)].map((_, ri) =>
              ["Apple Health", "Stripe", "USDC", "Apple Pay", "Google Pay", "iOS", "Android"].map((b, i) => (
                <span key={`${ri}-${i}`} className="text-zinc-600 text-sm font-semibold uppercase tracking-widest">
                  {b}
                </span>
              ))
            )}
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section className="py-28 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
            <Counter value={10000} suffix="+" label="Beta Signups" />
            <Counter value={100} prefix="$" suffix="K+" label="Prize Pools" />
            <Counter value={3} label="Competition Types" />
            <Counter value={10} suffix="%" label="Platform Fee Only" />
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="py-28 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-black text-center mb-4">
                How it <span className="text-orange-400">works</span>
              </h2>
            </Reveal>
            <Reveal custom={1}>
              <p className="text-zinc-400 text-center text-lg max-w-xl mx-auto mb-20">
                Four steps from zero to champion.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { n: "01", icon: "🏁", title: "Create or Join", desc: "Start a new competition or join with a code. Pick your challenge type, entry fee, and duration." },
                { n: "02", icon: "💸", title: "Pay Your Entry Fee", desc: "Everyone who joins pays the entry fee. It goes straight into the prize pool. The more players, the bigger the pot." },
                { n: "03", icon: "📱", title: "Compete Daily", desc: "Apple Health auto-syncs your steps, distance, and workouts. Watch the live leaderboard update in real time." },
                { n: "04", icon: "🏆", title: "Best Score Wins the Pot", desc: "Whoever scores highest at the end takes 90% of the entire prize pool — all entry fees combined. Auto-paid, no awkward Venmo requests." },
              ].map((s, i) => (
                <Reveal key={s.n} custom={i * 0.3} className="h-full">
                  <motion.div whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.3)" }}
                    transition={{ duration: 0.2 }}
                    className="h-full p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex gap-6">
                    <div className="flex-shrink-0">
                      <span className="text-5xl font-black text-orange-500/20">{s.n}</span>
                    </div>
                    <div>
                      <div className="text-3xl mb-3">{s.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                      <p className="text-zinc-400 leading-relaxed text-sm">{s.desc}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPETITION TYPES ── */}
        <section id="compete" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-black text-center mb-4">
                Pick your <span className="text-orange-400">battle</span>
              </h2>
            </Reveal>
            <Reveal custom={1}>
              <p className="text-zinc-400 text-center text-lg max-w-xl mx-auto mb-16">
                Three ways to compete. All tracked automatically. All pay real money.
              </p>
            </Reveal>

            <motion.div variants={stagger} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🏃",
                  title: "Step Race",
                  tag: "Most popular",
                  tagColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
                  desc: "Most steps wins. Synced automatically from Apple Health or Google Fit. No manual logging.",
                  metrics: ["Auto-tracked", "Daily leaderboard", "Streak bonuses"],
                },
                {
                  icon: "⚖️",
                  title: "Weight Loss %",
                  tag: "Most intense",
                  tagColor: "text-red-400 bg-red-500/10 border-red-500/20",
                  desc: "Lose the highest percentage of body weight. Weekly photo weigh-ins with AI anomaly detection.",
                  metrics: ["Photo proof", "Anti-cheat AI", "% based = fair"],
                },
                {
                  icon: "🗺️",
                  title: "Distance",
                  tag: "For runners",
                  tagColor: "text-green-400 bg-green-500/10 border-green-500/20",
                  desc: "Run, walk, or cycle the most miles. GPS tracked, supports all fitness apps.",
                  metrics: ["GPS verified", "All activities", "Multi-week races"],
                },
              ].map((c, i) => (
                <motion.div key={c.title} variants={fadeUp} custom={i}
                  whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(249,115,22,0.12)" }}
                  transition={{ duration: 0.25 }}
                  className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col">
                  <div className="text-5xl mb-4">{c.icon}</div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold">{c.title}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${c.tagColor}`}>{c.tag}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{c.desc}</p>
                  <ul className="space-y-2">
                    {c.metrics.map(m => (
                      <li key={m} className="flex items-center gap-2 text-xs text-zinc-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── MOCKUP SECTION: CREATE ── */}
        <section className="py-28 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <Reveal className="flex-1 text-center lg:text-left" custom={0}>
              <span className="inline-block text-xs text-orange-400 font-bold uppercase tracking-widest mb-4">For organizers</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Set the stakes.<br />
                <span className="text-orange-400">You run the game.</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Create a competition in under a minute. Choose the type, set the entry fee (free to $100+), and invite your people. Share a code. Watch the pot grow.
              </p>
              <ul className="space-y-4">
                {[
                  "Set any entry fee — free, $10, $25, $50, $100, or custom",
                  "Podium only takes 10% — 90% goes to winners",
                  "Auto-payouts via Stripe Connect or USDC",
                  "Full refund if competition doesn&apos;t fill",
                ].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="flex items-start gap-3 text-zinc-300 text-sm">
                    <span className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex justify-center">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}>
                <PhoneMockup screen="create" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── PODIUM PRO ── */}
        <section className="py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="relative p-10 md:p-14 rounded-3xl bg-gradient-to-br from-orange-500/10 to-yellow-500/5 border border-orange-500/20 overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.08),transparent_60%)] pointer-events-none" />
                <div className="relative z-10">
                  <span className="inline-block text-2xl mb-4">⭐</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-4">
                    Podium <span className="text-orange-400">Pro</span>
                  </h2>
                  <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
                    Keep 100% of your winnings. Zero platform fee. Plus a Pro badge on your profile.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                    {[["$9.99/mo", "Monthly"], ["$79.99/yr", "Yearly · Save 33%"]].map(([price, label]) => (
                      <div key={label} className="text-center">
                        <div className="text-3xl font-black text-white">{price}</div>
                        <div className="text-zinc-400 text-sm">{label}</div>
                      </div>
                    ))}
                  </div>
                  <motion.a href="#waitlist" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="inline-block px-10 py-4 rounded-xl bg-orange-500 text-white font-bold text-base hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20">
                    Get Pro on Launch →
                  </motion.a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-32 px-6 relative">
          <Orbs />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none">
                Your body.<br />
                <span className="text-orange-400">Their money.</span>
              </h2>
            </Reveal>
            <Reveal custom={1}>
              <p className="text-zinc-400 text-xl mb-10">
                Join the waitlist. Be first in the pot when we launch.
              </p>
            </Reveal>
            <Reveal custom={2}>
              <motion.a href="#waitlist" whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(249,115,22,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-orange-500 text-white font-black text-xl hover:bg-orange-400 transition-colors shadow-2xl shadow-orange-500/20">
                Join Waitlist — It&apos;s Free
                <span>→</span>
              </motion.a>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-10 px-6 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm tracking-[0.4em] uppercase text-orange-400 font-black">PODIUM</span>
            <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} Podium. Compete smarter.</p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Contact"].map(l => (
                <a key={l} href="#" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
