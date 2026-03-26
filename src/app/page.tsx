import CanvasSequence from "@/components/CanvasSequence";
import { 
  MoveDown, MapPin, Mail, Phone, Linkedin 
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-[1400vh] selection:bg-orange-500 selection:text-white bg-transparent text-white font-sans overflow-hidden">
      {/* Scroll-Interactive Canvas Background */}
      <CanvasSequence
        urlPattern="https://amcgxhzwjqcnkvaumtaa.supabase.co/storage/v1/object/public/hero-animation/frame_{index}_delay-0.04s.webp"
        frameCount={192}
        startIndex={0}
        padding={3}
      />

      {/* LUMORA AESTHETIC CONTACT CARD (Adaptive Floating Bottom Bar) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col md:flex-row items-center justify-between p-3 md:p-6 lg:px-10 lg:py-5 rounded-full md:rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,255,255,0.05)] w-[90%] md:w-[calc(100%-48px)] max-w-5xl transition-all">
         
         {/* --- MOBILE VIEW --- */}
         <div className="flex md:hidden w-full items-center justify-between px-2">
            <div className="flex flex-col">
               <span className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-wide text-sm drop-shadow-md">Anish Anto</span>
               <span className="text-[8px] font-mono text-green-400 uppercase tracking-widest">Available</span>
            </div>
            <a 
              href="https://wa.me/971521379125" 
              target="_blank"
              className="px-6 py-2.5 bg-white text-black text-[10px] font-bold font-mono tracking-widest uppercase rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-95 transition-all"
            >
               Contact Me
            </a>
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
            <div className="flex gap-2">
               <a href="mailto:anishanto369@gmail.com" className="p-2 lg:p-3 bg-white/10 rounded-full hover:bg-orange-500/50 transition-all flex items-center justify-center text-white hover:scale-110 active:scale-95">
                  <Mail className="w-4 h-4" />
               </a>
               <a href="https://linkedin.com/in/anish-anto-ai" target="_blank" className="p-2 lg:p-3 bg-white/10 rounded-full hover:bg-orange-500/50 transition-all flex items-center justify-center text-white hover:scale-110 active:scale-95">
                  <Linkedin className="w-4 h-4" />
               </a>
            </div>
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
      <div className="relative z-10 flex flex-col items-center">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="flex h-screen w-full flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-tighter leading-[0.9] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_40px_rgba(0,0,0,0.8)] break-words max-w-full">
            Anish Anto
          </h1>
          <div className="mt-8 md:mt-10 max-w-3xl space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg lg:text-xl font-mono uppercase tracking-[0.25em] text-white drop-shadow-md px-4">
              AI Product Manager | Full-Stack AI Builder
            </p>
            <p className="mx-auto max-w-xl text-[10px] md:text-sm font-light leading-relaxed opacity-70 uppercase tracking-widest text-balance font-mono drop-shadow-md px-4">
              MBA Candidate (JAIN University) and Anthropic-certified AI Engineer.
            </p>
          </div>
          <div className="absolute bottom-32 flex flex-col items-center gap-3 opacity-50 group cursor-pointer transition-opacity hover:opacity-100">
            <MoveDown className="h-6 w-6 md:h-8 md:w-8 animate-bounce text-white drop-shadow-lg" />
          </div>
        </section>

        {/* --- 2. QANUN AI --- */}
        <section className="flex h-screen w-full items-center justify-start px-6 md:px-16 lg:px-32 xl:px-48">
          <div className="max-w-4xl space-y-6 md:space-y-8 text-left">
            <span className="text-[8px] md:text-[10px] lg:text-xs font-bold bg-blue-500/20 text-blue-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-[0.3em] font-mono shadow-xl border border-blue-500/30">The Flagship</span>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] break-words">
              Qanun AI
            </h2>
            <p className="text-xl md:text-3xl lg:text-4xl font-light leading-tight text-white/95 drop-shadow-xl max-w-3xl">
              Locally-hosted UAE Finance & Compliance AI. <br/>Built with <span className="font-serif italic text-2xl md:text-4xl lg:text-5xl font-medium">LLAMA 3.3</span> and <span className="font-serif italic text-2xl md:text-4xl lg:text-5xl font-medium">LangGraph</span> for air-gapped UAE compliance.
            </p>
            <div className="flex flex-col gap-3 md:gap-4 font-mono text-[10px] md:text-xs lg:text-sm uppercase tracking-widest pt-2 md:pt-4">
              <div className="flex items-center gap-3 text-white drop-shadow-lg font-bold">
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full shrink-0" /> 70% reduction in manual legal review
              </div>
              <div className="flex items-center gap-3 text-white drop-shadow-lg font-bold">
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full shrink-0" /> 80% reduction in manual processing
              </div>
              <div className="flex items-center gap-3 text-white drop-shadow-lg font-bold">
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full shrink-0" /> 100% data residency
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. DOCUMIND --- */}
        <section className="flex h-screen w-full items-center justify-end px-6 md:px-16 lg:px-32 xl:px-48">
          <div className="max-w-4xl space-y-6 md:space-y-8 text-right flex flex-col items-end">
            <span className="text-[8px] md:text-[10px] lg:text-xs font-bold bg-purple-500/20 text-purple-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-[0.3em] font-mono shadow-xl border border-purple-500/30">Enterprise SaaS</span>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-l from-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] break-words">
              DocuMind
            </h2>
            <p className="text-xl md:text-3xl lg:text-4xl font-light leading-tight text-white/95 drop-shadow-xl max-w-2xl text-right">
              Enterprise RAG SaaS for regulated sectors with zero-downtime CI/CD.
            </p>
            <div className="flex flex-col gap-3 md:gap-4 font-mono text-[10px] md:text-xs lg:text-sm uppercase tracking-widest pt-2 md:pt-4 items-end">
              <div className="flex items-center gap-2 md:gap-3 text-white drop-shadow-lg font-bold text-right">
                 Scalable vector search for large-scale documentation <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full shrink-0" />
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. ARIA & ATS BUILDER --- */}
        <section className="flex min-h-[150vh] w-full flex-col justify-center px-6 md:px-16 lg:px-32 xl:px-48 gap-32 md:gap-40 py-24">
          <div className="max-w-4xl space-y-6 md:space-y-8 text-left">
            <span className="text-[8px] md:text-[10px] lg:text-xs font-bold bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-[0.3em] font-mono shadow-xl">Autonomous Agent</span>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] break-words">
              ARIA
            </h2>
            <p className="text-xl md:text-3xl lg:text-4xl font-light leading-tight text-white/95 drop-shadow-xl max-w-3xl">
              Autonomous agent featuring multi-agent orchestration and self-correcting reasoning loops.
            </p>
            <div className="flex flex-col gap-3 md:gap-4 font-mono text-[10px] md:text-xs lg:text-sm uppercase tracking-widest pt-2 md:pt-4">
              <div className="flex items-center gap-2 md:gap-3 text-white drop-shadow-lg font-bold text-left">
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full shrink-0" /> 40% reduction in LLM hallucinations
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl space-y-6 md:space-y-8 text-right flex flex-col items-end pt-12 md:pt-24 ml-auto">
             <h3 className="text-4xl md:text-6xl lg:text-8xl leading-none font-serif font-bold text-transparent bg-clip-text bg-gradient-to-l from-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] break-words text-right">ATS Resume<br className="lg:hidden"/> Builder</h3>
             <div className="flex items-center gap-2 md:gap-3 text-white drop-shadow-lg font-bold font-mono text-[10px] md:text-xs lg:text-sm uppercase tracking-widest text-right">
                 80% reduction in resume creation time <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full shrink-0" />
             </div>
          </div>
        </section>

        {/* --- 5. SKILLS SECTION --- */}
        <section className="flex min-h-screen w-full items-center justify-center px-6 md:px-12 py-32 bg-gradient-to-t from-black via-transparent to-transparent">
          <div className="w-full max-w-7xl space-y-12 md:space-y-20 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-2xl">Expertise & Fluency</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 text-left">
               {/* Category 1 */}
               <div className="space-y-4 md:space-y-6 bg-black/50 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all shadow-2xl">
                  <h4 className="text-[10px] md:text-xs lg:text-sm font-mono font-bold tracking-[0.2em] text-orange-400 uppercase border-b border-white/20 pb-3 md:pb-4">Product Management</h4>
                  <ul className="space-y-3 md:space-y-5 font-serif text-lg md:text-xl lg:text-2xl text-white drop-shadow-md">
                     <li>0 to 1 Strategy</li>
                     <li>Agile Execution</li>
                     <li>CI/CD Optimization</li>
                  </ul>
               </div>
               
               {/* Category 2 */}
               <div className="space-y-4 md:space-y-6 bg-black/50 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all shadow-2xl">
                  <h4 className="text-[10px] md:text-xs lg:text-sm font-mono font-bold tracking-[0.2em] text-orange-400 uppercase border-b border-white/20 pb-3 md:pb-4">AI & LLM Products</h4>
                  <ul className="space-y-3 md:space-y-5 font-serif text-lg md:text-xl lg:text-2xl text-white drop-shadow-md">
                     <li>RAG Architectures</li>
                     <li>Prompt Engineering</li>
                     <li>Multi-Agent Orchestration</li>
                     <li>Performance Fine-Tuning</li>
                  </ul>
               </div>

               {/* Category 3 */}
               <div className="space-y-4 md:space-y-6 bg-black/50 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all shadow-2xl">
                  <h4 className="text-[10px] md:text-xs lg:text-sm font-mono font-bold tracking-[0.2em] text-orange-400 uppercase border-b border-white/20 pb-3 md:pb-4">Compliance</h4>
                  <ul className="space-y-3 md:space-y-5 font-serif text-lg md:text-xl lg:text-2xl text-white drop-shadow-md">
                     <li>UAE Financial Regulations</li>
                     <li>VAT Protocols</li>
                     <li>AML Standards</li>
                     <li>Air-gapped Data Residency</li>
                  </ul>
               </div>

               {/* Category 4 */}
               <div className="space-y-4 md:space-y-6 bg-black/50 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all shadow-2xl">
                  <h4 className="text-[10px] md:text-xs lg:text-sm font-mono font-bold tracking-[0.2em] text-orange-400 uppercase border-b border-white/20 pb-3 md:pb-4">Technical Fluency</h4>
                  <ul className="space-y-3 md:space-y-5 font-serif text-lg md:text-xl lg:text-2xl text-white drop-shadow-md">
                     <li>Python & React.js</li>
                     <li>Next.js & FastAPI</li>
                     <li>LangGraph & LangChain</li>
                     <li>Docker & Postgres</li>
                  </ul>
               </div>
            </div>
          </div>
        </section>

        {/* --- 6. EDUCATION & CERTIFICATIONS --- */}
        <section className="flex min-h-screen w-full flex-col items-center justify-center px-6 md:px-12 py-24 md:py-32 z-10 relative bg-black/60 backdrop-blur-xl border-t border-white/10">
          <div className="w-full max-w-7xl space-y-16 md:space-y-24 text-left">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-2xl text-center break-words">Foundation & Credentials</h2>
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
               
               {/* Column 1: Academic & Languages */}
               <div className="flex-1 space-y-12 md:space-y-16">
                  <div className="space-y-6 md:space-y-8">
                     <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide border-b border-white/10 pb-3 md:pb-4 select-none drop-shadow-md">Academic Foundation</h3>
                     
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

                  <div className="space-y-6 md:space-y-8">
                     <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide border-b border-white/10 pb-3 md:pb-4 select-none drop-shadow-md">Languages</h3>
                     <div className="flex flex-wrap gap-3 md:gap-4">
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
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide border-b border-white/10 pb-3 md:pb-4 select-none drop-shadow-md">Technical Certifications</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-12">
                     
                     <div className="space-y-2 md:space-y-3 group">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase">Anthropic Academy</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">Claude with the Anthropic API <span className="block text-[10px] opacity-40 font-mono tracking-widest mt-1">(ID: xh88uinh6jr8)</span></li>
                           <li className="group-hover:text-white transition-colors leading-tight">Claude Code in Action</li>
                        </ul>
                     </div>

                     <div className="space-y-2 md:space-y-3 group">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase">Google Cloud</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">Responsible AI</li>
                           <li className="group-hover:text-white transition-colors leading-tight">Introduction to Generative AI</li>
                        </ul>
                     </div>

                     <div className="space-y-2 md:space-y-3 group">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase">Hugging Face</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">Fundamentals of Large Language Models</li>
                        </ul>
                     </div>

                     <div className="space-y-2 md:space-y-3 group">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase">DeepLearning.AI</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">ChatGPT Prompt Engineering for Developers</li>
                        </ul>
                     </div>

                     <div className="space-y-2 md:space-y-3 group">
                        <p className="text-[10px] md:text-xs font-mono font-bold text-orange-400 tracking-[0.2em] uppercase">HubSpot</p>
                        <ul className="space-y-2 md:space-y-3 font-serif text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md">
                           <li className="group-hover:text-white transition-colors leading-tight">Digital Marketing Certified</li>
                        </ul>
                     </div>

                     <div className="space-y-2 md:space-y-3 group">
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
        </section>

        {/* --- 7. FOOTER SPACER --- */}
        <footer className="flex min-h-[40vh] md:min-h-[30vh] w-full flex-col items-center justify-center px-6 pb-64 md:pb-48 bg-black">
          {/* Spacer to avoid collision with contact card at the bottom */}
        </footer>
      </div>
    </main>
  );
}
