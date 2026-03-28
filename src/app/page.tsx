"use client";

import { useEffect, useRef, useState } from "react";
import CanvasSequence from "@/components/CanvasSequence";
import InteractivePortfolioSuite from "@/components/InteractivePortfolioSuite";
import VisionCloser from "@/components/VisionCloser";
import AudioToggle from "@/components/AudioToggle";
import { 
  MoveDown, MapPin, Mail, Phone, Linkedin, Shield, Info, FileText, Download
} from "lucide-react";
import { motion, useInView, Variants, useScroll, useTransform } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

function AnimatedMetric({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500; 
      const increment = value / (duration / 16); 
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

function ProblemSolutionToggle() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="w-full max-w-lg mt-8 bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <div className="flex w-full p-1 bg-black/60 border-b border-white/5">
        <button 
          onClick={() => setShowSolution(false)}
          className={`flex-1 py-2 md:py-2.5 text-[9px] md:text-[10px] font-mono font-bold tracking-widest uppercase rounded-xl transition-all ${
             !showSolution ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(248,113,113,0.2)]' : 'text-white/40 hover:text-white/80'
          }`}
        >
          The Problem
        </button>
        <button 
          onClick={() => setShowSolution(true)}
          className={`flex-1 py-2 md:py-2.5 text-[9px] md:text-[10px] font-mono font-bold tracking-widest uppercase rounded-xl transition-all ${
             showSolution ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]' : 'text-white/40 hover:text-white/80'
          }`}
        >
          The ROI Solution
        </button>
      </div>
      <div className="p-5 md:p-6 text-center md:text-left min-h-[110px] flex items-center justify-center md:justify-start transition-all duration-300">
        {!showSolution ? (
           <p className="text-white/80 font-serif text-sm md:text-base leading-relaxed drop-shadow-md">
             "<span className="text-red-400 font-bold">Manual UAE legal reviews take 4+ hours per document</span>, creating immense throughput bottlenecks."
           </p>
        ) : (
           <p className="text-white/95 font-serif text-sm md:text-base leading-relaxed drop-shadow-md">
             "<strong className="text-green-400">Qanun AI reduces this to 45 seconds</strong> while strictly maintaining <span className="underline decoration-green-500/50 underline-offset-4">100% FTA & CBUAE data residency compliance.</span>"
           </p>
        )}
      </div>
    </div>
  );
}


