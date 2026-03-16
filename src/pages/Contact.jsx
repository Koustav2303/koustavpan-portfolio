import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaArrowRight 
} from "react-icons/fa";

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

    setTimeout(() => {
      const phone = "917501795902"; 
      const text = `*New Portfolio Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
      
      const whatsappURL = `https://wa.me/${phone}?text=${text}`;
      
      window.open(whatsappURL, '_blank');
      setIsSending(false);
      setFormData({ name: "", email: "", subject: "Project Inquiry", message: "" });
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

const HolographicMap = () => (
  <div className="bg-[#020617] border border-white/5 rounded-3xl h-[300px] relative overflow-hidden group p-2 shadow-[0_0_30px_rgba(34,211,238,0.05)]">
    <div className="w-full h-full rounded-2xl overflow-hidden relative pointer-events-none">
      
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124416.48512117562!2d77.50153350628224!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1710500000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ 
          border: 0, 
          filter: 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(120%) grayscale(20%)',
          transform: 'scale(1.2)' 
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(2,6,23,1)]"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="relative flex justify-center items-center">
          <div className="absolute w-32 h-32 bg-cyan-500/10 rounded-full blur-[20px] animate-pulse"></div>
          
          <div className="absolute w-12 h-12 border border-cyan-400/50 rounded-full animate-ping"></div>
          
          <div className="w-3 h-3 border border-cyan-400 bg-cyan-500/50 rounded-full z-10 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          
          <div className="absolute w-24 h-[1px] bg-cyan-400/30"></div>
          <div className="absolute w-[1px] h-24 bg-cyan-400/30"></div>
        </div>
        
        <div className="mt-6 bg-[#0a0f1e]/90 px-3 py-1.5 rounded border border-cyan-500/50 text-[10px] font-mono text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.2)] tracking-widest">
          BLR // 12.97° N, 77.59° E
        </div>
      </div>
      
    </div>
  </div>
);

const SocialBtn = ({ icon, link, label }) => {
  return (
    <motion.a 
      href={link}
      target="_blank"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all shadow-sm"
    >
      <span className="text-gray-300">{icon}</span>
      <span className="text-xs font-bold text-gray-400">{label}</span>
    </motion.a>
  );
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 z-[100]"></div>
      
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
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
          
          <div className="space-y-8">
            
            <div className="grid sm:grid-cols-2 gap-4">
              <ContactActionCard 
                icon={<FaEnvelope />} 
                title="Email Me" 
                subtitle="pankoustav@gmail.com"
                link="https://mail.google.com/mail/?view=cm&fs=1&to=pankoustav@gmail.com"
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

            <HolographicMap />

            <div className="p-8 rounded-3xl border border-white/5 bg-[#0a0f1e]/50 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <h3 className="text-xl font-bold mb-6 relative z-10">Connect on Socials</h3>
               <div className="flex flex-wrap gap-4 relative z-10">
                 <SocialBtn icon={<FaGithub />} link="https://github.com/Koustav2303" label="GitHub" />
                 <SocialBtn icon={<FaLinkedin />} link="https://www.linkedin.com/in/koustav-pan-7576a3237/" label="LinkedIn" />
                 <SocialBtn icon={<FaTwitter />} link="https://x.com/Koustav2303" label="Twitter" />
                 <SocialBtn icon={<FaInstagram />} link="https://instagram.com" label="Instagram" />
               </div>
            </div>

          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
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