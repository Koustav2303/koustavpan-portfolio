import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView,
  animate,
  useMotionValue,
  useMotionTemplate
} from "framer-motion";
import { 
  FaReact, FaJava, FaHtml5, FaGithub, FaRocket, FaCode, FaLaptopCode, 
  FaArrowRight, FaCheck, FaDatabase, FaMobileAlt, FaLayerGroup, FaGem, FaCrown, FaBolt, FaServer, FaPaintBrush 
} from "react-icons/fa";
import { 
  SiTailwindcss, SiSpringboot, SiJavascript, SiMysql, SiDocker, SiNextdotjs, SiTypescript 
} from "react-icons/si";

/* ==================== SUB-COMPONENTS (DEFINED TOP TO PREVENT ERRORS) ==================== */

// 1. GLITCH TEXT
const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10 text-cyan-400 font-mono font-bold tracking-[0.2em] text-sm md:text-base">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-100 animate-pulse translate-x-[2px]">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-0 group-hover:opacity-100 animate-pulse -translate-x-[2px]">{text}</span>
    </div>
  );
};

// 2. MAGNETIC BUTTON (With Crash Protection)
const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    // Safety check: ensure ref exists before accessing it
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={handleMouse} 
      onMouseLeave={reset} 
      animate={{ x: position.x, y: position.y }} 
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// 3. TILT CARD
const TiltCard = ({ icon, title, desc, tags }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag
      dragElastic={0.16}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileHover={{ cursor: "grabbing" }}
      className="relative w-full h-full bg-[#0a0f1e] p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 group transition-colors duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
      <div className="relative z-10">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl text-cyan-400 mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">{icon}</div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed mb-6 text-sm">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (<span key={i} className="px-2 py-1 bg-white/5 text-xs font-mono text-gray-300 rounded border border-white/5">#{tag}</span>))}
        </div>
      </div>
    </motion.div>
  );
};

// 4. ANIMATED STAT COUNTER
const StatCounter = ({ value, label, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        onUpdate: (latest) => { 
          if(ref.current) ref.current.textContent = Math.floor(latest) + suffix; 
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix]);
  return (
    <div className="flex flex-col items-center">
      <span ref={ref} className="text-5xl md:text-6xl font-bold text-white mb-2 block">0</span>
      <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest">{label}</span>
    </div>
  );
};

// 5. PRICING CARD
const PricingCard = ({ tier, price, icon, desc, features, isPopular, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-3xl border ${isPopular ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)] scale-105 z-10 bg-[#0a0f1e]' : 'border-white/10 bg-[#0a0f1e]/50 hover:border-cyan-500/30'} flex flex-col h-full group transition-all`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs px-4 py-1 rounded-full shadow-lg">
          MOST POPULAR
        </div>
      )}
      
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-colors ${isPopular ? 'bg-cyan-400 text-black' : 'bg-white/5 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black'}`}>
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-200 mb-2">{tier}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold text-white">{price}</span>
      </div>
      <p className="text-sm text-gray-400 mb-8 border-b border-white/5 pb-8">{desc}</p>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
            <FaCheck className={`text-xs ${isPopular ? 'text-cyan-400' : 'text-gray-500 group-hover:text-cyan-400'}`} />
            {item}
          </li>
        ))}
      </ul>

      <Link to="/contact" className={`w-full py-3 rounded-xl font-bold text-center transition-all ${isPopular ? 'bg-cyan-400 text-black hover:bg-cyan-300' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
        Choose {tier}
      </Link>
    </motion.div>
  );
};

// 6. WORKFLOW STEP
const WorkflowStep = ({ step, title, desc, align }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between mb-24 relative w-full ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
      <motion.div initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className={`w-full md:w-[45%] ${align === 'right' ? 'md:text-left' : 'md:text-right'} text-left pl-[60px] md:pl-0`}>
        <h3 className="text-3xl font-bold mb-4 flex flex-col md:block">
          <span className="text-5xl text-white/10 font-black absolute -top-8 opacity-50 select-none pointer-events-none">{step}</span>
          <span className="relative z-10">{title}</span>
        </h3>
        <p className="text-gray-400 leading-relaxed">{desc}</p>
      </motion.div>
      <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-12 h-12 bg-[#020617] border-4 border-cyan-500 rounded-full z-10 flex items-center justify-center">
         <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <div className="hidden md:block w-[45%]"></div>
    </div>
  );
};

