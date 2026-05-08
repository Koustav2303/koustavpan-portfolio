import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFlask, FaMagnet, FaVrCardboard, FaFingerprint, FaWaveSquare, FaMobileAlt, FaMousePointer } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/* ==================== HELPER: UNIFIED COORDINATE EXTRACTOR ==================== */
// Extracts X/Y whether the user is using a mouse or a touchscreen
const getCoords = (e) => {
  if (e.touches && e.touches.length > 0) {
    return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
  }
  return { clientX: e.clientX, clientY: e.clientY };
};

/* ==================== EXP 01: ELASTIC MAGNETIC CORE ==================== */
const MagneticCore = () => {
  const containerRef = useRef(null);
  const coreRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const xTo = gsap.quickTo(coreRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(coreRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
      
      const textXTo = gsap.quickTo(textRef.current, "x", { duration: 0.6, ease: "power3.out" });
      const textYTo = gsap.quickTo(textRef.current, "y", { duration: 0.6, ease: "power3.out" });

      const handleMove = (e) => {
        // Prevent scrolling when dragging on mobile
        if (e.type === "touchmove") e.preventDefault(); 

        const { clientX, clientY } = getCoords(e);
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        
        const x = clientX - left - width / 2;
        const y = clientY - top - height / 2;
        
        xTo(x * 0.65); // Core follows tightly
        yTo(y * 0.65);
        textXTo(x * 0.2); // Text has slight parallax
        textYTo(y * 0.2);
      };

      const handleLeave = () => {
        xTo(0); yTo(0);
        textXTo(0); textYTo(0);
      };

      const el = containerRef.current;
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
      el.addEventListener("touchmove", handleMove, { passive: false });
      el.addEventListener("touchend", handleLeave);

      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
        el.removeEventListener("touchmove", handleMove);
        el.removeEventListener("touchend", handleLeave);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300px] md:h-80 bg-[#050b14] rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center cursor-crosshair group shadow-xl">
      <div className="absolute top-4 left-5 text-[10px] md:text-xs font-mono text-cyan-400/50 z-20 tracking-widest uppercase">EXP_01 // Elastic_Magnet</div>
      <div className="absolute top-4 right-5 text-cyan-400/30 flex gap-2 z-20"><FaMobileAlt /><FaMousePointer /></div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div 
        ref={coreRef} 
        className="absolute w-24 h-24 md:w-32 md:h-32 bg-cyan-500/10 border border-cyan-400/40 rounded-full blur-[2px] flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.3)] group-active:scale-90 transition-transform duration-300"
      />
      
      <div ref={textRef} className="z-10 flex flex-col items-center pointer-events-none">
        <FaMagnet className="text-3xl md:text-4xl text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        <span className="font-mono text-cyan-400 text-xs md:text-sm tracking-widest font-bold">DRAG OR SWIPE</span>
      </div>
    </div>
  );
};

/* ==================== EXP 02: 3D HOLOGRAPHIC PARALLAX ==================== */
const HolographicDepth = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const handleMove = (e) => {
        const { clientX, clientY } = getCoords(e);
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        
        // Normalize coordinates from -1 to 1
        const x = (clientX - left - width / 2) / (width / 2);
        const y = (clientY - top - height / 2) / (height / 2);

        // 3D Tilt calculation (inverted for natural feel)
        gsap.to(cardRef.current, {
          rotateY: x * 20,
          rotateX: -y * 20,
          ease: "power2.out",
          duration: 0.6,
          transformPerspective: 1000
        });

        // Interactive Glare tracking
        gsap.to(glowRef.current, {
          x: clientX - left - 150,
          y: clientY - top - 150,
          opacity: 1,
          duration: 0.4
        });

        // Multi-layer Parallax shifts based on depth index
        layersRef.current.forEach((layer, index) => {
          const depth = (index + 1) * 12;
          gsap.to(layer, {
            x: x * depth,
            y: y * depth,
            ease: "power3.out",
            duration: 0.8
          });
        });
      };

      const handleLeave = () => {
        gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, ease: "elastic.out(1, 0.4)", duration: 1.5 });
        gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
        layersRef.current.forEach((layer) => {
          gsap.to(layer, { x: 0, y: 0, ease: "elastic.out(1, 0.4)", duration: 1.5 });
        });
      };

      const el = containerRef.current;
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
      el.addEventListener("touchmove", handleMove, { passive: true });
      el.addEventListener("touchend", handleLeave);

      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
        el.removeEventListener("touchmove", handleMove);
        el.removeEventListener("touchend", handleLeave);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300px] md:h-80 bg-[#050b14] rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center perspective-[1500px] shadow-xl">
      <div className="absolute top-4 left-5 text-[10px] md:text-xs font-mono text-purple-400/50 z-20 tracking-widest uppercase">EXP_02 // Holographic_Depth</div>
      
      <div 
        ref={cardRef} 
        className="relative w-[75%] max-w-[280px] h-48 md:h-56 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-2xl backdrop-blur-md overflow-hidden preserve-3d shadow-2xl"
      >
        {/* Dynamic Mouse Glare */}
        <div ref={glowRef} className="absolute w-[300px] h-[300px] bg-purple-500/40 blur-[70px] rounded-full pointer-events-none opacity-0 mix-blend-screen" />
        
        {/* Parallax Layers */}
        <div className="absolute inset-0 flex items-center justify-center preserve-3d pointer-events-none">
          <div ref={el => layersRef.current[0] = el} className="absolute w-[90%] h-[85%] border border-purple-500/30 rounded-xl" />
          <div ref={el => layersRef.current[1] = el} className="absolute text-5xl md:text-7xl text-purple-500/20"><FaVrCardboard /></div>
          <div ref={el => layersRef.current[2] = el} className="absolute text-4xl md:text-6xl text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"><FaVrCardboard /></div>
          <div ref={el => layersRef.current[3] = el} className="absolute bottom-6 font-mono text-white text-[10px] md:text-xs tracking-widest font-bold bg-purple-500/20 px-4 py-1.5 rounded-full border border-purple-500/30">TOUCH CARD</div>
        </div>
      </div>
    </div>
  );
};

