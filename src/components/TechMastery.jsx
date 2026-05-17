import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaJava, FaNodeJs, FaWaveSquare } from "react-icons/fa";
import { SiGreensock, SiMysql, SiMongodb, SiTypescript, SiDocker } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

// EXPANDED DATA: 9 CARDS TOTAL FOR A FULLSTACK ARCHITECT
const techData = [
  {
    id: "01",
    title: "React.js",
    category: "Frontend Ecosystem",
    desc: "Architecting complex, state-driven Single Page Applications with scalable component hierarchies and seamless virtual DOM diffing. Specializing in advanced hooks, Context API, and performance optimization techniques like memoization and lazy loading to deliver lightning-fast, reactive user interfaces.",
    icon: <FaReact />,
    color: "text-cyan-400",
    bgAccent: "bg-cyan-500/10",
    borderAccent: "border-cyan-500/30",
    glow: "shadow-[0_0_40px_rgba(34,211,238,0.3)]"
  },
  {
    id: "02",
    title: "TypeScript",
    category: "Type Safety",
    desc: "Enforcing strict type safety and object-oriented paradigms across full-stack ecosystems. Eliminating runtime errors and building highly maintainable, self-documenting codebases using advanced interfaces, generics, and utility types.",
    icon: <SiTypescript />,
    color: "text-blue-500",
    bgAccent: "bg-blue-600/10",
    borderAccent: "border-blue-600/30",
    glow: "shadow-[0_0_40px_rgba(59,130,246,0.3)]"
  },
  {
    id: "03",
    title: "GSAP",
    category: "Advanced Kinematics",
    desc: "Mastery of GreenSock Animation Platform. Engineering high-performance scroll triggers, custom easing, and complex timeline orchestrations. Moving beyond basic CSS transitions to manipulate the DOM with physics-based precision.",
    icon: <SiGreensock />,
    color: "text-green-400",
    bgAccent: "bg-green-500/10",
    borderAccent: "border-green-500/30",
    glow: "shadow-[0_0_40px_rgba(74,222,128,0.3)]"
  },
  {
    id: "04",
    title: "Node & Express",
    category: "Server Environments",
    desc: "Developing fast, scalable, non-blocking I/O network applications and RESTful APIs using the V8 JavaScript runtime. Implementing custom middleware, JWT authentication, and real-time WebSocket communication to power seamless full-stack data flow.",
    icon: <FaNodeJs />,
    color: "text-green-500",
    bgAccent: "bg-green-600/10",
    borderAccent: "border-green-600/30",
    glow: "shadow-[0_0_40px_rgba(34,197,94,0.3)]"
  },
  {
    id: "05",
    title: "Java",
    category: "Core Architecture",
    desc: "Building robust, enterprise-grade backend systems. Deep understanding of OOP principles, multithreading, memory management, and the JVM ecosystem. Utilizing Spring Boot to engineer secure, modular microservices and resilient APIs.",
    icon: <FaJava />,
    color: "text-red-500",
    bgAccent: "bg-red-500/10",
    borderAccent: "border-red-500/30",
    glow: "shadow-[0_0_40px_rgba(239,68,68,0.3)]"
  },
  {
    id: "06",
    title: "MongoDB",
    category: "NoSQL Databases",
    desc: "Architecting highly scalable, document-oriented NoSQL databases. Engineering complex aggregation pipelines, indexing strategies, and distributed data models capable of handling massive, unstructured data throughput securely.",
    icon: <SiMongodb />,
    color: "text-green-500",
    bgAccent: "bg-green-500/10",
    borderAccent: "border-green-500/30",
    glow: "shadow-[0_0_40px_rgba(34,197,94,0.3)]"
  },
  {
    id: "07",
    title: "MySQL",
    category: "Relational Data",
    desc: "Designing highly normalized database schemas, optimizing complex SQL queries, and ensuring ACID compliance across high-volume transactions. Proficient in relational mapping and crafting efficient data pipelines.",
    icon: <SiMysql />,
    color: "text-blue-400",
    bgAccent: "bg-blue-500/10",
    borderAccent: "border-blue-500/30",
    glow: "shadow-[0_0_40px_rgba(59,130,246,0.3)]"
  },
  {
    id: "08",
    title: "Docker",
    category: "Cloud & DevOps",
    desc: "Containerizing complex microservice architectures to guarantee 100% environment parity from local development to production. Orchestrating scalable, isolated deployments that integrate seamlessly into automated CI/CD pipelines.",
    icon: <SiDocker />,
    color: "text-sky-400",
    bgAccent: "bg-sky-500/10",
    borderAccent: "border-sky-500/30",
    glow: "shadow-[0_0_40px_rgba(56,189,248,0.3)]"
  },
  {
    id: "09",
    title: "Lenis",
    category: "Frictionless Physics",
    desc: "Implementing butter-smooth scroll hijacking and momentum-based physics to bridge the gap between native applications and web experiences. Synchronizing Lenis with GSAP ScrollTrigger to orchestrate heavy WebGL flawlessly.",
    icon: <FaWaveSquare />,
    color: "text-purple-400",
    bgAccent: "bg-purple-500/10",
    borderAccent: "border-purple-500/30",
    glow: "shadow-[0_0_40px_rgba(168,85,247,0.3)]"
  }
];

