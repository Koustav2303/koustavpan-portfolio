import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView,
  animate,
  useMotionValue,
  useMotionTemplate, // FIXED: Added missing import
  AnimatePresence 
} from "framer-motion";
import { 
  FaReact, FaJava, FaCode, FaLaptopCode, FaServer, 
  FaTerminal, // FIXED: Added missing import
  FaDownload, FaFolderOpen, FaExternalLinkAlt, 
  FaCodeBranch, FaStar 
} from "react-icons/fa";
import { 
  SiTailwindcss, SiSpringboot, SiMysql 
} from "react-icons/si";

// --- COMPONENTS & ASSETS ---
import GithubGraph from "../components/GithubGraph";
import profileImg from "../assets/profile4.jpg"; 
import resumePDF from "../assets/resume.pdf"; 

/* ==================== CONFIGURATION (15 SNIPPETS) ==================== */

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
      <h1>Architecting Digital Realities</h1>
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
    filename: "analytics.sql",
    code: `SELECT name, role, experience
FROM developers
WHERE location = 'Bangalore'
AND skills IN ('Java', 'React')
ORDER BY passion DESC;

-- 1 row affected: Koustav Pan`
  },
  {
    language: "javascript",
    filename: "useFetch.js",
    code: `export const useData = (endpoint) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => setData(data));
  }, [endpoint]);

  return data;
};`
  },
  {
    language: "java",
    filename: "UserEntity.java",
    code: `@Entity
@Table(name = "system_users")
public class User {
  @Id
  @GeneratedValue
  private Long id;
  
  @Column(nullable = false)
  private String coffeeLevel = "MAXIMUM";
}`
  },
  {
    language: "javascript",
    filename: "tailwind.config.js",
    code: `export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyan: { 400: "#22d3ee" },
        dark: "#0f172a"
      }
    }
  },
  plugins: [],
}`
  },
  {
    language: "java",
    filename: "BuildProcess.java",
    code: `public interface BuildProcess {
  void writeCleanCode();
  
  void debugLikeCrazy();
  
  void deployToProduction();
}`
  },
  {
    language: "sql",
    filename: "init_schema.sql",
    code: `CREATE TABLE portfolio_projects (
  id INT PRIMARY KEY,
  title VARCHAR(100),
  tech_stack VARCHAR(255),
  is_awesome BOOLEAN DEFAULT true
);`
  },
  {
    language: "javascript",
    filename: "ThemeContext.jsx",
    code: `const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("cyberpunk");
  
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};`
  },
  {
    language: "java",
    filename: "ProjectRepo.java",
    code: `@Repository
public interface ProjectRepo extends JpaRepository<Project, Long> {
  
  @Query("SELECT p FROM Project p WHERE p.active = true")
  List<Project> findActiveProjects();
}`
  },
  {
    language: "javascript",
    filename: "FadeIn.jsx",
    code: `export const FadeIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);`
  },
  {
    language: "java",
    filename: "SecurityConfig.java",
    code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
  
  @Bean
  public SecurityFilterChain filter(HttpSecurity http) {
    return http.csrf().disable().build();
  }
}`
  },
  {
    language: "javascript",
    filename: "App.jsx",
    code: `import { Routes, Route } from "react-router-dom";

