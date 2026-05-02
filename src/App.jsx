import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

// COMPONENTS
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import CommandPalette from "./components/CommandPalette";
import HexaBot from "./components/HexaBot";

/* ==================== MENU BUTTON ==================== */
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

/* ==================== MOBILE MENU ==================== */
const MobileMenu = ({ isOpen, setIsOpen, currentPath }) => {
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
          {/* Ambient Glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

          <div className="flex justify-between items-center text-gray-500 font-mono text-sm relative z-10">
            <span>NAVIGATION</span>
            <span>KP-{new Date().getFullYear()}</span>
          </div>

          <motion.div
            variants={containerVars}
            initial="initial"
            animate="open"
            exit="initial"
            className="flex flex-col gap-6 justify-center items-center h-full relative z-10"
          >
            {links.map((link, index) => {
              const isActive = currentPath === link.to;
              return (
                <div key={index} className="overflow-hidden py-1 relative">
                  <motion.div variants={linkVars}>
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`text-5xl font-black text-transparent bg-clip-text transition-colors tracking-tighter block ${
                        isActive 
                          ? "bg-gradient-to-r from-cyan-400 to-blue-500" 
                          : "bg-gradient-to-b from-white to-gray-500 hover:to-cyan-400"
                      }`}
                    >
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

/* ==================== SCROLL RESET ==================== */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/* ==================== MAIN LAYOUT ==================== */
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
    // BULLETPROOF WIDTH CONSTRAINT HERE
    <div className="min-h-screen w-full max-w-[100vw] font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative cursor-none transition-colors duration-500 overflow-x-hidden bg-[#020617]">
      
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <ScrollToTop />
      
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
             {['Home', 'About', 'Projects', 'Contact'].map((item) => {
               const targetPath = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
               const isActive = pathname === targetPath;
               return (
                 <li key={item} className="relative">
                   <Link 
                     to={targetPath} 
                     className={`transition-colors duration-300 ${isActive ? 'text-cyan-400 font-bold' : 'hover:text-cyan-400'}`}
                   >
                     {item}
                   </Link>
                   {/* Active Underline Indicator */}
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

        {/* Hire Me / Mobile Menu Toggle */}
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
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 pt-16 pb-8 mt-auto relative z-10 transition-colors duration-500 bg-[#020617] w-full">
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
              {['Home', 'About', 'Projects', 'Contact'].map(link => {
                const targetPath = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
                const isActive = pathname === targetPath;
                return (
                  <li key={link}>
                    <Link 
                      to={targetPath} 
                      className={`transition-colors ${isActive ? 'text-cyan-400' : 'hover:text-cyan-400'}`}
                    >
                      {link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Connect</h3>
            <div className="flex gap-4">
              {[
                { icon: <FaGithub />, url: "https://github.com/Koustav2303" },
                { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/koustav-pan-7576a3237/" },
                { icon: <FaTwitter />, url: "https://x.com/Koustav2303" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-cyan-400 hover:text-slate-900 transition-all hover:scale-110 shadow-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          {/* Dynamic Year added here */}
          <p>© {new Date().getFullYear()} Koustav Pan. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">Made with <FaHeart className="text-red-500 animate-pulse" /> in India</p>
        </div>
      </footer>

      <HexaBot />

    </div>
  );
};

/* ==================== APP ROOT ==================== */
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onLoadingComplete={() => setLoading(false)} />}
      
      <div className={loading ? "h-screen overflow-hidden" : ""}>
        <Router>
          <Layout />
        </Router>
      </div>
    </>
  );
}

export default App;