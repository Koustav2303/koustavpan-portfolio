import React, { useRef, useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaServer, FaWifi, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const GlitchText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

  useEffect(() => {
    let iteration = 0;
    let interval = null;
    
    const startGlitch = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplayText(text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return letters[Math.floor(Math.random() * 42)];
        }).join(""));
        
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    };

    startGlitch();
    const loop = setInterval(startGlitch, 10000);
    return () => { clearInterval(interval); clearInterval(loop); };
  }, [text]);

  return <span>{displayText}</span>;
};

const GithubGraph = () => {
  const customTheme = {
    light: ['#0f172a', '#164e63', '#0891b2', '#06b6d4', '#22d3ee'],
    dark: ['#0f172a', '#164e63', '#0891b2', '#06b6d4', '#22d3ee'],
  };

  const ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const gridX = useTransform(springX, [-0.5, 0.5], ["-20px", "20px"]);
  const gridY = useTransform(springY, [-0.5, 0.5], ["-20px", "20px"]);

  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full relative z-20 flex flex-col items-center pb-20"
      style={{ perspective: "1500px" }}
    >
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 px-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Hexa_Core // Neural_Link</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold flex items-center gap-3 text-white">
            <FaServer className="text-cyan-400 opacity-80 flex-shrink-0" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              <GlitchText text="DATA_PIPELINE" />
            </span>
          </h2>
        </div>
        
        <a 
          href="https://github.com/Koustav2303" 
          target="_blank" 
          rel="noreferrer"
          className="group relative flex items-center gap-3 px-5 py-2.5 md:px-6 md:py-3 bg-[#0f172a] rounded-xl border border-cyan-500/30 overflow-hidden hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-[150%] group-hover:animate-sweep pointer-events-none"></div>
          <FaGithub className="text-xl text-cyan-400 group-hover:text-white transition-colors relative z-10" />
          <span className="font-mono text-sm text-slate-300 group-hover:text-white transition-colors relative z-10">@Koustav2303</span>
        </a>
      </div>

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full rounded-2xl md:rounded-3xl p-[1px] group cursor-crosshair"
      >
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(34,211,238,1)_360deg)] animate-spin-slow opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-[conic-gradient(from_180deg,transparent_0_340deg,rgba(168,85,247,1)_360deg)] animate-spin-slow opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <div className="relative w-full h-full bg-[#020617]/90 backdrop-blur-3xl rounded-2xl md:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-2xl md:rounded-tl-3xl m-4 z-30 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-2xl md:rounded-tr-3xl m-4 z-30 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-2xl md:rounded-bl-3xl m-4 z-30 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50 rounded-br-2xl md:rounded-br-3xl m-4 z-30 pointer-events-none"></div>

          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10 mix-blend-screen hidden md:block"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${spotX}px ${spotY}px,
                  rgba(34, 211, 238, 0.12),
                  transparent 80%
                )
              `,
            }}
          />

          <motion.div 
            style={{ x: gridX, y: gridY }}
            className="absolute -inset-[100px] opacity-20 z-0 pointer-events-none"
          >
            <div className="w-full h-full bg-[linear-gradient(rgba(34,211,238,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.2)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
          </motion.div>

          <div 
            className="relative z-20 w-full flex flex-col items-center"
            style={{ transform: "translateZ(20px)" }} 
          >
            <div className="w-full px-4 sm:px-6 md:px-12 pt-4 sm:pt-6 md:pt-12">
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-cyan-500/20 gap-3">
                <div className="flex items-center gap-3">
                  <FaWifi className="text-cyan-400 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                    Uplink_Established
                  </span>
                </div>
                <div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end items-center">
                  <div className="flex gap-2 md:hidden">
                    <button onClick={scrollLeft} className="p-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 active:bg-cyan-500/30 transition-colors">
                      <FaChevronLeft size={12} />
                    </button>
                    <button onClick={scrollRight} className="p-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 active:bg-cyan-500/30 transition-colors">
                      <FaChevronRight size={12} />
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-[10px] font-mono text-slate-500">PACKETS: SECURE</div>
                    <div className="text-[10px] font-mono text-slate-500 text-right">LATENCY: 12ms</div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              ref={scrollContainerRef}
              className="w-full overflow-x-auto scrollbar-hide pb-6 px-4 sm:px-6 md:px-12 scroll-smooth"
            >
              <div className="min-w-[800px] flex justify-start md:justify-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[150px] bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none z-0 hidden md:block transition-colors duration-700"></div>
                
                <div className="relative z-10 bg-slate-950/70 md:bg-slate-950/50 p-4 md:p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <GitHubCalendar 
                    username="Koustav2303" 
                    theme={customTheme}
                    colorScheme="dark"
                    blockSize={14}
                    blockMargin={5}
                    fontSize={12}
                    hideTotalCount={false}
                    hideColorLegend={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        @keyframes sweep {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        .animate-sweep {
          animation: sweep 1.5s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default GithubGraph;