const App = () => (
  <Routes>
    <Route path="/" element={<Hero />} />
    <Route path="/about" element={<About />} />
  </Routes>
);`
  },
  {
    language: "java",
    filename: "DataProcessor.java",
    code: `public List<String> getTechStack(List<Project> all) {
  return all.stream()
    .filter(Project::isDeployed)
    .map(Project::getTechnology)
    .distinct()
    .collect(Collectors.toList());
}`
  }
];

/* ==================== SUB-COMPONENTS ==================== */

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
        timeoutId = setTimeout(typeChar, Math.random() * 30 + 30);
      } else {
        timeoutId = setTimeout(() => {
          setDisplayedCode("");
          setCurrentSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
        }, 3000);
      }
    };
    typeChar();
    return () => clearTimeout(timeoutId);
  }, [currentSnippetIndex]);

  const highlightSyntax = (code) => {
    return code.split(/(\s+)/).map((word, index) => {
      const trimmed = word.trim();
      if (["public", "class", "extends", "private", "void", "while", "return", "const", "import", "from", "export", "default", "interface", "SELECT", "FROM", "WHERE", "AND", "ORDER", "BY", "DESC", "CREATE", "TABLE", "PRIMARY", "KEY", "BOOLEAN"].includes(trimmed)) 
        return <span key={index} className="text-purple-400">{word}</span>;
      if (["String", "Long", "Koustav", "Developer", "Hero", "useState", "useEffect", "createContext", "motion", "Button", "List", "ResponseEntity", "Project", "Routes", "Route", "JpaRepository"].includes(trimmed)) 
        return <span key={index} className="text-yellow-400">{word}</span>;
      if (word.includes('"') || word.includes("'")) 
        return <span key={index} className="text-green-400">{word}</span>;
      if (word.startsWith("@")) return <span key={index} className="text-blue-400">{word}</span>;
      if (word.startsWith("--") || word.startsWith("//")) return <span key={index} className="text-gray-500 italic">{word}</span>;
      return <span key={index} className="text-gray-300">{word}</span>;
    });
  };

  return (
    <div className="w-full h-full bg-[#0a0f1e] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col font-mono text-sm md:text-base min-h-[400px]">
      <div className="bg-[#1e293b] px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-gray-400 text-xs flex items-center gap-2">
          <FaCode className="text-cyan-400" /> {currentSnippet.filename}
        </div>
      </div>
      <div className="p-6 overflow-hidden relative flex-grow">
        <pre className="whitespace-pre-wrap font-mono leading-relaxed">
          {highlightSyntax(displayedCode)}
          <span className="animate-pulse text-cyan-400">|</span>
        </pre>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none"></div>
      </div>
    </div>
  );
};

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
    <div ref={divRef} onMouseMove={handleMouseMove} className={`relative rounded-3xl border border-white/10 bg-[#0f172a] overflow-hidden group ${className}`}>
      <motion.div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{ background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.15), transparent 80%)` }} />
      <div className="relative h-full z-20">{children}</div>
    </div>
  );
};

const Typewriter = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplayedText((prev) => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span>{displayedText}<span className="animate-pulse text-cyan-400">|</span></span>;
};

const TechPill = ({ icon, name, color }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5 hover:border-cyan-500/50 hover:bg-white/10 transition-all cursor-default group relative z-20">
    <span className={`text-xl ${color} group-hover:scale-110 transition-transform`}>{icon}</span>
    <span className="text-sm font-mono text-gray-300">{name}</span>
  </div>
);

const TimelineItem = ({ year, title, place, desc, grade }) => (
  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="relative pl-8 group">
    <span className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-gray-600 border border-gray-900 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_#22d3ee] transition-all duration-500 z-20"></span>
    <div className="mb-1 flex items-center gap-3">
        <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">{year}</span>
        <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">{grade}</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors relative z-20">{title}</h3>
    <p className="text-sm text-gray-400 mb-2 font-mono relative z-20">{place}</p>
    <p className="text-sm text-gray-500 max-w-2xl relative z-20">{desc}</p>
  </motion.div>
);

const StatBadge = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 px-5 py-3 bg-[#0f172a] rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all relative z-20">
    <span className="text-cyan-400 text-xl">{icon}</span>
    <div><div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div><div className="font-bold text-white">{value}</div></div>
  </div>
);

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
          className="flex gap-6 pr-6 w-max hover:[animation-play-state:paused]"
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

/* ==================== MAIN ABOUT COMPONENT ==================== */

const About = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              SYSTEM_ONLINE // KOUSTAV_PAN
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Architecting <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Digital Realities</span>
            </h1>
            <div className="font-mono text-gray-400 text-lg leading-relaxed mb-10 min-h-[120px]">
              <Typewriter text="I am a Java Fullstack Developer bridging the gap between robust backend logic and stunning frontend interfaces. I don't just write code; I compile dreams into deployable reality." speed={30} />
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
               <StatBadge icon={<FaCode />} label="Projects" value="15+" />
               <StatBadge icon={<FaLaptopCode />} label="Experience" value="Fresh" />
               <StatBadge icon={<FaServer />} label="Stack" value="Full" />
            </div>

            {/* --- DOWNLOAD RESUME BUTTON --- */}
            <div className="mt-12 flex relative z-50">
              <a href={resumePDF} download="Koustav_Pan_Resume.pdf" className="group flex items-center gap-3 px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-full transition-all duration-300 hover:bg-cyan-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]">
                <FaDownload className="text-xl group-hover:-translate-y-1 transition-transform duration-300" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          <div className="relative group flex justify-center mt-12 lg:mt-0">
            <div className="relative w-80 h-96 rounded-2xl overflow-hidden border-2 border-cyan-500/30 bg-[#0f172a] z-10">
              <img src={profileImg} alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />
              <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-20 opacity-50 pointer-events-none" />
              <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm p-4 border-t border-cyan-500/30 z-30">
                <div className="flex justify-between text-xs font-mono text-cyan-400"><span>ID: KP-2026</span><span>STATUS: ACTIVE</span></div>
              </div>
            </div>
            <div className="absolute z-0 w-80 h-96 border border-purple-500/30 rounded-2xl top-4 -right-4 hidden sm:block"></div>
            <div className="absolute z-0 w-80 h-96 border border-white/10 rounded-2xl top-8 -right-8 hidden sm:block"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-24 relative z-20">
          <div className="md:col-span-2"><CodingTerminal /></div>
          <SpotlightCard className="p-8 flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-6 relative z-20"><FaTerminal className="text-2xl text-purple-400" /><h3 className="text-xl font-bold text-white">Mainframe Arsenal</h3></div>
             <div className="flex flex-wrap gap-3 relative z-20">
                <TechPill icon={<FaJava />} name="Java" color="text-red-500" />
                <TechPill icon={<FaReact />} name="React" color="text-cyan-400" />
                <TechPill icon={<SiSpringboot />} name="Spring" color="text-green-500" />
                <TechPill icon={<SiTailwindcss />} name="Tailwind" color="text-cyan-300" />
                <TechPill icon={<SiMysql />} name="SQL" color="text-blue-400" />
             </div>
          </SpotlightCard>
        </div>

        <div className="relative mb-32 z-20">
           <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3"><span className="text-cyan-400">/</span> System Logs (Education)</h2>
           <div className="space-y-8 relative pl-8 border-l border-white/10">
              <TimelineItem year="2025 - Present" title="Java Fullstack Course" place="J-Spider, BTM Layout, Bengaluru" desc="Specializing in Advanced Java, Spring Boot Microservices, React, and System Design." grade="Current" />
              <TimelineItem year="2021 - 2025" title="B.Tech in Computer Science" place="Bankura Unnayani Institute of Engineering" desc="Affiliated to Maulana Abul Kalam Azad University. Core focus on Algorithms & Data Structures." grade="CGPA: 7.34" />
              <TimelineItem year="2021" title="Higher Secondary (XII)" place="Garhbeta High School (WBCHSE)" desc="Major in Physics, Chemistry, and Mathematics." grade="Score: 88%" />
              <TimelineItem year="2019" title="Secondary Exam (X)" place="Panchagrami Saradamoni Vidyapith (WBBSE)" desc="Foundation in General Sciences and Mathematics." grade="Score: 81%" />
           </div>
        </div>

        {/* --- LIVE REPOS SECTION --- */}
        <LiveRepos />

        <GithubGraph />
      </div>
    </div>
  );
};

export default About;