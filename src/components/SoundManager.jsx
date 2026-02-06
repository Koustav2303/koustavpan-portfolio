import { useEffect, useState, useRef } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SoundManager = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef(null);
  
  // Sound File Paths (Make sure these exist in public/sounds/)
  const hoverSoundUrl = "/sounds/hover.mp3";
  const clickSoundUrl = "/sounds/click.mp3";

  // Preload Audio
  const hoverAudio = useRef(new Audio(hoverSoundUrl));
  const clickAudio = useRef(new Audio(clickSoundUrl));

  useEffect(() => {
    // Lower the volume for subtlety
    hoverAudio.current.volume = 0.2;
    clickAudio.current.volume = 0.4;
  }, []);

  const playSound = (audioRef) => {
    if (isMuted) return;
    // Reset time to 0 to allow rapid firing
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((e) => {
      // Browsers block autoplay until user interacts. 
      // This catch prevents console errors before first click.
    });
  };

  useEffect(() => {
    const handleInteraction = (e) => {
      // Find if the target (or its parent) is clickable
      const target = e.target.closest("a, button");

      if (target) {
        if (e.type === "mouseenter") {
          playSound(hoverAudio);
        } else if (e.type === "click") {
          playSound(clickAudio);
        }
      }
    };

    // Attach global listeners
    window.addEventListener("click", handleInteraction);
    
    // We use 'mouseover' instead of 'mouseenter' for delegation
    // But we need to filter carefully to avoid spam
    window.addEventListener("mouseover", (e) => {
      const target = e.target.closest("a, button");
      // Only play if we haven't played for this specific element recently (simple debounce could go here)
      if(target) playSound(hoverAudio);
    });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("mouseover", handleInteraction);
    };
  }, [isMuted]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 left-8 z-[90] w-12 h-12 bg-[#0a0f1e]/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
      onClick={() => setIsMuted(!isMuted)}
    >
      <AnimatePresence mode="wait">
        {isMuted ? (
          <motion.div
            key="mute"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
          >
            <FaVolumeMute />
          </motion.div>
        ) : (
          <motion.div
            key="sound"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
          >
            <FaVolumeUp />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SoundManager;