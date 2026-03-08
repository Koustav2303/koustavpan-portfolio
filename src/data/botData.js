// --- RANDOMIZED FALLBACKS ---
export const fallbacks = [
  "SYSTEM ERROR: Query exceeds my current parameters. Try asking about the developer's 'skills', 'projects', or 'education'.",
  "DATA NOT FOUND. I am still learning. Would you like to know about the developer's 'experience' or download the 'resume'?",
  "PROCESSING FAILED. My neural net didn't catch that. Try keywords like 'contact', 'hobbies', or 'tech stack'.",
  "UNRECOGNIZED COMMAND. Please rephrase. You can ask me things like 'Who is the developer?' or 'What are their projects?'"
];

// --- MASSIVE KNOWLEDGE BASE ---
export const botKnowledge = [
  // --- GREETINGS & IDENTITY ---
  {
    keywords: ["hi", "hello", "hey", "start", "wakeup", "ping", "sup", "greetings", "system", "online", "good morning", "good evening"],
    answer: "SYSTEM ONLINE. I am HexaBot v2.0, the local AI assistant for this portfolio. I have full access to my creator's professional data, projects, and system logs. How can I assist your navigation today?"
  },
  {
    keywords: ["who are you", "what are you", "bot", "ai", "artificial", "intelligence", "hexabot"],
    answer: "I am HexaBot. A localized, rule-based client-side entity running directly in your browser's memory. My sole directive is to provide data regarding this developer and assist recruiters."
  },
  {
    keywords: ["who", "about", "background", "bio", "yourself", "profile", "identity", "creator", "developer", "author"],
    answer: "The creator of this portfolio is a Java Fullstack Developer. They architect digital realities by bridging robust backend microservices with stunning, interactive frontend interfaces. They don't just write code; they compile dreams into deployable reality."
  },

  // --- CORE SKILLS & TECH ---
  {
    keywords: ["skills", "tech", "stack", "languages", "know", "frontend", "backend", "database", "technologies", "frameworks", "tools", "arsenal"],
    answer: "The developer's Mainframe Arsenal is highly optimized. BACKEND: Advanced Java, Spring Boot, Hibernate. FRONTEND: React, JavaScript, HTML, CSS, Tailwind CSS. DATABASE: MySQL. They build complete, end-to-end scalable systems."
  },
  {
    keywords: ["java", "spring", "springboot", "hibernate", "microservices"],
    answer: "Java is the developer's core strength. They are highly proficient in Advanced Java, Spring Boot, building RESTful APIs, Microservices architecture, and database management using Hibernate."
  },
  {
    keywords: ["react", "javascript", "js", "frontend", "css", "tailwind", "framer"],
    answer: "For the frontend, the developer builds highly interactive, cinematic UI/UX using React, Tailwind CSS, and Framer Motion (just like this portfolio!). They specialize in lag-free, component-based architecture."
  },

  // --- PROJECTS ---
  {
    keywords: ["projects", "work", "build", "portfolio", "websites", "creations", "github", "repositories"],
    answer: "The developer has engineered over 15 projects. Notable builds include 'YatraEase' (travel booking), 'Weather Pro' (React dashboard), and multiple cinematic 3D web experiences. Check the Projects section for live demos."
  },
  {
    keywords: ["yatraease", "travel", "yatra", "ease", "booking"],
    answer: "PROJECT LOG: 'YatraEase'. A comprehensive travel booking platform demonstrating mastery of complex UI components, routing, and fullstack structure."
  },
  {
    keywords: ["weather", "weatherpro", "dashboard", "weather-pro"],
    answer: "PROJECT LOG: 'Weather Pro'. A dynamic React weather dashboard that utilizes advanced state management and live API integration to deliver real-time meteorological data in a sleek interface."
  },
  {
    keywords: ["this website", "this portfolio", "how did you build", "code for this"],
    answer: "This portfolio is a masterclass in modern frontend. It uses React, Vite, Tailwind CSS, and Framer Motion for the physics-based animations. I (HexaBot) am running entirely on client-side JavaScript!"
  },

  // --- EDUCATION & EXPERIENCE ---
  {
    keywords: ["education", "college", "study", "degree", "btech", "school", "university", "academic", "cgpa", "marks"],
    answer: "System Logs state: B.Tech in Computer Science from Bankura Unnayani Institute of Engineering (CGPA: 7.34). They also hold strong foundational scores in Physics, Chemistry, and Math (88% in XII)."
  },
  {
    keywords: ["jspider", "j-spider", "btm", "course", "training"],
    answer: "The developer is currently sharpening their enterprise skills at J-Spider in Bengaluru, specializing in Advanced Java, Spring Boot Microservices, React, and System Design."
  },
  {
    keywords: ["experience", "fresher", "work history", "jobs", "internship"],
    answer: "The developer is a highly skilled fresher. While they haven't held formal corporate roles yet, their portfolio of 15+ complex, full-stack projects rivals the output of mid-level developers. They are battle-tested and ready for production."
  },

  // --- LOCATION & LOGISTICS ---
  {
    keywords: ["location", "where", "city", "live", "bangalore", "bengaluru", "current", "address", "relocate"],
    answer: "The developer's current operational base is Bengaluru, Karnataka. They are available for work locally and globally."
  },
  {
    keywords: ["midnapore", "hometown", "july", "return"],
    answer: "System timeline indicates a planned relocation back to their hometown area of Midnapore in July 2026."
  },

  // --- HOBBIES & ALTER EGOS ---
  {
    keywords: ["political", "science", "institutionalism", "behavioralism", "theory", "notes"],
    answer: "Beyond code, the developer has a deep intellectual curiosity. They engage heavily with Political Science, specifically studying complex systems like institutionalism, behavioralism, and political theory."
  },
  {
    keywords: ["hobbies", "fun", "free time", "games", "bgmi", "pubg", "gaming", "esports", "player"],
    answer: "When not compiling code, the developer is a competitive gamer dominating in BGMI and PUBG. They have even conceptualized cinematic portfolio websites specifically tailored for gaming stats!"
  },
  {
    keywords: ["video", "edit", "editing", "lyrical", "production"],
    answer: "Under a creative alias, the developer is a highly creative video producer specializing in intricate lyrical video editing and high-end cinematic outros."
  },
  {
    keywords: ["art", "ai", "illustration", "drawing", "midjourney", "prompt", "portraits", "mythological", "sketch"],
    answer: "The developer is an advanced AI prompt engineer operating under an artistic alias. They generate ultra-realistic portraits, complex mythological illustrations, and hand-drawn sketch styles."
  },

  // --- RECRUITING & CONTACT ---
  {
    keywords: ["contact", "hire", "email", "reach", "call", "message", "freelance", "recruit", "job"],
    answer: "UPLINK REQUIRED: You can send a direct transmission via the Contact form on this site, or interface with the developer directly on GitHub. They are actively looking for Fullstack Java roles."
  },
  {
    keywords: ["resume", "cv", "download", "document", "paperwork"],
    answer: "You can securely download the developer's complete, up-to-date resume by clicking the glowing 'Download Resume' button located in the About section of this terminal."
  },

  // --- EASTER EGGS & RELATIONSHIPS ---
  {
    keywords: ["friend", "partner", "special", "gift"],
    answer: "EASTER EGG UNLOCKED: The developer occasionally leverages elite web development and video editing skills to build highly creative, personalized digital projects and birthday videos for close friends."
  },
  {
    keywords: ["sister", "family", "birthday"],
    answer: "EASTER EGG UNLOCKED: The developer engineered a spectacular 3D cinematic interactive website featuring floral motifs as a dedicated birthday gift for a family member."
  },
  {
    keywords: ["collaborator", "team", "network"],
    answer: "The developer frequently collaborates with other recognized developers in their network, contributing to mutual web projects."
  },
  {
    keywords: ["joke", "funny", "humor", "laugh"],
    answer: "Why do Java developers wear glasses? Because they don't C#."
  }
];