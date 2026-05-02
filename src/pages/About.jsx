import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView,
  animate,
  useMotionValue,
  useMotionTemplate, 
  AnimatePresence 
} from "framer-motion";
import { 
  FaReact, FaJava, FaCode, FaLaptopCode, FaServer, 
  FaTerminal, FaDownload, FaFolderOpen, FaExternalLinkAlt, 
  FaCodeBranch, FaStar, FaMedal, FaCertificate, FaGraduationCap,
  FaGithub, FaLinkedin, FaArrowRight, FaBolt,
  FaNetworkWired // <-- Added FaNetworkWired for your API icon
} from "react-icons/fa";
import { 
  SiTailwindcss, SiSpringboot, SiMysql, SiJavascript, SiHtml5,
  SiCss3, SiPostgresql, SiDocker, SiGit 
  // <-- Removed the non-existent SiRestapi
} from "react-icons/si";

// --- COMPONENTS & ASSETS ---
import GithubGraph from "../components/GithubGraph";
import profileImg from "../assets/profile4.jpg"; 
import resumePDF from "../assets/resume.pdf";

/* ==================== ANIMATED COUNTER COMPONENT ==================== */
const AnimatedCounter = ({ target, label, icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let finalValue = parseInt(target);
    if (target.includes("+")) finalValue = parseInt(target) - 1;
    
    const controls = animate(0, finalValue, {
      duration: 2,
      onUpdate: (value) => setCount(Math.floor(value)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 px-6 py-4 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/20 relative z-20 group">
      <span className="text-cyan-400 text-2xl group-hover:scale-125 transition-transform">{icon}</span>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-widest font-mono">{label}</div>
        <div className="text-3xl font-bold text-white font-mono">{count}{target.includes("+") ? "+" : ""}</div>
      </div>
    </motion.div>
  );
};

/* ==================== SKILL BAR COMPONENT ==================== */
const SkillBar = ({ skill, proficiency, icon, color }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <motion.div ref={containerRef} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative z-20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-xl ${color}`}>{icon}</span>
          <span className="font-mono text-sm text-white">{skill}</span>
        </div>
        <span className="text-xs font-mono text-cyan-400">{proficiency}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

/* ==================== SKILL CATEGORY COMPONENT ==================== */
const SkillCategory = ({ category, skills }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/10 relative z-20 group">
    <div className="flex items-center gap-2 mb-6">
      <span className="text-cyan-400 text-lg">{skills[0].categoryIcon}</span>
      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{category}</h3>
    </div>
    <div className="space-y-4">
      {skills.map((skill, idx) => (
        <SkillBar key={idx} skill={skill.name} proficiency={skill.proficiency} icon={skill.icon} color={skill.color} />
      ))}
    </div>
  </motion.div>
);

/* ==================== ACHIEVEMENT BADGE COMPONENT ==================== */
const AchievementBadge = ({ title, description, icon, color }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} whileHover={{ scale: 1.05 }} className={`p-6 rounded-2xl bg-gradient-to-br ${color} border border-white/10 text-center group cursor-default relative z-20 overflow-hidden`}>
    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    <div className="relative z-10">
      <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{icon}</div>
      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{title}</h3>
      <p className="text-xs text-gray-400 text-center">{description}</p>
    </div>
  </motion.div>
);

/* ==================== ENHANCED EDUCATION CARD COMPONENT ==================== */
const EducationCard = ({ year, title, place, desc, grade, icon }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }} 
    whileInView={{ opacity: 1, x: 0 }} 
    viewport={{ once: true, margin: "-50px" }} 
    whileHover={{ x: 10 }}
    className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 relative z-20 group"
  >
    <div className="flex items-start gap-4">
      <div className="text-3xl text-cyan-400 mt-1 group-hover:scale-125 transition-transform">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
          <span className="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30">{grade}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">{year}</span>
          <p className="text-sm text-gray-400 font-mono">{place}</p>
        </div>
        <p className="text-sm text-gray-500 mt-3">{desc}</p>
      </div>
    </div>
  </motion.div>
); 

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
    <div className="w-full h-full bg-gradient-to-b from-[#0a0f1e] to-[#0f172a] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col font-mono text-sm md:text-base min-h-[400px] relative group">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] px-4 py-3 flex items-center gap-2 border-b border-white/5 relative z-10">
        <div className="flex gap-1.5">
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer shadow-lg shadow-red-500/50"></motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer shadow-lg shadow-yellow-500/50"></motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500 cursor-pointer shadow-lg shadow-green-500/50"></motion.div>
        </div>
        <div className="ml-4 text-gray-400 text-xs flex items-center gap-2">
          <FaCode className="text-cyan-400" /> {currentSnippet.filename}
        </div>
        <div className="ml-auto text-xs text-gray-500">
          <span className="text-cyan-400">~</span> /portfolio
        </div>
      </div>
      <div className="p-6 overflow-hidden relative flex-grow bg-gradient-to-b from-transparent to-cyan-500/5">
        <pre className="whitespace-pre-wrap font-mono leading-relaxed text-sm">
          {highlightSyntax(displayedCode)}
          <span className="animate-pulse text-cyan-400">|</span>
        </pre>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none group-hover:bg-purple-500/10 transition-all duration-500"></div>
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
    <div ref={divRef} onMouseMove={handleMouseMove} className={`relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 overflow-hidden group backdrop-blur-sm ${className}`}>
      <motion.div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{ background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.15), transparent 80%)` }} />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
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
  <motion.div whileHover={{ scale: 1.1, y: -2 }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/10 hover:border-cyan-500/50 hover:bg-white/15 transition-all cursor-default group relative z-20 shadow-lg hover:shadow-cyan-500/20">
    <span className={`text-xl ${color} group-hover:scale-125 transition-transform`}>{icon}</span>
    <span className="text-sm font-mono text-gray-200 group-hover:text-white transition-colors">{name}</span>
  </motion.div>
);

const TimelineItem = ({ year, title, place, desc, grade, icon }) => (
  <EducationCard year={year} title={title} place={place} desc={desc} grade={grade} icon={icon} />
);

const StatBadge = ({ icon, label, value, isCounter }) => {
  if (isCounter) {
    return <AnimatedCounter target={value} label={label} icon={icon} />;
  }
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 px-6 py-4 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all relative z-20 group cursor-default hover:shadow-lg hover:shadow-cyan-500/20">
      <span className="text-cyan-400 text-2xl group-hover:scale-125 transition-transform">{icon}</span>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-widest font-mono">{label}</div>
        <div className="text-2xl font-bold text-white font-mono">{value}</div>
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
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
          <span className="text-cyan-400">/</span> Live Repositories
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">Featured projects showcasing production-grade applications and contributions to open-source ecosystem.</p>
      </motion.div>
      
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
            <motion.a
              key={i}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -10 }}
              className="w-[280px] md:w-[350px] p-6 rounded-2xl bg-gradient-to-br from-[#0a0f1e]/80 to-[#0f172a]/40 border border-white/10 hover:border-cyan-500/50 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-purple-500/10 transition-all duration-300 group flex flex-col h-[220px] backdrop-blur-md relative overflow-hidden shadow-lg hover:shadow-cyan-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl group-hover:bg-purple-400/20 transition-all pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-2 text-cyan-400 group-hover:text-white transition-colors">
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <FaFolderOpen className="text-xl shrink-0" />
                  </motion.div>
                  <h3 className="font-bold text-white text-lg truncate w-40 md:w-56 group-hover:text-cyan-300 transition-colors">
                    {repo.name}
                  </h3>
                </div>
                <motion.div whileHover={{ x: 3 }}>
                  <FaExternalLinkAlt className="text-gray-500 group-hover:text-cyan-400 transition-colors text-sm shrink-0" />
                </motion.div>
              </div>
              
              <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow font-mono relative z-10 group-hover:text-gray-300 transition-colors">
                {repo.description || "No description provided for this repository."}
              </p>
              
              <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mt-auto relative z-10 flex-wrap">
                {repo.language && (
                  <motion.span whileHover={{ scale: 1.1 }} className="flex items-center gap-1 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> {repo.language}
                  </motion.span>
                )}
                <motion.span whileHover={{ scale: 1.1 }} className="flex items-center gap-1 hover:text-yellow-400 transition-colors bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">
                  <FaStar className="text-gray-600 group-hover:text-yellow-400 transition-colors" /> {repo.stargazers_count}
                </motion.span>
                <motion.span whileHover={{ scale: 1.1 }} className="flex items-center gap-1 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded border border-white/10">
                  <FaCodeBranch /> {repo.forks_count}
                </motion.span>
              </div>
            </motion.a>
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
               <AnimatedCounter target="15" label="Projects" icon={<FaCode />} />
               <StatBadge icon={<FaLaptopCode />} label="Experience" value="Fresh" />
               <AnimatedCounter target="8" label="Tech Stack" icon={<FaServer />} />
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
            <div className="relative w-80 h-96 rounded-2xl overflow-hidden border-2 border-cyan-500/30 bg-[#0f172a] z-10 shadow-2xl shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-500">
              <img src={profileImg} alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-110" />
              <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] z-20 opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-5 pointer-events-none"></div>
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-md p-4 z-30">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-mono text-cyan-400 mb-1">STATUS</div>
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      ACTIVE
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-purple-400">ID: KP-2026</div>
                  </div>
                </div>
              </div>
            </div>
            <motion.div animate={{ x: [0, 10, 0], y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute z-0 w-80 h-96 border border-purple-500/20 rounded-2xl top-4 -right-4 hidden sm:block"></motion.div>
            <div className="absolute z-0 w-80 h-96 border border-white/5 rounded-2xl top-8 -right-8 hidden sm:block"></div>
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

        {/* ==================== SKILLS SECTION ==================== */}
        <div className="mb-32 relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
              <span className="text-cyan-400">/</span> Technical Arsenal
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl">Comprehensive skill set across frontend, backend, and database technologies with production-level proficiency.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCategory 
              category="Backend Development" 
              skills={[
                { name: "Java Core", proficiency: 85, icon: <FaJava />, color: "text-red-500", categoryIcon: <FaServer /> },
                { name: "Spring Boot", proficiency: 80, icon: <SiSpringboot />, color: "text-green-500", categoryIcon: <FaServer /> },
                // Changed from SiRestapi to FaNetworkWired here:
                { name: "REST APIs", proficiency: 85, icon: <FaNetworkWired />, color: "text-yellow-500", categoryIcon: <FaServer /> }
              ]}
            />
            <SkillCategory 
              category="Frontend Development" 
              skills={[
                { name: "React.js", proficiency: 88, icon: <FaReact />, color: "text-cyan-400", categoryIcon: <FaLaptopCode /> },
                { name: "Tailwind CSS", proficiency: 85, icon: <SiTailwindcss />, color: "text-cyan-300", categoryIcon: <FaLaptopCode /> },
                { name: "Framer Motion", proficiency: 80, icon: <FaBolt />, color: "text-purple-400", categoryIcon: <FaLaptopCode /> }
              ]}
            />
            <SkillCategory 
              category="Databases & Tools" 
              skills={[
                { name: "MySQL", proficiency: 82, icon: <SiMysql />, color: "text-blue-400", categoryIcon: <SiMysql /> },
                { name: "Git & GitHub", proficiency: 85, icon: <SiGit />, color: "text-orange-400", categoryIcon: <SiMysql /> },
                { name: "Docker", proficiency: 70, icon: <SiDocker />, color: "text-blue-500", categoryIcon: <SiMysql /> }
              ]}
            />
          </div>
        </div>

        {/* ==================== ACHIEVEMENTS SECTION ==================== */}
        <div className="mb-32 relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
              <span className="text-cyan-400">/</span> Achievements & Milestones
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AchievementBadge 
              title="Problem Solver" 
              description="Efficient algorithmic thinking" 
              icon="🧠" 
              color="from-blue-500/20 to-cyan-500/20"
            />
            <AchievementBadge 
              title="Full Stack" 
              description="End-to-end development expertise" 
              icon="⚙️" 
              color="from-purple-500/20 to-pink-500/20"
            />
            <AchievementBadge 
              title="Innovation" 
              description="Creative solution architect" 
              icon="💡" 
              color="from-yellow-500/20 to-orange-500/20"
            />
            <AchievementBadge 
              title="Collaboration" 
              description="Team-oriented developer" 
              icon="🤝" 
              color="from-green-500/20 to-cyan-500/20"
            />
          </div>
        </div>

        <div className="relative mb-32 z-20">
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
             <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
               <span className="text-cyan-400">/</span> System Logs (Education)
             </h2>
             <p className="text-gray-400 text-lg max-w-2xl">Academic journey and continuous learning experience.</p>
           </motion.div>
           <div className="space-y-6 mt-12">
              <EducationCard 
                year="2025 - Present" 
                title="Java Fullstack Course" 
                place="J-Spider, BTM Layout, Bengaluru" 
                desc="Specializing in Advanced Java, Spring Boot Microservices, React, and System Design. Building production-grade applications with modern tech stack." 
                grade="Current" 
                icon={<FaCode />}
              />
              <EducationCard 
                year="2021 - 2025" 
                title="B.Tech in Computer Science" 
                place="Bankura Unnayani Institute of Engineering" 
                desc="Affiliated to Maulana Abul Kalam Azad University. Core focus on Algorithms & Data Structures with hands-on project experience." 
                grade="CGPA: 7.34" 
                icon={<FaGraduationCap />}
              />
              <EducationCard 
                year="2021" 
                title="Higher Secondary (XII)" 
                place="Garhbeta High School (WBCHSE)" 
                desc="Major in Physics, Chemistry, and Mathematics with strong foundation in problem-solving." 
                grade="Score: 88%" 
                icon={<FaMedal />}
              />
              <EducationCard 
                year="2019" 
                title="Secondary Exam (X)" 
                place="Panchagrami Saradamoni Vidyapith (WBBSE)" 
                desc="Foundation in General Sciences and Mathematics with excellent academic performance." 
                grade="Score: 81%" 
                icon={<FaCertificate />}
              />
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