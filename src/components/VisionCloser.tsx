"use client";

import { motion, Variants } from "framer-motion";
import { TrendingUp, Target, RefreshCw, Globe, ChevronRight } from "lucide-react";

// M1 Hardware Performance Hooks
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function VisionCloser() {
  return (
    <section className="relative w-full py-32 px-4 md:px-12 flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/90 to-transparent z-10 will-change-transform">
      <div className="w-full max-w-5xl flex flex-col gap-16 md:gap-24 items-center">
        
        {/* 1. The ROI Impact Card */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full p-8 md:p-12 lg:p-16 rounded-[2.5rem] bg-black/60 border border-white/10 hover:border-orange-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(249,115,22,0.1)] transition-colors duration-500 text-center flex flex-col justify-center items-center"
        >
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <div className="p-5 bg-orange-500/10 rounded-full border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <TrendingUp className="w-8 h-8 md:w-12 md:h-12 text-orange-500" />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 drop-shadow-lg tracking-tight px-2">
              The Business of AI: Scalable ROI
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xl font-serif font-light text-white/90 max-w-4xl leading-relaxed mt-2 drop-shadow-md px-2">
              "My RAG and Agentic systems don’t just process data—they recover <strong className="text-green-400 font-bold px-1">$200k+ in annual billable hours</strong> by automating <strong className="text-orange-400 font-bold px-1 text-2xl md:text-3xl lg:text-4xl">80%</strong> of manual legal and compliance triage."
            </p>
          </div>
        </motion.div>

        {/* 2. Vision 2026 Roadmap */}
        <div className="w-full flex justify-center mt-4">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
             variants={staggerContainer}
             className="flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-10 md:gap-4 lg:gap-8 max-w-4xl relative"
           >
              {/* Phase 1 */}
              <motion.div variants={fadeInUp} className="flex flex-col items-center text-center flex-1 group z-10">
                 <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(249,115,22,0.5)] bg-black/50 backdrop-blur-sm">
                    <Target className="w-6 h-6 md:w-7 md:h-7 text-orange-400 drop-shadow-md" />
                 </div>
                 <h4 className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase mb-4 drop-shadow-md">Phase 1 (Current)</h4>
                 <p className="text-sm md:text-base font-serif text-white/95 font-medium px-2 leading-snug">Sovereign RAG & UAE Compliance.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="hidden md:flex flex-col items-center justify-center h-24 text-white/20 z-0">
                 <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
              </motion.div>

              {/* Phase 2 */}
              <motion.div variants={fadeInUp} className="flex flex-col items-center text-center flex-1 group opacity-85 hover:opacity-100 transition-opacity z-10 mt-2 md:mt-0">
                 <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-6 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all duration-300 bg-black/50 backdrop-blur-sm">
                    <RefreshCw className="w-6 h-6 md:w-7 md:h-7 text-white/70 group-hover:text-orange-400 transition-colors" />
                 </div>
                 <h4 className="text-[10px] md:text-xs font-mono font-bold text-white/50 tracking-[0.2em] uppercase mb-4 px-1">Phase 2 (Q3 2026)</h4>
                 <p className="text-sm md:text-base font-serif text-white/80 font-medium px-2 leading-snug">Multi-Agent VAT & AML Orchestration.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="hidden md:flex flex-col items-center justify-center h-24 text-white/20 z-0">
                 <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
              </motion.div>

              {/* Phase 3 */}
              <motion.div variants={fadeInUp} className="flex flex-col items-center text-center flex-1 group opacity-60 hover:opacity-100 transition-opacity z-10 mt-2 md:mt-0">
                 <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-6 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all duration-300 bg-black/50 backdrop-blur-sm">
                    <Globe className="w-6 h-6 md:w-7 md:h-7 text-white/50 group-hover:text-orange-400 transition-colors" />
                 </div>
                 <h4 className="text-[10px] md:text-xs font-mono font-bold text-white/40 tracking-[0.2em] uppercase mb-4 px-1">Phase 3 (Q4 2026)</h4>
                 <p className="text-sm md:text-base font-serif text-white/60 font-medium px-2 leading-snug">Arabic-First LLM Fine-Tuning for Local Jurisdictions.</p>
              </motion.div>

           </motion.div>
        </div>

      </div>
    </section>
  );
}
