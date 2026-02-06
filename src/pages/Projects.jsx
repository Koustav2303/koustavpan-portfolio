import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaLayerGroup, FaServer, FaMobileAlt } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiSpringboot, SiMysql, SiJavascript, SiHtml5, SiCss3 } from "react-icons/si";

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

// 2. PROJECT CARD (The main component)
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
      className="group relative bg-[#0a0f1e] rounded-3xl border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-colors"
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
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent z-10 opacity-60"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition duration-700" 
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${project.status === 'Live' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'} backdrop-blur-md`}>
            ● {project.status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 relative z-20">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-cyan-400 text-xs font-mono mb-2 flex items-center gap-2">
              <FaCode /> {project.category.toUpperCase()}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.desc}
        </p>

        {/* Tech DNA Strip */}
        <div className="flex items-center gap-2 mb-6 text-gray-500 text-xs font-mono bg-black/30 p-2 rounded-lg border border-white/5">
          <span className="text-gray-400">STACK_DNA:</span>
          {project.tags.map((tag, i) => (
            <span key={i} className="text-cyan-400">[{tag}]</span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-white/5">
          <a href={project.links.demo} className="flex-1 bg-white/5 hover:bg-cyan-400 hover:text-black border border-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
            <FaExternalLinkAlt /> Demo
          </a>
          <a href={project.links.github} className="flex-1 bg-white/5 hover:bg-white/20 border border-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
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
      title: "Luxury Watch Store",
      category: "Fullstack",
      status: "Live",
      desc: "High-end landing page for luxury watches featuring smooth GSAP animations and 3D product rendering concepts.",
      image: project1,
      tags: ["React", "Spring Boot", "MySQL"],
      links: { demo: "#", github: "#" }
    },
    {
      id: 2,
      title: "Perfume Marketplace",
      category: "Frontend",
      status: "Beta",
      desc: "A dark-mode aesthetic marketplace for fragrances. Focuses on visual storytelling and elegance.",
      image: project2,
      tags: ["React", "Tailwind", "Framer"],
      links: { demo: "#", github: "#" }
    },
    {
      id: 3,
      title: "Nike Product Page",
      category: "Design",
      status: "Live",
      desc: "Dynamic product showcase with color switching, size selection, and responsive interactive elements.",
      image: project3,
      tags: ["HTML", "CSS", "JS"],
      links: { demo: "#", github: "#" }
    },
    {
      id: 4,
      title: "Cake Odering System",
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