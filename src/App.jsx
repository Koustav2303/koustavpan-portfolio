import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import CommandPalette from "./components/CommandPalette";
import ThemeToggle from "./components/ThemeToggle";
import HexaBot from "./components/HexaBot";

const MenuButton = ({ isOpen, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="relative z-[60] w-12 h-12 flex flex-col justify-center items-center group focus:outline-none"
      aria-label="Toggle Menu"
    >
      <div 
        className={`w-8 h-1 bg-white rounded-full transition-transform duration-300 ease-in-out origin-center transform-gpu ${
          isOpen ? "rotate-45 translate-y-1.5 !bg-cyan-400 shadow-[0_0_10px_#22d3ee]" : "group-hover:scale-x-110"
        }`}
      ></div>
      <div 
        className={`w-8 h-1 bg-white rounded-full my-1.5 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "opacity-100 group-hover:scale-x-75"
        }`}
      ></div>
      <div 
        className={`w-8 h-1 bg-white rounded-full transition-transform duration-300 ease-in-out origin-center transform-gpu ${
          isOpen ? "-rotate-45 -translate-y-1.5 !bg-cyan-400 shadow-[0_0_10px_#22d3ee]" : "group-hover:scale-x-110"
        }`}
      ></div>
    </button>
  );
};

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const links = [
    { name: "HOME", to: "/" },
    { name: "ABOUT", to: "/about" },
    { name: "PROJECTS", to: "/projects" },
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
        <motion.div
          variants={menuVars}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 bg-[#020617] text-white origin-top flex flex-col justify-between p-10 overflow-hidden will-change-transform"
        >
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

          <div className="flex justify-between items-center text-gray-500 font-mono text-sm relative z-10">
            <span>NAVIGATION</span>
            <span>KP-2026</span>
          </div>

          <motion.div
            variants={containerVars}
            initial="initial"
            animate="open"
            exit="initial"
            className="flex flex-col gap-6 justify-center items-center h-full relative z-10"
          >
            {links.map((link, index) => (
              <div key={index} className="overflow-hidden py-1">
                <motion.div variants={linkVars}>
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 hover:to-cyan-400 transition-colors tracking-tighter block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-between items-end border-t border-white/10 pt-8 relative z-10">
            <div className="flex gap-6 text-2xl text-gray-400">
               <a href="https://github.com/Koustav2303" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub/></a>
               <a href="#" className="hover:text-blue-400 transition-colors"><FaLinkedin/></a>
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Layout = () => {
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
    <div className="min-h-screen font-sans selection:bg-cyan-500 selection:text-white relative cursor-none transition-colors duration-500 overflow-x-hidden bg-[#020617]">
      
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <ThemeToggle />
      <ScrollToTop />
      
      <nav 
        className={`fixed top-0 w-full px-6 py-4 flex justify-between items-center z-[100] transition-all duration-300 transform-gpu ${
          scrolled ? 'bg-[#020617]/80 backdrop-blur-lg border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' : 'bg-transparent py-5'
        }`}
      >
        <Link to="/" className="text-2xl font-bold tracking-tight z-[101] relative text-white drop-shadow-md">
          Koustav<span className="text-cyan-400">.dev</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
           <ul className="flex gap-8 text-sm font-medium text-gray-300 drop-shadow-md">
             {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
                    {item}
                  </Link>
                </li>
             ))}
           </ul>
           
           <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10 backdrop-blur-sm">
             <span>CTRL</span><span className="bg-white/10 px-1 rounded text-white">K</span>
           </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
            <Link to="/contact" className="bg-cyan-500 text-slate-950 px-6 py-2 rounded-full font-bold text-sm hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Hire Me
            </Link>
        </div>

        <div className="md:hidden z-[101]">
          <MenuButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="border-t border-white/5 pt-16 pb-8 mt-auto relative z-10 transition-colors duration-500 bg-[#020617]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-white">Koustav<span className="text-cyan-400">.dev</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Building digital experiences with passion and precision. Let's turn your ideas into reality.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Home', 'About', 'Projects', 'Contact'].map(link => (
                <li key={link}><Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Connect</h3>
            <div className="flex gap-4">
              {[<FaGithub />, <FaLinkedin />, <FaTwitter />].map((icon, i) => (
                <a key={i} href={i === 0 ? "https://github.com/Koustav2303" : "#"} target={i === 0 ? "_blank" : "_self"} rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-cyan-400 hover:text-slate-900 transition-all">{icon}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Koustav Pan. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <FaHeart className="text-red-500" /> in India</p>
        </div>
      </footer>

      <HexaBot />

    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" setIsLoading={setLoading} />
        ) : (
          <Router>
            <Layout />
          </Router>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;