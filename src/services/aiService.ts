import { portfolioData } from '../data/portfolioData';

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action?: { label: string; link: string };
  suggestedQuestions?: string[];
}

interface IntentResult {
  text: string;
  action?: { label: string; link: string };
  suggestedQuestions: string[];
}

export async function askHarshAI(query: string): Promise<IntentResult> {
  const rawQuery = query.trim();
  const normalized = rawQuery.toLowerCase();

  // Artificial short neural thinking latency for realistic AI UX
  await new Promise((resolve) => setTimeout(resolve, 350));

  // --- 1. GREETINGS & INTRODUCTIONS ---
  if (
    /^(hi|hello|hey|hola|greetings|good morning|good afternoon|good evening|who are you|what can you do|help)/i.test(
      normalized
    ) ||
    normalized === 'hi' ||
    normalized === 'hello' ||
    normalized === 'hey'
  ) {
    return {
      text: `👋 **Hello! I am Harsh's AI Portfolio Assistant.**\n\nI am connected directly to Harsh's verified portfolio intelligence database. I can provide detailed insights into:\n\n• 🚀 **AI/ML & Full-Stack Projects** (Healthcare AI, Twitter Sentiment, Facial Attendance, Speech AI)\n• 🧠 **Technical Skills & Stack** (Python, React.js, Deep Learning, OpenCV, Node.js, MongoDB)\n• 🎓 **Education & Certifications** (B.Tech at UIT / AKTU, IIIT Allahabad ML Certification)\n• 📬 **Contact & Hiring Information** (Email, Phone, LinkedIn, Resume)\n\nWhat would you like to explore first?`,
      action: { label: 'Explore Projects', link: '#projects' },
      suggestedQuestions: [
        'What projects has Harsh built?',
        'What are his core AI skills?',
        'Tell me about his healthcare project.',
        'How can I contact Harsh?',
      ],
    };
  }

  // --- 2. RESUME & CV DOWNLOAD ---
  if (
    normalized.includes('resume') ||
    normalized.includes('cv') ||
    normalized.includes('download resume') ||
    normalized.includes('curriculum vitae')
  ) {
    return {
      text: `📄 **Harsh Shukla's Official Resume**\n\nYou can download Harsh's verified PDF resume directly. It includes his complete academic background, technical competencies in AI/ML & Web Development, production project case studies, and IIIT Allahabad certifications.\n\n• **Format:** PDF Document\n• **Status:** Updated & Verified for 2026 Opportunities\n• **Roles Open For:** AI/ML Engineer, Full Stack Developer, Data Scientist Intern/Full-Time`,
      action: { label: '📥 Download Resume (PDF)', link: '/Harsh_Shukla_Resume.pdf' },
      suggestedQuestions: [
        'What projects has Harsh built?',
        'What are his core AI skills?',
        'How can I contact Harsh?',
      ],
    };
  }

  // --- 3. CONTACT & HIRING ---
  if (
    normalized.includes('contact') ||
    normalized.includes('hire') ||
    normalized.includes('email') ||
    normalized.includes('phone') ||
    normalized.includes('call') ||
    normalized.includes('whatsapp') ||
    normalized.includes('reach') ||
    normalized.includes('linkedin') ||
    normalized.includes('github') ||
    normalized.includes('opportunity') ||
    normalized.includes('freelance') ||
    normalized.includes('internship') ||
    normalized.includes('job')
  ) {
    return {
      text: `📬 **Contact & Hiring Channels for Harsh Shukla**\n\nHarsh is currently **open for Internships and Full-Time Roles** as an AI/ML Engineer or Full-Stack Developer.\n\n• 📧 **Email:** [shuklaharsh0207@gmail.com](mailto:shuklaharsh0207@gmail.com)\n• 📱 **Phone / WhatsApp:** [+91 86018 45515](tel:+918601845515)\n• 💼 **LinkedIn:** [linkedin.com/in/harshshukla110724](https://linkedin.com/in/harshshukla110724)\n• 🐙 **GitHub:** [github.com/Harshshukla49](https://github.com/Harshshukla49)\n• 📍 **Location:** India (Available for Remote, Hybrid & On-Site)\n\nFeel free to send a message directly using the portfolio contact form!`,
      action: { label: '✉️ Send Message via Contact Form', link: '#contact' },
      suggestedQuestions: [
        'What projects has Harsh built?',
        'What are his core AI skills?',
        'Where can I download his resume?',
      ],
    };
  }

  // --- 4. SPECIFIC PROJECT DEEP-DIVES ---

  // Project 1: Smart Healthcare
  if (
    normalized.includes('health') ||
    normalized.includes('medical') ||
    normalized.includes('patient') ||
    normalized.includes('doctor') ||
    normalized.includes('telemetry') ||
    normalized.includes('hospital')
  ) {
    const proj = portfolioData.projects[0];
    return {
      text: `🏥 **${proj.title}**\n*Category: ${proj.category}*\n\n${proj.description}\n\n**Key Highlights & Architecture:**\n• ⚡ **Real-Time Telemetry:** Low-latency (<100ms) synchronization of patient vitals.\n• 👨‍⚕️ **Dual Portals:** Dedicated role-based interfaces for doctors and patients with dynamic graphing.\n• 🧠 **AI Anomaly Detection:** Predictive risk scoring engine alerting physicians to critical health score deviations.\n• 🛠️ **Tech Stack:** ${proj.tech.join(', ')}\n• 🌐 **Deployment:** Hosted live on Render Cloud!`,
      action: { label: '🚀 Open Live Healthcare Demo', link: proj.liveUrl || 'https://smart-health-rontend.onrender.com' },
      suggestedQuestions: [
        'Tell me about his Twitter Sentiment project.',
        'Tell me about his Face Recognition project.',
        'What other projects has Harsh built?',
      ],
    };
  }

  // Project 2: Twitter Sentiment Analysis
  if (
    normalized.includes('twitter') ||
    normalized.includes('sentiment') ||
    normalized.includes('tweet') ||
    normalized.includes('nlp project') ||
    normalized.includes('nltk')
  ) {
    const proj = portfolioData.projects[1];
    return {
      text: `📊 **${proj.title}**\n*Category: ${proj.category}*\n\n${proj.description}\n\n**Technical Breakthroughs:**\n• 📈 **+12% Accuracy Gain:** Custom NLP text cleaning, stopword removal, lemmatization, and TF-IDF feature extraction.\n• 🐦 **1,000+ Tweets Ingestion:** Streamlined live pipeline integrating Twitter API for real-time sentiment polarity categorization.\n• 🖥️ **Interactive UI:** Deployed on Streamlit for instant sentiment prediction and interactive probability metrics.\n• 🛠️ **Tech Stack:** ${proj.tech.join(', ')}`,
      action: { label: '📂 View Project on GitHub', link: proj.githubUrl || 'https://github.com/Harshshukla49' },
      suggestedQuestions: [
        'Tell me about his Face Recognition project.',
        'Tell me about his Speech Emotion project.',
        'What are his core AI skills?',
      ],
    };
  }

  // Project 3: Face Recognition Attendance
  if (
    normalized.includes('face') ||
    normalized.includes('attendance') ||
    normalized.includes('biometric') ||
    normalized.includes('facial') ||
    normalized.includes('haar')
  ) {
    const proj = portfolioData.projects[2];
    return {
      text: `👁️ **${proj.title}**\n*Category: ${proj.category}*\n\n${proj.description}\n\n**Core Innovations:**\n• 🎯 **90% Recognition Accuracy:** Multi-scale facial landmark extraction and biometric face embedding matching.\n• ⏳ **85% Manual Effort Reduction:** Replaced manual roll-calls with autonomous real-time webcam verification.\n• 🗄️ **Local SQLite Logging:** High-speed desktop GUI built in Tkinter with automated CSV attendance exports.\n• 🛠️ **Tech Stack:** ${proj.tech.join(', ')}`,
      action: { label: '📂 View Project on GitHub', link: proj.githubUrl || 'https://github.com/Harshshukla49' },
      suggestedQuestions: [
        'Tell me about his Speech Emotion Recognition project.',
        'Tell me about his Smart Healthcare project.',
        'What are his core AI skills?',
      ],
    };
  }

  // Project 5: Speech Emotion Recognition
  if (
    normalized.includes('speech') ||
    normalized.includes('emotion') ||
    normalized.includes('audio') ||
    normalized.includes('voice') ||
    normalized.includes('acoustic') ||
    normalized.includes('mfcc')
  ) {
    const proj = portfolioData.projects[4];
    return {
      text: `🎙️ **${proj.title}**\n*Category: ${proj.category}*\n\n${proj.description}\n\n**Neural Architecture:**\n• 🧠 **Hybrid CNN + LSTM:** 1D CNN layers extract spatial acoustic frequency patterns, while LSTM cells capture temporal pitch modulation.\n• 📈 **85% Emotion Accuracy:** Utilizes Mel-Frequency Cepstral Coefficients (MFCCs) for high-fidelity audio spectral processing.\n• 🔊 **Multi-Class Output:** Classifies emotional nuances including happiness, sadness, anger, neutrality, and distress.\n• 🛠️ **Tech Stack:** ${proj.tech.join(', ')}`,
      action: { label: '📂 View Project on GitHub', link: proj.githubUrl || 'https://github.com/Harshshukla49' },
      suggestedQuestions: [
        'Tell me about his Smart Healthcare project.',
        'What are his core AI skills?',
        'What certifications does Harsh have?',
      ],
    };
  }

  // Project 4: Murder Mystery Detective Game
  if (
    normalized.includes('mystery') ||
    normalized.includes('detective') ||
    normalized.includes('game') ||
    normalized.includes('murder')
  ) {
    const proj = portfolioData.projects[3];
    return {
      text: `🕵️ **${proj.title}**\n*Category: ${proj.category}*\n\n${proj.description}\n\n**Engineering Details:**\n• 🎮 **Branching Narrative Engine:** State machine tracking dynamic clue unlocks and player deductions.\n• ⚡ **Optimized Database:** Fast parameterized SQLite queries ensuring zero-lag state transitions.\n• 🔐 **Secure REST APIs:** Full-stack Express.js backend with user authentication and progress persistence.\n• 🛠️ **Tech Stack:** ${proj.tech.join(', ')}`,
      action: { label: '📂 View Project on GitHub', link: proj.githubUrl || 'https://github.com/Harshshukla49' },
      suggestedQuestions: [
        'What projects has Harsh built?',
        'What are his core AI skills?',
        'How can I contact Harsh?',
      ],
    };
  }

  // --- 5. ALL PROJECTS OVERVIEW ---
  if (
    normalized.includes('project') ||
    normalized.includes('built') ||
    normalized.includes('portfolio') ||
    normalized.includes('work') ||
    normalized.includes('application') ||
    normalized.includes('showcase')
  ) {
    return {
      text: `🚀 **Harsh Shukla's Featured Projects (5 Total):**\n\n1. 🏥 **Smart Healthcare Remote Monitoring System**\n   *Real-time patient telemetry, doctor portals & AI risk predictions (<100ms latency).*\n   • *Stack:* React.js, Node.js, Firebase, ML, Tailwind CSS\n   • *Live Demo:* [smart-health-rontend.onrender.com](https://smart-health-rontend.onrender.com)\n\n2. 📊 **Twitter Sentiment Analysis Platform**\n   *Processed 1,000+ tweets via NLTK/TF-IDF with +12% accuracy boost & Streamlit dashboard.*\n   • *Stack:* Python, NLP, Scikit-Learn, NLTK, Streamlit\n\n3. 👁️ **Face Recognition Attendance System**\n   *Biometric webcam attendance with 90% accuracy, cutting manual effort by 85%.*\n   • *Stack:* Python, OpenCV, Haar Cascades, Tkinter, SQLite\n\n4. 🎙️ **Speech Emotion Recognition System**\n   *Deep learning CNN + LSTM acoustic classifier achieving 85% accuracy using MFCCs.*\n   • *Stack:* Python, CNN, LSTM, MFCC, Scikit-Learn\n\n5. 🕵️ **Murder Mystery Detective Game**\n   *Interactive detective story web app with authentication & optimized SQLite queries.*\n   • *Stack:* Node.js, Express.js, SQLite, JavaScript\n\nClick below to view interactive case studies with architecture breakdowns!`,
      action: { label: '📂 Explore Projects Section', link: '#projects' },
      suggestedQuestions: [
        'Tell me about his healthcare project.',
        'What are his core AI skills?',
        'Tell me about his speech emotion project.',
        'How can I contact Harsh?',
      ],
    };
  }

  // --- 6. AI & MACHINE LEARNING SKILLS ---
  if (
    normalized.includes('ai skill') ||
    normalized.includes('ml skill') ||
    normalized.includes('machine learning') ||
    normalized.includes('deep learning') ||
    normalized.includes('neural') ||
    normalized.includes('computer vision') ||
    normalized.includes('nlp') ||
    normalized.includes('data science')
  ) {
    return {
      text: `🧠 **Harsh's AI, Machine Learning & Data Science Expertise:**\n\n• 🤖 **Machine Learning (92%):** Supervised/unsupervised algorithms, Scikit-learn, regression, classification, clustering, hyperparameter tuning.\n• 🧬 **Deep Learning & Neural Nets (86%):** CNNs for computer vision, RNNs/LSTMs for sequential and acoustic audio data, PyTorch/TensorFlow principles.\n• 👁️ **Computer Vision (89%):** OpenCV, Haar Cascades, facial landmark detection, real-time webcam video stream processing.\n• 📝 **NLP & Text Mining (88%):** NLTK, TF-IDF vectorization, tokenization, lemmatization, sentiment polarity classification.\n• 📊 **Data Science & Analytics (90%):** Pandas, NumPy, Exploratory Data Analysis (EDA), data cleaning, feature engineering.\n• 📜 **Certified by IIIT Allahabad** in Machine Learning & Neural Networks!`,
      action: { label: '⚡ View Full Tech Stack', link: '#skills' },
      suggestedQuestions: [
        'What projects has Harsh built?',
        'What are his web development skills?',
        'Tell me about his certifications.',
        'How can I contact Harsh?',
      ],
    };
  }

  // --- 7. WEB DEVELOPMENT & FULL STACK SKILLS ---
  if (
    normalized.includes('web') ||
    normalized.includes('frontend') ||
    normalized.includes('backend') ||
    normalized.includes('full stack') ||
    normalized.includes('react') ||
    normalized.includes('node') ||
    normalized.includes('express') ||
    normalized.includes('mern')
  ) {
    return {
      text: `💻 **Harsh's Full-Stack Web Development Stack:**\n\n• ⚛️ **Frontend Engineering:** React.js (92%), Tailwind CSS (95%), HTML5 & Modern CSS3, responsive glassmorphism, Framer Motion animations.\n• ⚙️ **Backend & APIs:** Node.js (88%), Express.js (90%), Flask (84%), RESTful API design, middleware authentication, CRUD pipelines.\n• 🗄️ **Databases & Cloud:** MongoDB (90%), MySQL (86%), Firebase Cloud Firestore (85%), Supabase (80%), SQLite (85%)\n• 🛠️ **Dev Tools:** Git & GitHub (94%), Postman (90%), VS Code (96%), Render Cloud deployment.\n• 🏆 **GDG Top 5 Ranking:** Awarded Top 5 in GDG On Campus Web Development Competition!`,
      action: { label: '⚡ View Full Tech Stack', link: '#skills' },
      suggestedQuestions: [
        'What projects has Harsh built?',
        'What are his core AI skills?',
        'Tell me about his healthcare project.',
        'How can I contact Harsh?',
      ],
    };
  }

  // --- 8. ALL SKILLS & TECH STACK ---
  if (
    normalized.includes('skill') ||
    normalized.includes('technolog') ||
    normalized.includes('stack') ||
    normalized.includes('language') ||
    normalized.includes('programming') ||
    normalized.includes('tool') ||
    normalized.includes('database') ||
    normalized.includes('know')
  ) {
    return {
      text: `⚡ **Harsh Shukla's Comprehensive Technical Stack:**\n\n• 🔤 **Languages:** Python (95%), C++ (85%), JavaScript (90%), SQL (88%)\n• 🧠 **AI & ML:** Machine Learning (92%), Deep Learning (86%), OpenCV (89%), NLP / NLTK (88%), Scikit-Learn (92%), Pandas/NumPy (90%)\n• ⚛️ **Frontend:** React.js (92%), Tailwind CSS (95%), HTML5/CSS3 (95%)\n• ⚙️ **Backend:** Node.js (88%), Express.js (90%), Flask (84%), REST APIs (92%)\n• 🗄️ **Databases:** MongoDB (90%), MySQL (86%), Firebase (85%), Supabase (80%), SQLite (85%)\n• 🛠️ **Tools & Core CS:** Git, GitHub, Postman, VS Code, DSA, OOP, DBMS, OS`,
      action: { label: '⚡ View Skills Section', link: '#skills' },
      suggestedQuestions: [
        'What projects has Harsh built?',
        'Tell me about his healthcare project.',
        'What certifications does Harsh have?',
        'How can I contact Harsh?',
      ],
    };
  }

  // --- 9. EDUCATION & ACADEMICS ---
  if (
    normalized.includes('education') ||
    normalized.includes('college') ||
    normalized.includes('university') ||
    normalized.includes('uit') ||
    normalized.includes('aktu') ||
    normalized.includes('degree') ||
    normalized.includes('btech') ||
    normalized.includes('b.tech') ||
    normalized.includes('study') ||
    normalized.includes('studied') ||
    normalized.includes('cgpa') ||
    normalized.includes('school') ||
    normalized.includes('academic')
  ) {
    return {
      text: `🎓 **Harsh Shukla's Educational Background:**\n\n1. 🏛️ **B.Tech in Computer Science & Engineering (AI & ML)**\n   • **Institution:** United Institute of Technology (UIT)\n   • **Affiliation:** Dr. APJ Abdul Kalam Technical University (AKTU)\n   • **Duration:** 2023 - 2027 (Expected Graduation)\n   • **Focus Areas:** Artificial Intelligence, Machine Learning, Deep Learning, Data Structures & Algorithms, Full Stack Development.\n\n2. 🏫 **Intermediate (12th Grade) — CBSE Board (2021)**\n   • **School:** Green View Public School\n   • **Stream:** Science & Mathematics\n\n3. 🏫 **High School (10th Grade) — CBSE Board (2019)**\n   • **School:** G.D Memorial Children’s Academy\n\n🏐 **Extra-Curricular:** Active member of the College Volleyball Team (teamwork & leadership).`,
      action: { label: '🏆 View Timeline & Education', link: '#milestones' },
      suggestedQuestions: [
        'What certifications does Harsh have?',
        'What projects has Harsh built?',
        'How can I contact Harsh?',
      ],
    };
  }

  // --- 10. CERTIFICATIONS & ACHIEVEMENTS ---
  if (
    normalized.includes('certificat') ||
    normalized.includes('achievement') ||
    normalized.includes('award') ||
    normalized.includes('iiit') ||
    normalized.includes('allahabad') ||
    normalized.includes('gdg') ||
    normalized.includes('ideathon') ||
    normalized.includes('milestone') ||
    normalized.includes('recognition')
  ) {
    return {
      text: `🏆 **Verified Certifications & Recognitions:**\n\n1. 📜 **Machine Learning and Neural Networks Certification**\n   • *Issued by:* **IIIT Allahabad** (July 2025)\n   • *Focus:* Deep neural architectures, backpropagation, and applied ML algorithms.\n\n2. 📜 **Python for Data Science Certification**\n   • *Issued by:* **United Institute of Technology (UIT)** (August 2024)\n   • *Focus:* NumPy, Pandas dataframes, Matplotlib visualization, and data wrangling.\n\n3. 🥇 **GDG Web Development Quiz (Top 5 Ranking)**\n   • *Issued by:* **GDG On Campus UIT** (July 2025)\n   • *Recognition:* Ranked in the Top 5 top performers across web concepts and JavaScript.\n\n4. 📜 **Data Science Course Certification**\n   • *Issued by:* **Code With Harry** (March 2026)\n   • *Focus:* End-to-end data science lifecycle, EDA, and model deployment.\n\n5. 💡 **Ideathon Participation Certificate**\n   • *Issued by:* **E-Cell UIT & United Incubation Hub**\n   • *Focus:* Tech innovation and rapid prototyping.`,
      action: { label: '🏆 View Milestones Section', link: '#milestones' },
      suggestedQuestions: [
        'What projects has Harsh built?',
        'What are his core AI skills?',
        'What is his educational background?',
        'How can I contact Harsh?',
      ],
    };
  }

  // --- 11. INDIVIDUAL SKILL QUERIES (Python, React, C++, OpenCV, etc.) ---
  const specificSkillQueries: { [key: string]: { name: string; level: number; desc: string; projs: string } } = {
    python: {
      name: 'Python',
      level: 95,
      desc: 'Harsh’s primary programming language for AI/ML, OpenCV computer vision pipelines, audio deep learning models, and automation.',
      projs: 'Smart Healthcare, Twitter Sentiment Analysis, Face Recognition Attendance, Speech Emotion Recognition.',
    },
    react: {
      name: 'React.js',
      level: 92,
      desc: 'Harsh builds responsive, interactive user interfaces with modern React hooks, state management, and component architecture.',
      projs: 'Smart Healthcare Remote Monitoring System, Portfolio UI.',
    },
    opencv: {
      name: 'OpenCV & Computer Vision',
      level: 89,
      desc: 'Harsh specializes in real-time camera feed ingestion, Haar cascade multi-scale face detection, and biometric embedding matching.',
      projs: 'Face Recognition Attendance Monitoring System (90% accuracy).',
    },
    'c++': {
      name: 'C++',
      level: 85,
      desc: 'Used for rigorous algorithmic problem solving, Data Structures & Algorithms (DSA), and high-performance computation.',
      projs: 'Core DSA implementations and competitive programming.',
    },
    cpp: {
      name: 'C++',
      level: 85,
      desc: 'Used for rigorous algorithmic problem solving, Data Structures & Algorithms (DSA), and high-performance computation.',
      projs: 'Core DSA implementations and competitive programming.',
    },
    javascript: {
      name: 'JavaScript & Node.js',
      level: 90,
      desc: 'Proficient in asynchronous programming, ES6+, DOM manipulation, and full-stack backend microservices.',
      projs: 'Smart Healthcare backend, Murder Mystery Detective Game.',
    },
    mongodb: {
      name: 'MongoDB',
      level: 90,
      desc: 'NoSQL document database design, indexing, and Mongoose aggregation pipelines.',
      projs: 'Full-stack MERN database architectures.',
    },
    firebase: {
      name: 'Firebase',
      level: 85,
      desc: 'Real-time database synchronization, Cloud Firestore, and authentication pipelines.',
      projs: 'Smart Healthcare Remote Monitoring System (<100ms latency).',
    },
    tailwind: {
      name: 'Tailwind CSS',
      level: 95,
      desc: 'Modern utility-first styling, glassmorphic HUD interfaces, cyber aesthetics, and mobile responsiveness.',
      projs: 'All modern web applications and portfolio design.',
    },
    sql: {
      name: 'SQL & Relational Databases',
      level: 88,
      desc: 'Relational database schema modeling, ACID compliance, optimized JOINs, and indexing in MySQL and SQLite.',
      projs: 'Murder Mystery Detective Game, Face Recognition SQLite logging.',
    },
  };

  for (const [key, info] of Object.entries(specificSkillQueries)) {
    if (normalized.includes(key)) {
      return {
        text: `🧠 **Harsh's Proficiency in ${info.name}:**\n\n• **Proficiency Level:** ${info.level}%\n• **Overview:** ${info.desc}\n• **Key Projects Utilizing ${info.name}:** ${info.projs}\n\nHarsh actively applies ${info.name} in both production engineering and research environments.`,
        action: { label: '⚡ View Skills Section', link: '#skills' },
        suggestedQuestions: [
          'What projects has Harsh built?',
          'What are his other AI skills?',
          'How can I contact Harsh?',
        ],
      };
    }
  }

  // --- 12. GENERAL ABOUT / BIO (Explicit requests for Harsh's profile) ---
  if (
    normalized.includes('about harsh') ||
    normalized.includes('who is harsh') ||
    normalized.includes('bio') ||
    normalized.includes('profile') ||
    normalized.includes('overview') ||
    normalized.includes('tell me about yourself') ||
    normalized.includes('background')
  ) {
    return {
      text: `👋 **Harsh Shukla** is an **AI & Machine Learning Engineer** and B.Tech CSE (AI & ML) student at United Institute of Technology (AKTU, 2023-2027).\n\n**Key Highlights:**\n• 🧠 **AI/ML Focus:** Builds practical machine learning systems across Computer Vision (OpenCV), NLP (NLTK), and Deep Learning (CNN/LSTM).\n• 💻 **Full-Stack Engineering:** Proficient in React.js, Tailwind CSS, Node.js, Express.js, Firebase, and MongoDB.\n• 🚀 **Production Systems:** Has engineered 5 major projects including a live AI Remote Healthcare platform, a 90% accurate Face Recognition attendance logger, and a +12% accuracy Twitter sentiment classifier.\n• 📜 **Certified:** Holds specialized ML & Neural Networks certification from **IIIT Allahabad** and Top 5 recognition in GDG Web Dev.\n• 🏐 **Leadership:** Active player on the college volleyball team.\n\nHarsh is open for **internships and full-time roles**!`,
      action: { label: '👤 View About Section', link: '#about' },
      suggestedQuestions: [
        'What projects has Harsh built?',
        'What are his core AI skills?',
        'Tell me about his healthcare project.',
        'How can I contact Harsh?',
      ],
    };
  }

  // --- 13. INTELLIGENT FALLBACK WITH DIRECT OPTIONS ---
  return {
    text: `I searched Harsh's verified portfolio intelligence database for: *"**${rawQuery}**"*\n\nWhile I don't have a direct matching record for that exact phrasing, I can provide verified information on:\n\n• 🚀 **Projects:** Healthcare AI, Twitter Sentiment, Facial Attendance, Speech AI\n• 🧠 **Skills:** Python, Machine Learning, React.js, Deep Learning, OpenCV, Node.js\n• 🎓 **Education & Certifications:** B.Tech at UIT / AKTU & IIIT Allahabad\n• 📬 **Contact:** Email ([shuklaharsh0207@gmail.com](mailto:shuklaharsh0207@gmail.com)) or Phone (+91 86018 45515)\n\nFeel free to choose a topic below or reach Harsh directly!`,
    action: { label: '✉️ Contact Harsh Directly', link: '#contact' },
    suggestedQuestions: [
      'What projects has Harsh built?',
      'What are his core AI skills?',
      'Tell me about his healthcare project.',
      'How can I contact Harsh?',
    ],
  };
}