export default function Home() {
  const [isEngineReady, setIsEngineReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll();
  const lumoraMobileOpacity = useTransform(scrollYProgress, [0.985, 0.995], [0, 1]);

  return (
    <main className="relative min-h-[2200vh] md:min-h-[1600vh] selection:bg-orange-500 selection:text-white bg-transparent text-white font-sans overflow-x-hidden scroll-smooth w-full">
      {/* Scroll-Interactive Canvas Background */}
      <CanvasSequence
        urlPattern="https://amcgxhzwjqcnkvaumtaa.supabase.co/storage/v1/object/public/hero-animation/frame_{index}_delay-0.04s.webp"
        frameCount={192}
        startIndex={0}
        padding={3}
        onLoadComplete={() => setIsEngineReady(true)}
      />

      {/* LUMORA AESTHETIC CONTACT CARD */}
      <motion.div 
         style={{ opacity: isMobile ? lumoraMobileOpacity : 1 }}
         className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex p-4 md:p-6 lg:px-10 lg:py-5 rounded-[2rem] md:rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,255,255,0.05)] w-[92%] sm:w-[90%] md:w-[calc(100%-48px)] max-w-6xl transition-all"
      >
          
         {/* --- MOBILE VIEW --- */}
         <div className="flex flex-col md:hidden w-full items-center gap-3 py-1 relative">
            <div className="absolute top-0 left-0">
               <AudioToggle isReady={isEngineReady} />
            </div>

            <div className="flex flex-col items-center">
               <span className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-wide text-lg drop-shadow-md leading-none">Anish Anto</span>
               <span className="text-[10px] text-green-400 font-mono tracking-[0.2em] uppercase mt-1">Available Immediately</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 w-full text-[10px] text-white/80 font-mono">
               <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 opacity-70" /> Ras Al Khaimah</div>
               <a href="tel:+971521379125" className="flex items-center gap-1.5"><Phone className="w-3 h-3 opacity-70" /> +971 521 379 125</a>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mt-1">
               <a href="/Anish_Anto_AI_PM.pdf" download className="h-10 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg text-white">
                 <Download className="w-3.5 h-3.5" /> CV
               </a>
               <a href="https://wa.me/971521379125" target="_blank" className="h-10 flex items-center justify-center bg-white text-black rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg">
                 Hire Me
               </a>
            </div>
         </div>

         {/* --- DESKTOP VIEW --- */}
         <div className="hidden md:flex flex-row items-center justify-between w-full h-full gap-4 lg:gap-8">
            <div className="flex items-center justify-center min-w-max mr-1 lg:mr-2">
               <AudioToggle isReady={isEngineReady} />
            </div>
            <div className="w-px h-10 bg-white/20 shrink-0" />
            <div className="flex flex-col justify-center text-left min-w-max">
               <h3 className="text-xl lg:text-2xl font-serif font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-lg leading-none">Anish Anto</h3>
               <p className="text-[9px] lg:text-[10px] font-mono text-green-400 tracking-[0.2em] uppercase mt-2 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">Available Immediately</p>
            </div>
            <div className="w-px h-10 bg-white/20 shrink-0" />
            <div className="flex items-center gap-5 lg:gap-8 min-w-max">
               <div className="flex flex-col justify-center gap-2 text-[10px] lg:text-xs font-mono text-white/80">
                  <div className="flex items-center gap-2.5 hover:text-orange-400 transition-colors">
                    <MapPin className="w-3.5 h-3.5 opacity-70" /> Ras Al Khaimah, UAE
                  </div>
                  <a href="tel:+971521379125" className="flex items-center gap-2.5 hover:text-orange-400 transition-colors">
                    <Phone className="w-3.5 h-3.5 opacity-70" /> +971 521 379 125
                  </a>
               </div>
               <div className="flex items-center gap-3">
                  <a href="mailto:anishanto369@gmail.com" className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-orange-500/20 hover:border-orange-500/30 text-white/80 transition-all"><Mail className="w-4 h-4" /></a>
                  <a href="https://linkedin.com/in/anish-anto-ai" target="_blank" className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-orange-500/20 hover:border-orange-500/30 text-white/80 transition-all"><Linkedin className="w-4 h-4" /></a>
               </div>
            </div>
            <div className="flex items-center gap-3 lg:gap-4 shrink-0">
               <a href="/Anish_Anto_AI_PM.pdf" download className="h-11 lg:h-12 px-5 lg:px-6 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] lg:text-[10px] font-bold font-mono tracking-widest uppercase rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                  <Download className="w-3.5 h-3.5 mr-2" /> Resume
               </a>
               <a href="https://wa.me/971521379125" target="_blank" className="h-11 lg:h-12 px-7 lg:px-8 bg-white text-black text-[9px] lg:text-[10px] font-bold font-mono tracking-widest uppercase rounded-xl shadow-lg hover:bg-white/90 active:scale-95 transition-all">
                  Hire Me
               </a>
            </div>
         </div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center w-full">
        
        {/* --- 1. HERO --- */}
        <section className="flex h-screen w-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Anish Anto</h1>
          <p className="mt-8 text-xs md:text-xl font-mono uppercase tracking-[0.25em]">AI Product Manager | Full-Stack AI Builder</p>
          <div className="absolute bottom-32 opacity-50 animate-bounce"><MoveDown className="h-8 w-8" /></div>
        </section>

        {/* --- 2. QANUN AI (LEFT ALIGNED) --- */}
        <section className="flex min-h-screen w-full items-center justify-center md:justify-start px-6 md:px-32 py-24">
          <div className="max-w-4xl space-y-6 flex flex-col items-center md:items-start">
            <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full uppercase tracking-widest font-mono border border-blue-500/30">The Flagship</span>
            <h2 className="text-5xl md:text-9xl font-serif font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-none">Qanun AI</h2>
            <p className="text-xl md:text-4xl font-light text-white/95">Built with <span className="italic">LLAMA 3.3</span> and <span className="italic">LangGraph</span> for air-gapped sovereign compliance.</p>
            <ProblemSolutionToggle />
            <div className="flex items-center gap-3 font-mono text-xs md:text-sm uppercase tracking-widest pt-6 font-bold">
               <div className="w-2 h-2 bg-orange-500 rounded-full" /> <AnimatedMetric value={80} /> reduction in manual processing
            </div>
          </div>
        </section>

        {/* --- 3. LOOMIN-DOCS V2.0 (RIGHT ALIGNED) --- */}
        <section className="flex min-h-screen w-full items-center justify-center md:justify-end px-6 md:px-32 py-24">
          <div className="max-w-4xl space-y-6 text-center md:text-right flex flex-col items-center md:items-end">
            <span className="text-[10px] font-bold bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full uppercase tracking-widest font-mono border border-orange-500/30">Sovereign Architecture</span>
            <h2 className="text-5xl md:text-9xl font-serif font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-l from-red-500 to-orange-500 leading-none">Loomin-Docs</h2>
            <p className="text-xl md:text-4xl font-light text-white/95 max-w-2xl">Air-Gapped Document Intelligence for Restricted RHEL 9 Environments.</p>
            <div className="w-full max-w-lg mt-8 bg-black/40 border border-white/10 rounded-2xl p-6 text-left font-mono text-[10px] md:text-xs text-green-400 shadow-2xl backdrop-blur-xl">
               <p># Initializing Sovereign Shield...</p>
               <p className="text-white/40">{`> Loading local_llama3_8b.gguf... [SUCCESS]`}</p>
               <p className="text-white/40">{`> PII_Interceptor... [ACTIVE]`}</p>
               <p className="text-green-500 font-bold">{`> Status: 100% Air-Gapped / RHEL 9 Compliant`}</p>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs md:text-sm uppercase tracking-widest pt-6 font-bold">
               Zero bits of data leave local hardware <div className="w-2 h-2 bg-orange-500 rounded-full" />
            </div>
          </div>
        </section>

        {/* --- 4. DOCUMIND (LEFT ALIGNED) --- */}
        <section className="flex h-screen w-full items-center justify-center md:justify-start px-6 md:px-32">
          <div className="max-w-4xl space-y-8 flex flex-col items-center md:items-start">
            <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full uppercase tracking-widest font-mono border border-purple-500/30">Enterprise SaaS</span>
            <h2 className="text-5xl md:text-9xl font-serif font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-none text-left">DocuMind</h2>
            <p className="text-xl md:text-4xl font-light text-white/95 text-left">Enterprise RAG SaaS for regulated sectors with zero-downtime CI/CD.</p>
          </div>
        </section>

        {/* --- 5. ARIA & ATS BUILDER (RIGHT ALIGNED) --- */}
        <section className="flex min-h-[150vh] w-full flex-col justify-center px-6 md:px-32 gap-40 py-24">
          <div className="max-w-4xl space-y-8 flex flex-col items-center md:items-end ml-auto">
            <span className="text-[10px] font-bold bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-2 rounded-full uppercase tracking-widest font-mono">Autonomous Agent</span>
            <h2 className="text-5xl md:text-9xl font-serif font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-l from-red-500 to-orange-500 leading-none text-right">ARIA</h2>
            <p className="text-xl md:text-4xl font-light text-white/95 text-right">Multi-agent orchestration with self-correcting reasoning loops.</p>
          </div>
          
          <div className="max-w-3xl space-y-8 text-center md:text-left flex flex-col items-center md:items-start pt-24 w-full">
             <h3 className="text-4xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">ATS Resume Builder</h3>
             <div className="flex items-center gap-3 text-white font-bold font-mono text-xs md:text-sm uppercase tracking-widest">
                <div className="w-2 h-2 bg-orange-500 rounded-full" /> <AnimatedMetric value={80} /> reduction in creation time 
             </div>
          </div>
        </section>

        <InteractivePortfolioSuite />

        {/* --- 6. SKILLS --- */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="flex min-h-screen w-full items-center justify-center px-4 py-32 bg-black/40"
        >
          <div className="w-full max-w-7xl space-y-20">
            <h2 className="text-4xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-center">Expertise & Fluency</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <div className="space-y-4 bg-black/50 p-8 rounded-3xl border border-white/10">
                  <h4 className="text-xs font-mono font-bold text-orange-400 uppercase border-b border-white/20 pb-4">Product Management</h4>
                  <ul className="space-y-3 font-serif text-xl text-white">
                     <li>0 to 1 Strategy</li>
                     <li>Agile Execution</li>
                     <li>CI/CD Optimization</li>
                  </ul>
               </div>
               <div className="space-y-4 bg-black/50 p-8 rounded-3xl border border-white/10">
                  <h4 className="text-xs font-mono font-bold text-orange-400 uppercase border-b border-white/20 pb-4">AI & LLM Products</h4>
                  <ul className="space-y-3 font-serif text-xl text-white">
                     <li>RAG Architectures</li>
                     <li>Multi-Agent Orchestration</li>
                     <li>Performance Fine-Tuning</li>
                  </ul>
               </div>
               <div className="space-y-4 bg-black/50 p-8 rounded-3xl border border-white/10">
                  <h4 className="text-xs font-mono font-bold text-orange-400 uppercase border-b border-white/20 pb-4">Compliance</h4>
                  <ul className="space-y-3 font-serif text-xl text-white">
                     <li>UAE Financial Regulations</li>
                     <li>AML Standards</li>
                     <li>Air-gapped Data Residency</li>
                  </ul>
               </div>
               <div className="space-y-4 bg-black/50 p-8 rounded-3xl border border-white/10">
                  <h4 className="text-xs font-mono font-bold text-orange-400 uppercase border-b border-white/20 pb-4">Technical Fluency</h4>
                  <ul className="space-y-3 font-serif text-xl text-white">
                     <li>Python & React.js</li>
                     <li>LangGraph & Ollama</li>
                     <li>Docker & RHEL 9</li>
                  </ul>
               </div>
            </div>
          </div>
        </motion.section>

        {/* --- 7. EDUCATION --- */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="flex min-h-screen w-full flex-col items-center justify-center py-32 bg-black/60 border-t border-white/10"
        >
          <div className="w-full max-w-7xl px-4 space-y-24">
            <h2 className="text-4xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-center">Foundation</h2>
            <div className="grid md:grid-cols-2 gap-24">
               <div className="space-y-12">
                  <h3 className="text-2xl font-serif font-bold text-white border-b border-white/10 pb-4">Academic</h3>
                  <div className="space-y-2">
                     <h4 className="text-xl font-bold text-white">MBA (Finance)</h4>
                     <p className="text-sm font-mono text-white/60 uppercase">JAIN University | Aug 2026</p>
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-bold text-white">Bachelor of Commerce</h4>
                     <p className="text-sm font-mono text-white/60 uppercase">Christ College IJK | 2024</p>
                  </div>
               </div>
               <div className="space-y-12">
                  <h3 className="text-2xl font-serif font-bold text-white border-b border-white/10 pb-4">Certifications</h3>
                  <div className="grid grid-cols-2 gap-8 font-serif text-lg text-white/90">
                     <div>Anthropic: Claude API</div>
                     <div>Google: Generative AI</div>
                     <div>Hugging Face: LLM Fundamentals</div>
                     <div>DeepLearning.AI: Prompt Eng</div>
                  </div>
               </div>
            </div>
          </div>
        </motion.section>

        <VisionCloser />
        <footer className="min-h-[40vh] bg-black"></footer>
      </div>
    </main>
  );
}
