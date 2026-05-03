import { useState, useRef, useEffect, forwardRef } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { 
  FaGithub, FaExternalLinkAlt, FaCode, FaLayerGroup, FaServer, 
  FaMobileAlt, FaTerminal, FaFolderOpen, FaStar, FaCodeBranch, 
  FaDatabase, FaExchangeAlt, FaTimes, FaNetworkWired 
} from "react-icons/fa";
import { 
  SiReact, SiSpringboot, SiRedis, SiAmazonwebservices, 
  SiMysql 
} from "react-icons/si";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- GSAP IMPORTS ---
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

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
import project11 from "../assets/project11.png";
import project12 from "../assets/project12.png";
import selfDeclarePDF from "../assets/selfdeclare.pdf";

// --- SUB-COMPONENTS ---

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

const ProjectCard = ({ project, onViewBlueprint }) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#0a0f1e]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] will-change-transform"
    >
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
      
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"></div>

      <div className="relative h-56 sm:h-64 overflow-hidden shrink-0 rounded-t-[2rem]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/20 to-transparent z-10"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out will-change-transform" 
        />
        
        <div className="absolute top-5 right-5 z-30 flex gap-2">
          {project.architecture && (
            <button 
              onClick={() => onViewBlueprint(project)}
              className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 backdrop-blur-md shadow-lg flex items-center gap-1.5 hover:bg-cyan-400 hover:text-slate-950 transition-colors"
            >
              <FaExchangeAlt /> Blueprint
            </button>
          )}
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md shadow-lg flex items-center gap-2 ${project.status === 'Live' ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.2)]' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
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
            </div>

            <div className="flex flex-wrap gap-2 relative z-10">
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

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


// --- ARCHITECTURE BLUEPRINT OVERLAY ---

const NodeIcon = ({ type }) => {
  const icons = {
    frontend: <SiReact className="text-cyan-400" />,
    gateway: <FaExchangeAlt className="text-purple-400" />,
    service: <SiSpringboot className="text-green-400" />,
    realtime: <FaNetworkWired className="text-yellow-400" />,
    database: <SiMysql className="text-blue-400" />,
    cache: <SiRedis className="text-red-400" />,
    storage: <SiAmazonwebservices className="text-orange-400" />,
  };
  return icons[type] || <FaTerminal className="text-gray-400" />;
};

