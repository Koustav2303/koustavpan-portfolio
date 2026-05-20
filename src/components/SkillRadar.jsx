import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCrosshairs, FaFingerprint, FaServer, FaLock } from "react-icons/fa";

// UPGRADED DATA: Now includes specific tech stacks for the Telemetry Panel
const skills = [
  { 
    id: "SEC-01", name: "FRONTEND", value: 95, color: "#22d3ee", 
    subTech: ["React.js", "Next.js", "Three.js (WebGL)", "GSAP & Framer Motion", "Tailwind CSS"] 
  },
  { 
    id: "SEC-02", name: "BACKEND", value: 85, color: "#a855f7", 
    subTech: ["Java Spring Boot", "Node.js & Express", "RESTful APIs", "GraphQL", "Microservices"] 
  },
  { 
    id: "SEC-03", name: "DATABASE", value: 80, color: "#3b82f6", 
    subTech: ["PostgreSQL", "MySQL", "MongoDB (NoSQL)", "Redis Caching", "Prisma ORM"] 
  },
  { 
    id: "SEC-04", name: "DEVOPS", value: 70, color: "#38bdf8", 
    subTech: ["Docker Containerization", "AWS EC2 & S3", "GitHub Actions (CI/CD)", "Vercel / Netlify", "Nginx"] 
  },
  { 
    id: "SEC-05", name: "SYS_DESIGN", value: 75, color: "#c084fc", 
    subTech: ["System Architecture", "Load Balancing", "Message Queues (Kafka)", "WebSockets", "Authentication (JWT)"] 
  },
  { 
    id: "SEC-06", name: "UI/UX", value: 88, color: "#2dd4bf", 
    subTech: ["Figma Prototyping", "Wireframing", "A11y Standards", "Pixel-Perfect Translation", "Interaction Design"] 
  }
];

