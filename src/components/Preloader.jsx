import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- HEX DUMP GENERATOR (Simulates raw memory processing) ---
const generateHexDump = () => {
  const chars = '0123456789ABCDEF';
  let dump = '';
  for (let i = 0; i < 8; i++) {
    dump += '0x' + Array.from({ length: 4 }).map(() => chars[Math.floor(Math.random() * chars.length)]).join('') + ' ';
  }
  return dump;
};

const Preloader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);
  const [hexLogs, setHexLogs] = useState([]);
  const [isBooted, setIsBooted] = useState(false);

  // The Boot Sequence Text Array
  const bootLogs = [
    "INITIALIZING K-OS CORE v3.1...",
    "MOUNTING REACT_DOM VIRTUAL FILE SYSTEM...",
    "ESTABLISHING SECURE_UPLINK TO BLR_NODE...",
    "COMPILING TAILWIND_CSS DIRECTIVES...",
    "INITIALIZING JAVA_VIRTUAL_MACHINE...",
    "DECRYPTING CYBERTRONIAN_ARTIFACTS...",
    "IGNITING MATRIX_OF_LEADERSHIP...",
    "SYNCHRONIZING FRAMER_MOTION PHYSICS ENGINE...",
    "BYPASSING MAINFRAME SECURITY FIREWALLS...",
    "LOADING DIGITAL_REALITY_ENGINE...",
    "ALL SYSTEMS NOMINAL. PREPARING LAUNCH..."
  ];

  // Logic to drive the progress bar and terminal logs
  useEffect(() => {
    let progressInterval;
    let logInterval;
    let hexInterval;

    const startBootSequence = () => {
      // 1. Progress Bar Logic (Eases in, slows down, speeds up at end)
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => setIsBooted(true), 400); // Small pause at 100% before opening
            setTimeout(() => onLoadingComplete(), 1600); // Unmount after animation completes
            return 100;
          }
          const increment = prev < 30 ? 2 : prev < 70 ? 0.8 : 3;
          return Math.min(prev + increment, 100);
        });
      }, 30);

      // 2. Terminal Log Logic
      logInterval = setInterval(() => {
        setCurrentLog((prev) => (prev < bootLogs.length - 1 ? prev + 1 : prev));
      }, 300);

      // 3. Hex Dump Logic
      hexInterval = setInterval(() => {
        setHexLogs((prev) => {
          const newLogs = [generateHexDump(), ...prev];
          return newLogs.slice(0, 15); // Keep only the last 15 rows
        });
      }, 100);
    };

    startBootSequence();

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearInterval(hexInterval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isBooted && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col bg-[#020617] overflow-hidden cursor-wait font-mono"
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }} // We handle the exit animation internally via shutter effect
        >
          {/* --- TOP SHUTTER --- */}
          <motion.div
            initial={{ y: 0 }}
            animate={progress === 100 ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#020617] border-b border-cyan-500/30 z-20 flex items-end justify-center pb-10"
          >
            {/* Top Shutter Content (Logo / Identity) */}
            <div className="absolute top-8 left-8 flex flex-col gap-1">
              <span className="text-[10px] text-cyan-500/50 uppercase tracking-[0.3em]">System.Info</span>
              <span className="text-xs text-white tracking-widest">KOUSTAV.DEV // ROOT_ACCESS</span>
            </div>
            
            {/* Massive Background Text */}
            <div className="absolute -bottom-16 w-full text-center pointer-events-none opacity-5">
              <span className="text-[12rem] font-black tracking-tighter text-cyan-400 leading-none">SYSTEM</span>
            </div>
          </motion.div>

          {/* --- BOTTOM SHUTTER --- */}
          <motion.div
            initial={{ y: 0 }}
            animate={progress === 100 ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#020617] border-t border-cyan-500/30 z-20 flex items-start justify-center pt-10"
          >
             {/* Bottom Shutter Content (Hex Dump) */}
             <div className="absolute bottom-8 right-8 text-right flex flex-col gap-1 opacity-20">
              {hexLogs.map((log, index) => (
                <span key={index} className="text-[8px] sm:text-[10px] text-cyan-400 font-mono tracking-widest">
                  {log}
                </span>
              ))}
            </div>

            {/* Massive Background Text */}
            <div className="absolute -top-16 w-full text-center pointer-events-none opacity-5">
              <span className="text-[12rem] font-black tracking-tighter text-cyan-400 leading-none">ONLINE</span>
            </div>
          </motion.div>

          {/* --- CENTRAL HUD (Sandwiched between shutters) --- */}
          <div className="relative z-30 flex-1 flex flex-col items-center justify-center pointer-events-none">
            
            <div className="w-full max-w-2xl px-6 flex flex-col items-center">
              
              {/* Animated Progress Percentage */}
              <div className="flex items-baseline gap-2 mb-2 relative">
                <motion.span 
                  className={`text-6xl sm:text-8xl font-black tabular-nums tracking-tighter ${progress === 100 ? 'text-green-400' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500'}`}
                  animate={progress === 100 ? { scale: [1, 1.1, 1], textShadow: "0 0 20px rgba(74,222,128,0.8)" } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {Math.floor(progress)}
                </motion.span>
                <span className="text-2xl text-cyan-500">%</span>
                
                {/* Access Granted Flash */}
                {progress === 100 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute -right-32 top-1/2 -translate-y-1/2 px-2 py-1 bg-green-500/20 border border-green-500 rounded text-xs text-green-400 tracking-widest hidden sm:block shadow-[0_0_10px_rgba(74,222,128,0.3)]"
                  >
                    ACCESS_GRANTED
                  </motion.div>
                )}
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-[2px] bg-slate-800 relative overflow-hidden rounded-full mb-8 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                <motion.div 
                  className={`absolute top-0 left-0 h-full ${progress === 100 ? 'bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)]' : 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]'}`}
                  style={{ width: `${progress}%` }}
                  layout
                />
              </div>

              {/* Terminal Logs Container */}
              <div className="w-full h-24 overflow-hidden relative flex flex-col items-center">
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] z-10"></div>
                
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentLog}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.2 }}
                    className={`text-xs sm:text-sm tracking-widest uppercase font-bold text-center ${progress === 100 ? 'text-green-400' : 'text-cyan-400'}`}
                  >
                    {progress === 100 ? "SYSTEM BOOT SUCCESSFUL" : bootLogs[currentLog]}
                  </motion.div>
                </AnimatePresence>
                
                {/* Visual loading bars beneath the text */}
                <div className="mt-4 flex gap-1 opacity-50">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-1 bg-cyan-500"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
          
          {/* Scanline Overlay */}
          <div className="absolute inset-0 z-50 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;