const ArchitectureBlueprint = forwardRef(({ project, onClose }, ref) => {
  const blueprintRef = useRef(null);
  const terminalRef = useRef(null);
  const codeRef = useRef(null);
  const filenameRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    gsap.fromTo(blueprintRef.current, { opacity: 0, scale: 0.9, backdropFilter: "blur(0px)" }, { opacity: 1, scale: 1, backdropFilter: "blur(20px)", duration: 0.6, ease: "back.out(1.5)" });

    gsap.to(".bp-node", { scale: 1.05, repeat: -1, yoyo: true, duration: 1.5, ease: "sine.inOut", stagger: 0.1 });
    gsap.to(".bp-edge", { strokeDashoffset: 0, repeat: -1, duration: 2, ease: "none" });
  }, []);

  useEffect(() => {
    if (hoveredNode && project.architecture.terminalSnippets[hoveredNode.id]) {
      const snippet = project.architecture.terminalSnippets[hoveredNode.id];
      
      gsap.killTweensOf([terminalRef.current, codeRef.current]);
      gsap.set(terminalRef.current, { display: "block", opacity: 0, y: 10 });
      
      filenameRef.current.innerHTML = `> ${snippet.filename}`;
      
      gsap.to(terminalRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(codeRef.current, {
        duration: 1.5,
        text: snippet.code,
        ease: "none",
        delay: 0.1,
      });
    } else if (terminalRef.current) {
      gsap.to(terminalRef.current, { opacity: 0, y: 10, duration: 0.2, ease: "power2.in", onComplete: () => gsap.set(terminalRef.current, {display: "none"}) });
    }
  }, [hoveredNode, project]);

  const handleClose = () => {
    gsap.to(blueprintRef.current, { opacity: 0, scale: 0.9, backdropFilter: "blur(0px)", duration: 0.4, ease: "power2.in", onComplete: onClose });
  };

  const getNodePos = (index, total) => {
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    return { x: col * 200 + 100, y: row * 180 + 100 };
  };

  const nodeMap = project.architecture.nodes.reduce((acc, node, i) => {
    acc[node.id] = { ...node, ...getNodePos(i, project.architecture.nodes.length) };
    return acc;
  }, {});

  return (
    <div ref={ref} className="fixed inset-0 z-[100] bg-[#020617]/80 flex items-center justify-center p-4 md:p-10 font-mono">
      <div ref={blueprintRef} className="relative w-full h-full bg-[#0a0f1e]/90 border border-cyan-500/30 rounded-3xl shadow-[0_0_100px_rgba(34,211,238,0.2)] overflow-hidden flex flex-col selection:bg-cyan-500/20">
        
        <div className="bg-[#020617] h-16 border-b border-cyan-500/30 flex items-center px-6 gap-3 relative z-20">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-[0_0_10px_rgba(239,68,68,0.5)] cursor-pointer" onClick={handleClose}></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          </div>
          <div className="mx-auto text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-5 py-2 rounded-full border border-cyan-500/20">
            SYSTEM_BLUEPRINT // {project.title.toUpperCase()}
          </div>
          <button onClick={handleClose} className="text-gray-500 hover:text-cyan-400 transition-colors text-xl"><FaTimes /></button>
        </div>

        <div className="flex-grow relative bg-[#010309] p-6 sm:p-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>
          
          <div className="absolute top-10 right-10 text-right z-10 max-w-sm hidden md:block">
             <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Architectural Objective</h4>
             <p className="text-gray-300 text-sm leading-relaxed bg-[#0a0f1e] p-4 rounded-xl border border-white/5">{project.architecture.objective}</p>
          </div>

          <svg className="absolute inset-0 z-10 w-full h-full" viewBox="0 0 1000 700">
            <defs>
              <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                <stop offset="50%" stopColor="rgba(34,211,238,0.8)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0)" />
              </linearGradient>
            </defs>
            {project.architecture.edges.map((edge, i) => {
              const from = nodeMap[edge.from];
              const to = nodeMap[edge.to];
              const dx = to.x - from.x;
              const dy = to.y - from.y;
              const angle = Math.atan2(dy, dx) * (180 / Math.PI);

              return (
                <g key={i}>
                  <path 
                    d={`M ${from.x} ${from.y} C ${from.x + dx/2} ${from.y}, ${from.x + dx/2} ${to.y}, ${to.x} ${to.y}`}
                    stroke="url(#edge-grad)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="10 10"
                    strokeDashoffset="20"
                    className="bp-edge"
                  />
                  <text x={(from.x + to.x)/2} y={(from.y + to.y)/2 - 10} textAnchor="middle" fill="rgba(156,163,175,0.7)" fontSize="10" transform={`rotate(${angle} ${(from.x+to.x)/2} ${(from.y+to.y)/2 - 10})`}>
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {Object.values(nodeMap).map((node) => (
              <g key={node.id} transform={`translate(${node.x} ${node.y})`} className="bp-node cursor-pointer group" onMouseEnter={() => setHoveredNode(node)} onMouseLeave={() => setHoveredNode(null)}>
                <circle r="40" fill="rgba(2,6,23,0.9)" stroke="rgba(34,211,238,0.3)" strokeWidth="2" className="group-hover:stroke-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all" />
                <foreignObject x="-30" y="-30" width="60" height="60">
                   <div className="w-full h-full flex items-center justify-center text-3xl">
                      <NodeIcon type={node.type} />
                   </div>
                </foreignObject>
                <text y="60" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="group-hover:fill-cyan-400 transition-colors">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>

          <div ref={terminalRef} className="hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-full max-w-xl bg-[#0a0f1e]/95 border border-cyan-500/30 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] selection:bg-cyan-500/30">
            <div className="bg-[#020617] h-10 border-b border-white/10 flex items-center px-4 gap-2 rounded-t-xl">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div ref={filenameRef} className="ml-3 text-xs text-gray-400 font-mono tracking-wide"></div>
              <div className="ml-auto text-[10px] text-gray-600 font-mono uppercase tracking-widest animate-pulse">deep_dive_active</div>
            </div>
            <div className="p-6 overflow-x-auto relative min-h-[150px]">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
              <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed text-gray-300">
                <span ref={codeRef}></span>
                <span className="animate-pulse text-cyan-400">|</span>
              </pre>
            </div>
          </div>

           <div className="absolute bottom-6 left-6 text-xs text-gray-600 font-mono tracking-wider animate-pulse bg-cyan-500/5 px-4 py-1.5 rounded-full border border-cyan-500/10">
               {'>>>'} HOVER OVER NODES FOR CODE DEEP-DIVE
           </div>
        </div>
      </div>
    </div>
  );
});

/* ==================== GITHUB LIVE REPOS ==================== */

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

/* ==================== PROJECT LINK DOCK / SLIDER ==================== */

const LiveProjectDock = ({ projects }) => {
  const liveProjects = projects.filter(p => p.links && p.links.demo);
  if (!liveProjects.length) return null;

  // Tripled array to ensure a seamless infinite marquee
  const scrollingProjects = [...liveProjects, ...liveProjects, ...liveProjects];

  return (
    <div className="relative z-20 mb-32 w-full mt-10">
      <div className="text-center mb-12">
        <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest block mb-3">Quick Launch</span>
        <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
          <span className="text-cyan-400">/</span> Hosted Project Uplinks
        </h2>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 relative">
        <div 
          className="flex overflow-hidden relative w-full py-6" 
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
          }}
        >
          <motion.div
            animate={{ x: ["0%", "-33.333333%"] }} // Translates 1/3rd of the width because array is tripled
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="flex gap-6 pr-6 w-max hover:[animation-play-state:paused] will-change-transform items-center"
          >
            {scrollingProjects.map((project, idx) => (
              <a 
                key={idx}
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex items-center gap-4 bg-[#0a0f1e]/80 border border-white/10 hover:border-cyan-500/50 backdrop-blur-md px-6 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_30px_rgba(34,211,238,0.2)] w-[280px] md:w-[320px] shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                
                <div className="w-10 h-10 shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <FaExternalLinkAlt className="text-sm" />
                </div>
                
                <div className="flex flex-col pr-4 overflow-hidden">
                  <span className="text-white font-bold text-sm whitespace-nowrap truncate group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </span>
                  <span className="text-gray-500 font-mono text-[10px] tracking-widest uppercase mt-0.5">
                    Initialize Demo
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ==================== MAIN PROJECTS COMPONENT ==================== */

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeBlueprint, setActiveBlueprint] = useState(null);

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
      links: { demo: "https://koustav2303.github.io/godchat/", github: "https://github.com/Koustav2303/godchat" },
      architecture: {
        objective: "Build a robust, real-time social fabric bridging futuristic aesthetic with production-grade SPAs.",
        nodes: [
          { id: "client", type: "frontend", label: "Client (React)" },
          { id: "gateway", type: "gateway", label: "API Gateway" },
          { id: "auth", type: "service", label: "Auth (JWT)" },
          { id: "websocket", type: "realtime", label: "WebSockets" },
          { id: "database", type: "database", label: "MySQL DB" },
          { id: "cache", type: "cache", label: "Redis Cache" }
        ],
        edges: [
          { from: "client", to: "gateway", label: "HTTPS Request" },
          { from: "gateway", to: "auth", label: "Auth Validation" },
          { from: "client", to: "websocket", label: "WS Connection" },
          { from: "gateway", to: "websocket", label: "Internal Event" },
          { from: "websocket", to: "database", label: "Persist Data" },
          { from: "websocket", to: "cache", label: "Cache Message" }
        ],
        terminalSnippets: {
          client: { language: "javascript", filename: "Login.jsx", code: "const handleLogin = async (credentials) => {\n  const response = await api.post('/auth/login', credentials);\n  localStorage.setItem('token', response.data.token);\n};" },
          gateway: { language: "yaml", filename: "application.yml", code: "spring:\n  cloud:\n    gateway:\n      routes:\n        - id: auth-service\n          uri: lb://auth-service\n          predicates:\n            - Path=/api/auth/**" },
          auth: { language: "java", filename: "JwtProvider.java", code: "public String generateToken(Authentication auth) {\n  UserPrincipal principal = (UserPrincipal) auth.getPrincipal();\n  return Jwts.builder()\n    .setSubject(Long.toString(principal.getId()))\n    .signWith(SignatureAlgorithm.HS512, jwtSecret)\n    .compact();\n}" },
          websocket: { language: "java", filename: "WebSocketConfig.java", code: "@Configuration\n@EnableWebSocketMessageBroker\npublic class WebSocketConfig implements WebSocketMessageBrokerConfigurer {\n  @Override\n  public void configureMessageBroker(MessageBrokerRegistry registry) {\n    registry.enableSimpleBroker(\"/topic\");\n    registry.setApplicationDestinationPrefixes(\"/app\");\n  }\n}" },
          database: { language: "sql", filename: "chat_schema.sql", code: "CREATE TABLE chat_messages (\n  id VARCHAR(36) PRIMARY KEY,\n  chat_id VARCHAR(36) NOT NULL,\n  sender_id VARCHAR(36) NOT NULL,\n  content TEXT,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);" },
          cache: { language: "java", filename: "ChatService.java", code: "@Cacheable(value = \"chats\", key = \"#chatId\")\npublic List<ChatMessage> getMessages(String chatId) {\n  return repository.findAllByChatId(chatId);\n}" }
        }
      }
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
      desc: "LuxeStay is a high-end, responsive hotel booking web application focused on elegance, performance, and seamless user experience.",
      image: project4,
      tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
      links: { demo: "https://koustav2303.github.io/LuxeStay-hotel-booking-webpage/", github: "https://github.com/Koustav2303/LuxeStay-hotel-booking-webpage" },
      architecture: {
        objective: "Architect a seamless, premium digital booking interface maximizing performance and conversion through advanced motion design and optimized static rendering.",
        nodes: [
          { id: "client", type: "frontend", label: "Client (Next.js)" },
          { id: "gateway", type: "gateway", label: "Vercel Edge" },
          { id: "backend", type: "service", label: "Booking Service" },
          { id: "database", type: "database", label: "MySQL DB" },
          { id: "cdn", type: "storage", label: "AWS S3 CDN" }
        ],
        edges: [
          { from: "client", to: "gateway", label: "Static Request" },
          { from: "client", to: "cdn", label: "Asset Fetch" },
          { from: "gateway", to: "backend", label: "Dynamic API Call" },
          { from: "backend", to: "database", label: "Persist Booking" }
        ],
        terminalSnippets: {
          client: { language: "javascript", filename: "page.jsx", code: "export const getStaticProps = async () => {\n  const properties = await fetchProperties();\n  return {\n    props: { properties },\n    revalidate: 60,\n  };\n};" },
          gateway: { language: "javascript", filename: "middleware.js", code: "export function middleware(request) {\n  const token = request.cookies.get('token');\n  if (!token) {\n    return NextResponse.redirect(new URL('/login', request.url))\n  }\n}" },
          backend: { language: "java", filename: "BookingController.java", code: "@PostMapping(\"/create\")\npublic ResponseEntity<Booking> createBooking(@RequestBody BookingDto dto) {\n  Booking booking = bookingService.saveBooking(dto);\n  return ResponseEntity.ok(booking);\n}" },
          database: { language: "sql", filename: "hotel_schema.sql", code: "CREATE TABLE bookings (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  user_id INT NOT NULL,\n  hotel_id INT NOT NULL,\n  check_in DATE NOT NULL,\n  status ENUM('PENDING', 'CONFIRMED') DEFAULT 'PENDING'\n);" },
          cdn: { language: "javascript", filename: "aws-config.js", code: "const s3 = new AWS.S3({\n  accessKeyId: process.env.AWS_ACCESS_KEY_ID,\n  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,\n  region: 'us-east-1'\n});" }
        }
      }
    },
    {
      id: 5,
      title: "Next-Gen Employee Management System",
      category: "Frontend",
      status: "Beta",
      desc: "This project is a high-end, responsive HR dashboard focused on streamlined talent management and flawless UX.",
      image: project5,
      tags: ["React", "Vite", "React Bootstrap", "React Router"],
      links: { demo: "https://koustav2303.github.io/employee-management-system/", github: "https://github.com/Koustav2303/employee-management-system" }
    },
    {
      id: 6,
      title: "Online Banking Page : NetBankPro",
      category: "Frontend",
      status: "Beta",
      desc: "This project is a high-end, responsive digital banking suite focused on immersive financial management and a flawless fintech UX.",
      image: project6,
      tags: ["React", "Vite", "React Bootstrap", "React Router","GSAP"],
      links: { demo: "https://koustav2303.github.io/netBankPro/", github: "https://github.com/Koustav2303/netBankPro" }
    },
    {
      id: 7,
      title: "FitX Pro : Elite Fitness Platform",
      category: "Frontend",
      status: "Beta",
      desc: "A hyper-optimized digital storefront for an elite fitness brand. Fusing stark brutalist aesthetics with buttery-smooth 60fps GSAP animations.",
      image: project7,
      tags: ["React", "Vite", "React Bootstrap", "React Router","GSAP"],
      links: { demo: "https://koustav2303.github.io/fitx-pro/", github: "https://github.com/Koustav2303/fitx-pro" }
    },
    {
      id: 8,
      title: "Lumina: Modern Furniture Webpage",
      category: "Frontend",
      status: "Beta",
      desc: "An ultra-premium digital storefront for a luxury furniture brand, built to Awwwards-winning standards. Engineered with React and GSAP.",
      image: project8,
      tags: ["React", "Vite", "React Bootstrap", "React Router","GSAP"],
      links: { demo: "https://koustav2303.github.io/lumina-furniture-webpage/", github: "https://github.com/Koustav2303/lumina-furniture-webpage" }
    },
    {
      id: 9,
      title: "CareSync: Modern Healthcare App",
      category: "Frontend",
      status: "Beta",
      desc: "An enterprise-grade healthcare SaaS platform and patient dashboard, engineered to premium production standards. Built with React, Tailwind CSS, and GSAP.",
      image: project9,
      tags: ["React", "Vite", "React Bootstrap", "React Router","GSAP"],
      links: { demo: "https://koustav2303.github.io/caresync/", github: "https://github.com/Koustav2303/caresync" }
    },
    {
      id: 10,
      title: "Stilo: A watch shopping webpage design",
      category: "UI/UX",
      status: "Live",
      desc: "An ultra-luxury horology showcase and interactive e-commerce frontend, engineered to Awwwards-tier production standards.",
      image: project10,
      tags: ["HTML", "CSS", "JavaScript"],
      links: { demo: "https://koustav2303.github.io/watch-shopping-website/", github: "https://github.com/Koustav2303/watch-shopping-website" }
    },
    {
      id: 11,
      title: "Seven Wonders: A High-Performance React Exhibit & Interactive Documentary",
      category: "UI/UX",
      status: "Live",
      desc: "A high-performance React & GSAP showcase exploring the zenith of human architecture.",
      image: project11,
      tags: ["React JS", "Tailwind CSS", "GSAP"],
      links: { demo: "https://koustav2303.github.io/seven-wonders/", github: "https://github.com/Koustav2303/seven-wonderse" }
    },
    // {
    //   id: 12,
    //   title: "Modern Users Dashboard",
    //   category: "UI/UX",
    //   status: "Live",
    //   desc: "This project is a high-end web application designed to showcase user profiles with an award-winning level of polish. Built on React and Tailwind CSS, it transforms standard data into a cinematic dashboard experience. The UI features sophisticated frosted glass panels over a dark atmospheric background, while GSAP powers buttery-smooth, staggered entry animations and dynamic skill charts. Designed with a mobile-first approach, it seamlessly transitions from a sleek bottom-navigation app on mobile to a locked-in, two-column dashboard on desktop.",
    //   image: project12,
    //   tags: ["React JS", "Tailwind CSS", "GSAP","Glassmorphism"],
    //   links: { demo: "https://koustav2303.github.io/modern-users/", github: "https://github.com/Koustav2303/modern-users" }
    // },
  ];

  const filteredProjects = activeTab === "All" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeTab);

  const handleOpenBlueprint = (project) => {
    gsap.set("body", { overflow: "hidden" }); 
    setActiveBlueprint(project);
  };

  const handleCloseBlueprint = () => {
    gsap.set("body", { overflow: "" }); 
    setActiveBlueprint(null);
  };

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
        <div className="text-center mb-20 relative z-20">
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
        <div className="w-full relative -mx-4 sm:mx-0 relative z-20">
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
                      <ProjectCard project={project} onViewBlueprint={handleOpenBlueprint} />
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

        {/* Hosted Project Link Dock */}
        <LiveProjectDock projects={PROJECTS_DATA} />

        {/* Live Repos Section */}
        <LiveRepos />

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
        <div className="mt-32 text-center relative z-20 pb-10">
          <a 
              href="https://github.com/Koustav2303" 
              className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-[#0f172a] to-[#020617] border border-cyan-500/30 rounded-full hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 group hover:-translate-y-1"
          >
            <FaGithub className="text-3xl text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
            <span className="font-bold tracking-wide text-lg text-gray-300 group-hover:text-white transition-colors duration-300">Access Full Repository</span>
          </a>
        </div>

      </div>

      {/* --- BLUEPRINT OVERLAY --- */}
      <AnimatePresence>
        {activeBlueprint && (
          <ArchitectureBlueprint
            project={activeBlueprint}
            onClose={handleCloseBlueprint}
          />
        )}
      </AnimatePresence>

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