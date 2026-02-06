import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaUserAstronaut } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Sarah Williams",
    role: "Project Manager @ TechFlow",
    text: "Koustav didn't just write code; he architected a solution. The transition from our old legacy system to the new React stack was seamless. Absolute professional.",
    stars: 5,
  },
  {
    id: 2,
    name: "James Chen",
    role: "Founder @ StartupX",
    text: "I hired him for a simple landing page, but he delivered a full-blown digital experience. The animations and performance optimization are top-tier.",
    stars: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Lead Dev @ Solaris",
    text: "Rarely do you find a developer who understands both design and backend logic this well. His Java APIs are robust, and his front-end is beautiful.",
    stars: 5,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextStep();
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-20 relative">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
        Client <span className="text-cyan-400">Transmissions</span>
      </h2>

      <div className="relative h-[400px] flex items-center justify-center perspective-1000">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.5 },
            }}
            className="absolute w-full md:w-[600px] p-8 md:p-12 bg-[#0a0f1e]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center group hover:border-cyan-500/30 transition-colors"
          >
            {/* Glowing Avatar */}
            <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              <FaUserAstronaut className="text-3xl text-white" />
            </div>

            {/* Quote Icon */}
            <FaQuoteLeft className="text-4xl text-white/10 absolute top-8 left-8" />

            {/* Stars */}
            <div className="flex gap-1 mb-6 text-yellow-400">
              {[...Array(reviews[index].stars)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic mb-6">
              "{reviews[index].text}"
            </p>

            {/* Name & Role */}
            <div>
              <h3 className="text-xl font-bold text-white">{reviews[index].name}</h3>
              <p className="text-sm font-mono text-cyan-400 mt-1">{reviews[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prevStep}
          className="absolute left-0 md:-left-12 z-10 p-4 bg-white/5 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5 backdrop-blur-md group"
        >
          <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextStep}
          className="absolute right-0 md:-right-12 z-10 p-4 bg-white/5 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5 backdrop-blur-md group"
        >
          <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
};

export default Testimonials;