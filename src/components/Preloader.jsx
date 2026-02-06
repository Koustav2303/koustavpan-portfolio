import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ setIsLoading }) => {
  const [text, setText] = useState("");
  const fullText = "INITIALIZING SYSTEM... LOADING ASSETS... ACCESS GRANTED.";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typing);
        setTimeout(() => setIsLoading(false), 800); // Close after typing finishes
      }
    }, 40); // Typing speed

    return () => clearInterval(typing);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center font-mono text-cyan-400"
    >
      <div className="text-xl md:text-3xl font-bold tracking-widest">
        {text} <span className="animate-pulse">|</span>
      </div>
      
      {/* Loading Bar */}
      <div className="w-64 h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
        />
      </div>
      
      <p className="text-xs text-gray-500 mt-2">© 2026 KOUSTAV PAN</p>
    </motion.div>
  );
};

export default Preloader;