import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaLayerGroup, FaServer, FaMobileAlt } from "react-icons/fa";
import { SiReact } from "react-icons/si";

// FIX: Importing local images
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";

/* ==================== SUB-COMPONENTS ==================== */

// 1. FILTER TABS (The floating capsule menu)
const FilterTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-16">
      <div className="bg-[#0f172a] p-1.5 rounded-full border border-white/10 flex flex-wrap justify-center gap-1 relative z-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-2 rounded-full text-sm font-bold transition-colors ${
              activeTab === tab.id ? "text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-cyan-400 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon} {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// 2. PROJECT CARD (NEW GOD-TIER DESIGN)
const ProjectCard = ({ project }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top } = ref.current.getBoundingClientRect();
    x.set(e.clientX - left);
    y.set(e.clientY - top);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#0a0f1e] rounded-3xl border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-colors flex flex-col h-full"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${x}px ${y}px,
              rgba(34, 211, 238, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent z-10 opacity-80"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition duration-700" 
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-lg ${project.status === 'Live' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${project.status === 'Live' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></span>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 relative z-20 flex flex-col grow">
        <div className="mb-4">
            <div className="text-cyan-400 text-xs font-mono mb-2 flex items-center gap-2 opacity-80">
              <FaCode /> 
              <span className="tracking-widest">{project.category.toUpperCase()}</span>
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{project.title}</h3>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.desc}
        </p>

        {/* --- COOL STACK_DNA SECTION --- */}
        <div className="mt-auto mb-6">
          <div className="p-4 bg-[#020617]/50 rounded-xl border border-white/5 backdrop-blur-sm relative overflow-hidden group/dna hover:border-cyan-500/30 transition-colors">
            
            {/* Header of the DNA Panel */}
            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
              <FaLayerGroup className="text-cyan-500 text-xs" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Stack_DNA</span>
              <div className="ml-auto w-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            </div>

            {/* The Chips */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 text-[11px] font-mono text-cyan-300 bg-cyan-900/10 border border-cyan-500/20 rounded-md hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.15)] transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Decorative Scanline Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent skew-x-12 translate-x-[-200%] group-hover/dna:animate-shimmer pointer-events-none"></div>
          </div>
        </div>
        {/* ---------------------------------- */}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-white/5">
          <a href={project.links.demo} className="flex-1 bg-white/5 hover:bg-cyan-400 hover:text-black border border-white/10 text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
            <FaExternalLinkAlt /> Demo
          </a>
          <a href={project.links.github} className="flex-1 bg-white/5 hover:bg-white/20 border border-white/10 text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
            <FaGithub /> Code
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ==================== MAIN COMPONENT ==================== */

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");

  // DATA
  const TABS = [
    { id: "All", label: "All Projects", icon: <FaLayerGroup /> },
    { id: "Fullstack", label: "Fullstack", icon: <FaServer /> },
    { id: "Frontend", label: "Frontend", icon: <FaMobileAlt /> },
    { id: "Design", label: "UI/UX", icon: <SiReact /> },
  ];

  const PROJECTS_DATA = [
    {
      id: 1,
      title: "GodChat- A futeristic social chat application",
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
      title: "Cake Ordering System",
      category: "Frontend",
      status: "Maintenance",
      desc: "A complete e-commerce solution for a bakery with cart management, admin dashboard, and payment gateway integration.",
      image: project4,
      tags: ["React", "Redux", "CSS"],
      links: { demo: "#", github: "#" }
    },
  ];

  const filteredProjects = activeTab === "All" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND GRID ANIMATION --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      </div>
      
      {/* Blobs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.div 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-block mb-4"
          >
             <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-3xl text-cyan-400 border border-cyan-500/30 mx-auto">
               <FaCode />
             </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Project Lab</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A collection of experiments, full-scale applications, and digital experiences.
            <span className="block mt-2 text-cyan-400 font-mono text-sm">// EXPLORE THE ARCHIVES</span>
          </p>
        </div>

        {/* --- FILTER TABS --- */}
        <FilterTabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* --- PROJECTS GRID --- */}
        <motion.div 
          layout 
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- EMPTY STATE (If no projects match) --- */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500 text-xl">No projects found in this sector.</p>
          </div>
        )}

        {/* --- GITHUB CTA --- */}
        <div className="mt-24 text-center">
          <a 
              href="https://github.com/yourusername" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#0a0f1e] border border-white/10 rounded-full hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all group"
          >
            <FaGithub className="text-2xl group-hover:text-cyan-400 transition-colors" />
            <span className="font-bold text-gray-300 group-hover:text-white">View More on GitHub</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Projects;