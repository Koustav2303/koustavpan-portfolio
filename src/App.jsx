import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaMapMarkerAlt, FaClock, FaCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Lab from "./pages/Lab";
import Contact from "./pages/Contact";

// COMPONENTS
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import CommandPalette from "./components/CommandPalette";
import HexaBot from "./components/HexaBot";

gsap.registerPlugin(ScrollTrigger);

/* ==================== MENU BUTTON ==================== */
const MenuButton = ({ isOpen, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="relative z-[60] w-12 h-12 flex flex-col justify-center items-center group focus:outline-none"
      aria-label="Toggle Menu"
    >
      <div className={`w-8 h-1 bg-white rounded-full transition-transform duration-300 ease-in-out origin-center transform-gpu ${isOpen ? "rotate-45 translate-y-1.5 !bg-cyan-400 shadow-[0_0_10px_#22d3ee]" : "group-hover:scale-x-110"}`}></div>
      <div className={`w-8 h-1 bg-white rounded-full my-1.5 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100 group-hover:scale-x-75"}`}></div>
      <div className={`w-8 h-1 bg-white rounded-full transition-transform duration-300 ease-in-out origin-center transform-gpu ${isOpen ? "-rotate-45 -translate-y-1.5 !bg-cyan-400 shadow-[0_0_10px_#22d3ee]" : "group-hover:scale-x-110"}`}></div>
    </button>
  );
};

