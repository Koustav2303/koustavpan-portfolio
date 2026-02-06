import { useState, useRef } from "react";
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion";
import { 
  FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaArrowRight 
} from "react-icons/fa";

/* ==================== SUB-COMPONENTS (MOVED TO TOP TO FIX BLANK PAGE) ==================== */

// 1. STYLIZED INPUT FIELD
const InputGroup = ({ label, name, type, placeholder, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>
    <input 
      type={type} 
      name={name}
      required
      value={value}
      onChange={onChange}
      className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-gray-600"
      placeholder={placeholder} 
    />
  </div>
);

// 2. THE WHATSAPP FORM LOGIC
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Project Inquiry",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate a small delay for animation
    setTimeout(() => {
      // Construct WhatsApp URL
      const phone = "917501795902"; // Your Number
      const text = `*New Portfolio Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
      
      const whatsappURL = `https://wa.me/${phone}?text=${text}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
      setIsSending(false);
      setFormData({ name: "", email: "", subject: "Project Inquiry", message: "" }); // Reset form
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <InputGroup 
          label="Your Name" 
          name="name" 
          type="text" 
          placeholder="John Doe" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <InputGroup 
          label="Your Email" 
          name="email" 
          type="email" 
          placeholder="john@example.com" 
          value={formData.email} 
          onChange={handleChange} 
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-1">Project Type</label>
        <div className="grid grid-cols-3 gap-2">
          {['Web Design', 'Fullstack App', 'Freelance'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setFormData({ ...formData, subject: opt })}
              className={`text-xs py-2 rounded-lg border transition-all ${
                formData.subject === opt 
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
        <textarea 
          name="message"
          rows="5" 
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all resize-none placeholder:text-gray-600"
          placeholder="Tell me about your project, budget, and timeline..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSending}
        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSending ? (
          <>
            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
            Redirecting to WhatsApp...
          </>
        ) : (
          <>
            <FaPaperPlane /> Send via WhatsApp
          </>
        )}
      </button>
    </form>
  );
};

// 3. CONTACT ACTION CARD (Email/Phone)
const ContactActionCard = ({ icon, title, subtitle, link, color, delay }) => (
  <motion.a 
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay }}
    className="bg-[#0a0f1e]/80 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-cyan-500/30 group transition-all cursor-pointer relative overflow-hidden"
  >
    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform ${color}`}>
      {icon}
    </div>
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
      <FaArrowRight className="text-gray-500 text-sm" />
    </div>
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-sm text-gray-400 font-mono truncate">{subtitle}</p>
  </motion.a>
);

// 4. HOLOGRAPHIC MAP REPRESENTATION
const HolographicMap = () => (
  <div className="bg-[#0a0f1e] border border-white/5 rounded-3xl h-64 relative overflow-hidden group">
    {/* Static Map Image (Dark Mode) */}
    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/India_location_map.svg/800px-India_location_map.svg.png')] bg-cover bg-center opacity-20 grayscale mix-blend-screen"></div>
    
    {/* Grid Overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    
    {/* Location Pin */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group-hover:-translate-y-[60%] transition-transform duration-500">
      <div className="relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <FaMapMarkerAlt className="text-4xl text-cyan-400 relative z-10" />
      </div>
      <div className="mt-2 bg-black/80 px-3 py-1 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-400 backdrop-blur-md">
        Bengaluru, India
      </div>
    </div>
  </div>
);

// 5. SOCIAL BUTTON (3D Tilt Effect)
const SocialBtn = ({ icon, link, label }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    x.set(e.clientX - cx);
    y.set(e.clientY - cy);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a 
      ref={ref}
      href={link}
      target="_blank"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: useMotionTemplate`${x}px`, y: useMotionTemplate`${y}px` }}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-colors"
    >
      <span className="text-gray-300">{icon}</span>
      <span className="text-xs font-bold text-gray-400">{label}</span>
    </motion.a>
  );
};

/* ==================== MAIN CONTACT COMPONENT ==================== */

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6 relative overflow-hidden">
      
      {/* --- GLOBAL BACKGROUND --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 z-[100]"></div>
      
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            STATUS: ONLINE & READY
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Let's Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Legendary Together
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Have a project idea? Need a full-stack developer? Or just want to say hi? 
            My inbox is always open for new opportunities.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* --- LEFT COLUMN: CONTACT INFO & MAP --- */}
          <div className="space-y-8">
            
            {/* 1. Direct Contact Cards (Clickable) */}
            <div className="grid sm:grid-cols-2 gap-4">
              <ContactActionCard 
                icon={<FaEnvelope />} 
                title="Email Me" 
                subtitle="pankoustav@gmail.com"
                link="mailto:pankoustav@gmail.com"
                color="text-cyan-400"
                delay={0}
              />
              <ContactActionCard 
                icon={<FaWhatsapp />} 
                title="WhatsApp" 
                subtitle="+91 7501795902"
                link="https://wa.me/917501795902?text=Hi%20Koustav,%20I%20saw%20your%20portfolio..."
                color="text-green-400"
                delay={0.1}
              />
            </div>

            {/* 2. Holographic Map Card */}
            <HolographicMap />

            {/* 3. Social Media Orbit */}
            <div className="p-8 rounded-3xl border border-white/5 bg-[#0a0f1e]/50 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <h3 className="text-xl font-bold mb-6 relative z-10">Connect on Socials</h3>
               <div className="flex flex-wrap gap-4 relative z-10">
                 <SocialBtn icon={<FaGithub />} link="https://github.com" label="GitHub" />
                 <SocialBtn icon={<FaLinkedin />} link="https://linkedin.com" label="LinkedIn" />
                 <SocialBtn icon={<FaTwitter />} link="https://twitter.com" label="Twitter" />
                 <SocialBtn icon={<FaInstagram />} link="https://instagram.com" label="Instagram" />
               </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: THE "SEND TO WHATSAPP" FORM --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Glowing Border Container */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-30 animate-pulse"></div>
            
            <div className="relative bg-[#0a0f1e] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
              <h3 className="text-3xl font-bold mb-2">Send a Message</h3>
              <p className="text-gray-400 mb-8 text-sm">
                This form will format your request and open WhatsApp directly.
              </p>

              <ContactForm />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;