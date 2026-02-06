// 1. IMPORT HASHROUTER FOR GITHUB PAGES COMPATIBILITY
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// --- IMPORT PAGES ---
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

// --- IMPORT GOD-TIER FEATURES ---
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import SoundManager from "./components/SoundManager";
import CommandPalette from "./components/CommandPalette";
import ThemeToggle from "./components/ThemeToggle";

/* ==================== SUB-COMPONENTS ==================== */

// 1. CUSTOM ANIMATED HAMBURGER BUTTON
const MenuButton = ({ isOpen, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="relative z-[60] w-12 h-12 flex flex-col justify-center items-center group"
    >
      <div 
        className={`w-8 h-1 bg-current rounded-full transition-all duration-300 origin-center ${
          isOpen ? "rotate-45 translate-y-1.5 text-cyan-400 shadow-[0_0_10px_#22d3ee]" : "group-hover:w-10"
        }`}
      ></div>
      <div 
        className={`w-8 h-1 bg-current rounded-full my-1.5 transition-all duration-300 ${
          isOpen ? "opacity-0" : "group-hover:w-6"
        }`}
      ></div>
      <div 
        className={`w-8 h-1 bg-current rounded-full transition-all duration-300 origin-center ${
          isOpen ? "-rotate-45 -translate-y-1 text-cyan-400 shadow-[0_0_10px_#22d3ee]" : "group-hover:w-10"
        }`}
      ></div>
    </button>
  );
};

// 2. MOBILE MENU OVERLAY
const MobileMenu = ({ isOpen, setIsOpen }) => {
  const links = [
    { name: "HOME", to: "/" },
    { name: "ABOUT", to: "/about" },
    { name: "PROJECTS", to: "/projects" },
    { name: "CONTACT", to: "/contact" }
  ];

  const menuVars = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] } },
    exit: { scaleY: 0, transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };
  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
  };
  const linkVars = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVars}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 bg-[#020617] text-white origin-top flex flex-col justify-between p-10 overflow-hidden"
        >
          {/* Keep menu dark for contrast */}
          <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

          <div className="flex justify-between items-center text-gray-500 font-mono text-sm">
            <span>NAVIGATION</span>
            <span>KP-2026</span>
          </div>

          <motion.div
            variants={containerVars}
            initial="initial"
            animate="open"
            exit="initial"
            className="flex flex-col gap-4 justify-center items-center h-full"
          >
            {links.map((link, index) => (
              <div key={index} className="overflow-hidden">
                <motion.div variants={linkVars}>
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 hover:to-cyan-400 transition-all tracking-tighter"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex justify-between items-end border-t border-white/10 pt-8">
            <div className="flex gap-6 text-2xl text-gray-400">
               <a href="#" className="hover:text-white"><FaGithub/></a>
               <a href="#" className="hover:text-blue-400"><FaLinkedin/></a>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-mono">AVAILABLE FOR WORK</p>
              <p className="text-sm font-bold text-white">Bengaluru, India</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 3. SCROLL TO TOP HELPER
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/* ==================== LAYOUT COMPONENT ==================== */

const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500 selection:text-white relative cursor-none transition-colors duration-500">
      
      {/* --- ACTIVATE ALL FEATURES --- */}
      <CustomCursor />
      <ScrollProgress />
      <SoundManager />
      <CommandPalette />
      <ThemeToggle />
      <ScrollToTop />
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full px-6 py-4 flex justify-between items-center z-[100] transition-all duration-300 ${scrolled ? 'bg-[#020617]/90 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'}`}>
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight z-[101] relative mix-blend-difference text-white">
          Koustav<span className="text-cyan-400">.dev</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
           <ul className="flex gap-8 text-sm font-medium text-gray-400 mix-blend-difference">
             {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
                    {item}
                  </Link>
                </li>
             ))}
           </ul>
           
           {/* Command Hint */}
           <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
              <span>CTRL</span><span className="bg-white/10 px-1 rounded text-gray-300">K</span>
           </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
            <Link to="/contact" className="bg-cyan-400 text-[#020617] px-6 py-2 rounded-full font-bold text-sm hover:bg-cyan-300 transition transform hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              Hire Me
            </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-white mix-blend-difference">
          <MenuButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* --- PAGE CONTENT --- */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 pt-16 pb-8 mt-auto relative z-10 transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-4">Koustav<span className="text-cyan-400">.dev</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Building digital experiences with passion and precision. Let's turn your ideas into reality.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Home', 'About', 'Projects', 'Contact'].map(link => (
                <li key={link}><Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="hover:text-cyan-400 transition">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              {[<FaGithub />, <FaLinkedin />, <FaTwitter />].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-cyan-400 hover:text-black transition-all">{icon}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Koustav Pan. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <FaHeart className="text-red-500" /> in India</p>
        </div>
      </footer>

    </div>
  );
};

/* ==================== ROOT APP ==================== */

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" setIsLoading={setLoading} />
        ) : (
          // USE HASH ROUTER FOR GITHUB PAGES
          <Router>
            <Layout />
          </Router>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;