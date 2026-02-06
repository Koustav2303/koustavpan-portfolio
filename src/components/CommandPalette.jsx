import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSearch, FaHome, FaUser, FaCode, FaEnvelope, FaGithub, FaLinkedin, FaCopy, FaTimes 
} from "react-icons/fa";

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // ACTIONS CONFIGURATION
  const actions = [
    { 
      id: "home", 
      label: "Go to Home", 
      icon: <FaHome />, 
      shortcut: "H", 
      action: () => navigate("/") 
    },
    { 
      id: "about", 
      label: "Go to About", 
      icon: <FaUser />, 
      shortcut: "A", 
      action: () => navigate("/about") 
    },
    { 
      id: "projects", 
      label: "View Projects", 
      icon: <FaCode />, 
      shortcut: "P", 
      action: () => navigate("/projects") 
    },
    { 
      id: "contact", 
      label: "Contact Me", 
      icon: <FaEnvelope />, 
      shortcut: "C", 
      action: () => navigate("/contact") 
    },
    { 
      id: "github", 
      label: "Visit GitHub", 
      icon: <FaGithub />, 
      action: () => window.open("https://github.com", "_blank") 
    },
    { 
      id: "linkedin", 
      label: "Visit LinkedIn", 
      icon: <FaLinkedin />, 
      action: () => window.open("https://linkedin.com", "_blank") 
    },
    { 
      id: "copy", 
      label: "Copy Email", 
      icon: <FaCopy />, 
      action: () => {
        navigator.clipboard.writeText("pankoustav@gmail.com");
        alert("Email copied to clipboard!");
      } 
    },
  ];

  // Filter actions based on search
  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  // Toggle with Keyboard (Ctrl + K or Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle Arrow Keys for Selection
  useEffect(() => {
    const handleNavigation = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [isOpen, selectedIndex, filteredActions]);

  // Reset selection when query changes
  useEffect(() => setSelectedIndex(0), [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5">
              <FaSearch className="text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-gray-500 outline-none text-lg font-sans"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white px-2 py-1 text-xs border border-white/10 rounded bg-white/5"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[300px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredActions.length > 0 ? (
                filteredActions.map((action, index) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      action.action();
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      index === selectedIndex
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                        : "text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{action.icon}</span>
                      <span className="font-medium">{action.label}</span>
                    </div>
                    {action.shortcut && (
                      <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-gray-400 border border-white/5">
                        {action.shortcut}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  No results found.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-[#020617] border-t border-white/5 flex justify-between text-[10px] text-gray-500 font-mono uppercase tracking-wider">
              <span>Navigation</span>
              <div className="flex gap-3">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;