const SkillRadar = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSkill, setActiveSkill] = useState(skills[0]); // Default to first skill
  const [isScrambling, setIsScrambling] = useState(false);
  
  const size = 500; 
  const center = size / 2;
  const maxRadius = size * 0.35; 

  useEffect(() => {
    setMounted(true);
  }, []);

  // Matrix Scramble Effect Trigger
  const handleNodeHover = (skill) => {
    if (skill.name !== activeSkill.name) {
      setIsScrambling(true);
      setActiveSkill(skill);
      setTimeout(() => setIsScrambling(false), 400);
    }
  };

  const getCoordinatesForAngle = (angle, radius) => {
    const angleInRadians = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(angleInRadians),
      y: center + radius * Math.sin(angleInRadians)
    };
  };

  const numLevels = 5;
  const gridPolygons = Array.from({ length: numLevels }).map((_, levelIndex) => {
    const radius = maxRadius * ((levelIndex + 1) / numLevels);
    return skills.map((_, i) => {
      const { x, y } = getCoordinatesForAngle(i * 60, radius);
      return `${x},${y}`;
    }).join(" ");
  });

  const dataPoints = skills.map((skill, i) => {
    const radius = maxRadius * (skill.value / 100);
    const { x, y } = getCoordinatesForAngle(i * 60, radius);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative w-full py-24 md:py-32 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 bg-[#020617] border-y border-white/5 z-20 overflow-hidden px-4 md:px-8">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full"></div>

      {/* ==================== LEFT: THE RADAR HUD ==================== */}
      <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center shrink-0">
        
        {/* Outer Rotating Target Rings */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20 pointer-events-none" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border border-dotted border-purple-500/30 pointer-events-none" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute inset-12 rounded-full border-[0.5px] border-cyan-500/10 pointer-events-none" />

        {/* Dynamic Radar Sweep (Conical Gradient) */}
        <div className="absolute inset-[15%] rounded-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-full h-full origin-center"
            style={{ background: `conic-gradient(from 0deg, transparent 70%, rgba(34, 211, 238, 0.4) 100%)` }}
          />
        </div>

        {/* The SVG Canvas */}
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full drop-shadow-[0_0_20px_rgba(34,211,238,0.15)] overflow-visible">
          
          {/* Grid Web */}
          {gridPolygons.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1"
              strokeOpacity={0.1 + (idx * 0.1)} 
            />
          ))}

          {/* Spokes */}
          {skills.map((_, i) => {
            const { x, y } = getCoordinatesForAngle(i * 60, maxRadius);
            return <line key={`spoke-${i}`} x1={center} y1={center} x2={x} y2={y} stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.2" />;
          })}

          {/* Holographic Data Polygon */}
          {mounted && (
            <motion.polygon
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.4 }}
              points={dataPoints}
              fill="rgba(34, 211, 238, 0.15)"
              stroke="#22d3ee"
              strokeWidth="2"
              className="drop-shadow-[0_0_15px_#22d3ee] transition-all duration-300"
              style={{ transformOrigin: "center" }}
            />
          )}

          {/* Interactive Data Nodes (Hover Targets) */}
          {mounted && skills.map((skill, i) => {
            const radius = maxRadius * (skill.value / 100);
            const { x, y } = getCoordinatesForAngle(i * 60, radius);
            const isActive = activeSkill.name === skill.name;

            return (
              <g key={`node-${i}`} className="cursor-crosshair" onMouseEnter={() => handleNodeHover(skill)} onClick={() => handleNodeHover(skill)}>
                {/* Invisible larger hit area for easier hovering */}
                <circle cx={x} cy={y} r="20" fill="transparent" />
                
                {/* Target Lock brackets when active */}
                {isActive && (
                  <motion.g initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="pointer-events-none">
                    <path d={`M ${x-10} ${y-5} L ${x-10} ${y-10} L ${x-5} ${y-10}`} fill="none" stroke={skill.color} strokeWidth="2" />
                    <path d={`M ${x+10} ${y-5} L ${x+10} ${y-10} L ${x+5} ${y-10}`} fill="none" stroke={skill.color} strokeWidth="2" />
                    <path d={`M ${x-10} ${y+5} L ${x-10} ${y+10} L ${x-5} ${y+10}`} fill="none" stroke={skill.color} strokeWidth="2" />
                    <path d={`M ${x+10} ${y+5} L ${x+10} ${y+10} L ${x+5} ${y+10}`} fill="none" stroke={skill.color} strokeWidth="2" />
                  </motion.g>
                )}

                {/* The Dot */}
                <motion.circle
                  initial={{ opacity: 0, r: 0 }}
                  whileInView={{ opacity: 1, r: isActive ? 6 : 4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  cx={x}
                  cy={y}
                  fill={isActive ? skill.color : "#fff"}
                  className="transition-colors duration-300"
                  style={{ filter: `drop-shadow(0 0 10px ${isActive ? skill.color : '#fff'})` }}
                />
              </g>
            );
          })}

          {/* Labels */}
          {skills.map((skill, i) => {
            const { x, y } = getCoordinatesForAngle(i * 60, maxRadius + 35);
            let textAnchor = "middle";
            if (x < center - 15) textAnchor = "end";
            if (x > center + 15) textAnchor = "start";
            const isActive = activeSkill.name === skill.name;

            return (
              <motion.text
                key={`label-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                x={x}
                y={y}
                fill={isActive ? skill.color : "rgba(255,255,255,0.5)"}
                fontSize={isActive ? "14" : "12"}
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className="tracking-widest cursor-crosshair transition-all duration-300"
                onMouseEnter={() => handleNodeHover(skill)}
                onClick={() => handleNodeHover(skill)}
                style={{ filter: isActive ? `drop-shadow(0 0 8px ${skill.color})` : 'none' }}
              >
                {skill.name}
              </motion.text>
            );
          })}
        </svg>

        {/* Center Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <FaCrosshairs className="text-cyan-500/50 text-2xl animate-pulse" />
          <div className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
        </div>
      </div>

      {/* ==================== RIGHT: LIVE TELEMETRY PANEL ==================== */}
      <div className="w-full lg:w-[450px] relative z-20 flex flex-col justify-center">
        
        {/* Header */}
        <div className="mb-6 border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono mb-3">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span> LIVE_TELEMETRY
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
            TARGET <span style={{ color: activeSkill.color }} className="transition-colors duration-300">LOCKED</span>
          </h2>
        </div>

        {/* Stats Readout */}
        <div className="bg-[#0a0f1e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          
          {/* Subtle grid bg inside panel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
          
          <div className="relative z-10 flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-500 font-mono text-xs mb-1 tracking-widest">SECTOR ID: {activeSkill.id}</p>
              <h3 
                className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${isScrambling ? 'animate-pulse blur-[1px]' : ''}`}
                style={{ color: activeSkill.color }}
              >
                {activeSkill.name}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-gray-500 font-mono text-xs mb-1 tracking-widest">MASTERY</p>
              <p className="text-3xl font-black text-white font-mono tabular-nums">{activeSkill.value}%</p>
            </div>
          </div>

          <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
            <motion.div 
              className="h-full"
              initial={{ width: 0 }}
              animate={{ width: `${activeSkill.value}%`, backgroundColor: activeSkill.color }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-4">
            <p className="text-xs font-mono text-gray-400 border-l-2 pl-3" style={{ borderColor: activeSkill.color }}>
              DECRYPTED SUBSYSTEMS:
            </p>
            
            <AnimatePresence mode="wait">
              <motion.ul 
                key={activeSkill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid gap-3"
              >
                {activeSkill.subTech.map((tech, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-mono bg-white/5 px-4 py-2.5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                    <FaServer style={{ color: activeSkill.color }} className="text-xs" />
                    <span className={isScrambling ? 'blur-[2px]' : ''}>{tech}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono">
            <span className="flex items-center gap-1"><FaLock /> SECURE CONNECTION</span>
            <span>PING: {Math.floor(Math.random() * 20 + 10)}ms</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SkillRadar;