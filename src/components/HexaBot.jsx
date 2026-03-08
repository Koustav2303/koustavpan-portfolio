import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaTerminal, FaExpandAlt, FaCompressAlt, FaMicrochip } from 'react-icons/fa';
import { botKnowledge, fallbacks } from '../data/botData';

// --- AUDIO CONTEXT ---
const playSound = (type) => {
  try {
    const audio = new Audio(type === 'send' ? '/sounds/click.mp3' : '/sounds/hover.mp3');
    audio.volume = 0.4;
    audio.play();
  } catch (e) {
    console.log("Audio not ready");
  }
};

// --- ADVANCED TYPEWRITER ---
const TypewriterText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    setDisplayedText(""); 
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        if(onComplete) onComplete();
      }
    }, 15); // Fast, terminal-like typing speed
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

// --- TIME FORMATTER ---
const getTimeStamp = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
};

const HexaBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  
  const messagesEndRef = useRef(null);
  const constraintsRef = useRef(null); // For drag boundaries
  const dragControls = useDragControls();

  // Initial Boot Sequence
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        playSound('receive');
        setMessages([
          { 
            id: 1, 
            sender: 'bot', 
            text: "INITIALIZING... Secure connection established. I am HexaBot v3.0, the local intelligence for this portfolio. How can I assist you?", 
            isNew: true,
            timestamp: getTimeStamp()
          }
        ]);
        setIsTyping(false);
      }, 1200);
    }
  }, [isOpen]);

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // --- ADVANCED SCORING ALGORITHM (NLP LIGHT) ---
  const processInput = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Easter Egg Commands
    if (lowerInput === "clear" || lowerInput === "/clear") {
      setMessages([]);
      return;
    }
    if (lowerInput.includes("sudo")) {
      deliverResponse("Nice try. You do not have root privileges on this system.");
      return;
    }

    let bestMatch = null;
    let highestScore = 0;

    // Split user input into words to check against our keywords
    const inputWords = lowerInput.split(/\W+/);

    for (let category of botKnowledge) {
      let currentScore = 0;
      for (let kw of category.keywords) {
        // Exact word match gets 2 points, partial match gets 1 point
        if (inputWords.includes(kw)) currentScore += 2;
        else if (lowerInput.includes(kw)) currentScore += 1;
      }
      
      if (currentScore > highestScore) {
        highestScore = currentScore;
        bestMatch = category;
      }
    }

    // Threshold for a valid match
    if (highestScore > 0 && bestMatch) {
      deliverResponse(bestMatch.answer);
    } else {
      deliverResponse(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    }
  };

  const deliverResponse = (textResponse) => {
    setIsTyping(true);
    const thinkTime = Math.random() * 1000 + 800; // 0.8s to 1.8s
    
    setTimeout(() => {
      playSound('receive');
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        sender: 'bot', 
        text: textResponse, 
        isNew: true,
        timestamp: getTimeStamp()
      }]);
    }, thinkTime);
  };

  const handleSend = (e, overrideText = null) => {
    if (e) e.preventDefault();
    const messageText = overrideText || input;
    if (!messageText.trim() || isTyping) return;

    playSound('send');
    
    setMessages(prev => {
      const updatedMessages = prev.map(msg => ({ ...msg, isNew: false }));
      return [...updatedMessages, { 
        id: Date.now(), 
        sender: 'user', 
        text: messageText,
        timestamp: getTimeStamp()
      }];
    });
    
    setInput("");
    processInput(messageText);
  };

  const quickActions = ["Skills", "Projects", "Education", "Contact"];

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] font-mono" ref={constraintsRef}>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            drag
            dragControls={dragControls}
            dragListener={false} // Only drag by the header
            dragMomentum={false}
            dragConstraints={constraintsRef}
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "calc(100vw - 420px)" }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isExpanded ? 450 : 380,
              height: isExpanded ? 600 : 500,
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute bottom-24 right-6 pointer-events-auto bg-[#0a0f1e]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col overflow-hidden"
            style={{ x: "calc(100vw - 420px)" }} // Default position right side
          >
            {/* --- DRAGGABLE HEADER --- */}
            <div 
              onPointerDown={(e) => dragControls.start(e)}
              className="bg-[#0f172a] p-4 flex justify-between items-center border-b border-cyan-500/30 cursor-grab active:cursor-grabbing touch-none relative overflow-hidden group"
            >
              {/* Animated Header Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite] pointer-events-none"></div>
              
              <div className="flex items-center gap-3 text-cyan-400 relative z-10">
                <div className="relative">
                  <FaMicrochip className="text-xl" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></span>
                </div>
                <div>
                  <h3 className="font-bold tracking-widest text-sm text-white">SYS.TERMINAL</h3>
                  <p className="text-[10px] text-cyan-500/80">HEXABOT_CORE_V3 // DRAG_ME</p>
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-cyan-400 transition-colors">
                  {isExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-400 transition-colors">
                  <FaTimes size={18} />
                </button>
              </div>
            </div>

            {/* --- CHAT HISTORY --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {/* Timestamp */}
                  <span className="text-[10px] text-slate-500 mb-1 flex items-center gap-1">
                    {msg.sender === 'bot' && <FaTerminal className="text-[8px] text-cyan-500" />}
                    {msg.timestamp}
                  </span>

                  {/* Message Bubble */}
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-lg relative ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-br from-cyan-600 to-cyan-700 text-white rounded-tr-none border border-cyan-400/30' 
                      : 'bg-[#1e293b]/80 border border-slate-700/50 text-slate-300 rounded-tl-none backdrop-blur-md'
                  }`}>
                    {msg.sender === 'bot' && msg.isNew ? (
                      <TypewriterText text={msg.text} onComplete={scrollToBottom} />
                    ) : (
                      <span>{msg.text}</span>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-slate-500 mb-1">Processing...</span>
                  <div className="bg-[#1e293b]/80 border border-slate-700/50 p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center w-fit">
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></motion.div>
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></motion.div>
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* --- QUICK ACTIONS --- */}
            {messages.length > 0 && !isTyping && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                {quickActions.map(action => (
                  <button 
                    key={action}
                    onClick={() => handleSend(null, action)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs hover:bg-cyan-500 hover:text-slate-900 transition-all"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* --- INPUT FIELD --- */}
            <form onSubmit={(e) => handleSend(e)} className="p-3 bg-[#0f172a] border-t border-cyan-500/20 flex gap-2 relative z-10">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isTyping ? "Awaiting system..." : "Enter command..."}
                disabled={isTyping}
                className="flex-1 bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 text-sm text-cyan-50 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isTyping || !input.trim()}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 px-4 rounded-xl transition-all flex items-center justify-center group"
              >
                <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING TOGGLE BUTTON --- */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto absolute bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.7)] transition-shadow border-2 border-cyan-200 z-[110]"
      >
        {isOpen ? <FaTimes /> : <FaRobot className="animate-pulse" />}
      </motion.button>
      
      {/* Required for the header sweep animation */}
      <style jsx global>{`
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default HexaBot;