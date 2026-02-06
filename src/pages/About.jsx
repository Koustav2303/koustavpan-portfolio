import { useState, useRef, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaJava, FaReact, FaCode, FaLaptopCode, FaServer, FaTerminal, FaCircle } from "react-icons/fa";
import { SiSpringboot, SiTailwindcss, SiMysql, SiJavascript, SiHibernate, SiHtml5 } from "react-icons/si";
import profileImg from "../assets/profile.jpg"; 

/* ==================== CONFIGURATION ==================== */

const CODE_SNIPPETS = [
  {
    language: "java",
    filename: "Profile.java",
    code: `public class Koustav extends Developer {
  private String location = "Bangalore";
  private String[] stack = {"Java", "React"};

  public void buildFuture() {
    while(alive) {
      code();
      innovate();
    }
  }
}`
  },
  {
    language: "javascript",
    filename: "Hero.jsx",
    code: `const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }}>
      <h1>Hello World</h1>
      <Button onClick={hireMe}>
        Let's Talk
      </Button>
    </motion.div>
  );
}`
  },
  {
    language: "java",
    filename: "ApiController.java",
    code: `@RestController
@RequestMapping("/api/v1")
public class ProjectController {

  @Autowired
  private ProjectService service;

  @GetMapping("/projects")
  public ResponseEntity<List<Project>> getAll() {
    return ResponseEntity.ok(service.findAll());
  }
}`
  },
  {
    language: "sql",
    filename: "schema.sql",
    code: `SELECT name, role, experience
FROM developers
WHERE location = 'Bangalore'
AND skills IN ('Java', 'React')
ORDER BY passion DESC;

-- 1 row affected: Koustav Pan`
  }
];

/* ==================== SUB-COMPONENTS ==================== */

// 1. THE AUTOMATIC CODING TERMINAL (MULTI-LANGUAGE LOOP)
const CodingTerminal = () => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  
  const currentSnippet = CODE_SNIPPETS[currentSnippetIndex];

  useEffect(() => {
    let charIndex = 0;
    let timeoutId;

    const typeChar = () => {
      if (charIndex <= currentSnippet.code.length) {
        setDisplayedCode(currentSnippet.code.slice(0, charIndex));
        charIndex++;
        // Random typing speed (30ms - 60ms)
        timeoutId = setTimeout(typeChar, Math.random() * 30 + 30);
      } else {
        // Finished typing current snippet
        timeoutId = setTimeout(() => {
          // Wait 3 seconds, then switch to next snippet
          setDisplayedCode("");
          setCurrentSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
        }, 3000);
      }
    };

    typeChar();

    return () => clearTimeout(timeoutId);
  }, [currentSnippetIndex]);

  // Syntax Highlighting for multiple languages
  const highlightSyntax = (code) => {
    return code.split(/(\s+)/).map((word, index) => {
      const trimmed = word.trim();
      // Keywords (Java, JS, SQL)
      if (["public", "class", "extends", "private", "void", "while", "return", "const", "return", "import", "from", "SELECT", "FROM", "WHERE", "AND", "ORDER", "BY", "DESC"].includes(trimmed)) 
        return <span key={index} className="text-purple-400">{word}</span>;
      // Types & Components
      if (["String", "Koustav", "Developer", "Hero", "useState", "motion", "Button", "List", "ResponseEntity", "Project"].includes(trimmed)) 
        return <span key={index} className="text-yellow-400">{word}</span>;
      // Strings
      if (word.includes('"') || word.includes("'")) 
        return <span key={index} className="text-green-400">{word}</span>;
      // Annotations (Spring)
      if (word.startsWith("@"))
        return <span key={index} className="text-blue-400">{word}</span>;
      // Comments
      if (word.startsWith("--"))
        return <span key={index} className="text-gray-500 italic">{word}</span>;
      
      return <span key={index} className="text-gray-300">{word}</span>;
    });
  };

  return (
    <div className="w-full h-full bg-[#0a0f1e] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col font-mono text-sm md:text-base min-h-[350px]">
      {/* VS Code Title Bar */}
      <div className="bg-[#1e293b] px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-gray-400 text-xs flex items-center gap-2">
          <FaCode className="text-cyan-400" />
          {currentSnippet.filename}
        </div>
      </div>

      {/* Code Area */}
      <div className="p-6 overflow-hidden relative flex-grow">
        <pre className="whitespace-pre-wrap font-mono leading-relaxed">
          {highlightSyntax(displayedCode)}
          <span className="animate-pulse text-cyan-400">|</span>
        </pre>
        
        {/* Glowing Background Blob inside Terminal */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none"></div>
      </div>
    </div>
  );
};

// 2. SPOTLIGHT CARD (Glowing Border)
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative rounded-3xl border border-white/10 bg-[#0f172a] overflow-hidden group ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// 3. TYPEWRITER EFFECT (Simple Line)
const Typewriter = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span>{displayedText}<span className="animate-pulse text-cyan-400">|</span></span>;
};

