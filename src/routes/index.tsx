import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import portrait from "@/assets/portrait.jpeg";

// ─── Icon helpers ────────────────────────────────────────────────────────────

const GH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LI_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Tech icon map ────────────────────────────────────────────────────────────

const ICON_SLUGS: Record<string, string> = {
  "SQL": "postgresql", "Python": "python", "PySpark": "apachespark",
  "Tableau": "tableau", "Power BI": "powerbi", "Snowflake": "snowflake",
  "BigQuery": "googlebigquery", "Databricks": "databricks", "AWS": "amazonwebservices",
  "Jira": "jira", "Agile/SCRUM": "scrumalliance", "LangChain": "langchain",
  "Node.js": "nodedotjs", "Express": "express", "MySQL": "mysql",
  "React": "react", "FastAPI": "fastapi", "pgvector": "postgresql",
  "Flask": "flask", "OpenAI": "openai", "Plotly": "plotly", "D3.js": "d3dotjs",
  "Docker": "docker", "TensorFlow": "tensorflow", "Streamlit": "streamlit",
  "Scikit-learn": "scikitlearn", "R": "r", "Spring Boot": "springboot",
  "React.js": "react", "Node.js / Express": "nodedotjs",
};

function TechChip({ name }: { name: string }) {
  const slug = ICON_SLUGS[name];
  const [broken, setBroken] = useState(false);
  return (
    <motion.span
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ type: "spring", stiffness: 380, damping: 16 }}
      className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full glass text-foreground/85 hover:text-foreground cursor-default"
    >
      {slug && !broken ? (
        <img
          src={`https://api.iconify.design/simple-icons/${slug}.svg?color=%23F5F6FA`}
          alt="" aria-hidden width={14} height={14}
          className="w-3.5 h-3.5 opacity-90"
          onError={() => setBroken(true)} loading="lazy"
        />
      ) : null}
      {name}
    </motion.span>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: "Intelligent University Query Resolution System",
    desc: "Built an end-to-end RAG pipeline ingesting university PDFs and policy docs into a ChromaDB vector store. GPT-4 performs semantic search and synthesizes contextual answers via a FastAPI backend, served through a Streamlit UI with conversation memory.",
    impact: "Query resolution time from 4+ hours to <3 seconds · 90%+ student satisfaction",
    stack: ["Python", "LangChain", "FastAPI", "Streamlit", "OpenAI"],
    category: "Machine Learning" as const,
    date: "Jan 2025 – Present · SFSU",
    github: "https://github.com/BAVISETTISAKETH",
  },
  {
    name: "Data Visualization Chatbot",
    desc: "Designed an NLP pipeline using OpenAI function calling to parse user intent, select the right chart type, and auto-generate interactive Plotly visuals from uploaded CSVs - deployed as a Streamlit app with session-based chat history.",
    impact: "70% faster chart creation · 10+ chart types via natural language with zero code",
    stack: ["Python", "OpenAI", "LangChain", "Plotly", "Streamlit"],
    category: "Machine Learning" as const,
    date: "Aug – Dec 2024 · SFSU",
    github: "https://github.com/BAVISETTISAKETH/Graduate-Seminar-Final-Version",
  },
  {
    name: "Scholar Eats – Campus Food Platform",
    desc: "Engineered a full-stack ordering platform with a React SPA, Node.js/Express REST API, and normalized MySQL schema. JWT auth, Stripe payments, real-time order tracking, and containerized deployment on AWS EC2 with S3 for media.",
    impact: "500+ students onboarded · 40% reduction in average wait time at peak hours",
    stack: ["React.js", "Node.js", "MySQL", "Docker", "AWS"],
    category: "Web Development" as const,
    date: "May – Aug 2024 · SFSU",
    github: "https://github.com/sfsu-joseo/csc648-848-05-sw-engineering-su24-T4",
  },
  {
    name: "Formula 1 Race Outcome Prediction",
    desc: "Stacked ensemble (XGBoost, Random Forest, Gradient Boosting) trained on 10+ years of F1 telemetry, driver standings, and weather data. Applied SHAP for explainability and GridSearchCV for tuning.",
    impact: "85% winner prediction accuracy · SHAP pinpointed qualifying position as top predictor",
    stack: ["Python", "Scikit-learn", "Tableau"],
    category: "Data Analysis" as const,
    date: "Jan – May 2024 · SFSU",
    github: "https://github.com/BAVISETTISAKETH",
  },
  {
    name: "Student Retention & Academic Success Predictors",
    desc: "Applied multivariate logistic regression, ANOVA, and chi-square tests on institutional records to surface the strongest retention drivers. Published findings as interactive Tableau dashboards for university advisors.",
    impact: "8 key factors identified · at-risk model achieved 82% recall enabling early intervention",
    stack: ["R", "SQL", "Tableau"],
    category: "Data Analysis" as const,
    date: "Jan 2024 · SFSU",
    github: "https://github.com/BAVISETTISAKETH",
  },
  {
    name: "Secure Coding & Application Security Framework",
    desc: "Implemented OWASP Top 10 mitigations across a Java Spring Boot application - OAuth 2.0 + JWT auth flows, bcrypt password hashing, parameterized queries against SQL injection, CSP headers, rate limiting, and automated ZAP scanning.",
    impact: "15+ critical CVEs remediated · zero critical findings in post-remediation ZAP audit",
    stack: ["Spring Boot", "Flask"],
    category: "Web Development" as const,
    date: "Aug – Dec 2023 · CSU Sacramento",
    github: "https://github.com/BAVISETTISAKETH",
  },
  {
    name: "Cryptocurrency Market Analysis & Prediction",
    desc: "Fetched 3 years of OHLCV data via yfinance for 10+ assets, built ARIMA and LSTM forecasting models, and validated with walk-forward backtesting. Delivered live Power BI dashboards showing rolling forecasts, volatility bands, and correlation heatmaps.",
    impact: "75% directional accuracy · LSTM outperformed ARIMA by 12% on high-volatility assets",
    stack: ["Python", "TensorFlow", "Power BI"],
    category: "Data Analysis" as const,
    date: "Jan – May 2023 · GITAM University",
    github: "https://github.com/BAVISETTISAKETH",
  },
  {
    name: "Movie Recommendation System",
    desc: "Hybrid recommender combining SVD-based matrix factorization (Surprise library) with cosine-similarity item-based filtering on 100K+ MovieLens ratings. Tuned with GridSearchCV and deployed as a Flask REST API.",
    impact: "78% user preference accuracy · <200ms recommendation latency via Flask endpoint",
    stack: ["Python", "Flask", "Scikit-learn"],
    category: "Machine Learning" as const,
    date: "Aug 2022 – May 2023 · GITAM University",
    github: "https://github.com/BAVISETTISAKETH",
  },
  {
    name: "Mental Health & Academic Stress Analysis",
    desc: "Designed a validated Likert-scale survey, collected 1,000+ undergrad responses, and ran Pearson correlation, paired t-tests, and multiple regression in R and SPSS to quantify stress-performance relationships. Findings informed university wellness policy.",
    impact: "r = 0.74 correlation confirmed between exam periods and anxiety · findings informed wellness policy",
    stack: ["R", "Tableau"],
    category: "Data Analysis" as const,
    date: "May 2021 – Sep 2022 · GITAM University",
    github: "https://github.com/BAVISETTISAKETH",
  },
  {
    name: "Automobile Market Analytics for Ford",
    desc: "Ran K-means clustering on 50K+ Ford transaction records to build behavioral customer segments, then used market basket analysis to uncover cross-sell affinities. Built DAX-powered Power BI dashboards for executive strategy reviews.",
    impact: "25% cross-sell uplift identified · dashboards adopted into Ford's quarterly planning cycle",
    stack: ["Python", "SQL", "Power BI"],
    category: "Data Analysis" as const,
    date: "May – Jun 2022 · Phoenix Global",
    github: "https://github.com/BAVISETTISAKETH",
  },
];

type Category = "All" | "Machine Learning" | "Data Analysis" | "Web Development";
const CATEGORIES: Category[] = ["All", "Machine Learning", "Data Analysis", "Web Development"];

const CATEGORY_COLOR: Record<string, string> = {
  "Machine Learning": "text-primary border-primary/40 bg-primary/10",
  "Data Analysis": "text-secondary border-secondary/40 bg-secondary/10",
  "Web Development": "text-accent border-accent/40 bg-accent/10",
};

const ROLES = [
  {
    co: "Red Lab - SFSU", role: "AI Product Manager & Analyst", time: "May 2026 - Present", loc: "San Francisco, CA",
    bullets: [
      "Lead product strategy and roadmap for 3 VR/AR research products, managing the full backlog in Jira, running sprint ceremonies, and keeping faculty stakeholders aligned to a 6-month delivery plan.",
      "Drive product discovery before any build kicks off by running user interviews, mapping pain points in Notion, and writing PRDs that make sure engineering only builds what's actually been validated.",
      "Set up and ran A/B experiments on AR/VR prototype UX flows, segmented results by user cohort in Power BI, and used those findings to decide what gets prioritized across 2 active product tracks.",
      "Own the team's product knowledge base across Confluence and Notion, keeping PRDs, story maps, release notes, and experiment logs all in one place so nothing gets lost in someone's inbox.",
      "Work daily with researchers, engineers, and designers, running standups and retros in Jira and keeping sprint commitments tight, which brought mid-sprint scope changes down by about 40%.",
      "Use AI tools like ChatGPT, Copilot, and Cursor throughout the product workflow from synthesizing user research to drafting requirements, cutting time-to-PRD by roughly 60%.",
    ],
  },
  {
    co: "San Francisco State Univ.", role: "Data Scientist, Graduate Research Asst.", time: "Jan 2024 - Dec 2025", loc: "San Francisco, CA",
    bullets: [
      "Designed and shipped ML pipelines for 3 concurrent faculty research projects covering student retention, academic performance prediction, and NLP-driven query resolution, keeping all models version-controlled and reproducible in documented Python notebooks.",
      "Built Python and SQL data pipelines processing 500K+ institutional records across 2 active studies, cutting data-prep turnaround from days to hours and directly supporting 2 faculty conference submissions.",
      "Served as Teaching Assistant for CSC 775 Databases and CSC 841 Computer Performance Evaluation, graded 60+ deliverables per semester and ran weekly office hours that consistently kept re-submission rates low each term.",
      "Applied ANOVA, chi-square, and multivariate logistic regression in R and Python across 1,000+ student survey responses, with findings feeding directly into an early-intervention framework adopted by the university advising office.",
      "Built Tableau and Power BI dashboards that translated dense research output into formats non-technical advisors and department heads could act on, with the student retention dashboard picked up as a live daily decision tool.",
      "Collaborated with 4 faculty members across Computer Science and Public Health on grant-aligned research, scoping open-ended questions into defined data problems with clear success metrics and handoff-ready documentation.",
    ],
  },
  {
    co: "NY State - Dept. of Health", role: "Data Analyst Intern", time: "Jul 2024 - Dec 2024", loc: "Albany, NY",
    bullets: [
      "Owned requirements for 25 public health KPIs across all 62 NY counties, writing UAT test cases and acceptance criteria that 3 engineering teams actually used.",
      "Built 15 governed SQL reporting views with full data-lineage docs, replacing one-off queries and giving DOH leadership a single place to trust the numbers.",
      "Wrote Python automation pipelines that brought weekly report turnaround from 6 hours down to 2, saving the team over 16 analyst hours every month.",
      "Reconciled 28M+ records across health databases, catching and fixing 40 data-quality issues per cycle that had been slipping through undetected.",
      "Put together data dictionaries and governance docs for 3 reporting domains, which cut the volume of clarification questions from stakeholders by about 35%.",
      "Ran cost-benefit analysis on 6 legacy workflows, flagged 2 strong automation candidates, and built the case for changes projected to save $30K a year.",
    ],
  },
  {
    co: "Conduira ED Tech", role: "Business Operations Analyst Trainee", time: "Aug 2022 - Jul 2023", loc: "Visakhapatnam, IN",
    bullets: [
      "Sat between Ops, Marketing, and Program Delivery as the requirements point person, turning 50+ stakeholder conversations into prioritized specs that teams actually signed off on.",
      "Built SQL and Python cohort models tracking student engagement and retention across 12-week programs, with findings shaping curriculum redesigns across 3 product lines.",
      "Automated Power BI dashboard refreshes and killed a 4-hour weekly manual process, cutting total reporting effort by 32% for the analytics team.",
      "Found and fixed 6 process inefficiencies that together saved $52K a year, with each one backed by a cost-benefit model before getting approved.",
      "Ran a data-quality audit across 200K+ student records, cleaned up 28% of the discrepancies, and wrote the cleansing standards the org adopted going forward.",
      "Sent weekly ops briefs to the VP of Operations with KPI trends translated into a ranked action list, and 4 of 6 recommendations were picked up and acted on within the quarter.",
    ],
  },
  {
    co: "Google", role: "Analytics Engineer (Marketing/Growth) Intern", time: "Jun 2022 - Aug 2022", loc: "Hyderabad, IN",
    bullets: [
      "Pulled together marketing analytics from 4 separate product lines into one Tableau dashboard suite that Finance and Growth leadership used in their weekly reviews.",
      "Built SQL pipelines handling 10M+ daily events, standardizing how attribution worked across paid, organic, and owned channels for the first time across the org.",
      "Worked with 6 cross-functional stakeholders to lock down 12 KPI definitions that everyone agreed on, ending metric disagreements that had been causing reporting problems for 2+ quarters.",
      "Did a media mix analysis on $50K in ad spend, spotted 2 channels underdelivering, and recommended a reallocation that drove a 2.3x ROAS improvement.",
      "Built a revenue attribution model tying campaign spend to pipeline that became the standard reporting setup for Q3 2022.",
      "Shared findings in 3 leadership business reviews and the audience segmentation recommendations made it into the next campaign cycle.",
    ],
  },
  {
    co: "Toylelo", role: "Product Manager", time: "May 2020 - Apr 2022", loc: "Hyderabad, IN",
    bullets: [
      "Ran the full D2C operation from scratch to $100K in revenue across 100+ SKUs in 18 months while keeping a 5-star average CSAT the whole way through.",
      "Grew the operations team from 12 to 40 people and held 95% SLA adherence across fulfillment, customer service, and vendor management throughout that growth.",
      "Built a JIT inventory system that cut stockouts by 20%, reduced excess inventory by 25%, and pushed fill rate up by 20% in the first quarter it ran.",
      "Negotiated with 8 suppliers and landed an average 15% cost reduction on raw materials while also pushing lead-time reliability from 72% up to 94%.",
      "Launched 3 product lines using a validate-first build-second process and all 3 hit break-even within 45 days of going live.",
      "Built a Power BI dashboard tracking 18 KPIs across inventory, fulfillment, and CSAT in real time, which the whole team started using as their daily reference.",
    ],
  },
];

const RECOMMENDATIONS = [
  {
    name: "Dr. Sanika Doolani",
    title: "Asst Professor at SFSU · Ex-Salesforce, Ex-Disney",
    relation: "Managed Sai Saketh directly",
    avatar: `${import.meta.env.BASE_URL}img/sanika.jpg`,
    linkedin: "https://www.linkedin.com/in/sanikadoolani/",
    text: "I had the pleasure of working with Saketh in my HCI course, where he served as a grader. From the beginning, he impressed me with his professionalism, reliability, and ability to evaluate student work with accuracy and fairness. His feedback was thoughtful and constructive, helping students refine their understanding of human-centered design principles. Beyond his technical expertise, he consistently managed grading deadlines, coordinated with teaching staff, and maintained quality across multiple assignments - demonstrating strong organizational skills, clear communication, and a natural aptitude for project management.\n\nEqually notable is Saketh's strong foundation in data-driven problem solving. With a background in databases, analytics, and applied AI, and a curiosity for connecting HCI with data science, he is well-prepared for roles in Data Science and Analytics. Combining technical expertise with leadership and analytical insight, Saketh is uniquely positioned to excel either as a Data Scientist driving innovation through data or as a Project Manager ensuring successful execution of complex initiatives. Any organization would find him to be an outstanding hire.",
  },
  {
    name: "Cayla Anderson",
    title: "Public Health Professional · Health Equity Researcher",
    relation: "Managed Sai Saketh directly",
    avatar: `${import.meta.env.BASE_URL}img/cayla.jpg`,
    linkedin: "https://www.linkedin.com/in/cayla-anderson-158309172/",
    text: "During his time as my student assistant, Sai supported my research through coding, data visualization, and survey analysis. His ability to take raw information and turn it into usable outputs was especially helpful for presenting results clearly.",
  },
  {
    name: "Joseph Hui",
    title: "Software Architect · CS Lecturer at SFSU",
    relation: "Managed Sai Saketh directly",
    avatar: `${import.meta.env.BASE_URL}img/joseph.jpg`,
    linkedin: "https://www.linkedin.com/in/joehui/",
    text: "I had the pleasure of teaching Saketh in CSC 775 – Introduction to Databases and CSC 841 – Computer Performance Evaluation. His dedication and mastery of the subject matter convinced me to hire him as my Teaching Assistant for both courses. In this role, Saketh consistently demonstrated a strong foundation in database and systems performance concepts and was especially committed to supporting students, often going the extra mile to help those with questions related to RDBMS and performance. His blend of technical expertise and genuine dedication to student success made a clear impact in the classroom.\n\nI was also very impressed with Saketh's knowledge of AI, which makes him a valuable asset to any team working at the intersection of AI and databases. He combines a solid grounding in core database principles with a forward-looking curiosity for how modern AI techniques can improve data management, query optimization, and large-scale analytics. Teams seeking someone who can connect deep technical knowledge with innovative applications of AI will find Saketh to be an exceptional contributor.",
  },
];

const BLOG_POSTS = [
  {
    title: "How Netflix Bet $100 Million on Data",
    date: "May 2025",
    readTime: "9 min read",
    tags: ["Product Analytics", "Case Study", "Data-Driven Decisions"],
    description: "How Netflix used behavioral signals from 27 million subscribers to greenlight House of Cards without filming a single pilot. A breakdown of the three signals, the confidence model, and the $100M bet that changed the industry.",
    href: `${import.meta.env.BASE_URL}blogs/netflix-house-of-cards.html`,
    stats: [
      { label: "Investment", value: "$100M" },
      { label: "Pilots Filmed", value: "0" },
      { label: "Trailer Versions", value: "10+" },
    ],
  },
];

const HERO_ROLES = [
  { text: "Business Analyst",           color: "#0984E3" },
  { text: "Data Analyst",               color: "#00CEC9" },
  { text: "Business Systems Analyst",   color: "#a78bfa" },
  { text: "Product Manager",            color: "#f59e0b" },
  { text: "Technical Program Manager",  color: "#34d399" },
];

function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  const role = HERO_ROLES[roleIdx];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (displayed.length < role.text.length) {
        t = setTimeout(() => setDisplayed(role.text.slice(0, displayed.length + 1)), 110);
      } else {
        t = setTimeout(() => setPhase("pausing"), 1600);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), 0);
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 55);
      } else {
        setRoleIdx(i => (i + 1) % HERO_ROLES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [phase, displayed, role.text]);

  return (
    <span className="inline-flex items-center gap-[2px] font-mono" style={{ color: role.color, minWidth: "25ch" }}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[0.85em] rounded-full align-middle"
        style={{ background: role.color }}
      />
    </span>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────

export function Portfolio() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 85, damping: 26, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 85, damping: 26, mass: 0.6 });
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -z-10 w-[400px] h-[400px] rounded-full blur-[80px] opacity-50 hidden md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", background: "radial-gradient(circle, oklch(0.55 0.24 274 / 0.55), transparent 70%)" }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 grid-bg" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-primary/25 blur-[140px] animate-liquid" />
        <div className="absolute top-1/3 -right-40 w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] rounded-full bg-secondary/30 blur-[130px] animate-liquid" style={{ animationDelay: "-6s" }} />
        <div className="absolute bottom-0 left-1/4 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-accent/20 blur-[140px] animate-liquid" style={{ animationDelay: "-12s" }} />
      </div>

      <ScrollProgress />
      <Nav />
      <div className="relative">
        <Hero />
        <MarqueeStrip />
      </div>
      <AboutMe />
      <BentoGrid />
      <Experience />
      <Projects />
      <Recommendations />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div style={{ scaleX, transformOrigin: "0%" }} className="fixed top-0 left-0 right-0 h-[2px] bg-grad-aurora z-[60]" />;
}

function Reveal({ children, delay = 0, y = 30, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ to, prefix = "", suffix = "", duration = 2 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => setVal(v) });
    return () => controls.stop();
  }, [inView, to, duration]);
  const formatted = to >= 1000 ? Math.round(val).toLocaleString() : val.toFixed(to % 1 === 0 ? 0 : 1);
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

function MagneticCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 24 });
  const sry = useSpring(ry, { stiffness: 140, damping: 24 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { rx.set(0); ry.set(0); }} style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }} className={`relative overflow-hidden rounded-3xl ${className}`}>
      {children}
    </motion.div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-2xl tracking-tight">Sai<span className="text-primary">.</span></a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition">Work</a>
          <a href="#experience" className="hover:text-foreground transition">Experience</a>
          <a href="#projects" className="hover:text-foreground transition">Projects</a>
          <a href="#recommendations" className="hover:text-foreground transition">Reviews</a>
          <a href="#blog" className="hover:text-foreground transition">Blog</a>
          <a href="#contact" className="hover:text-foreground transition">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} href="mailto:saisakethbavisetti@gmail.com" className="hidden sm:inline-flex text-sm px-4 py-2 rounded-full glass text-foreground hover:bg-primary/20 transition">
            Get in touch
          </motion.a>
          <button aria-label="Toggle menu" onClick={() => setOpen(o => !o)} className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center">
            <span className="block w-4 h-px bg-foreground relative before:content-[''] before:absolute before:w-4 before:h-px before:bg-foreground before:-top-1.5 after:content-[''] after:absolute after:w-4 after:h-px after:bg-foreground after:top-1.5" />
          </button>
        </div>
      </div>
      {open && (
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden glass-nav px-6 py-4 flex flex-col gap-3 text-sm" onClick={() => setOpen(false)}>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#recommendations">Reviews</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </motion.nav>
      )}
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} id="top" className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-20 sm:pt-24 pb-16 sm:pb-20 lg:pt-36 lg:pb-28">
      <motion.div style={{ y, opacity }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-muted-foreground mb-8">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            <span className="relative w-2 h-2 rounded-full bg-primary" />
          </span>
          Available for <TypewriterRole /> roles · <span className="text-grad-aurora">United States of America</span>
        </motion.div>
        <h1 className="font-display text-[clamp(2.25rem,9vw,8.5rem)] leading-[0.95] tracking-tighter">
          {["Translating", "ambiguity", "into", "systems", "that", "ship."].map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.2, 0.8, 0.2, 1] }} className={`inline-block mr-[0.25em] ${w === "ambiguity" ? "italic text-grad-aurora font-nohemi" : ""} ${w === "ship." ? "italic text-grad-aurora font-nohemi" : ""}`}>
              {w}
            </motion.span>
          ))}
        </h1>
        <div className="mt-8 sm:mt-10 grid lg:grid-cols-3 gap-6 sm:gap-8 items-end">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }} className="lg:col-span-2 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            I'm <span className="text-foreground">Sai Saketh Bavisetti</span> - a Business Analyst with 4+ years partnering with Finance, IT, and operations teams across <span className="text-foreground">Google</span>, <span className="text-foreground">NY State DOH</span>, and <span className="text-foreground">Conduira</span>. I scope requirements, govern reporting layers, and turn 28M+ records into decisions.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.05 }} className="flex flex-col gap-2 font-mono text-xs text-muted-foreground">
            <div className="flex justify-between border-b border-border/40 pb-2"><span>Based</span><span className="text-foreground">San Francisco, CA</span></div>
            <div className="flex justify-between border-b border-border/40 pb-2"><span>Focus</span><span className="text-foreground">BA · Data · AI</span></div>
            <div className="flex justify-between border-b border-border/40 pb-2"><span>MS</span><span className="text-foreground">Data Science, SFSU</span></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

const MARQUEE_ITEMS = ["SQL", "Python", "Tableau", "Snowflake", "BigQuery", "Databricks", "LangChain", "PySpark", "AWS", "Power BI"];