// 7. SECTION HEADER
const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest block mb-2">{subtitle}</span>
    <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
    <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-6 rounded-full"></div>
  </div>
);

// DATA
const TECH_STACK = [
  { icon: <FaReact />, name: "React" }, { icon: <FaJava />, name: "Java" }, { icon: <SiSpringboot />, name: "Spring Boot" },
  { icon: <SiTailwindcss />, name: "Tailwind" }, { icon: <SiJavascript />, name: "JavaScript" }, { icon: <SiMysql />, name: "MySQL" },
  { icon: <SiNextdotjs />, name: "Next.js" }, { icon: <FaGithub />, name: "GitHub" }, { icon: <SiDocker />, name: "Docker" },
];

/* ==================== MAIN HOME COMPONENT ==================== */

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* --- GLOBAL BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 z-10">
        
        {/* Parallax Background */}
        <motion.div style={{ y: yBg, opacity: opacityHero }} className="absolute inset-0 z-[-1] flex justify-center items-center overflow-hidden">
          <span className="absolute top-[20%] left-[10%] text-6xl font-bold text-white/5 select-none font-mono">{"<Code />"}</span>
          <span className="absolute bottom-[20%] right-[10%] text-8xl font-bold text-white/5 select-none font-mono">{"{ }"}</span>
          <span className="absolute top-[40%] right-[20%] text-4xl font-bold text-white/5 select-none font-mono">npm install</span>
        </motion.div>

        {/* Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            OPEN FOR FREELANCE WORK
          </span>
        </motion.div>

        {/* Name & Headline */}
        <div className="text-center relative mb-8">
          <GlitchText text="I AM" />
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-purple-500 mt-2">
             KOUSTAV PAN
          </h1>
          <p className="text-sm md:text-base text-gray-400 font-mono mt-4 tracking-widest uppercase">
            Fullstack Engineering
          </p>
        </div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl text-center leading-relaxed mb-12"
        >
          I architect scalable digital ecosystems using <span className="text-cyan-400 font-bold">Java</span> and <span className="text-purple-400 font-bold">React</span>. 
          Focusing on performance, accessibility, and pixel-perfect UIs.
        </motion.p>

        {/* Magnetic Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <MagneticButton>
            <Link to="/projects" className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-full text-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-2">
              <FaRocket /> View Projects
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to="/contact" className="px-8 py-4 bg-white/5 text-white font-bold rounded-full text-lg border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all flex items-center gap-2 backdrop-blur-md">
              Let's Talk <FaArrowRight />
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
        </motion.div>
      </section>

      {/* ==================== TECH STACK MARQUEE ==================== */}
      <section className="py-10 border-y border-white/5 bg-[#0a0f1e]/50 backdrop-blur-sm relative z-20">
        <div className="flex overflow-hidden relative w-full mask-gradient">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="flex gap-16 pr-16 w-max"
          >
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <div key={i} className="flex items-center gap-2 text-xl font-bold text-gray-400 hover:text-cyan-400 transition-colors cursor-default">
                <span className="text-3xl">{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SERVICES GRID (6 CARDS) ==================== */}
      <section className="py-32 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="My Expertise" subtitle="Technical Capabilities" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TiltCard 
              icon={<FaLaptopCode />} 
              title="Frontend Architecture" 
              desc="Building complex, state-driven SPAs with React, Next.js, and Tailwind." 
              tags={["React", "Framer", "Tailwind"]}
            />
            <TiltCard 
              icon={<FaServer />} 
              title="Backend Systems" 
              desc="Designing robust REST APIs and Microservices using Java Spring Boot." 
              tags={["Java", "Spring", "Security"]}
            />
            <TiltCard 
              icon={<SiDocker />} 
              title="DevOps & Cloud" 
              desc="Deployment automation, CI/CD pipelines, and containerization." 
              tags={["Docker", "AWS", "Git"]}
            />
            <TiltCard 
              icon={<FaDatabase />} 
              title="Database Engineering" 
              desc="Optimizing SQL queries, designing normalized schemas with MySQL & PostgreSQL." 
              tags={["MySQL", "Hibernate", "SQL"]}
            />
            <TiltCard 
              icon={<FaMobileAlt />} 
              title="Mobile First Design" 
              desc="Creating responsive layouts that work perfectly on any device. PWA development." 
              tags={["Responsive", "PWA", "Mobile"]}
            />
            <TiltCard 
              icon={<FaPaintBrush />} 
              title="UI/UX Implementation" 
              desc="Translating Figma designs into pixel-perfect code. Meeting accessibility standards." 
              tags={["Figma", "UI/UX", "A11y"]}
            />
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-24 bg-gradient-to-b from-[#0a0f1e] to-[#020617] relative z-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <StatCounter value={1200} label="Hours of Code" suffix="+" />
          <StatCounter value={15} label="Projects Built" suffix="+" />
          <StatCounter value={100} label="Coffee Cups" suffix="%" />
          <StatCounter value={99} label="Bug Free Rate" suffix="%" />
        </div>
      </section>

      {/* ==================== PRICING SECTION (INDIAN RUPEES) ==================== */}
      <section className="py-32 px-6 relative z-20 bg-gradient-to-b from-[#020617] to-[#0a0f1e] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Freelance Pricing" subtitle="Transparent & Flexible" />
          
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            {/* PLAN 1: BASIC */}
            <PricingCard 
              tier="Starter"
              price="₹14,999"
              icon={<FaBolt />}
              desc="Perfect for personal portfolios and landing pages."
              features={["One Page Website", "Responsive Design", "Fast Loading Speed", "Contact Form", "3 Days Delivery"]}
              delay={0}
            />

            {/* PLAN 2: STANDARD (POPULAR) */}
            <PricingCard 
              tier="Professional"
              price="₹29,999"
              icon={<FaGem />}
              desc="Best for small businesses and startups."
              features={["Multi-Page Website (5)", "CMS Integration", "SEO Optimization", "Advanced Animations", "1 Month Support"]}
              isPopular={true}
              delay={0.2}
            />

            {/* PLAN 3: PREMIUM */}
            <PricingCard 
              tier="Business"
              price="₹59,999+"
              icon={<FaCrown />}
              desc="Full-scale web applications with backend."
              features={["Full Stack App", "Database & Auth", "Admin Dashboard", "Payment Gateway", "API Integration"]}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ==================== WORKFLOW TIMELINE ==================== */}
      <section className="py-32 px-6 relative z-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="The Process" subtitle="From Concept to Deployment" />
          <div className="relative mt-20">
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent -translate-x-1/2"></div>
            <WorkflowStep step="01" title="Discovery" desc="Understanding requirements, user needs, and business goals." align="left" />
            <WorkflowStep step="02" title="Design & Proto" desc="Creating wireframes and high-fidelity UI designs." align="right" />
            <WorkflowStep step="03" title="Development" desc="Writing clean, modular code with React and Java." align="left" />
            <WorkflowStep step="04" title="Testing & Deploy" desc="Rigorous testing and deploying to cloud platforms." align="right" />
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-32 px-6 relative z-20 overflow-hidden">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="relative bg-[#0a0f1e]/80 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-3xl text-center overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
             <motion.h2 whileInView={{ y: 0, opacity: 1 }} initial={{ y: 20, opacity: 0 }} className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
               Ready to build the <span className="text-cyan-400">Extraordinary?</span>
             </motion.h2>
             <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg relative z-10">
               Whether you need a full-stack application, a landing page, or a complex system dashboard, I am ready to help.
             </p>
             <div className="flex justify-center gap-4 relative z-10">
               <MagneticButton>
                 <Link to="/contact" className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-1">
                   Start a Project
                 </Link>
               </MagneticButton>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;