/* ==================== MOBILE MENU ==================== */
const MobileMenu = ({ isOpen, setIsOpen, currentPath }) => {
  const links = [
    { name: "HOME", to: "/" },
    { name: "ABOUT", to: "/about" },
    { name: "PROJECTS", to: "/projects" },
    { name: "LAB", to: "/lab" },
    { name: "CONTACT", to: "/contact" }
  ];

  const menuVars = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.4, ease: [0.12, 0, 0.39, 0] } },
    exit: { scaleY: 0, transition: { delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };
  
  const containerVars = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.2, staggerChildren: 0.05, staggerDirection: 1 } }
  };
  
  const linkVars = {
    initial: { y: 20, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    open: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div variants={menuVars} initial="initial" animate="animate" exit="exit" className="fixed inset-0 z-50 bg-[#020617] text-white origin-top flex flex-col justify-between p-10 overflow-hidden will-change-transform">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

          <div className="flex justify-between items-center text-gray-500 font-mono text-sm relative z-10">
            <span>NAVIGATION</span>
            <span>KP-{new Date().getFullYear()}</span>
          </div>

          <motion.div variants={containerVars} initial="initial" animate="open" exit="initial" className="flex flex-col gap-6 justify-center items-center h-full relative z-10">
            {links.map((link, index) => {
              const isActive = currentPath === link.to;
              return (
                <div key={index} className="overflow-hidden py-1 relative">
                  <motion.div variants={linkVars}>
                    <Link to={link.to} onClick={() => setIsOpen(false)} className={`text-5xl font-black text-transparent bg-clip-text transition-colors tracking-tighter block ${isActive ? "bg-gradient-to-r from-cyan-400 to-blue-500" : "bg-gradient-to-b from-white to-gray-500 hover:to-cyan-400"}`}>
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-between items-end border-t border-white/10 pt-8 relative z-10">
            <div className="flex gap-6 text-2xl text-gray-400">
               <a href="https://github.com/Koustav2303" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub/></a>
               <a href="https://www.linkedin.com/in/koustav-pan-7576a3237/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><FaLinkedin/></a>
            </div>
            <div className="text-right">
              <p className="text-xs text-cyan-400 font-mono">AVAILABLE FOR WORK</p>
              <p className="text-sm font-bold text-white">Bengaluru, India</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ==================== MAGNETIC SOCIAL ICON ==================== */
const MagneticIcon = ({ children, href }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const xTo = gsap.quickTo(ref.current, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(ref.current, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        xTo((clientX - (left + width / 2)) * 0.5);
        yTo((clientY - (top + height / 2)) * 0.5);
      };
      const handleMouseLeave = () => { xTo(0); yTo(0); };

      ref.current.addEventListener("mousemove", handleMouseMove);
      ref.current.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        ref.current?.removeEventListener("mousemove", handleMouseMove);
        ref.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
    return () => ctx.revert();
  }, []);

  return (
    <a ref={ref} href={href} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/50 shadow-lg transition-colors">
      {children}
    </a>
  );
};

/* ==================== MATRIX SCRAMBLE LINK ==================== */
const ScrambleLink = ({ to, children, isActive }) => {
  const textRef = useRef(null);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const originalText = children;

  const handleHover = () => {
    const el = textRef.current;
    let iteration = 0;
    gsap.killTweensOf(el);
    const dummy = { value: 0 };
    gsap.to(dummy, {
      value: originalText.length,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => {
        iteration = dummy.value;
        el.innerText = originalText.split("").map((letter, index) => {
            if (index < Math.floor(iteration)) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("");
      }
    });
  };

  return (
    <Link to={to} onMouseEnter={handleHover} className={`flex items-center gap-2 group w-max ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}>
      <span className="w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-4"></span>
      <span ref={textRef} className="font-mono tracking-widest">{children}</span>
    </Link>
  );
};

/* ==================== LIVE CLOCK COMPONENT ==================== */
const LiveClock = () => {
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const updateClock = () => {
      const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setTime(formatter.format(new Date()));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span className="font-mono tabular-nums">{time} IST</span>;
};

/* ==================== PREMIUM GSAP FOOTER ==================== */
const PremiumFooter = ({ pathname }) => {
  const footerRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Dynamic Interactive Spotlight
      const xTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.6, ease: "power3.out" });

      const onMouseMove = (e) => {
        const { left, top } = footerRef.current.getBoundingClientRect();
        xTo(e.clientX - left);
        yTo(e.clientY - top);
        gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
      };
      const onMouseLeave = () => gsap.to(spotlightRef.current, { opacity: 0, duration: 0.5 });

      footerRef.current.addEventListener("mousemove", onMouseMove);
      footerRef.current.addEventListener("mouseleave", onMouseLeave);

      // 2. Infinite Marquee Background
      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "linear"
      });

      // 3. Staggered Entrance
      gsap.fromTo(".footer-element", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: footerRef.current, start: "top 80%" } }
      );

      return () => {
        footerRef.current?.removeEventListener("mousemove", onMouseMove);
        footerRef.current?.removeEventListener("mouseleave", onMouseLeave);
      };
    }, footerRef);

    // FIX: Force GSAP to recalculate positions slightly after route change
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, [pathname]); // <-- Re-run this effect when pathname changes

  return (
    <footer ref={footerRef} className="relative pt-32 pb-8 mt-auto z-10 bg-[#020617] w-full overflow-hidden border-t border-white/5 group">
      
      {/* Interactive Spotlight */}
      <div ref={spotlightRef} className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 mix-blend-screen z-0" />
      
      {/* Infinite Marquee Background */}
      <div className="absolute top-20 left-0 w-[200%] flex overflow-hidden pointer-events-none z-0 opacity-[0.03] select-none">
        <div className="marquee-track flex whitespace-nowrap">
          <h1 className="text-[12vw] font-black uppercase tracking-tighter mx-8">KOUSTAV.DEV // SOFTWARE ARCHITECT //</h1>
          <h1 className="text-[12vw] font-black uppercase tracking-tighter mx-8">KOUSTAV.DEV // SOFTWARE ARCHITECT //</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          
          {/* Column 1: Branding & Philosophy */}
          <div className="md:col-span-5 footer-element">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-2 border border-white/10 rounded-lg pointer-events-none">
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-400"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-400"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-400"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-400"></div>
              </div>
              <h2 className="text-4xl font-black text-white px-2 py-1">KOUSTAV<span className="text-cyan-400 animate-pulse">_</span></h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-mono border-l-2 border-cyan-500/30 pl-4">
              Architecting digital ecosystems with passion and precision. Transforming complex algorithms into elegant, scalable web solutions.
            </p>
          </div>
          
          {/* Column 2: Matrix Links */}
          <div className="md:col-span-3 footer-element">
            <h3 className="font-bold mb-6 text-white uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> DIRECTORY
            </h3>
            <ul className="space-y-4 text-sm">
              {['Home', 'About', 'Projects', 'Lab', 'Contact'].map(link => {
                const targetPath = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
                return (
                  <li key={link}>
                    <ScrambleLink to={targetPath} isActive={pathname === targetPath}>{link}</ScrambleLink>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Column 3: Live Telemetry & Connect */}
          <div className="md:col-span-4 footer-element bg-[#0a0f1e]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-inner">
            <h3 className="font-bold mb-6 text-white uppercase tracking-widest text-xs flex items-center gap-2">
              <FaCircle className="text-green-500 animate-pulse text-[8px]" /> SYSTEM_TELEMETRY
            </h3>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs font-mono text-gray-400 bg-[#020617] px-3 py-2 rounded-lg border border-white/5">
                <FaMapMarkerAlt className="text-cyan-400" />
                <span>LOC: BENGALURU, IN</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-gray-400 bg-[#020617] px-3 py-2 rounded-lg border border-white/5">
                <FaClock className="text-cyan-400" />
                <span>SYS_TIME: <LiveClock /></span>
              </div>
            </div>

            <div className="flex gap-4">
              <MagneticIcon href="https://github.com/Koustav2303"><FaGithub className="text-xl" /></MagneticIcon>
              <MagneticIcon href="https://www.linkedin.com/in/koustav-pan-7576a3237/"><FaLinkedin className="text-xl" /></MagneticIcon>
              <MagneticIcon href="https://x.com/Koustav2303"><FaTwitter className="text-xl" /></MagneticIcon>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright Bar */}
        <div className="footer-element pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} // KOUSTAV PAN.</p>
            <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full"></span>
            <p className="hidden md:block">ALL RIGHTS RESERVED.</p>
          </div>
          <p className="flex items-center gap-2 mt-4 md:mt-0 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 shadow-inner hover:bg-white/10 transition-colors">
            COMPILED WITH <FaHeart className="text-red-500 animate-pulse" /> IN INDIA
          </p>
        </div>

      </div>
    </footer>
  );
};

/* ==================== SCROLL RESET ==================== */
const ScrollToTop = ({ lenisRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Force native browser scroll to top instantly
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 2. Force Lenis smooth scroller to reset its internal coordinates
    if (lenisRef && lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    }
    
    // 3. Safety fallback: Just in case Lenis is still initializing
    const timeoutId = setTimeout(() => {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(0, { immediate: true, force: true });
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname, lenisRef]);

  return null;
};

/* ==================== MAIN LAYOUT ==================== */
const Layout = ({ lenisRef }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full max-w-[100vw] font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative cursor-none transition-colors duration-500 overflow-x-hidden bg-[#020617]">
      
      {/* Global Components */}
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <ScrollToTop lenisRef={lenisRef} />
      
      {/* NAVBAR */}
      <nav 
        className={`fixed top-0 w-full px-6 py-4 flex justify-between items-center z-[100] transition-all duration-300 transform-gpu ${
          scrolled ? 'bg-[#020617]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' : 'bg-transparent py-5'
        }`}
      >
        <Link to="/" className="text-2xl font-bold tracking-tight z-[101] relative text-white drop-shadow-md flex items-center gap-1 group">
          Koustav<span className="text-cyan-400 group-hover:animate-pulse">.dev</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
           <ul className="flex gap-8 text-sm font-medium text-gray-300 drop-shadow-md">
             {['Home', 'About', 'Projects', 'Lab', 'Contact'].map((item) => {
               const targetPath = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
               const isActive = pathname === targetPath;
               return (
                 <li key={item} className="relative group">
                   <Link 
                     to={targetPath} 
                     className={`transition-colors duration-300 ${isActive ? 'text-cyan-400 font-bold' : 'hover:text-cyan-400'}`}
                   >
                     {item}
                   </Link>
                   {isActive && (
                     <motion.div 
                       layoutId="navbar-indicator"
                       className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                     />
                   )}
                 </li>
               );
             })}
           </ul>
           
           <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10 backdrop-blur-sm shadow-inner">
             <span>CTRL</span><span className="bg-white/10 px-1.5 rounded text-white font-bold border border-white/5">K</span>
           </div>
        </div>

        {/* Hire Me */}
        <div className="hidden md:flex items-center gap-4">
            <Link to="/contact" className="bg-cyan-500 text-slate-950 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Hire Me
            </Link>
        </div>

        <div className="md:hidden z-[101]">
          <MenuButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
        </div>
      </nav>

      {/* MOBILE MENU LAYER */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} currentPath={pathname} />

      {/* MAIN CONTENT ROUTES */}
      <main className="relative z-10 w-full max-w-[100vw] overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* ULTIMATE GSAP FOOTER */}
      <PremiumFooter pathname={pathname} />

      <HexaBot />

    </div>
  );
};

/* ==================== APP ROOT ==================== */
function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (lenisRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      {loading && <Preloader onLoadingComplete={() => setLoading(false)} />}
      
      <div className={loading ? "h-screen overflow-hidden" : ""}>
        <Router>
          <Layout lenisRef={lenisRef} />
        </Router>
      </div>
    </>
  );
}

export default App;