/* --- INDIVIDUAL CARD COMPONENT --- */
const TechCard = ({ tech, isActive, onClick }) => {
  const titleRef = useRef(null);
  const bgIconRef = useRef(null);
  
  // Matrix Scramble Effect on Activate
  useEffect(() => {
    if (isActive && titleRef.current) {
      const chars = "!<>-_\\/[]{}—=+*^?#________";
      const original = tech.title;
      let iteration = 0;
      
      gsap.killTweensOf(titleRef.current);
      const dummy = { value: 0 };
      
      gsap.to(dummy, {
        value: original.length,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          iteration = dummy.value;
          titleRef.current.innerText = original
            .split("")
            .map((char, index) => {
              if (index < Math.floor(iteration)) return original[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        }
      });
    }
  }, [isActive, tech.title]);

  // Subtle Parallax for active background icon
  const handleMouseMove = (e) => {
    if (!isActive || !bgIconRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
    
    gsap.to(bgIconRef.current, { x, y, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div 
      onMouseEnter={onClick}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`accordion-item relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border flex flex-col justify-between 
      ${isActive 
        ? `${tech.bgAccent} ${tech.borderAccent} ${tech.glow}` 
        : `bg-white/5 border-white/10 hover:bg-white/10 grayscale hover:grayscale-0`
      }`}
      style={{ 
        flex: isActive ? 6 : 1, // Increased active flex ratio for 9 items to ensure content fits
        minHeight: isActive ? '320px' : '70px', 
        minWidth: isActive ? 'auto' : '70px' 
      }}
    >
      
      {/* --- INACTIVE STATE (Collapsed) --- */}
      <div className={`absolute inset-0 flex flex-row lg:flex-col items-center justify-between p-4 lg:py-6 transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <span className="text-gray-500 font-mono text-[10px]">{tech.id}</span>
        <div className={`text-2xl lg:text-3xl ${tech.color} lg:-rotate-90 transition-transform`}>{tech.icon}</div>
        <span className="hidden lg:block text-gray-500 font-mono text-[10px] uppercase tracking-widest -rotate-180" style={{ writingMode: "vertical-rl" }}>
          {tech.title}
        </span>
      </div>

      {/* --- ACTIVE STATE (Expanded) --- */}
      <div className={`absolute inset-0 p-5 lg:p-8 flex flex-col justify-between transition-opacity duration-700 delay-100 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Giant Background Icon */}
        <div 
          ref={bgIconRef}
          className={`absolute -right-10 -bottom-10 lg:-right-20 lg:-bottom-20 text-[10rem] lg:text-[20rem] opacity-[0.07] pointer-events-none ${tech.color} -rotate-12`}
        >
          {tech.icon}
        </div>

        {/* Top Header */}
        <div className="flex justify-between items-start relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#020617]/50 border border-white/10 text-[10px] lg:text-xs font-mono tracking-widest text-gray-400 uppercase backdrop-blur-md">
            <span className={`w-2 h-2 rounded-full ${tech.color.replace('text', 'bg')} animate-pulse`}></span>
            {tech.category}
          </div>
          <span className="text-gray-500 font-mono text-xs lg:text-sm">{tech.id}</span>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-auto">
          <div className={`text-3xl lg:text-5xl mb-3 lg:mb-4 ${tech.color}`}>{tech.icon}</div>
          <h3 ref={titleRef} className="text-2xl lg:text-4xl font-black text-white mb-3 tracking-tight min-h-[40px]">
            {tech.title}
          </h3>
          <p className="text-gray-300 text-xs lg:text-sm leading-relaxed lg:leading-relaxed max-w-lg font-light">
            {tech.desc}
          </p>
        </div>
      </div>

    </div>
  );
};

/* ==================== MAIN COMPONENT ==================== */
const TechMastery = () => {
  const [activeId, setActiveId] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance Stagger Animation
      gsap.fromTo(".accordion-item", 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.08, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 bg-[#020617] border-y border-white/5 z-20 overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            SYS_MASTERY_DETECTED
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Arsenal</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl font-mono text-sm md:text-base">
            Hover to decrypt system capabilities. Specialized in high-performance digital ecosystems and scalable architecture.
          </p>
        </div>

        {/* Expanding Accordion Grid - Changed from md:flex-row to lg:flex-row to give 9 items enough room */}
        <div className="w-full flex flex-col lg:flex-row gap-3 h-auto lg:h-[70vh] min-h-[500px]">
          {techData.map((tech, index) => (
            <TechCard 
              key={tech.id}
              tech={tech} 
              isActive={activeId === index} 
              onClick={() => setActiveId(index)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechMastery;