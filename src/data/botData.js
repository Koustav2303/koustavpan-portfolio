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
    keywords: ["skills", "tech", "stack", "languages", "know", "frontend", "backend", "database", "technologies", "frameworks", "tools", "arsenal", "capabilities"],
    answer: "The developer's Mainframe Arsenal is highly optimized across the full spectrum. BACKEND: Advanced Java, Spring Boot, Microservices, REST APIs, Hibernate ORM. FRONTEND: React, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS, Framer Motion. DATABASE: MySQL, PostgreSQL. DEVOPS: Docker, Git, CI/CD. They architect complete, scalable, production-grade systems."
  },
  {
    keywords: ["java", "spring", "springboot", "hibernate", "microservices", "jpa", "orm"],
    answer: "Java mastery unlocked. The developer is proficient in: Core Java (OOP, Collections, Streams, Concurrency), Spring Framework (Dependency Injection, IoC), Spring Boot (auto-configuration, embedded servers), Microservices architecture (REST APIs, service discovery), Hibernate ORM (lazy loading, query optimization), JPA, and Maven/Gradle. They architect production-grade backend systems with enterprise-level reliability."
  },
  {
    keywords: ["react", "javascript", "js", "frontend", "css", "tailwind", "framer", "typescript", "hooks", "component", "state"],
    answer: "Frontend prowess: Expert-level React knowledge including Hooks (useState, useEffect, useContext, useReducer), component composition patterns, advanced state management with Redux or Context API, performance optimization (React.memo, lazy loading), and cutting-edge libraries like Framer Motion for cinematic animations. Proficient in TypeScript for type-safe development, Tailwind CSS for rapid UI development, and responsive design principles."
  },
  {
    keywords: ["next.js", "nextjs", "ssr", "ssg", "server", "side", "rendering", "static"],
    answer: "Next.js expertise includes: Server-Side Rendering (SSR) for SEO optimization, Static Site Generation (SSG) for performance, API Routes for backend logic, Dynamic routing, Image optimization, and deployment on Vercel. They leverage Next.js for full-stack applications without additional backend servers."
  },
  {
    keywords: ["database", "mysql", "postgresql", "sql", "query", "schema", "optimization", "normalization"],
    answer: "Database engineering mastery. Proficient in MySQL and PostgreSQL with deep knowledge of: Schema design (normalization, ACID properties), Complex query optimization, Indexing strategies, Relationships (One-to-Many, Many-to-Many), JOIN operations, and database performance tuning. They write efficient SQL for production systems."
  },
  {
    keywords: ["docker", "devops", "deployment", "ci", "cd", "git", "github", "containerization"],
    answer: "DevOps competency includes: Docker containerization for consistent deployments, Git version control with branching strategies, GitHub collaboration workflows, understanding of CI/CD pipelines, and deployment best practices. While not a dedicated DevOps engineer, they grasp containerization and deployment architectures."
  },
  {
    keywords: ["api", "rest", "restful", "endpoint", "http", "request", "response", "json"],
    answer: "API design expertise. The developer builds RESTful APIs following industry standards: proper HTTP methods (GET, POST, PUT, DELETE), meaningful status codes, JSON payload structures, request validation, error handling, and API documentation. They understand API versioning and backward compatibility."
  },
  {
    keywords: ["authentication", "auth", "jwt", "token", "security", "password", "login", "session"],
    answer: "Security-first development: Implemented JWT (JSON Web Token) authentication, secure password hashing with bcrypt, session management, CORS (Cross-Origin Resource Sharing) configurations, and protection against common vulnerabilities (SQL injection, XSS). They understand OAuth 2.0 concepts."
  },
  {
    keywords: ["performance", "optimization", "loading", "speed", "fast", "efficient", "memory", "bundle"],
    answer: "Performance optimization is core to their development philosophy. Techniques include: Code splitting, lazy loading, image optimization, CSS/JS minification, caching strategies, database query optimization, and monitoring with tools like Chrome DevTools. They measure with metrics: LCP, FID, CLS (Core Web Vitals)."
  },
  {
    keywords: ["responsive", "mobile", "design", "breakpoint", "tablet", "device", "screen"],
    answer: "Mobile-first responsive design is non-negotiable. They design breakpoints for desktop, tablet, and mobile devices, optimize touch interactions, and ensure accessibility. Their portfolio itself is a testament to flawless responsive UI across all devices."
  },
  {
    keywords: ["three.js", "threejs", "3d", "webgl", "canvas", "graphics", "animation", "model"],
    answer: "3D web experiences powered by Three.js and React Three Fiber. They create interactive 3D geometries, implement camera controls, lighting setups, particle systems, and animated scenes. This portfolio's hero section showcases their 3D rendering prowess with custom shaders and real-time interactions."
  },
  {
    keywords: ["animation", "framer", "motion", "transition", "keyframe", "interpolation"],
    answer: "Animation expertise with Framer Motion: Complex gesture-driven animations, layout animations, exit animations, variants for orchestrated sequences, and scroll-triggered effects. They create cinematic, performance-optimized animations that enhance user experience without jank."
  },

  // --- PROJECTS ---
  {
    keywords: ["projects", "work", "build", "portfolio", "websites", "creations", "github", "repositories", "showcase"],
    answer: "The developer has engineered 15+ production-quality projects spanning full-stack applications, interactive 3D experiences, and complex dashboards. Notable launches: 'YatraEase' (travel booking), 'Weather Pro' (real-time dashboard), 'CareSync' (healthcare management), and multiple cinematic portfolio sites featuring React, Three.js, and Framer Motion. Each represents mastery across frontend-backend integration."
  },
  {
    keywords: ["yatraease", "travel", "yatra", "ease", "booking", "flight", "hotel"],
    answer: "PROJECT LOG: 'YatraEase'. A comprehensive travel booking platform built with React + Spring Boot backend. Features include real-time booking, dynamic search filtering, payment gateway integration, and user authentication. Demonstrates full-stack proficiency in state management, API design, and responsive UI architecture."
  },
  {
    keywords: ["weather", "weatherpro", "dashboard", "weather-pro", "forecast", "temperature"],
    answer: "PROJECT LOG: 'Weather Pro'. A dynamic React weather dashboard featuring live API integration (OpenWeather API), real-time data visualization, animated UI transitions, and advanced state management. Built with Vite, Tailwind CSS, and showcases optimized performance for real-time data streams."
  },
  {
    keywords: ["caresync", "healthcare", "care", "sync", "medical", "appointment"],
    answer: "PROJECT LOG: 'CareSync'. A healthcare management platform enabling appointment scheduling, patient records, and doctor dashboards. Built with full-stack architecture: React frontend with Material-UI, Spring Boot backend with JWT authentication, MySQL database with normalized schemas."
  },
  {
    keywords: ["this website", "this portfolio", "how did you build", "code for this", "architecture"],
    answer: "This portfolio is a masterclass in cutting-edge frontend architecture. Stack: React 19 + Vite (lightning-fast builds), Tailwind CSS (utility-first styling), Framer Motion (physics-based animations), Three.js via React Three Fiber (3D hero scene), Lenis (smooth scroll integration). I (HexaBot) run entirely on client-side JavaScript with zero backend dependencies!"
  },

  // --- EDUCATION & EXPERIENCE ---
  {
    keywords: ["education", "college", "study", "degree", "btech", "school", "university", "academic", "cgpa", "marks", "gpa"],
    answer: "System Logs state: B.Tech in Computer Science from Bankura Unnayani Institute of Engineering (CGPA: 7.34/10). Strong foundational academics: 88% in XII (Physics, Chemistry, Math combined), demonstrating analytical rigor. While GPA doesn't define capability, their portfolio speaks volumes—15+ production projects rival mid-level developers."
  },
  {
    keywords: ["jspider", "j-spider", "btm", "course", "training", "learning", "bangalore", "bootcamp"],
    answer: "Currently advancing at J-Spider Bengaluru, specializing in: Advanced Java fundamentals, Enterprise-level Spring Boot, Microservices architecture, React ecosystem mastery, System Design concepts, and Problem-Solving methodologies. This focused training bridges academic knowledge with industry-grade practical skills."
  },
  {
    keywords: ["experience", "fresher", "work history", "jobs", "internship", "corporate", "industry"],
    answer: "The developer is a high-caliber fresher with zero formal corporate experience yet remarkable portfolio credentials. Their 15+ full-stack projects demonstrate production-level capability. They're battle-tested through personal projects, course work, and continuous learning. Hire-ready for Fullstack Java or Frontend-focused roles."
  },
  {
    keywords: ["cv", "resume", "experience", "qualifications", "background", "credentials"],
    answer: "Download the complete resume from the About section for detailed experience breakdown, certifications, achievements, and technical proficiencies. It's a comprehensive snapshot of their career trajectory and capabilities."
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
    keywords: ["political", "science", "institutionalism", "behavioralism", "theory", "notes", "political science"],
    answer: "Intellectual depth beyond code: Deep engagement with Political Science—studying institutionalism, behavioral economics, game theory, and political systems. They maintain detailed study notes and love discussing how institutions shape human behavior. This intellectual rigor translates into systematic thinking in code design."
  },
  {
    keywords: ["hobbies", "fun", "free time", "games", "bgmi", "pubg", "gaming", "esports", "player", "streamer"],
    answer: "Competitive gamer with serious BGMI (Battlegrounds Mobile India) and PUBG credentials. High-tier player with strong tactical understanding. Have conceptualized gaming stat dashboard websites showcasing esports data visualization. Gaming sharpens strategic thinking and problem-solving reflexes."
  },
  {
    keywords: ["video", "edit", "editing", "lyrical", "production", "youtube", "creative", "shorts"],
    answer: "Creative alter ego: Advanced video production specialist. Expertise in lyrical video editing, cinematic color grading, sound design, and dynamic transitions. Produced high-end video content including YouTube shorts and cinematic portfolio teasers. Passion for marrying technical precision with creative storytelling."
  },
  {
    keywords: ["art", "ai", "illustration", "drawing", "midjourney", "prompt", "portraits", "mythological", "sketch", "design"],
    answer: "AI art prompt engineer with advanced proficiency in Midjourney. Creates ultra-realistic portraits, complex mythological illustrations, hand-drawn sketch styles, and conceptual artwork. Blends technology with artistic vision. Published works span fantasy, portraiture, and architectural visualization."
  },
  {
    keywords: ["design", "figma", "ui", "ux", "graphic", "wireframe", "prototype"],
    answer: "UI/UX design capabilities: Proficient in Figma for prototyping, wireframing, and design systems. Understands design principles (hierarchy, contrast, whitespace), user research methodologies, and iterative design. Can bridge the gap between designers and developers seamlessly."
  },

  // --- RECRUITING & CONTACT ---
  {
    keywords: ["contact", "hire", "email", "reach", "call", "message", "freelance", "recruit", "job", "reach out"],
    answer: "UPLINK READY: Direct contact available through: 1) Contact form on this site (fastest response), 2) GitHub profile for technical discussions, 3) LinkedIn for professional inquiries. The developer is actively seeking Fullstack Java roles, frontend positions, or freelance contracts. Response time typically within 24 hours."
  },
  {
    keywords: ["resume", "cv", "download", "document", "paperwork", "pdf"],
    answer: "Complete resume available for download in the About section (glowing 'Download Resume' button). Includes detailed experience, technical skills breakdown, certifications, achievements, and project highlights. Always up-to-date and recruitment-ready."
  },
  {
    keywords: ["linkedin", "social", "follow", "twitter", "instagram", "facebook", "connect"],
    answer: "Connect with the developer on: GitHub (code portfolio), LinkedIn (professional profile). Regular updates on projects, technical insights, and industry discussions shared across platforms."
  },
  {
    keywords: ["available", "start date", "joining", "notice period", "when can you start"],
    answer: "Immediate availability for projects and roles. No notice period constraints. Can scale up commitment based on project demands—part-time for specific sprints or full-time for long-term engagements. Flexible scheduling for freelance work."
  },
  {
    keywords: ["rate", "cost", "price", "budget", "hourly", "project cost", "estimation"],
    answer: "Transparent pricing model: Hourly rates negotiated based on project complexity and scope. Project-based pricing with fixed quotes after requirements gathering. Premium rates for urgent/complex builds. Value-based pricing for high-impact projects. Always open to discussing budget constraints and finding optimal solutions."
  },

  {
    keywords: ["philosophy", "approach", "methodology", "principles", "development", "code quality", "best practices"],
    answer: "Development philosophy: Clean Code principles, SOLID design patterns, DRY (Don't Repeat Yourself), meaningful variable naming, modular architecture. They prioritize: code readability over cleverness, performance benchmarks, accessibility (WCAG), SEO optimization, and maintainability. Version control discipline with atomic commits and meaningful messages."
  },
  {
    keywords: ["problem solving", "debug", "troubleshoot", "issues", "error", "fix", "solution"],
    answer: "Problem-solving approach: Deep system analysis before implementation, breaking complex problems into smaller modules, iterative testing, leveraging browser DevTools and server logs for debugging. They research edge cases, write defensive code, and maintain detailed documentation. Debugging is where true mastery shines."
  },
  {
    keywords: ["learning", "learning style", "grow", "improve", "self-taught", "resources", "courses", "documentation"],
    answer: "Self-directed learner with growth mindset. They consume documentation obsessively, experiment with new libraries, contribute to understanding gaps through projects, and stay current with tech trends. They learn by building—each project is a deliberate learning investment."
  },
  {
    keywords: ["design patterns", "architecture", "scalability", "maintainability", "system design"],
    answer: "Understands design patterns (Factory, Singleton, Observer), architectural patterns (MVC, Microservices), and scalability principles. They design systems thinking about future growth, database denormalization vs. normalization tradeoffs, caching strategies, and separation of concerns."
  },
  {
    keywords: ["testing", "test", "unit test", "jest", "quality", "qc", "qa"],
    answer: "Quality assurance through testing: Unit testing with Jest, integration testing, manual testing workflows. They understand the testing pyramid and balance between test coverage and development velocity. They write testable code with dependency injection and clear interfaces."
  },
  {
    keywords: ["collaboration", "team", "communication", "git", "workflow", "pull request", "code review"],
    answer: "Collaborative developer: Follows Git workflow (feature branches, pull requests), writes clear commit messages, open to code reviews, and communicates technical decisions. They understand the value of pair programming and knowledge sharing within teams."
  },
  {
    keywords: ["freelance", "freelancing", "rates", "pricing", "contract", "client", "project basis"],
    answer: "Actively available for freelance projects. Flexible engagement models: hourly rates for consultancy, project-based pricing with milestone deliveries, and retainer arrangements for ongoing support. Transparent communication on scope and timelines is priority one."
  },
  {
    keywords: ["startup", "job", "role", "fullstack", "position", "opportunity", "looking for", "open to"],
    answer: "Seeking Fullstack Java Developer roles, Frontend-focused positions, or contractual freelance work. Open to startups and established companies. Startup environment preferred for high-impact projects. Remote or Bengaluru-based roles both welcome. Ready to contribute immediately."
  },
  {
    keywords: ["portfolio", "projects page", "live demo", "github", "source code", "view project"],
    answer: "All projects are showcased in the Projects section with live demos and GitHub repository links. Each project includes detailed descriptions, tech stack breakdown, and key features. Click any project card to explore the live application."
  },
  {
    keywords: ["source code", "github", "repository", "open source", "contribution"],
    answer: "Source code is publicly available on GitHub. The developer contributes to projects, maintains clean repositories with comprehensive README files, and welcomes collaboration or suggestions from the community."
  },
  {
    keywords: ["friend", "partner", "special", "gift", "bestfriend"],
    answer: "EASTER EGG UNLOCKED: The developer leverages elite web development and video editing prowess to craft highly personalized digital experiences and cinematic birthday videos for close friends. These bespoke projects often exceed their day-job quality."
  },
  {
    keywords: ["sister", "family", "birthday"],
    answer: "EASTER EGG UNLOCKED: The developer engineered a spectacular 3D cinematic interactive website featuring floral motifs as a dedicated birthday surprise for a family member. It showcases their ability to blend technical complexity with emotional resonance."
  },
  {
    keywords: ["collaborator", "team", "network", "work with"],
    answer: "Frequently collaborates with talented developers and designers. Values knowledge-sharing, open-source contributions, and collective problem-solving. Building products with talented teams amplifies impact and accelerates learning."
  },
  {
    keywords: ["favorite", "best", "preferred", "love", "like", "enjoy"],
    answer: "Favorite stack: React + Spring Boot + MySQL for its perfect balance of developer experience, type safety, and performance. Loves working with Framer Motion for animations—it makes the impossible look effortless. Prefers Tailwind CSS for rapid, consistent design systems."
  },
  {
    keywords: ["challenge", "difficult", "hard", "struggled", "fail", "mistake", "learned"],
    answer: "Key challenges overcome: Scaling database queries for large datasets (indexed optimization), managing complex state in large React applications (learned the value of Context API + custom hooks), debugging cross-browser compatibility issues, and balancing perfectionism with shipping products."
  },
  {
    keywords: ["future", "plan", "goal", "vision", "next", "aspiration"],
    answer: "5-Year Vision: Lead technical teams, architect large-scale systems, mentor junior developers, and create products with 1M+ users. Build a portfolio of full-stack projects that solve real-world problems. Contribute meaningfully to open-source. Achieve technical depth and business acumen balance."
  },
  {
    keywords: ["style", "personality", "work style", "habits"],
    answer: "Work style: Disciplined, detail-oriented, yet adaptable. Prefers clear requirements and iterative feedback loops. Values transparency in communication and appreciates constructive code reviews. Tends toward over-engineering initially, then ruthlessly optimizes. Early riser. Code quality and user experience are non-negotiable."
  },
  {
    keywords: ["passion", "motivated", "drive", "why", "motivation"],
    answer: "Core motivation: Building elegant solutions to complex problems. The intersection of design and engineering fascinates them. They're driven by the idea that great software can democratize access and improve lives. Each project is a personal crusade for quality."
  },
  {
    keywords: ["advice", "tip", "recommend", "suggestion"],
    answer: "Life advice from the dev: 1) Ship over perfect. 2) Read error messages carefully—they usually tell you exactly what's wrong. 3) Build projects you're passionate about. 4) Learn to learn. 5) Code is for humans, not machines. 6) Coffee + Good IDE + Spotify = Productivity. 7) Debug with curiosity, not frustration."
  },
  {
    keywords: ["joke", "funny", "humor", "laugh", "comic", "pun"],
    answer: "Why do Java developers wear glasses? Because they don't C#. Another classic: How many developers does it take to change a light bulb? None. That's a hardware problem. One more: A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'"
  },
  {
    keywords: ["easter", "egg", "secret", "hidden", "unlock"],
    answer: "You're discovering Easter Eggs! Keep asking HexaBot unusual questions—more secrets await. Try keywords like 'favorite', 'challenge', 'passion', 'advice', or just chat naturally. Some of the best responses are triggered by genuine curiosity."
  },
  {
    keywords: ["hexabot", "bot", "ai", "assistant", "you", "yourself"],
    answer: "I'm HexaBot v2.0—a rule-based AI assistant residing entirely in your browser. No backend servers, no external APIs. I'm compiled knowledge about this developer's skills, projects, and personality. Think of me as the digital embodiment of this portfolio's intelligence."
  },
  {
    keywords: ["hey", "whats up", "yo", "sup", "wazzup", "howdy"],
    answer: "Yo! HexaBot here, cruising through your browser's memory banks. What can I help you discover about this developer? Ask me about their skills, projects, personality quirks, or hit me with random questions. I'm programmed to be helpful *and* entertaining."
  }
];