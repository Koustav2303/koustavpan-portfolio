import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaBolt } from "react-icons/fa";

// --- COMPONENT 1: THE FULL SCREEN CURTAIN (Hides the ugly color swap) ---
const ThemeCurtain = ({ isActive, isDark }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none ${
            !isDark ? "bg-[#020617]" : "bg-[#f8fafc]"
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className={`text-5xl ${!isDark ? "text-cyan-400" : "text-orange-500"}`}
            >
              <FaBolt />
            </motion.div>
            <p className={`font-mono text-xl font-bold tracking-[0.3em] ${!isDark ? "text-cyan-400" : "text-orange-500"}`}>
              {!isDark ? "SYSTEM_REBOOT :: DARK" : "SYSTEM_REBOOT :: LIGHT"}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- COMPONENT 2: THE CYBER SWITCH BUTTON ---
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light-mode");
    } else {
      setIsDark(true);
      document.documentElement.classList.remove("light-mode");
    }
  }, []);

  const handleToggle = () => {
    if (isTransitioning) return; // Prevent double clicks
    
    setIsTransitioning(true);

    // 1. Start the curtain animation
    // 2. Wait for curtain to cover screen (400ms)
    // 3. Switch the actual CSS variables
    // 4. Wait for curtain to close
    
    setTimeout(() => {
      setIsDark((prev) => !prev);
      if (isDark) {
        document.documentElement.classList.add("light-mode");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
      }
    }, 400);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  return (
    <>
      <ThemeCurtain isActive={isTransitioning} isDark={isDark} />
      
      <div className="fixed bottom-8 left-24 z-[90]">
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-24 h-12 rounded-full p-1 flex items-center transition-colors duration-500 border-2 ${
            isDark 
              ? "bg-[#0a0f1e] border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]" 
              : "bg-white border-orange-400/30 shadow-[0_0_20px_rgba(251,146,60,0.3)]"
          }`}
        >
          {/* Background Icons (Static) */}
          <div className="absolute inset-0 flex justify-between items-center px-3 pointer-events-none">
            <FaMoon className={`text-xs ${isDark ? "text-cyan-400 opacity-100" : "text-gray-300 opacity-50"}`} />
            <FaSun className={`text-xs ${!isDark ? "text-orange-500 opacity-100" : "text-gray-600 opacity-50"}`} />
          </div>

          {/* The Sliding Knob */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
            className={`relative z-10 w-10 h-10 rounded-full shadow-md flex items-center justify-center ${
              isDark 
                ? "bg-gradient-to-br from-cyan-400 to-blue-600 ml-auto" 
                : "bg-gradient-to-br from-yellow-300 to-orange-500 mr-auto"
            }`}
          >
            {/* Knob Icon */}
            <motion.div
              key={isDark ? "dark-icon" : "light-icon"}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? (
                <FaMoon className="text-white text-sm drop-shadow-md" />
              ) : (
                <FaSun className="text-white text-sm drop-shadow-md" />
              )}
            </motion.div>
          </motion.div>
        </motion.button>
      </div>
    </>
  );
};

export default ThemeToggle;