// 4. TECH PILL
const TechPill = ({ icon, name, color }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5 hover:border-cyan-500/50 hover:bg-white/10 transition-all cursor-default group">
    <span className={`text-xl ${color} group-hover:scale-110 transition-transform`}>{icon}</span>
    <span className="text-sm font-mono text-gray-300">{name}</span>
  </div>
);

// 5. TIMELINE ITEM
const TimelineItem = ({ year, title, place, desc, grade }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    className="relative pl-8 group"
  >
    <span className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-gray-600 border border-gray-900 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_#22d3ee] transition-all duration-500"></span>
    
    <div className="mb-1 flex items-center gap-3">
        <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">{year}</span>
        <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">{grade}</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{title}</h3>
    <p className="text-sm text-gray-400 mb-2 font-mono">{place}</p>
    <p className="text-sm text-gray-500 max-w-2xl">{desc}</p>
  </motion.div>
);

// 6. STAT BADGE
const StatBadge = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 px-5 py-3 bg-[#0f172a] rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all">
    <span className="text-cyan-400 text-xl">{icon}</span>
    <div>
        <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
        <div className="font-bold text-white">{value}</div>
    </div>
  </div>
);

/* ==================== MAIN ABOUT COMPONENT ==================== */

const About = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- SECTION 1: HERO & PROFILE --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Left: Text & Bio */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              SYSTEM_ONLINE // KOUSTAV_PAN
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Architecting <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Digital Realities
              </span>
            </h1>

            {/* Typewriter Description */}
            <div className="font-mono text-gray-400 text-lg leading-relaxed mb-10 min-h-[120px]">
              <Typewriter text="I am a Java Fullstack Developer bridging the gap between robust backend logic and stunning frontend interfaces. I don't just write code; I compile dreams into deployable reality." speed={30} />
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
               <StatBadge icon={<FaCode />} label="Projects" value="15+" />
               <StatBadge icon={<FaLaptopCode />} label="Experience" value="Fresh" />
               <StatBadge icon={<FaServer />} label="Stack" value="Full" />
            </div>
          </div>

          {/* Right: SCANNING PROFILE IMAGE */}
          <div className="relative group flex justify-center">
            <div className="relative w-80 h-96 rounded-2xl overflow-hidden border-2 border-cyan-500/30 bg-[#0f172a]">
              <img src={profileImg} alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-20 opacity-50"
              />
              <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm p-4 border-t border-cyan-500/30">
                <div className="flex justify-between text-xs font-mono text-cyan-400">
                  <span>ID: KP-2026</span>
                  <span>STATUS: ACTIVE</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -z-10 w-80 h-96 border border-purple-500/30 rounded-2xl top-4 -right-4"></div>
            <div className="absolute -z-20 w-80 h-96 border border-white/10 rounded-2xl top-8 -right-8"></div>
          </div>
        </div>

        {/* --- SECTION 2: CODING TERMINAL & BENTO GRID --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          
          {/* 1. THE AUTOMATIC CODING TERMINAL (Takes up 2 columns) */}
          <div className="md:col-span-2">
             <CodingTerminal />
          </div>

          {/* 2. Tech Stack Box */}
          <SpotlightCard className="p-8 flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-6">
                <FaTerminal className="text-2xl text-purple-400" />
                <h3 className="text-xl font-bold">Mainframe Arsenal</h3>
             </div>
             <div className="flex flex-wrap gap-3">
                <TechPill icon={<FaJava />} name="Java" color="text-red-500" />
                <TechPill icon={<FaReact />} name="React" color="text-cyan-400" />
                <TechPill icon={<SiSpringboot />} name="Spring" color="text-green-500" />
                <TechPill icon={<SiTailwindcss />} name="Tailwind" color="text-cyan-300" />
                <TechPill icon={<SiMysql />} name="SQL" color="text-blue-400" />
             </div>
          </SpotlightCard>
        </div>

        {/* --- SECTION 3: THE TIMELINE --- */}
        <div className="relative">
           <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
              <span className="text-cyan-400">/</span> System Logs (Education)
           </h2>
           
           <div className="space-y-8 relative pl-8 border-l border-white/10">
              <TimelineItem 
                year="2025 - Present"
                title="Java Fullstack Course"
                place="J-Spider, BTM Layout, Bengaluru"
                desc="Specializing in Advanced Java, Spring Boot Microservices, React, and System Design."
                grade="Current"
              />
              <TimelineItem 
                year="2021 - 2025"
                title="B.Tech in Computer Science"
                place="Bankura Unnayani Institute of Engineering"
                desc="Affiliated to Maulana Abul Kalam Azad University. Core focus on Algorithms & Data Structures."
                grade="CGPA: 7.34"
              />
              <TimelineItem 
                year="2019"
                title="Higher Secondary (XII)"
                place="Garhbeta High School (WBCHSE)"
                desc="Major in Physics, Chemistry, and Mathematics."
                grade="Score: 88%"
              />
               <TimelineItem 
                year="2019"
                title="Secondary Exam (X)"
                place="Panchagrami Saradamoni Vidyapith (WBBSE)"
                desc="Foundation in General Sciences and Mathematics."
                grade="Score: 81%"
              />
           </div>
        </div>

      </div>
    </div>
  );
};

export default About;