function MarqueeStrip() {
  return (
    <div className="sticky top-16 z-30 overflow-hidden border-y border-border/40 py-4 sm:py-5 relative bg-background/70 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background/70 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background/70 to-transparent z-10" />
      {/* 4 copies so -25% = exactly 1 copy of movement → seamless loop at any screen width */}
      <div className="flex animate-marquee" style={{ width: "max-content" }}>
        {Array.from({ length: 4 }).flatMap((_, ci) =>
          MARQUEE_ITEMS.map((t, i) => (
            <span
              key={`${ci}-${i}`}
              className="shrink-0 mr-16 font-display text-2xl sm:text-3xl lg:text-4xl text-muted-foreground/30 hover:text-accent transition whitespace-nowrap"
            >
              {t}<span className="text-accent/40 ml-16">/</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}

function AboutMe() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-24">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }} className="lg:col-span-5 relative">
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
            <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-grad-aurora opacity-40 blur-2xl animate-liquid" />
            <div aria-hidden className="absolute -inset-1 rounded-[1.75rem] bg-grad-aurora opacity-60 blur-md" />
            <div className="relative glass-strong rounded-[1.75rem] p-2 overflow-hidden specular">
              <img src={portrait} alt="Sai Saketh Bavisetti" loading="lazy" className="w-full h-full object-cover rounded-[1.5rem] aspect-square" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div className="rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-black bg-white/90 backdrop-blur-md border border-white/60">This is me</div>
                <div className="rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-black bg-white/90 backdrop-blur-md border border-white/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />Online
                </div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -8 }} whileInView={{ opacity: 1, scale: 1, rotate: -6 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl px-4 py-3 font-mono text-xs">
              <div className="text-accent">// hello</div>
              <div className="text-black">Sai Saketh</div>
            </motion.div>
          </div>
        </motion.div>
        <div className="lg:col-span-7">
          <Reveal><SectionLabel index="00" title="This is me" /></Reveal>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tighter mt-6">
            Analyst by craft, <span className="italic text-grad-aurora font-nohemi">builder</span> by instinct.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Currently in San Francisco, finishing my MS in Data Science at SFSU. I love the messy middle - sitting between stakeholders and engineers, untangling intent into models, dashboards, and decisions teams actually trust.
          </motion.p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
            {[{ k: "Years", v: "4+" }, { k: "Teams", v: "Google · DOH" }, { k: "Stack", v: "SQL · Py · BI" }].map((s) => (
              <div key={s.k} className="glass rounded-2xl p-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
                <div className="font-display text-lg mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoGrid() {
  return (
    <section id="work" className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-12 sm:py-16">
      <Reveal><SectionLabel index="01" title="Selected impact" /></Reveal>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-4 mt-10">
        <Cell className="md:col-span-2 lg:col-span-2 row-span-2 bg-grad-aurora text-primary-foreground p-8 flex flex-col justify-between noise-overlay">
          <div className="font-mono text-xs uppercase tracking-widest opacity-80">Records reconciled</div>
          <div>
            <div className="font-display text-7xl lg:text-8xl leading-none"><Counter to={28} />M+</div>
            <p className="mt-3 text-sm opacity-90 max-w-xs">Cross-system tie-outs at NY State DOH - flagged 40 recurring data-quality incidents per cycle.</p>
          </div>
        </Cell>
        <Cell className="glass p-6 flex flex-col justify-between">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Turnaround</div>
          <div><div className="font-display text-5xl">6h → 2h</div><p className="text-xs text-muted-foreground mt-2">Python pipelines, legacy workflow modernization.</p></div>
        </Cell>
        <Cell className="glass p-6 flex flex-col justify-between">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Annualized savings</div>
          <div><div className="font-display text-5xl text-grad-aurora"><Counter to={52} prefix="$" suffix="K" /></div><p className="text-xs text-muted-foreground mt-2">SQL workflow improvements at Conduira.</p></div>
        </Cell>
        <Cell className="md:col-span-2 glass p-6 flex flex-col justify-between">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">D2C scale</div>
          <div><div className="font-display text-4xl">0 → <Counter to={100} prefix="$" suffix="K" /> revenue</div><p className="text-xs text-muted-foreground mt-2">100+ SKUs · 5-star CSAT · 40-person ops team at 95% SLA.</p></div>
        </Cell>
        <Cell className="glass p-6 flex flex-col justify-between">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">KPIs scoped</div>
          <div><div className="font-display text-5xl"><Counter to={25} /></div><p className="text-xs text-muted-foreground mt-2">Across 62 NY regions, Finance + Ops.</p></div>
        </Cell>
        <Cell className="glass p-6 flex flex-col justify-between">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">ROAS</div>
          <div><div className="font-display text-5xl"><Counter to={2.3} />×</div><p className="text-xs text-muted-foreground mt-2">On $50K media spend, 25% conversion lift.</p></div>
        </Cell>
        <Cell className="md:col-span-2 lg:col-span-2 p-6 glass flex flex-col justify-between">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Toolbox</div>
          <div className="flex flex-wrap gap-2 mt-3">
            {["SQL", "Python", "PySpark", "Tableau", "Power BI", "Snowflake", "BigQuery", "Databricks", "AWS", "Jira", "Agile/SCRUM", "LangChain"].map(t => <TechChip key={t} name={t} />)}
          </div>
        </Cell>
      </motion.div>
    </section>
  );
}

function Cell({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } } }}
      whileHover={{ y: -6, scale: 1.01, transition: { type: "spring", stiffness: 260, damping: 22 } }}
      className={`group relative overflow-hidden rounded-3xl ${className}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.62 0.19 244 / 0.25), transparent 60%)" }} />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}

// ─── Experience - tab-based ───────────────────────────────────────────────────

function Experience() {
  const [active, setActive] = useState(0);
  const role = ROLES[active];

  return (
    <section id="experience" className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-24">
      <Reveal><SectionLabel index="02" title="Where I've worked" /></Reveal>

      <div className="mt-10 grid lg:grid-cols-[280px_1fr] gap-4 sm:gap-6">
        {/* Company tab list */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {ROLES.map((r, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileTap={{ scale: 0.97 }}
              className={`shrink-0 lg:shrink-0 text-left px-4 py-3 rounded-2xl transition-all duration-300 border ${
                active === i
                  ? "glass-strong border-primary/50 shadow-[0_0_20px_oklch(0.62_0.19_244/0.15)]"
                  : "border-transparent hover:border-white/10 hover:bg-white/5"
              }`}
            >
              <div className={`font-mono text-[10px] tracking-widest ${active === i ? "text-primary" : "text-muted-foreground/50"}`}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className={`font-display text-sm leading-tight mt-1 ${active === i ? "text-foreground" : "text-muted-foreground"}`}>
                {r.co}
              </div>
              <div className={`font-mono text-[10px] mt-0.5 ${active === i ? "text-muted-foreground" : "text-muted-foreground/40"}`}>
                {r.time.split("-")[0].trim()}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.article
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="glass rounded-3xl p-7 sm:p-10 relative overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="absolute -top-28 -right-28 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 relative">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl leading-tight">{role.co}</h3>
                <div className="text-secondary font-mono text-sm mt-1.5">{role.role}</div>
              </div>
              <div className="font-mono text-xs text-muted-foreground text-right shrink-0">
                <div className="text-foreground/80">{role.time}</div>
                <div className="mt-0.5">{role.loc}</div>
              </div>
            </div>

            {/* Bullets */}
            <ul className="mt-8 space-y-4 relative">
              {role.bullets.map((b, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: j * 0.08, duration: 0.4 }}
                  className="flex gap-3 text-muted-foreground"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="leading-relaxed">{b}</span>
                </motion.li>
              ))}
            </ul>

            {/* Progress dots */}
            <div className="flex gap-2 mt-8 relative">
              {ROLES.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"}`} aria-label={`Go to ${ROLES[i].co}`} />
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  const [filter, setFilter] = useState<Category>("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-24">
      <Reveal><SectionLabel index="03" title="Things I've built" /></Reveal>

      {/* Filter tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat}
            onClick={() => setFilter(cat)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-200 border ${
              filter === cat
                ? "glass-strong text-foreground border-primary/40"
                : "border-border/40 text-muted-foreground hover:text-foreground hover:border-white/20"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div
        layout
        className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.name}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <MagneticCard className="group glass h-full flex flex-col p-7 transition-colors duration-500">
                <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category + date */}
                <div className="flex items-center justify-between gap-2 relative">
                  <span className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${CATEGORY_COLOR[p.category]}`}>
                    {p.category}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0">{p.date}</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl mt-4 leading-tight relative">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed relative flex-1">{p.desc}</p>

                {/* Impact */}
                <div className="mt-4 font-mono text-[11px] text-secondary/90 bg-secondary/5 border border-secondary/20 rounded-xl px-3 py-2 relative">
                  ✓ {p.impact}
                </div>

                {/* Stack chips */}
                <div className="flex flex-wrap gap-1.5 mt-4 relative">
                  {p.stack.map(s => <TechChip key={s} name={s} />)}
                </div>

                {/* GitHub link */}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors group/gh relative"
                >
                  {GH_ICON}
                  <span className="group-hover/gh:underline underline-offset-4">View on GitHub</span>
                  <span className="ml-auto opacity-0 group-hover/gh:opacity-100 transition-opacity">↗</span>
                </a>
              </MagneticCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// ─── Recommendations ──────────────────────────────────────────────────────────

function Recommendations() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  return (
    <section id="recommendations" className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-24">
      <Reveal><SectionLabel index="04" title="What people say" /></Reveal>
      <Reveal delay={0.05}>
        <p className="mt-3 text-sm text-muted-foreground font-mono">Recommendations from managers and professors - verified on LinkedIn</p>
      </Reveal>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {RECOMMENDATIONS.map((rec, i) => {
          const isLong = rec.text.length > 280;
          const isOpen = expanded[i];
          const displayText = isLong && !isOpen ? rec.text.slice(0, 280).trim() + "…" : rec.text;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="glass rounded-3xl p-7 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quote mark */}
              <div className="font-display text-5xl text-primary/40 leading-none select-none">&ldquo;</div>

              {/* Text */}
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed whitespace-pre-line flex-1 relative">
                {displayText}
              </p>
              {isLong && (
                <button
                  onClick={() => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))}
                  className="mt-3 font-mono text-xs text-primary hover:text-primary/80 transition text-left relative"
                >
                  {isOpen ? "Show less ↑" : "Read more ↓"}
                </button>
              )}

              {/* Divider */}
              <div className="mt-5 h-px bg-border/40 relative" />

              {/* Author */}
              <div className="mt-4 flex items-center gap-3 relative">
                <img
                  src={rec.avatar}
                  alt={rec.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm leading-tight">{rec.name}</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-0.5 truncate">{rec.title}</div>
                  <div className="font-mono text-[10px] text-muted-foreground/60">{rec.relation}</div>
                </div>
                <a
                  href={rec.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass font-mono text-[10px] text-muted-foreground hover:text-foreground transition"
                  aria-label={`View ${rec.name} on LinkedIn`}
                >
                  {LI_ICON}
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function Blog() {
  return (
    <section id="blog" className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-20 sm:py-32">
      <Reveal><SectionLabel index="05" title="Writing" /></Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tighter mt-6 mb-4">
          Thinking out loud
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mb-14">
          Case studies and breakdowns where data, product, and business decisions intersect.
        </p>
      </Reveal>
      <div className="grid gap-8 lg:grid-cols-2">
        {BLOG_POSTS.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.1}>
            <MagneticCard className="h-full">
              <a
                href={post.href}
                className="group flex flex-col h-full glass-strong rounded-3xl p-8 hover:border-primary/40 transition-all duration-300 border border-transparent"
              >
                {/* Stats bar */}
                <div className="flex gap-6 mb-7">
                  {post.stats.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <span className="font-display text-2xl font-semibold text-foreground">{s.value}</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl sm:text-3xl leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 mb-4">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full glass text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-border/40">
                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="text-border">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="font-mono text-xs text-primary flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                    Read case study
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
            </MagneticCard>
          </Reveal>
        ))}

        {/* Coming soon card */}
        <Reveal delay={0.15}>
          <div className="flex flex-col items-center justify-center glass rounded-3xl p-8 border border-dashed border-border/40 min-h-[320px]">
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <p className="font-display text-xl text-muted-foreground/60 text-center">More coming soon</p>
            <p className="font-mono text-xs text-muted-foreground/40 mt-2 text-center">Next: Spotify's Discover Weekly</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function LinkedInBadge() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="badge-base LI-profile-badge"
      data-locale="en_US"
      data-size="large"
      data-theme="dark"
      data-type="HORIZONTAL"
      data-vanity="sai-saketh-bavisetti"
      data-version="v1"
    >
      <a
        className="badge-base__link LI-simple-link"
        href="https://www.linkedin.com/in/sai-saketh-bavisetti?trk=profile-badge"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sai Saketh Bavisetti
      </a>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-20 sm:py-32">
      <Reveal><SectionLabel index="05" title="Let's talk" /></Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 rounded-3xl bg-grad-aurora p-8 sm:p-10 lg:p-16 noise-overlay relative overflow-hidden shadow-elevated">
          <div aria-hidden className="absolute -top-1/2 -right-1/3 w-[700px] h-[700px] rounded-full bg-white/10 blur-3xl" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[0.95] text-primary-foreground max-w-3xl relative">
            Have a problem worth <span className="italic">scoping</span>?
          </h2>
          <p className="mt-6 text-primary-foreground/85 max-w-xl text-base sm:text-lg relative">
            I'm actively looking for Business Analyst roles where requirements are messy, stakeholders are many, and data is the only honest broker.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 sm:gap-4 relative">
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="mailto:saisakethbavisetti@gmail.com" className="px-5 sm:px-6 py-3 rounded-full glass-strong text-foreground font-medium text-sm sm:text-base">
              saisakethbavisetti@gmail.com
            </motion.a>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="tel:+12792003308" className="px-5 sm:px-6 py-3 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition text-sm sm:text-base">
              +1 (279) 200-3308
            </motion.a>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.15} className="mt-10 flex justify-center">
        <LinkedInBadge />
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 mt-10 safe-bottom">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
        <div>© 2026 Sai Saketh Bavisetti</div>
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/sai-saketh-bavisetti/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">LinkedIn</a>
          <a href="https://github.com/BAVISETTISAKETH" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">GitHub</a>
          <a href="#contact" className="hover:text-foreground transition">Email</a>
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-6 border-b border-border/40 pb-4">
      <span className="font-mono text-xs text-primary tracking-widest">{index}</span>
      <h2 className="font-display text-3xl lg:text-4xl">{title}</h2>
    </div>
  );
}
