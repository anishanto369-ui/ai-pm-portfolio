"use client";

import { useEffect, useRef, useState } from "react";
import CanvasSequence from "@/components/CanvasSequence";
import { 
  MoveDown, MapPin, Mail, Phone, Linkedin, Shield, Info, FileText, Download
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
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
  return (
    <main className="relative min-h-[1400vh] selection:bg-orange-500 selection:text-white bg-transparent text-white font-sans overflow-x-hidden scroll-smooth w-full">
      {/* Scroll-Interactive Canvas Background */}
      <CanvasSequence
        urlPattern="https://amcgxhzwjqcnkvaumtaa.supabase.co/storage/v1/object/public/hero-animation/frame_{index}_delay-0.04s.webp"
        frameCount={192}
        startIndex={0}
        padding={3}
      />

      {/* LUMORA AESTHETIC CONTACT CARD */}
      <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 lg:px-10 lg:py-5 rounded-[2rem] md:rounded-full border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,255,255,0.05)] w-[95%] sm:w-[90%] md:w-[calc(100%-48px)] max-w-6xl transition-all">
         
         {/* --- MOBILE VIEW: Thumb-Optimized Taller Hitbox --- */}
         <div className="flex md:hidden w-full items-center justify-between px-3 py-1.5">
            <div className="flex flex-col items-start w-1/3">
               <span className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-wide text-sm drop-shadow-md whitespace-nowrap">Anish Anto</span>
            </div>
            
            <div className="flex items-center gap-1.5 overflow-x-auto w-2/3 justify-end hide-scrollbar py-1">
               <a 
                 href="https://linkedin.com/in/anish-anto-ai" 
                 target="_blank"
                 className="p-3 bg-white/10 border border-white/20 text-white rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center shrink-0"
               >
                  <Linkedin className="w-3.5 h-3.5" />
               </a>
               <a 
                 href="/Anish_Anto_AI_Product_Manager_ATS.pdf" 
                 download
                 className="px-3 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-bold font-mono tracking-widest uppercase rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
               >
                  <Download className="w-3 h-3" /> CV
               </a>
               <a 
                 href="https://wa.me/971521379125" 
                 target="_blank"
                 className="px-4 py-3 bg-white text-black text-[9px] font-bold font-mono tracking-widest uppercase rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-95 transition-all flex items-center justify-center shrink-0"
               >
                  Hire Me
               </a>
            </div>
         </div>

         {/* --- TABLET / LAPTOP VIEW --- */}
         <div className="hidden md:flex items-center gap-6 lg:gap-10 w-full md:w-auto">
            <div className="text-left">
               <h3 className="text-xl font-serif font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-lg">Anish Anto</h3>
               <p className="text-[10px] font-mono text-green-400 tracking-[0.2em] uppercase mt-1 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">Available Immediately</p>
            </div>
            
            <div className="w-px h-10 bg-white/20" />
            
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-2 xl:gap-8 text-[10px] lg:text-xs font-mono text-white/80">
               <a href="https://maps.google.com/?q=Ras+Al+Khaimah" target="_blank" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                 <MapPin className="w-3 h-3 lg:w-4 lg:h-4 opacity-70" /> Ras Al Khaimah, UAE
               </a>
               <a href="tel:+971521379125" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                 <Phone className="w-3 h-3 lg:w-4 lg:h-4 opacity-70" /> +971 521 379 125
               </a>
            </div>
            
            <div className="hidden lg:block w-px h-10 bg-white/20" />
            
            <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50 font-mono">
               UAE Visit Visa | Indian National
            </div>
         </div>
         
         <div className="hidden md:flex items-center gap-3 lg:gap-4 w-full md:w-auto mt-4 md:mt-0 justify-center">
            <div className="flex gap-2 mr-2">
               <a href="mailto:anishanto369@gmail.com" className="p-2 lg:p-3 bg-white/10 rounded-full hover:bg-orange-500/50 transition-all flex items-center justify-center text-white hover:scale-110 active:scale-95">
                  <Mail className="w-4 h-4" />
               </a>
               <a href="https://linkedin.com/in/anish-anto-ai" target="_blank" className="p-2 lg:p-3 bg-white/10 rounded-full hover:bg-orange-500/50 transition-all flex items-center justify-center text-white hover:scale-110 active:scale-95">
                  <Linkedin className="w-4 h-4" />
               </a>
            </div>
            
            <a 
              href="/Anish_Anto_AI_Product_Manager_ATS.pdf" 
              download
              className="px-4 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] lg:text-xs font-bold font-mono tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-all text-center flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
            >
               <Download className="w-3 h-3 lg:w-4 lg:h-4" />
               <span>Download ATS Resume</span>
            </a>

            <a 
              href="https://wa.me/971521379125?text=Hi%20Anish,%20I%20saw%20your%20portfolio..." 
              target="_blank"
              className="px-6 lg:px-8 py-2.5 lg:py-3 bg-white text-black text-[10px] lg:text-xs font-bold font-mono tracking-widest uppercase rounded-full hover:bg-white/90 hover:scale-105 active:scale-95 transition-all text-center flex items-center shadow-[0_0_20px_rgba(255,255,255,0.2)] ml-2"
            >
               Hire Me
            </a>
         </div>
      </div>

      {/* CONTENT LAYERS - z-10 */}
      <div className="relative z-10 flex flex-col items-center w-full">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="flex h-screen w-full flex-col items-center justify-center px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-tighter leading-[0.9] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_40px_rgba(0,0,0,0.8)] break-words w-full text-center">
            Anish Anto
          </h1>
          <div className="mt-8 md:mt-10 max-w-3xl space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg lg:text-xl font-mono uppercase tracking-[0.25em] text-white drop-shadow-md">
              AI Product Manager | Full-Stack AI Builder
            </p>
            <p className="mx-auto max-w-xl text-[10px] md:text-sm font-light leading-relaxed opacity-70 uppercase tracking-widest text-balance font-mono drop-shadow-md">
              MBA Candidate (JAIN University) and Anthropic-certified AI Engineer.
            </p>
          </div>
          <div className="absolute bottom-32 flex flex-col items-center gap-3 opacity-50 group cursor-pointer transition-opacity hover:opacity-100">
            <MoveDown className="h-6 w-6 md:h-8 md:w-8 animate-bounce text-white drop-shadow-lg" />
          </div>
        </section>

        {/* --- 2. QANUN AI --- */}
        <section className="flex min-h-screen w-full items-center justify-center md:justify-start px-6 md:px-16 lg:px-32 xl:px-48 py-24">
          <div className="max-w-4xl space-y-4 md:space-y-6 text-center md:text-left w-full flex flex-col items-center md:items-start">
            
            <div className="flex flex-col md:flex-row items-center gap-3">
               <span className="text-[8px] md:text-[10px] lg:text-xs font-bold bg-blue-500/20 text-blue-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-[0.3em] font-mono shadow-xl border border-blue-500/30">The Flagship</span>
               <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-md">
                  <div className="relative flex h-2 w-2 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </div>
                  <Shield className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  <span className="text-[8px] md:text-[10px] lg:text-xs font-mono font-bold uppercase tracking-widest">Local Data</span>
               </div>
            </div>

            <div className="space-y-2 md:space-y-3 w-full">
               <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] break-words w-full">
                 Qanun AI
               </h2>
               <p className="text-orange-400 font-mono text-[9px] md:text-[11px] lg:text-sm tracking-[0.2em] uppercase font-bold drop-shadow-md">Engineered for FTA & CBUAE AML Compliance.</p>
            </div>

            <p className="text-xl md:text-3xl lg:text-4xl font-light leading-tight text-white/95 drop-shadow-xl pt-2">
              Built with <span className="font-serif italic text-2xl md:text-4xl lg:text-5xl font-medium">LLAMA 3.3</span> and <span className="font-serif italic text-2xl md:text-4xl lg:text-5xl font-medium">LangGraph</span> for air-gapped sovereign compliance.
            </p>

            <ProblemSolutionToggle />

            <div className="flex flex-col gap-3 md:gap-4 font-mono text-[10px] md:text-xs lg:text-sm uppercase tracking-widest pt-4 md:pt-6 w-full">
              <div className="flex items-center justify-center md:justify-start gap-3 text-white drop-shadow-lg font-bold">
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full shrink-0" /> <AnimatedMetric value={80} /> reduction in manual processing
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. DOCUMIND --- */}
        <section className="flex h-screen w-full items-center justify-center md:justify-end px-6 md:px-16 lg:px-32 xl:px-48">
          <div className="max-w-4xl space-y-6 md:space-y-8 text-center md:text-right w-full flex flex-col items-center md:items-end">
            <span className="text-[8px] md:text-[10px] lg:text-xs font-bold bg-purple-500/20 text-purple-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-[0.3em] font-mono shadow-xl border border-purple-500/30">Enterprise SaaS</span>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-l from-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] break-words w-full">
              DocuMind
            </h2>
            <p className="text-xl md:text-3xl lg:text-4xl font-light leading-tight text-white/95 drop-shadow-xl max-w-2xl text-center md:text-right">
              Enterprise RAG SaaS for regulated sectors with zero-downtime CI/CD.
            </p>
            <div className="flex flex-col gap-3 md:gap-4 font-mono text-[10px] md:text-xs lg:text-sm uppercase tracking-widest pt-2 md:pt-4 w-full items-center md:items-end">
              <div className="flex items-center justify-center md:justify-end gap-2 md:gap-3 text-white drop-shadow-lg font-bold w-full text-center md:text-right">
                 Scalable vector search for large-scale documentation <div className="hidden md:block w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full shrink-0" />
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. ARIA & ATS BUILDER --- */}
        <section className="flex min-h-[150vh] w-full flex-col justify-center px-6 md:px-16 lg:px-32 xl:px-48 gap-32 md:gap-40 py-24">
          <div className="max-w-4xl space-y-6 md:space-y-8 text-center md:text-left w-full flex flex-col items-center md:items-start">
            <span className="text-[8px] md:text-[10px] lg:text-xs font-bold bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-[0.3em] font-mono shadow-xl">Autonomous Agent</span>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] break-words w-full">
              ARIA
            </h2>
            <p className="text-xl md:text-3xl lg:text-4xl font-light leading-tight text-white/95 drop-shadow-xl max-w-3xl">
              Autonomous agent featuring multi-agent orchestration and self-correcting reasoning loops.
              
              <span className="group relative inline-block cursor-help ml-2 md:ml-3">
                 <Info className="w-5 h-5 md:w-6 md:h-6 text-orange-500/50 hover:text-orange-400 transition-colors inline drop-shadow-md" />
                 <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 md:w-72 p-4 bg-black/95 backdrop-blur-2xl border border-white/20 rounded-2xl text-[10px] md:text-xs font-mono text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 shadow-[0_0_30px_rgba(0,0,0,0.8)] leading-relaxed text-left flex flex-col gap-2">
                    <strong className="text-orange-400 tracking-widest uppercase text-[8px] md:text-[10px] border-b border-white/10 pb-2">Live Agent Status</strong>
                    Status: Self-Correcting Reasoning Loop Active | <AnimatedMetric value={40} /> reduction in hallucination via LangGraph validation.
                 </span>
              </span>
            </p>
            <div className="flex flex-col gap-3 md:gap-4 font-mono text-[10px] md:text-xs lg:text-sm uppercase tracking-widest pt-2 md:pt-4 w-full">
              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 text-white drop-shadow-lg font-bold w-full">
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full shrink-0" /> <AnimatedMetric value={40} /> reduction in LLM hallucinations
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl space-y-6 md:space-y-8 text-center md:text-right flex flex-col items-center md:items-end pt-12 md:pt-24 mt-0 md:ml-auto w-full">
             <h3 className="text-4xl md:text-6xl lg:text-8xl leading-none font-serif font-bold text-transparent bg-clip-text bg-gradient-to-l from-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] break-words w-full">ATS Resume<br className="lg:hidden"/> Builder</h3>
             <div className="flex items-center justify-center md:justify-end gap-2 md:gap-3 text-white drop-shadow-lg font-bold font-mono text-[10px] md:text-xs lg:text-sm uppercase tracking-widest w-full">
                 <AnimatedMetric value={80} /> reduction in resume creation time <div className="hidden md:block w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full shrink-0" />
             </div>
          </div>
        </section>

        {/* --- 5. SKILLS SECTION --- */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex min-h-screen w-full items-center justify-center px-4 md:px-12 py-32 bg-gradient-to-t from-black via-transparent to-transparent will-change-transform"
        >
          <div className="w-full max-w-7xl space-y-12 md:space-y-20 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-2xl break-words">Expertise & Fluency</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-16 text-center md:text-left">
               <div className="space-y-4 md:space-y-6 bg-black/50 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all shadow-2xl">
                  <h4 className="text-[10px] md:text-xs lg:text-sm font-mono font-bold tracking-[0.2em] text-orange-400 uppercase border-b border-white/20 pb-3 md:pb-4">Product Management</h4>
                  <ul className="space-y-3 md:space-y-5 font-serif text-lg md:text-xl lg:text-2xl text-white drop-shadow-md">
                     <li>0 to 1 Strategy</li>
                     <li>Agile Execution</li>
                     <li>CI/CD Optimization</li>
                  </ul>
               </div>
               
               <div className="space-y-4 md:space-y-6 bg-black/50 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all shadow-2xl">
                  <h4 className="text-[10px] md:text-xs lg:text-sm font-mono font-bold tracking-[0.2em] text-orange-400 uppercase border-b border-white/20 pb-3 md:pb-4">AI & LLM Products</h4>
                  <ul className="space-y-3 md:space-y-5 font-serif text-lg md:text-xl lg:text-2xl text-white drop-shadow-md">
                     <li>RAG Architectures</li>
                     <li>Prompt Engineering</li>
                     <li>Multi-Agent Orchestration</li>
                     <li>Performance Fine-Tuning</li>
                  </ul>
               </div>

               <div className="space-y-4 md:space-y-6 bg-black/50 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all shadow-2xl">
                  <h4 className="text-[10px] md:text-xs lg:text-sm font-mono font-bold tracking-[0.2em] text-orange-400 uppercase border-b border-white/20 pb-3 md:pb-4">Compliance</h4>
                  <ul className="space-y-3 md:space-y-5 font-serif text-lg md:text-xl lg:text-2xl text-white drop-shadow-md">
                     <li>UAE Financial Regulations</li>
                     <li>VAT Protocols</li>
                     <li>AML Standards</li>
                     <li>Air-gapped Data Residency</li>
                  </ul>
               </div>

               <div className="space-y-4 md:space-y-6 bg-black/50 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all shadow-2xl">
                  <h4 className="text-[10px] md:text-xs lg:text-sm font-mono font-bold tracking-[0.2em] text-orange-400 uppercase border-b border-white/20 pb-3 md:pb-4">Technical Fluency</h4>
                  <ul className="space-y-3 md:space-y-5 font-serif text-lg md:text-xl lg:text-2xl text-white drop-shadow-md">
                     <li>Python & React.js</li>
                     <li>Next.js & FastAPI</li>
                     <li>LangGraph & Ollama</li>
                     <li>Docker & HedgeLogic</li>
                  </ul>
               </div>
            </div>
          </div>
        </motion.section>

        {/* --- 6. EDUCATION & CERTIFICATIONS --- */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex min-h-screen w-full flex-col items-center justify-center px-4 md:px-12 py-24 md:py-32 z-10 relative bg-black/60 backdrop-blur-xl border-t border-white/10 will-change-transform"
        >
          <div className="w-full max-w-7xl space-y-16 md:space-y-24 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-2xl text-center break-words">Foundation & Credentials</h2>
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
               
               {/* Column 1: Academic & Languages */}
               <div className="flex-1 space-y-12 md:space-y-16">
                  <div className="space-y-6 md:space-y-8">
                     <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide border-b border-white/10 pb-3 md:pb-4 select-none drop-shadow-md text-center md:text-left">Academic Foundation</h3>
                     
                     <div className="space-y-1 md:space-y-2 group">
                        <h4 className="text-lg md:text-xl font-serif font-bold text-white group-hover:text-orange-400 transition-colors drop-shadow-md">MBA (Finance & Marketing)</h4>
                        <p className="text-[10px] md:text-sm font-mono tracking-widest text-white/60 uppercase">JAIN University, Bangalore <span className="opacity-50 block md:inline mt-1 md:mt-0">| Expected Aug 2026</span></p>
                     </div>
                     
                     <div className="space-y-1 md:space-y-2 group">
                        <h4 className="text-lg md:text-xl font-serif font-bold text-white group-hover:text-orange-400 transition-colors drop-shadow-md">Bachelor of Commerce (Finance)</h4>
                        <p className="text-[10px] md:text-sm font-mono tracking-widest text-white/60 uppercase">Christ College IJK <span className="opacity-50 block md:inline mt-1 md:mt-0">| 2024</span></p>
                     </div>
                  </div>

                  <div className="w-full h-px bg-white/10 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.1)]" />

                  <div className="space-y-6 md:space-y-8 text-center md:text-left">
                     <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide border-b border-white/10 pb-3 md:pb-4 select-none drop-shadow-md">Languages</h3>
                     <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                        {["English (Fluent)", "Hindi (Fluent)", "Malayalam (Native)", "French (A2)", "Sanskrit (A1)"].map((lang) => (
                           <span key={lang} className="px-4 py-2 md:px-5 md:py-3 border border-white/20 rounded-xl text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase text-white/80 bg-white/5 backdrop-blur-md shadow-xl hover:bg-orange-500/20 transition-colors">
                              {lang}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Subtle Glass Divider for Desktop */}
               <div className="hidden lg:block w-px bg-white/10 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] shrink-0" />

               {/* Column 2: Technical Certifications */}
               <div className="flex-[1.5] space-y-8 md:space-y-12">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide border-b border-white/10 pb-3 md:pb-4 select-none drop-shadow-md text-center md:text-left">Technical Certifications</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-12">
                     
                     <div className="space-y-2 md:space-y-3 group text-center md:text-left">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase">Anthropic Academy</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">Claude with the Anthropic API <span className="block text-[10px] opacity-40 font-mono tracking-widest mt-1 text-center md:text-left">(ID: xh88uinh6jr8)</span></li>
                           <li className="group-hover:text-white transition-colors leading-tight">Claude Code in Action</li>
                        </ul>
                     </div>

                     <div className="space-y-2 md:space-y-3 group text-center md:text-left">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase">Google Cloud</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">Responsible AI</li>
                           <li className="group-hover:text-white transition-colors leading-tight">Introduction to Generative AI</li>
                        </ul>
                     </div>

                     <div className="space-y-2 md:space-y-3 group text-center md:text-left">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase">Hugging Face</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">Fundamentals of Large Language Models</li>
                        </ul>
                     </div>

                     <div className="space-y-2 md:space-y-3 group text-center md:text-left">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase">DeepLearning.AI</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">ChatGPT Prompt Engineering for Developers</li>
                        </ul>
                     </div>

                     <div className="space-y-2 md:space-y-3 group text-center md:text-left">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase">HubSpot</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">Digital Marketing Certified</li>
                        </ul>
                     </div>

                     <div className="space-y-2 md:space-y-3 group text-center md:text-left">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-white/50 tracking-[0.2em] uppercase">Industry Simulations</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">GenAI (BCG X)</li>
                           <li className="group-hover:text-white transition-colors leading-tight">AI in Action (Forage)</li>
                           <li className="group-hover:text-white transition-colors leading-tight">Controllers (Goldman Sachs)</li>
                        </ul>
                     </div>

                  </div>
               </div>

            </div>
          </div>
        </motion.section>

        {/* --- 7. FOOTER SPACER --- */}
        <footer className="flex min-h-[40vh] md:min-h-[30vh] w-full flex-col items-center justify-center px-6 pb-64 md:pb-48 bg-black">
          {/* Spacer to avoid collision with contact card at the bottom */}
        </footer>
      </div>
    </main>
  );
}
