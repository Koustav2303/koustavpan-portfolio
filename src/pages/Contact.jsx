import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaArrowRight, FaCrosshairs, FaTerminal
} from "react-icons/fa";

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const SpotlightCard = ({ children, className }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY }) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

const InputGroup = ({ label, name, type, placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group/input">
      <motion.label 
        initial={false}
        animate={{ 
          y: isFocused || value ? -24 : 14, 
          scale: isFocused || value ? 0.85 : 1,
          color: isFocused ? "#22d3ee" : "#94a3b8"
        }}
        className="absolute left-4 px-1 bg-[#0a0f1e] text-sm font-medium pointer-events-none z-10 transition-colors"
      >
        {label}
      </motion.label>
      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-purple-500/0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500"></div>
      <input 
        type={type} 
        name={name}
        required
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full relative bg-[#0a0f1e] border border-white/10 rounded-xl p-4 text-white focus:border-transparent outline-none transition-all z-0"
        placeholder={isFocused ? placeholder : ""} 
      />
    </div>
  );
};

const TiltCard = ({ icon, title, subtitle, link, color, delay }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bg-[#0a0f1e]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl hover:border-cyan-500/30 group cursor-pointer relative shadow-[0_0_30px_rgba(0,0,0,0.5)]"
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner border border-white/5 ${color}`}>
          {icon}
        </div>
        <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
          <FaArrowRight className={`text-sm ${color}`} />
        </div>
        <h3 className="font-bold text-xl mb-1 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase truncate">{subtitle}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.a>
  );
};

const RadarMap = () => {
  const [coords, setCoords] = useState("12.9716° N, 77.5946° E");

  useEffect(() => {
    const interval = setInterval(() => {
      const lat = (12.9716 + (Math.random() * 0.001 - 0.0005)).toFixed(4);
      const lng = (77.5946 + (Math.random() * 0.001 - 0.0005)).toFixed(4);
      setCoords(`${lat}° N, ${lng}° E`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0f1e] border border-white/5 rounded-3xl h-[350px] relative overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center justify-center">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="absolute inset-0 opacity-40 filter contrast-200 grayscale mix-blend-screen pointer-events-none transition-transform duration-1000 group-hover:scale-105">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124416.48512117562!2d77.50153350628224!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1710500000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(120%) grayscale(20%)', transform: 'scale(1.2)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="pointer-events-none"
        ></iframe>
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full border border-cyan-500/10 absolute animate-ping-slow"></div>
        <div className="w-[600px] h-[600px] rounded-full border border-cyan-500/10 absolute"></div>
        <div className="w-[400px] h-[400px] rounded-full border border-cyan-500/20 absolute"></div>
        <div className="w-[200px] h-[200px] rounded-full border border-cyan-500/30 absolute"></div>
        
        <div className="w-[600px] h-[600px] absolute rounded-full overflow-hidden animate-radar-spin">
          <div className="w-1/2 h-1/2 bg-[conic-gradient(from_0deg,transparent_70%,rgba(34,211,238,0.4)_100%)] origin-bottom-right"></div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
        <div className="relative flex justify-center items-center">
          <div className="absolute w-24 h-24 bg-cyan-500/20 rounded-full blur-[15px] animate-pulse"></div>
          <div className="absolute w-12 h-12 border border-cyan-400/50 rounded-full animate-ping"></div>
          <div className="w-4 h-4 border-2 border-cyan-400 bg-cyan-900 rounded-full z-10 shadow-[0_0_20px_rgba(34,211,238,1)] flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
          </div>
          <div className="absolute w-full h-[1px] bg-cyan-400/50 scale-x-[10]"></div>
          <div className="absolute w-[1px] h-full bg-cyan-400/50 scale-y-[10]"></div>
        </div>
        
        <div className="mt-8 flex flex-col items-center">
          <div className="bg-[#020617]/90 px-4 py-2 rounded-lg border border-cyan-500/50 text-[10px] font-mono text-cyan-400 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.2)] tracking-widest flex items-center gap-2">
            <FaCrosshairs className="animate-spin-slow" />
            TARGET_LOCKED
          </div>
          <div className="mt-2 text-[9px] font-mono text-cyan-500/70 tracking-widest">{coords}</div>
        </div>
      </div>
    </div>
  );
};

const MagneticSocialBtn = ({ icon, link, label }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) / 3);
    y.set((e.clientY - (top + height / 2)) / 3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a 
      ref={ref}
      href={link}
      target="_blank"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: x.get(), y: y.get() }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative flex items-center justify-center w-14 h-14 bg-white/5 rounded-full border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-colors group z-20"
    >
      <span className="text-gray-400 group-hover:text-cyan-400 text-xl transition-colors relative z-10">{icon}</span>
      <div className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/50 scale-50 group-hover:scale-150 opacity-0 group-hover:opacity-0 transition-all duration-700 animate-ping"></div>
    </motion.a>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Project Inquiry", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      
      const phone = "917501795902"; 
      const text = `*New Portfolio Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
      const whatsappURL = `https://wa.me/${phone}?text=${text}`;
      
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        setIsSuccess(false);
        setFormData({ name: "", email: "", subject: "Project Inquiry", message: "" });
      }, 1500);
    }, 2000);
  };

  return (
    <SpotlightCard className="bg-[#0a0f1e]/90 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-xl relative">
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#0a0f1e]/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center border border-cyan-500/50"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="w-24 h-24 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-4xl text-cyan-400 mb-6 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              <FaPaperPlane />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Transmission Ready</h3>
            <p className="text-cyan-400 font-mono text-sm tracking-widest animate-pulse">ROUTING TO SECURE CHANNEL...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 mb-2">
        <FaTerminal className="text-cyan-400" />
        <h3 className="text-3xl font-bold text-white tracking-tight">Send a Message</h3>
      </div>
      <p className="text-gray-400 mb-8 text-sm font-mono border-b border-white/5 pb-6">
        Compile your request. System will auto-route to WhatsApp matrix.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          <InputGroup label="Identity [Name]" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} />
          <InputGroup label="Return Address [Email]" name="email" type="email" placeholder="john@domain.com" value={formData.email} onChange={handleChange} />
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-400 ml-1">Classification</label>
          <div className="grid grid-cols-3 gap-3">
            {['Web Design', 'Fullstack App', 'Freelance'].map((opt) => (
              <button
                key={opt} type="button" onClick={() => setFormData({ ...formData, subject: opt })}
                className={`text-xs py-3 rounded-xl border transition-all duration-300 font-bold tracking-wide ${
                  formData.subject === opt 
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                    : 'bg-[#020617] border-white/10 text-gray-500 hover:border-cyan-500/30 hover:text-gray-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 relative group/textarea">
          <motion.label 
             animate={{ color: formData.message ? "#22d3ee" : "#94a3b8" }}
             className="text-sm font-medium ml-1 transition-colors"
          >
            Payload [Message]
          </motion.label>
          <div className="absolute inset-0 top-6 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-purple-500/0 rounded-xl opacity-0 group-focus-within/textarea:opacity-100 transition-opacity duration-500 pointer-events-none -m-[1px]"></div>
          <textarea 
            name="message" rows="5" required value={formData.message} onChange={handleChange}
            className="w-full relative bg-[#020617] border border-white/10 rounded-xl p-4 text-white focus:border-transparent outline-none transition-all resize-none placeholder:text-gray-700 z-10"
            placeholder="Initialize project parameters..."
          ></textarea>
        </div>

        <button 
          type="submit" disabled={isSending}
          className="w-full relative overflow-hidden bg-white text-black font-black py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group border border-transparent hover:border-cyan-400 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
        >
          <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center justify-center gap-3">
            {isSending ? (
              <>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-150"></span>
                </div>
                ENCRYPTING PAYLOAD...
              </>
            ) : (
              <>
                <FaPaperPlane className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> 
                EXECUTE TRANSMISSION
              </>
            )}
          </div>
        </button>
      </form>
    </SpotlightCard>
  );
};

const Contact = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleGlobalMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleGlobalMouseMove} className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
      
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        animate={{ 
          background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.03), transparent 80%)` 
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0 mix-blend-overlay"></div>
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 z-[100] bg-[length:200%_auto] animate-shimmer"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-8 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <ScrambleText text="SECURE COMM_CHANNEL OPEN" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter"
          >
            Let's Build Something <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg">
              Legendary.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg font-mono"
          >
            Deploying high-performance web architecture. Initialize contact sequence below to begin project alignment.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-8">
            
            <div className="grid sm:grid-cols-2 gap-4">
              <TiltCard 
                icon={<FaEnvelope />} title="Email Protocol" subtitle="pankoustav@gmail.com"
                link="https://mail.google.com/mail/?view=cm&fs=1&to=pankoustav@gmail.com"
                color="text-cyan-400" delay={0.1}
              />
              <TiltCard 
                icon={<FaWhatsapp />} title="Direct Uplink" subtitle="+91 7501795902"
                link="https://wa.me/917501795902?text=Hi%20Koustav,%20I%20saw%20your%20portfolio..."
                color="text-green-400" delay={0.2}
              />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <RadarMap />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="p-8 rounded-3xl border border-white/5 bg-[#0a0f1e]/50 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-center"
            >
               <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
               <h3 className="text-sm font-mono tracking-widest text-gray-500 uppercase mb-6">/ Social_Matrix</h3>
               <div className="flex gap-4 relative z-10">
                 <MagneticSocialBtn icon={<FaGithub />} link="https://github.com/Koustav2303" label="GitHub" />
                 <MagneticSocialBtn icon={<FaLinkedin />} link="https://www.linkedin.com/in/koustav-pan-7576a3237/" label="LinkedIn" />
                 <MagneticSocialBtn icon={<FaTwitter />} link="https://x.com/Koustav2303" label="Twitter" />
               </div>
            </motion.div>

          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent rounded-[40px] blur-2xl pointer-events-none z-0"></div>
            <ContactForm />
          </motion.div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 4s linear infinite;
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;