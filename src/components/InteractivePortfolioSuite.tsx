"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Terminal, Zap, Database, Cpu, Activity, FileCode2 } from "lucide-react";

// --- 1. AGENT LOGIC TERMINAL ---
const TerminalTypewriter = () => {
  const terminalTexts = [
    "> Initializing LangGraph workflow for UAE compliance...",
    "> Accessing local Llama 3.3 via Ollama (Air-Gapped)...",
    "> Cross-referencing FTA & CBUAE AML directives...",
    "> Success: ROI generated in 45 seconds."
  ];

  const [visibleLines, setVisibleLines] = useState<number>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < terminalTexts.length) {
          setVisibleLines(prev => prev + 1);
          currentLine++;
        } else {
          clearInterval(interval);
        }
      }, 1000); 
      return () => clearInterval(interval);
    }
  }, [isInView, terminalTexts.length]);

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto rounded-2xl bg-black/80 border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.15)] backdrop-blur-xl overflow-hidden font-mono z-10 relative">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-orange-500/20 bg-black/60 shadow-lg">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-orange-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-3 text-[10px] text-white/40 tracking-widest uppercase flex items-center gap-2 drop-shadow-md">
           <Terminal className="w-3 h-3 text-orange-500/70" /> Agent_Runtime.sh
        </span>
      </div>
      <div className="p-6 md:p-8 text-xs md:text-sm text-green-400/90 space-y-4 min-h-[220px] md:min-h-[240px]">
        {terminalTexts.map((text, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={visibleLines > idx ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className={`flex items-start drop-shadow-md ${idx === terminalTexts.length - 1 ? 'text-orange-400 font-bold' : ''}`}
          >
            {text}
          </motion.div>
        ))}
        {visibleLines > 0 && visibleLines <= terminalTexts.length && (
          <motion.div 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2.5 h-4 md:h-5 bg-orange-500 inline-block mt-2 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
          />
        )}
      </div>
    </div>
  );
};

// --- 2. INTERACTIVE ROI ENGINE ---
const AnimatedCounter = ({ value }: { value: number }) => {
  const animatedValue = useSpring(0, { stiffness: 60, damping: 20 });
  const displayValue = useTransform(animatedValue, (latest) => Math.round(latest));

  useEffect(() => {
    animatedValue.set(value);
  }, [value, animatedValue]);

  return <motion.span>{displayValue}</motion.span>;
};

const ROISlider = () => {
  const [hours, setHours] = useState(100);
  const reductionConstant = 0.80; // 80% reduction
  const savedHours = hours * reductionConstant;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-10 rounded-3xl bg-gradient-to-br from-black/80 to-black/40 border border-white/10 hover:border-orange-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(249,115,22,0.1)] transition-colors duration-500 z-10 relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 text-center md:text-left">
        <div className="flex-[1.5]">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 flex items-center justify-center md:justify-start gap-4 drop-shadow-md">
             <Activity className="w-6 h-6 md:w-8 md:h-8 text-orange-500 animate-pulse" /> Operational ROI Engine
          </h3>
          <p className="text-[10px] md:text-xs font-mono text-orange-400/80 tracking-widest uppercase mt-3 drop-shadow-md">Simulate 80% Processing Reduction</p>
        </div>
        <div className="flex-1 text-center md:text-right bg-white/5 md:bg-transparent p-4 md:p-0 rounded-2xl w-full md:w-auto border border-white/5 md:border-none">
           <div className="text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">Hours Saved</div>
           <div className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.5)]">
              <AnimatedCounter value={savedHours} />
           </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center text-xs font-mono text-white/50">
           <span className="tracking-widest">10 HRS</span>
           <span className="text-white font-bold border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)] px-4 py-2 bg-orange-950/30 rounded-xl tracking-widest">MANUAL AUDIT: {hours}H</span>
           <span className="tracking-widest">500 HRS</span>
        </div>
        
        <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
           <input 
             type="range" 
             min="10" 
             max="500" 
             step="10"
             value={hours} 
             onChange={(e) => setHours(Number(e.target.value))}
             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
           />
           <div 
             className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-75 shadow-[0_0_20px_rgba(249,115,22,0.8)]"
             style={{ width: `${((hours - 10) / 490) * 100}%` }}
           />
        </div>
      </div>
    </div>
  );
};

// --- 3. 3D BENTO GRID ---
const TiltCard = ({ title, icon: Icon, description, metric, delay }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="group relative p-6 md:p-8 rounded-3xl bg-black/60 border border-white/10 hover:border-orange-500/50 backdrop-blur-xl transition-colors duration-500 w-full min-h-[200px] flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
      
      <div className="relative z-10 flex items-center gap-4 mb-6" style={{ transform: "translateZ(40px)" }}>
         <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-orange-500 group-hover:border-transparent transition-all shadow-lg">
            <Icon className="w-6 h-6 text-white transition-colors" />
         </div>
         <h4 className="text-2xl font-serif font-bold text-white drop-shadow-md">{title}</h4>
      </div>
      
      <div className="relative z-10 min-h-[60px]" style={{ transform: "translateZ(30px)" }}>
         <p className="text-sm font-sans text-white/70 group-hover:opacity-0 transition-opacity duration-300 absolute inset-0 leading-relaxed max-w-[90%]">
            {description}
         </p>
         
         <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-l-2 border-orange-500 pl-4 py-1">
            <p className="text-xs font-mono font-bold tracking-[0.15em] text-orange-400 uppercase leading-relaxed drop-shadow-md">
               {metric}
            </p>
         </div>
      </div>
    </motion.div>
  );
};

const BentoGrid = () => {
  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 z-10 relative" style={{ perspective: "1500px" }}>
      <TiltCard 
        title="Llama 3.3" 
        icon={Cpu} 
        description="Air-gapped deployment architecture for strict sovereign data residency boundaries."
        metric="40% Hallucination Reduction across complex UAE compliance frameworks."
        delay={0}
      />
      <TiltCard 
        title="LangGraph" 
        icon={Zap} 
        description="Stateful multi-agent orchestration for robust cyclical verification pathways."
        metric="Self-correcting reasoning loops enabling absolute logic determinism."
        delay={0.15}
      />
      <TiltCard 
        title="FastAPI" 
        icon={FileCode2} 
        description="High-throughput Python microservices securely handling async LLM operations."
        metric="Sub-45s pipeline execution processing massive document matrix vectors."
        delay={0.3}
      />
      <TiltCard 
        title="Pinecone" 
        icon={Database} 
        description="Enterprise vector database clustering explicitly built for precision RAG retrieval."
        metric="Zero-downtime CI/CD topology querying 10M+ local document embeddings."
        delay={0.45}
      />
    </div>
  );
};

// --- ORCHESTRATION ---
export default function InteractivePortfolioSuite() {
  return (
    <section className="relative z-10 w-full py-32 px-4 md:px-12 flex flex-col items-center gap-24 md:gap-32 overflow-visible">
       <div className="w-full text-center space-y-4 md:space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.6)] px-2 break-words">Sovereign Architecture</h2>
          <p className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-white/50 px-4 leading-relaxed">Systemizing AI Compliance via Advanced Agentic Topologies</p>
       </div>
       
       <div className="w-full relative z-10">
          <TerminalTypewriter />
       </div>
       
       <div className="w-full relative z-10">
          <BentoGrid />
       </div>

       <div className="w-full relative z-10 pb-20">
          <ROISlider />
       </div>
    </section>
  );
}