/* ==================== EXP 03: MATRIX CIPHER DECODE ==================== */
const CipherText = ({ text }) => {
  const textRef = useRef(null);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  const decodeText = () => {
    const el = textRef.current;
    const original = text;
    let iteration = 0;
    
    gsap.killTweensOf(el); // Prevent animation overlaps
    
    const dummy = { value: 0 };
    gsap.to(dummy, {
      value: original.length,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        iteration = dummy.value;
        el.innerText = original
          .split("")
          .map((letter, index) => {
            if (index < Math.floor(iteration)) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      }
    });
  };

  return (
    <div 
      onMouseEnter={decodeText}
      onClick={decodeText} // Ensures it works easily on mobile tap
      className="relative w-full h-[300px] md:h-80 bg-[#050b14] rounded-3xl border border-white/10 overflow-hidden flex flex-col items-center justify-center cursor-pointer group shadow-xl"
    >
      <div className="absolute top-4 left-5 text-[10px] md:text-xs font-mono text-green-400/50 z-20 tracking-widest uppercase">EXP_03 // Matrix_Cipher</div>
      
      {/* Background active scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-[200%] -translate-y-full group-hover:animate-[scanline_2s_linear_infinite]" />
      
      <div className="flex flex-col items-center z-10 w-full px-6">
        <FaFingerprint className="text-4xl md:text-6xl text-green-500/20 group-hover:text-green-400 transition-colors duration-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] mb-6" />
        <h2 ref={textRef} className="text-2xl md:text-4xl font-black text-white font-mono tracking-widest text-center w-full break-words">
          TAP_TO_DECRYPT
        </h2>
      </div>
    </div>
  );
};

/* ==================== EXP 04: SCROLL VELOCITY MARQUEE ==================== */
const VelocityScroller = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create infinite horizontal loop
      const tween = gsap.to(textRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 8, // Base speed
        ease: "linear",
      }).totalProgress(0.5);

      // Hook into ScrollTrigger velocity
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          let velocity = self.getVelocity();
          
          // Physical Skew Distortion based on speed
          gsap.to(textRef.current, {
            skewX: Math.max(Math.min(velocity / -50, 20), -20), // Cap the skew
            ease: "power3.out",
            duration: 0.5,
            overwrite: "auto"
          });
          
          // Time Scale Distortion (makes text zoom faster)
          gsap.to(tween, {
            timeScale: 1 + Math.abs(velocity / 150),
            ease: "power2.out",
            duration: 0.5,
            overwrite: "auto"
          });

          // Snap back to normal when stopping
          clearTimeout(window.velocityTimeout);
          window.velocityTimeout = setTimeout(() => {
            gsap.to(textRef.current, { skewX: 0, ease: "elastic.out(1, 0.4)", duration: 1 });
            gsap.to(tween, { timeScale: 1, ease: "power2.out", duration: 1 });
          }, 100);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300px] md:h-80 bg-[#050b14] rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-center shadow-xl">
      <div className="absolute top-4 left-5 text-[10px] md:text-xs font-mono text-yellow-400/50 z-20 tracking-widest uppercase">EXP_04 // Scroll_Velocity</div>
      
      <div className="absolute top-4 right-5 text-yellow-400/50 text-xl md:text-2xl animate-pulse z-20"><FaWaveSquare /></div>

      <div className="flex whitespace-nowrap overflow-hidden w-[200%] items-center h-full mix-blend-screen">
        <div ref={textRef} className="flex whitespace-nowrap text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 uppercase tracking-tighter drop-shadow-lg" style={{ transformOrigin: "bottom center" }}>
          <span className="px-6 md:px-10">SCROLL FASTER TO DISTORT</span>
          <span className="px-6 md:px-10">SCROLL FASTER TO DISTORT</span>
          <span className="px-6 md:px-10">SCROLL FASTER TO DISTORT</span>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 w-full text-center text-[10px] md:text-xs font-mono text-gray-500 tracking-widest">
        GSAP SCROLLTRIGGER PROXY ACTIVE
      </div>
    </div>
  );
};


/* ==================== MAIN LAB PAGE ==================== */
const Lab = () => {
  const headerRef = useRef(null);

  // Entrance Stagger Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".lab-item", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%"
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Grid & Noise */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
        <div className="w-[1200px] h-[1200px] bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,transparent_70%)]" />
      </div>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none z-0 mix-blend-overlay" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 text-center md:text-left" ref={headerRef}>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono mb-6 lab-item shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <FaFlask className="animate-pulse" /> CLASSIFIED_RESEARCH
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter lab-item leading-tight">
            GSAP <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Laboratory</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl font-mono lab-item mx-auto md:mx-0 leading-relaxed">
            A high-performance sandbox dedicated to raw mathematical easing, 3D CSS physics, and timeline orchestration using GreenSock. Fully compatible with touch devices.
          </p>
        </div>

        {/* Experiment Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <div className="lab-item flex flex-col">
            <MagneticCore />
            <div className="mt-6 px-2">
              <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><span className="text-cyan-400">01.</span> Elastic QuickTo()</h3>
              <p className="text-gray-500 text-sm font-mono leading-relaxed">Bypasses standard React state to manipulate DOM nodes directly for zero-latency, physics-based cursor and touch trailing.</p>
            </div>
          </div>

          <div className="lab-item flex flex-col">
            <HolographicDepth />
            <div className="mt-6 px-2">
              <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><span className="text-purple-400">02.</span> 3D Parallax Orchestration</h3>
              <p className="text-gray-500 text-sm font-mono leading-relaxed">Calculates pointer vectors relative to component boundaries to orchestrate multi-layered Z-index depth tilting and dynamic glare.</p>
            </div>
          </div>

          <div className="lab-item flex flex-col">
            <CipherText text="SYSTEM_OVERRIDE_ACTIVE" />
            <div className="mt-6 px-2">
              <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><span className="text-green-400">03.</span> Custom Timeline Decryption</h3>
              <p className="text-gray-500 text-sm font-mono leading-relaxed">A custom GSAP tween that hijacks text rendering frames to cycle through character arrays seamlessly on hover or tap.</p>
            </div>
          </div>

          <div className="lab-item flex flex-col">
            <VelocityScroller />
            <div className="mt-6 px-2">
              <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><span className="text-yellow-400">04.</span> Scroll Velocity Distortion</h3>
              <p className="text-gray-500 text-sm font-mono leading-relaxed">Hooks into ScrollTrigger's velocity tracker to dynamically scale time and physically skew DOM elements in real-time as you scroll.</p>
            </div>
          </div>

        </div>
      </div>
      
      {/* Global Custom Keyframes added for this specific page */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}} />
    </div>
  );
};

export default Lab;