import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [isVisible, setIsVisible] = useState(false);

  // Convert progress (0-1) to stroke dashoffset
  // Circle circumference (r=18) ≈ 113
  const strokeDashoffset = useTransform(scaleX, [0, 1], [113, 0]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-[90]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
    >
      <button 
        onClick={scrollToTop}
        className="relative w-14 h-14 bg-[#0a0f1e]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.2)] group hover:scale-110 transition-transform"
      >
        {/* Progress Circle SVG */}
        <svg className="absolute w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" fill="none" stroke="#1e293b" strokeWidth="3" />
          <motion.circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
            strokeDasharray="113"
            style={{ strokeDashoffset }}
            strokeLinecap="round"
          />
        </svg>
        
        <FaArrowUp className="text-cyan-400 group-hover:-translate-y-1 transition-transform" />
      </button>
    </motion.div>
  );
};

export default ScrollProgress;