import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaLayerGroup, FaServer, FaMobileAlt, FaTerminal, FaFolderOpen, FaStar, FaCodeBranch } from "react-icons/fa";
import { SiReact } from "react-icons/si";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";
import project5 from "../assets/project5.png";
import project6 from "../assets/project6.png";
import project7 from "../assets/project7.png";
import project8 from "../assets/project8.png";
import project9 from "../assets/project9.png";
import project10 from "../assets/project10.png";
import selfDeclarePDF from "../assets/selfdeclare.pdf";

const FilterTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-16 relative z-20">
      <div className="bg-[#0f172a]/80 backdrop-blur-xl p-1.5 rounded-full border border-white/10 flex flex-wrap justify-center gap-1 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === tab.id ? "text-slate-950" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2 tracking-wide">
              {tab.icon} {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    x.set(e.clientX - left);
    y.set(e.clientY - top);
  };

  return (
    <motion.div
      /* PERFORMANCE FIX: Removed 'layout' prop. Swiper handles layout, Framer Motion fights it and causes lag */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#0a0f1e]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] will-change-transform"
    >
      {/* Interactive Mouse Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${x}px ${y}px,
              rgba(34, 211, 238, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Holographic Glare */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"></div>

      <div className="relative h-56 sm:h-64 overflow-hidden shrink-0 rounded-t-[2rem]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/20 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out will-change-transform" 
        />
        
        <div className="absolute top-5 right-5 z-30">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md shadow-lg flex items-center gap-2 ${project.status === 'Live' ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Live' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></span>
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 relative z-30 flex flex-col grow">
        <div className="mb-4">
            <div className="text-cyan-400 text-xs font-mono mb-3 flex items-center gap-2 opacity-90">
              <FaCode className="text-sm" /> 
              <span className="tracking-widest uppercase border-b border-cyan-400/30 pb-0.5">{project.category}</span>
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300 leading-tight">
              {project.title}
            </h3>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-300 transition-colors">
          {project.desc}
        </p>

        <div className="mt-auto mb-8">
          <div className="p-5 bg-[#020617]/60 rounded-2xl border border-white/5 backdrop-blur-md relative overflow-hidden group/dna hover:border-cyan-500/30 transition-colors shadow-inner">
            
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
              <FaLayerGroup className="text-cyan-400 text-sm" />
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Stack_DNA</span>
              <div className="ml-auto flex gap-1 opacity-50 group-hover/dna:opacity-100 transition-opacity">
                <span className="w-1 h-3 bg-cyan-400/40 rounded-full animate-pulse"></span>
                <span className="w-1 h-3 bg-cyan-400/60 rounded-full animate-pulse delay-75"></span>
                <span className="w-1 h-3 bg-cyan-400/80 rounded-full animate-pulse delay-150"></span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 relative z-10">
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-400 transition-all duration-300 cursor-default shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Hardware accelerated shimmer */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent skew-x-12 translate-x-[-200%] group-hover/dna:animate-shimmer pointer-events-none z-0 will-change-transform"></div>
          </div>
        </div>

        <div className="flex gap-4 pt-5 border-t border-white/10">
          <a href={project.links.demo} target="_blank" rel="noreferrer" className="flex-1 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-400 hover:text-slate-950 text-cyan-400 text-sm font-black tracking-wide py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] z-30">
            <FaExternalLinkAlt /> DEMO
          </a>
          <a href={project.links.github} target="_blank" rel="noreferrer" className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white text-sm font-bold tracking-wide py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] z-30">
            <FaGithub className="text-lg" /> CODE
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const LiveRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Koustav2303/repos?sort=updated&per_page=8")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data.filter((repo) => !repo.fork));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching repos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-cyan-400 font-mono text-center my-20 animate-pulse tracking-widest text-sm">
        INITIALIZING SECURE UPLINK TO GITHUB...
      </div>
    );
  }

  if (!repos.length) return null;

  return (
    <div className="relative z-20 mb-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
        <span className="text-cyan-400">/</span> Live Repositories
      </h2>
      
      <div 
        className="flex overflow-hidden relative w-full" 
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' 
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex gap-6 pr-6 w-max hover:[animation-play-state:paused] will-change-transform"
        >
          {[...repos, ...repos].map((repo, i) => (
            <a
              key={i}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[280px] md:w-[350px] p-6 rounded-2xl bg-[#0a0f1e]/80 border border-white/10 hover:border-cyan-500/50 hover:bg-[#0f172a] transition-all duration-300 group flex flex-col h-[200px] backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-2 text-cyan-400">
                  <FaFolderOpen className="text-xl shrink-0" />
                  <h3 className="font-bold text-white text-lg truncate w-40 md:w-56 group-hover:text-cyan-400 transition-colors">
                    {repo.name}
                  </h3>
                </div>
                <FaExternalLinkAlt className="text-gray-500 group-hover:text-cyan-400 transition-colors text-sm shrink-0" />
              </div>
              
              <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow font-mono relative z-10">
                {repo.description || "No description provided for this repository."}
              </p>
              
              <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mt-auto relative z-10">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span> {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                  <FaStar className="text-gray-600 group-hover:text-yellow-400 transition-colors" /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1 hover:text-white transition-colors">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");

  const TABS = [
    { id: "All", label: "All Projects", icon: <FaLayerGroup /> },
    { id: "Fullstack", label: "Fullstack", icon: <FaServer /> },
    { id: "Frontend", label: "Frontend", icon: <FaMobileAlt /> },
    { id: "Design", label: "UI/UX", icon: <SiReact /> },
  ];

  const PROJECTS_DATA = [
    {
      id: 1,
      title: "GodChat- A futuristic social chat application",
      category: "Frontend",
      status: "Beta",
      desc: "Advanced frontend chat experience built with React and Tailwind, showcasing dynamic state management, animated conversations, and production-grade UI systems.",
      image: project1,
      tags: ["React Js.", "Tailwind", "Typescript"],
      links: { demo: "https://koustav2303.github.io/godchat/", github: "https://github.com/Koustav2303/godchat" }
    },
    {
      id: 2,
      title: "YatraEase — Intelligent Journeys, Seamlessly Planned",
      category: "Frontend",
      status: "Beta",
      desc: "Smart travel planning interface designed to simplify trip discovery, comparison, and booking through an intuitive, modern user experience.",
      image: project2,
      tags: ["React", "Tailwind", "Framer"],
      links: { demo: "https://koustav2303.github.io/yatraease/", github: "https://github.com/Koustav2303/yatraease" }
    },
    {
      id: 3,
      title: "WeatherPro — A Premium AI-Powered Weather Experience",
      category: "Live",
      status: "Live",
      desc: "WeatherPro is a modern, high-performance weather application delivering real-time forecasts through an elegant glassmorphism interface, enhanced with smooth animations and intelligent insights.",
      image: project3,
      tags: ["React", "Tailwind CSS", "Next.js", "Weather API"],
      links: { demo: "https://koustav2303.github.io/WeatherPro/", github: "https://github.com/Koustav2303/WeatherPro" }
    },
    {
      id: 4,
      title: "LuxeStay — A Cinematic Luxury Hotel Booking Experience",
      category: "Frontend",
      status: "Beta",
      desc: "LuxeStay is a high-end, responsive hotel booking web application focused on elegance, performance, and seamless user experience. It features a cinematic parallax hero, advanced search and filtering, smooth transitions, and a refined UI that mirrors the feel of a real luxury travel platform across desktop and mobile.",
      image: project4,
      tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
      links: { demo: "https://koustav2303.github.io/LuxeStay-hotel-booking-webpage/", github: "https://github.com/Koustav2303/LuxeStay-hotel-booking-webpage" }
    },
    {
      id: 5,
      title: "Next-Gen Employee Management System",
      category: "Frontend",
      status: "Beta",
      desc: "This project is a high-end, responsive HR dashboard focused on streamlined talent management and flawless UX. It combines a cinematic glassmorphism design with advanced real-time search, custom data rendering, and smooth transitions to mirror a modern enterprise platform.",
      image: project5,
      tags: ["React", "Vite", "React Bootstrap", "React Router"],
      links: { demo: "https://koustav2303.github.io/employee-management-system/", github: "https://github.com/Koustav2303/employee-management-system" }
    },
    {
      id: 6,
      title: "Online Banking Page : NetBankPro",
      category: "Frontend",
      status: "Beta",
      desc: "This project is a high-end, responsive digital banking suite focused on immersive financial management and a flawless fintech UX. It combines a cinematic glassmorphism design with advanced real-time AI expense analytics, holographic security protocols, and a GSAP-animated UPI Super-App to mirror a modern enterprise banking platform.",
      image: project6,
      tags: ["React", "Vite", "React Bootstrap", "React Router","GSAP"],
      links: { demo: "https://koustav2303.github.io/netBankPro/", github: "https://github.com/Koustav2303/netBankPro" }
    },
    {
      id: 7,
      title: "FitX Pro : Elite Fitness Platform",
      category: "Frontend",
      status: "Beta",
      desc: "A hyper-optimized digital storefront for an elite fitness brand. Fusing stark brutalist aesthetics with buttery-smooth 60fps GSAP animations, this platform features 3D interactive coaching rosters, dynamic swipe-stack membership pricing, and a live e-commerce supply shop built for massive conversion.",
      image: project7,
      tags: ["React", "Vite", "React Bootstrap", "React Router","GSAP"],
      links: { demo: "https://koustav2303.github.io/fitx-pro/", github: "https://github.com/Koustav2303/fitx-pro" }
    },
    {
      id: 8,
      title: "Lumina: Modern Furniture Webpage",
      category: "Frontend",
      status: "Beta",
      desc: "An ultra-premium digital storefront for a luxury furniture brand, built to Awwwards-winning standards. Engineered with React and GSAP, this platform features physics-based dual-spring cursors, asymmetrical parallax grids, horizontal pinning, and a custom text-splitting engine to deliver a cinematic, high-fidelity editorial experience.",
      image: project8,
      tags: ["React", "Vite", "React Bootstrap", "React Router","GSAP"],
      links: { demo: "https://koustav2303.github.io/lumina-furniture-webpage/", github: "https://github.com/Koustav2303/lumina-furniture-webpage" }
    },
    {
      id: 9,
      title: "CareSync: Modern Healthcare App",
      category: "Frontend",
      status: "Beta",
      desc: "An enterprise-grade healthcare SaaS platform and patient dashboard, engineered to premium production standards. Built with React, Tailwind CSS, and GSAP, this application features global authentication state, interactive data visualizations, and a masterclass animation suite—including infinite marquees, 3D staggered bento grids, and scroll-linked sticky pinning—to deliver a flawless, high-fidelity medical experience.",
      image: project9,
      tags: ["React", "Vite", "React Bootstrap", "React Router","GSAP"],
      links: { demo: "https://koustav2303.github.io/caresync/", github: "https://github.com/Koustav2303/caresync" }
    },
    {
      id: 10,
      title: "Stilo: A watch shopping webpage design",
      category: "UI/UX",
      status: "Live",
      desc: "An ultra-luxury horology showcase and interactive e-commerce frontend, engineered to Awwwards-tier production standards. Built natively with HTML5, advanced CSS3, and high-performance Vanilla JavaScript, this application features mathematical cursor tracking, real-time time synchronization, and a masterclass animation suite.",
      image: project10,
      tags: ["HTML", "CSS", "JavaScript"],
      links: { demo: "https://koustav2303.github.io/watch-shopping-website/", github: "https://github.com/Koustav2303/watch-shopping-website" }
    },
  ];

  const filteredProjects = activeTab === "All" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-32 overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* Ambient Backgrounds - Added will-change for performance */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
         <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] will-change-transform"></motion.div>
         <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] will-change-transform"></motion.div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div 
             initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 0.5, type: "spring" }}
             className="inline-block mb-6"
          >
             <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-4xl text-cyan-400 border border-cyan-500/30 mx-auto shadow-[0_0_30px_rgba(34,211,238,0.2)]">
               <FaTerminal />
             </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Project Lab</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            A collection of production-grade experiments, scalable full-stack applications, and cinematic digital experiences.
            <span className="flex items-center justify-center gap-2 mt-4 text-cyan-400 font-mono text-sm font-bold tracking-widest bg-cyan-500/10 w-max mx-auto px-4 py-1.5 rounded-full border border-cyan-500/20">
              <span className="animate-pulse">{'>>>'}</span> SWIPE TO EXPLORE
            </span>
          </motion.p>
        </div>

        <FilterTabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Carousel Section */}
        <div className="w-full relative -mx-4 sm:mx-0">
          {filteredProjects.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  initialSlide={1}
                  loop={true}
                  /* Performance Fix: Prevent frequent re-renders during slide */
                  watchSlidesProgress={true}
                  updateOnWindowResize={true}
                  coverflowEffect={{
                    rotate: 25,       
                    stretch: 0,       
                    depth: 300,       
                    modifier: 1,      
                    slideShadows: false, 
                  }}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  navigation={true}
                  autoplay={{ 
                    delay: 4000, 
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                  className="w-full py-16 px-4 md:px-16"
                >
                  {filteredProjects.map((project) => (
                    <SwiperSlide key={project.id} className="max-w-[350px] md:max-w-[450px] lg:max-w-[500px]">
                      <ProjectCard project={project} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl mx-6 bg-white/5 backdrop-blur-sm">
              <p className="text-gray-500 text-xl font-mono tracking-widest uppercase">No projects found in this sector.</p>
            </div>
          )}
        </div>

        {/* SECURE DATAPAD (Self Declaration) */}
        <div className="mt-40 max-w-4xl mx-auto px-4 sm:px-6 relative z-20">
          <div className="text-center mb-12">
            <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest block mb-3">Verification</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Self Declaration
            </h2>
          </div>
          
          <div className="relative bg-[#0a0f1e]/90 backdrop-blur-2xl rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden group">
            {/* MacOS/Terminal Header */}
            <div className="bg-[#020617] h-12 border-b border-cyan-500/30 flex items-center px-5 gap-2 relative z-20">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
              </div>
              <div className="mx-auto text-[11px] sm:text-xs font-mono text-cyan-400/70 uppercase tracking-widest bg-cyan-500/10 px-4 py-1 rounded-full border border-cyan-500/20">
                secure_viewer.exe // doc_01.pdf
              </div>
            </div>
            
            {/* Document Area */}
            <div className="relative p-2 sm:p-6 bg-[#0f172a]">
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:30px_30px] z-10"></div>
              <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-10"></div>
              
              <div className="relative rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                <iframe
                  src={`${selfDeclarePDF}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                  title="Self Declaration"
                  className="w-full h-auto aspect-[1/1.414] min-h-[500px] sm:min-h-[700px] bg-white relative z-0"
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer CTA */}
        <div className="mt-32 text-center relative z-20">
          <a 
              href="https://github.com/Koustav2303" 
              className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-[#0f172a] to-[#020617] border border-cyan-500/30 rounded-full hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 group hover:-translate-y-1"
          >
            <FaGithub className="text-3xl text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
            <span className="font-bold tracking-wide text-lg text-gray-300 group-hover:text-white transition-colors duration-300">Access Full Repository</span>
          </a>
        </div>

      </div>

      <style jsx global>{`
        /* Swiper Overrides for God-Tier Look */
        .swiper-pagination-bullet {
          background-color: #334155 !important;
          opacity: 1 !important;
          width: 10px !important;
          height: 10px !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #22d3ee !important;
          transform: scale(1.8);
          box-shadow: 0 0 15px rgba(34,211,238,0.8) !important;
        }
        
        .swiper-button-next, .swiper-button-prev {
          color: #22d3ee !important; 
          background: rgba(2, 6, 23, 0.8) !important; 
          width: 64px !important;
          height: 64px !important;
          border-radius: 16px !important;
          border: 1px solid rgba(34, 211, 238, 0.4) !important;
          box-shadow: 0 0 25px rgba(0,0,0,0.8), inset 0 0 15px rgba(34,211,238,0.15) !important;
          backdrop-filter: blur(12px);
          z-index: 50 !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 24px !important;
          font-weight: 900 !important;
          text-shadow: 0 0 20px rgba(34,211,238,1);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: rgba(34, 211, 238, 0.2) !important;
          border-color: #22d3ee !important;
          box-shadow: 0 0 40px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.4) !important;
          transform: scale(1.08) !important;
        }
        .swiper-button-next:hover:after {
          transform: translateX(6px) scale(1.1) !important;
        }
        .swiper-button-prev:hover:after {
          transform: translateX(-6px) scale(1.1) !important;
        }
        .swiper-button-prev { left: 10px !important; }
        .swiper-button-next { right: 10px !important; }
        
        @media (min-width: 768px) {
          .swiper-button-prev { left: 30px !important; }
          .swiper-button-next { right: 30px !important; }
        }
        
        /* PERFORMANCE FIX: Removed blur filter. Using opacity & grayscale is 10x faster for GPU */
        .swiper-slide {
          transition: filter 0.4s ease, opacity 0.4s ease;
          will-change: transform, opacity;
        }
        .swiper-slide:not(.swiper-slide-active) {
          filter: brightness(0.4) grayscale(60%);
          opacity: 0.5;
        }

        @keyframes shimmer {
          100% { transform: translateX(200%) skewX(12deg); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @media (max-width: 768px) {
          .swiper-button-next, .swiper-button-prev {
            display: none !important; 
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;