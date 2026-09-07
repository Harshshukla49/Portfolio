export interface PersonalInfo {
  name: string;
  role: string;
  titles: string[];
  tagline: string;
  bio: string;
  shortBio: string;
  status: string;
  availability: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedIn: string;
  resumeUrl: string;
  photoUrl: string;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  category: 'languages' | 'aiml' | 'frontend' | 'backend' | 'database' | 'tools';
  description: string;
  iconName: string;
  popular?: boolean;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  accentColor: string;
  stats?: { label: string; value: string }[];
  caseStudy: {
    problem: string;
    solution: string;
    architecture: string[];
    challenges: string[];
    results: string[];
    techStack: string[];
  };
}

export interface MilestoneItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  type: 'certification' | 'award' | 'event';
  details: string;
  skills: string[];
  badgeColor?: string;
}

export interface EducationInfo {
  institution: string;
  degree: string;
  specialization: string;
  cgpa: string;
  duration: string;
  graduationYear: string;
  location: string;
  highlights: string[];
}

export const portfolioData: {
  personal: PersonalInfo;
  stats: StatItem[];
  about: {
    heading: string;
    subheading: string;
    paragraphs: string[];
    pillars: { title: string; subtitle: string; description: string; icon: string; tags: string[] }[];
  };
  skills: SkillItem[];
  skillCategories: { id: SkillItem['category']; label: string }[];
  projects: ProjectItem[];
  milestones: MilestoneItem[];
  education: EducationInfo;
  faqKnowledge: { question: string; answer: string; keywords: string[]; action?: { label: string; link: string } }[];
} = {
  personal: {
    name: 'Harsh Shukla',
    role: 'AI & Machine Learning Engineer',
    titles: [
      'AI & Machine Learning Engineer',
      'Full Stack Developer',
      'Computer Vision & NLP Specialist',
      'Intelligent Systems Builder',
    ],
    tagline: 'Building Intelligent Systems with Code, Data & AI',
    bio: 'B.Tech Computer Science (AI & ML) student at United Institute of Technology with a strong passion for developing autonomous AI systems, deep learning architectures, and modern full-stack web products that solve real-world problems.',
    shortBio: 'Specializing in machine learning models, computer vision, natural language processing, and high-performance full-stack web applications.',
    status: 'Available for Internships & Full-Time Roles',
    availability: 'Open for Opportunities',
    email: 'shuklaharsh0207@gmail.com',
    phone: '+91 8601845515',
    location: 'India',
    github: 'https://github.com/Harshshukla49',
    linkedIn: 'https://linkedin.com/in/harshshukla110724',
    resumeUrl: '/Harsh_Shukla_Resume.txt',
    photoUrl: '/harsh-photo.jpg',
  },

  stats: [
    { label: 'Projects Built', value: '5+', description: 'AI, ML & Full-Stack Systems' },
    { label: 'Academic Standing', value: '7.2 CGPA', description: 'B.Tech CSE (AI & ML)' },
    { label: 'Certifications', value: '3+', description: 'IIIT Allahabad & UIT' },
    { label: 'Recognition', value: 'Top 5', description: 'GDG Web Dev Competition' },
  ],

  about: {
    heading: 'BUILDING INTELLIGENT SYSTEMS WITH CODE, DATA & AI.',
    subheading: 'Bridging Machine Learning Research with Production Engineering',
    paragraphs: [
      'I am an AI & Machine Learning Engineer and B.Tech CSE (AIML) student at United Institute of Technology (Graduating 2027). My mission is to build intelligent software that bridges complex mathematical models with frictionless, human-centric software design.',
      'From developing real-time remote healthcare diagnostic systems to training computer vision face recognition pipelines and speech emotion recognition neural networks, I take full ownership from algorithm design to deployment.',
      'I combine rigorous foundational programming in Python, C++, and TypeScript with modern web architecture (React, Node.js, Express, MongoDB) to deliver scalable, end-to-end intelligent applications.',
    ],
    pillars: [
      {
        title: 'AI & Deep Learning',
        subtitle: 'Predictive & Neural Models',
        description: 'Trained CNNs, LSTMs, and Scikit-learn models for computer vision, audio classification, and NLP sentiment analysis.',
        icon: 'brain',
        tags: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'CNN/LSTM'],
      },
      {
        title: 'Full Stack Engineering',
        subtitle: 'Modern Web Architecture',
        description: 'Building responsive, scalable web applications with React.js, Tailwind CSS, Node.js, Express, and RESTful APIs.',
        icon: 'code',
        tags: ['React.js', 'Node.js', 'Express', 'Tailwind CSS'],
      },
      {
        title: 'Computer Vision & NLP',
        subtitle: 'Perception & Language',
        description: 'Developing automated facial recognition with OpenCV and NLP pipelines with NLTK for high-throughput tweet sentiment mining.',
        icon: 'eye',
        tags: ['OpenCV', 'NLTK', 'Text Processing', 'Face Recognition'],
      },
      {
        title: 'Data & Cloud Infrastructure',
        subtitle: 'Storage & Deployment',
        description: 'Designing normalized SQL and NoSQL database schemas with MongoDB, MySQL, Firebase, and deploying on cloud platforms.',
        icon: 'database',
        tags: ['MongoDB', 'MySQL', 'Firebase', 'Supabase'],
      },
    ],
  },

  skillCategories: [
    { id: 'languages', label: 'Languages' },
    { id: 'aiml', label: 'AI & Machine Learning' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'database', label: 'Databases & Cloud' },
    { id: 'tools', label: 'Tools & DevOps' },
  ],

  skills: [
    // Languages
    { name: 'Python', level: 95, category: 'languages', description: 'Primary language for AI/ML, automation, and backend development', iconName: 'python', popular: true },
    { name: 'C++', level: 85, category: 'languages', description: 'Data structures, algorithms, and high-performance computation', iconName: 'cpp', popular: true },
    { name: 'JavaScript (ES6+)', level: 90, category: 'languages', description: 'Asynchronous frontend scripting, DOM manipulation, and Node.js', iconName: 'javascript', popular: true },
    { name: 'TypeScript', level: 82, category: 'languages', description: 'Type-safe architecture for large-scale React and backend codebases', iconName: 'typescript' },
    { name: 'SQL', level: 88, category: 'languages', description: 'Relational querying, joins, indexing, and schema optimization', iconName: 'sql' },

    // AI / ML
    { name: 'Machine Learning', level: 92, category: 'aiml', description: 'Supervised/unsupervised algorithms, regression, classification, clustering', iconName: 'ml', popular: true },
    { name: 'Deep Learning', level: 86, category: 'aiml', description: 'Neural networks, backpropagation, CNNs for vision, RNNs/LSTMs for sequences', iconName: 'dl', popular: true },
    { name: 'NLP & Sentiment Analysis', level: 88, category: 'aiml', description: 'NLTK, text tokenization, TF-IDF, embeddings, and sentiment mining', iconName: 'nlp', popular: true },
    { name: 'Computer Vision (OpenCV)', level: 89, category: 'aiml', description: 'Image processing, Haar cascades, facial detection, and feature extraction', iconName: 'opencv', popular: true },
    { name: 'Scikit-Learn', level: 92, category: 'aiml', description: 'Model evaluation, hyperparameter tuning, pipeline construction', iconName: 'scikit' },
    { name: 'Data Science & Analytics', level: 90, category: 'aiml', description: 'Exploratory data analysis, Pandas, NumPy, statistical hypothesis testing', iconName: 'datascience' },

    // Frontend
    { name: 'React.js', level: 92, category: 'frontend', description: 'Component lifecycle, hooks, state management, SPA architecture', iconName: 'react', popular: true },
    { name: 'Tailwind CSS', level: 95, category: 'frontend', description: 'Utility-first modern styling, responsive layouts, glassmorphism', iconName: 'tailwind', popular: true },
    { name: 'HTML5 & CSS3', level: 95, category: 'frontend', description: 'Semantic web standards, CSS Grid, Flexbox, responsive design', iconName: 'html' },
    { name: 'Framer Motion', level: 88, category: 'frontend', description: 'Interactive micro-interactions, layout animations, gestures, and scroll triggers', iconName: 'motion' },

    // Backend
    { name: 'Node.js', level: 88, category: 'backend', description: 'Event-driven server runtimes, asynchronous microservices', iconName: 'node', popular: true },
    { name: 'Express.js', level: 90, category: 'backend', description: 'RESTful API routing, middleware, authentication, and error handling', iconName: 'express', popular: true },
    { name: 'Flask', level: 84, category: 'backend', description: 'Lightweight Python microservices for deploying ML models and APIs', iconName: 'flask' },
    { name: 'REST APIs', level: 92, category: 'backend', description: 'JSON contracts, endpoint security, status codes, and CRUD pipelines', iconName: 'api' },

    // Database
    { name: 'MongoDB', level: 90, category: 'database', description: 'NoSQL document modeling, Mongoose aggregation pipelines', iconName: 'mongodb', popular: true },
    { name: 'MySQL', level: 86, category: 'database', description: 'Relational schema design, normalization, ACID compliance', iconName: 'mysql' },
    { name: 'Firebase', level: 85, category: 'database', description: 'Cloud Firestore, real-time database, and authentication', iconName: 'firebase' },
    { name: 'Supabase', level: 80, category: 'database', description: 'Postgres backend as a service, real-time subscriptions, and auth', iconName: 'supabase' },
    { name: 'SQLite', level: 85, category: 'database', description: 'Lightweight embedded relational database for game and desktop applications', iconName: 'sqlite' },

    // Tools
    { name: 'Git & GitHub', level: 94, category: 'tools', description: 'Version control, branching strategies, PR reviews, CI/CD actions', iconName: 'git', popular: true },
    { name: 'Postman', level: 90, category: 'tools', description: 'API testing, automated request collections, environment mock servers', iconName: 'postman' },
    { name: 'VS Code', level: 96, category: 'tools', description: 'Full-stack IDE configuration, debugging, extensions, and workflow optimization', iconName: 'vscode' },
    { name: 'Vite', level: 90, category: 'tools', description: 'Fast modern build tooling, HMR, bundling, and asset optimization', iconName: 'vite' },
  ],

  projects: [
    {
      id: 'smart-healthcare',
      number: '01',
      title: 'Smart Healthcare Remote Monitoring System',
      category: 'AI Healthcare / Full Stack',
      tagline: 'Real-time patient telemetry, doctor portal, and predictive ML diagnostic assistance.',
      description:
        'A comprehensive end-to-end healthcare platform enabling remote patient vital monitoring, clinical triage dashboards for doctors, and machine learning risk score forecasts for early medical intervention.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Machine Learning', 'Tailwind CSS'],
      liveUrl: 'https://smart-health-rontend.onrender.com',
      githubUrl: 'https://github.com/Harshshukla49',
      featured: true,
      accentColor: '#06b6d4',
      stats: [
        { label: 'Latency', value: '<100ms' },
        { label: 'Role Portals', value: 'Doctor / Patient' },
        { label: 'Stack', value: 'MERN + ML' },
      ],
      caseStudy: {
        problem:
          'Remote patient health metrics are often fragmented and delayed, leaving clinicians unable to intervene promptly when patient vital signs suddenly deteriorate outside clinic walls.',
        solution:
          'Engineered a centralized real-time web portal where patient vital data streams into a secure Node.js/MongoDB backend, combined with an AI risk-prediction model that alerts physicians to abnormal health anomalies.',
        architecture: [
          'Frontend: Responsive React.js application with role-based doctor/patient portals, vital metric graphs, and appointment scheduling.',
          'Backend: Express.js REST API with JWT authentication, clinical record validation, and MongoDB aggregation.',
          'AI Engine: Predictive health anomaly model evaluating biometric thresholds and symptom risk vectors.',
        ],
        challenges: [
          'Ensuring low-latency bidirectional telemetry and secure patient data isolation.',
          'Formatting real-time medical charts with zero lag during high-frequency vital updates.',
        ],
        results: [
          'Successfully deployed full-stack application on Render with active production URL.',
          'Delivered seamless doctor triage workflows with automated anomaly alerts.',
        ],
        techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Scikit-Learn', 'Render Cloud'],
      },
    },

    {
      id: 'twitter-sentiment',
      number: '02',
      title: 'Twitter Sentiment Analysis Platform',
      category: 'NLP / Machine Learning',
      tagline: 'High-throughput NLP pipeline classifying public sentiment on 1,000+ real-time tweets.',
      description:
        'An interactive natural language processing system that ingests, cleans, and classifies sentiment polarity across social media feeds using machine learning algorithms and interactive Streamlit visualizations.',
      tech: ['Python', 'NLP', 'NLTK', 'Scikit-Learn', 'Streamlit', 'Pandas'],
      githubUrl: 'https://github.com/Harshshukla49',
      featured: true,
      accentColor: '#a855f7',
      stats: [
        { label: 'Dataset', value: '1,000+ Tweets' },
        { label: 'NLP Pipeline', value: 'TF-IDF + NLTK' },
        { label: 'Classifier', value: 'ML Ensemble' },
      ],
      caseStudy: {
        problem:
          'Social media generates vast unstructured conversational text with slang, abbreviations, and emojis that conventional keyword matching fails to accurately interpret.',
        solution:
          'Developed a tailored NLP text preprocessing pipeline using NLTK (stopword removal, lemmatization, tokenization) paired with TF-IDF vectorization and trained classifiers to accurately determine positive, neutral, and negative sentiment polarities.',
        architecture: [
          'Text Preprocessing: Regex cleaning, URL stripping, hashtag parsing, lemmatization.',
          'Vectorization: TF-IDF feature matrix with n-gram tokenization.',
          'Model Classification: Trained Scikit-learn classifiers evaluated with precision, recall, and F1-score.',
          'Visualization UI: Streamlit interactive dashboard with real-time sentiment distribution charts.',
        ],
        challenges: [
          'Handling noisy social media text and ambiguous sarcastic phrasing.',
          'Balancing dataset class distributions to prevent negative-bias skew.',
        ],
        results: [
          'Processed and evaluated over 1,000+ raw social media posts with consistent classification fidelity.',
          'Built an interactive dashboard allowing instantaneous sentence sentiment prediction.',
        ],
        techStack: ['Python', 'NLTK', 'Scikit-Learn', 'Streamlit', 'Pandas', 'Matplotlib'],
      },
    },

    {
      id: 'face-recognition-attendance',
      number: '03',
      title: 'Face Recognition Attendance System',
      category: 'Computer Vision',
      tagline: 'Automated biometric attendance logging delivering 90% facial verification accuracy.',
      description:
        'A computer vision-powered biometric system that identifies registered individuals via live video feed, records timestamps into a local database, and eliminates manual proxy attendance.',
      tech: ['Python', 'OpenCV', 'Tkinter', 'Haar Cascades', 'SQLite'],
      githubUrl: 'https://github.com/Harshshukla49',
      featured: true,
      accentColor: '#3b82f6',
      stats: [
        { label: 'Accuracy', value: '90%' },
        { label: 'Latency', value: '<50ms' },
        { label: 'Verification', value: 'Real-Time' },
      ],
      caseStudy: {
        problem:
          'Traditional roll-call and paper attendance systems in classrooms and workplaces suffer from proxy sign-ins, administrative bottlenecks, and inaccurate logging.',
        solution:
          'Built an autonomous facial recognition application that detects and matches user faces in real time using OpenCV image feature extraction, directly recording verified attendance to SQLite.',
        architecture: [
          'Camera Feed: OpenCV frame capture with frame-rate optimization.',
          'Face Detection: Haar Cascade multi-scale facial landmark region extraction.',
          'Recognition Model: Local Binary Pattern Histograms (LBPH) / facial embeddings matcher.',
          'GUI & Database: Tkinter desktop control center connected to SQLite storage.',
        ],
        challenges: [
          'Maintaining high recognition accuracy under variable lighting conditions and slight facial angles.',
          'Optimizing frame throughput on commodity CPU hardware without GPU acceleration.',
        ],
        results: [
          'Achieved 90% recognition accuracy across multi-user test environments.',
          'Automated instantaneous attendance generation with CSV and database export.',
        ],
        techStack: ['Python', 'OpenCV', 'Tkinter', 'SQLite', 'NumPy'],
      },
    },

    {
      id: 'speech-emotion-recognition',
      number: '04',
      title: 'Speech Emotion Recognition System',
      category: 'Deep Learning / Audio AI',
      tagline: 'Multi-layer CNN & LSTM neural network classifying human emotion from voice audio.',
      description:
        'An advanced acoustic deep learning model trained on audio signals to extract Mel-Frequency Cepstral Coefficients (MFCCs) and detect emotional states (happy, sad, angry, neutral).',
      tech: ['Python', 'CNN', 'RNN', 'LSTM', 'Librosa', 'Scikit-Learn'],
      githubUrl: 'https://github.com/Harshshukla49',
      featured: true,
      accentColor: '#ec4899',
      stats: [
        { label: 'Features', value: 'MFCC & Chroma' },
        { label: 'Architecture', value: 'CNN + LSTM' },
        { label: 'Audio Engine', value: 'Librosa' },
      ],
      caseStudy: {
        problem:
          'Human-AI conversational agents often lack affective empathy because they analyze only semantic text rather than the tonal acoustic frequencies of vocal expression.',
        solution:
          'Designed a deep neural network combining 1D convolutional layers for spatial acoustic frequency pattern extraction and LSTM recurrent cells for temporal voice modulation tracking.',
        architecture: [
          'Feature Engineering: Audio spectral feature extraction (MFCCs, Chroma, Mel Spectrograms) via Librosa.',
          'Neural Architecture: 1D CNN feature extractors + LSTM sequential layers + Dropout regularization + Softmax classifier.',
          'Inference Pipeline: Real-time audio waveform processing returning probability distributions across emotion classes.',
        ],
        challenges: [
          'Handling background ambient noise in raw audio waveforms.',
          'Preventing overfitting on smaller acoustic speech datasets.',
        ],
        results: [
          'Engineered a robust hybrid CNN+LSTM architecture for emotion classification.',
          'Extracted multidimensional acoustic vectors with rapid inference speeds.',
        ],
        techStack: ['Python', 'Librosa', 'CNN', 'LSTM', 'Scikit-Learn', 'NumPy'],
      },
    },

    {
      id: 'murder-mystery-game',
      number: '05',
      title: 'Murder Mystery Detective Game',
      category: 'Full Stack & Interactive Systems',
      tagline: 'Interactive narrative engine with clue state-tracking and secure REST APIs.',
      description:
        'A full-stack investigative narrative web game featuring player authentication, dynamic clue graph resolution, relational database queries, and interactive detective mechanics.',
      tech: ['Node.js', 'Express.js', 'SQLite', 'JavaScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Harshshukla49',
      featured: false,
      accentColor: '#8b5cf6',
      stats: [
        { label: 'Architecture', value: 'REST API' },
        { label: 'Engine', value: 'State Graph' },
        { label: 'Database', value: 'SQLite' },
      ],
      caseStudy: {
        problem:
          'Interactive story games require intricate branching state management where each player choice alters subsequent evidence accessibility without state desynchronization.',
        solution:
          'Architected an Express.js backend with an atomic state tracker and SQLite database schema to persist player decisions, suspect interrogations, and locked evidence reveals.',
        architecture: [
          'Backend: Node.js & Express REST API with parameterized SQLite queries.',
          'State Engine: Clue dependency tree validating unlocked evidence.',
          'Frontend: Immersive dark UI styled with Tailwind CSS for atmospheric storytelling.',
        ],
        challenges: [
          'Designing an airtight clue graph preventing players from bypassing game logic.',
          'Optimizing database transactions for zero-latency gameplay.',
        ],
        results: [
          'Delivered a fully playable detective game with persistent save states and rich player choices.',
        ],
        techStack: ['Node.js', 'Express.js', 'SQLite', 'JavaScript', 'HTML5', 'Tailwind CSS'],
      },
    },
  ],

  milestones: [
    {
      id: 'iiit-allahabad-ml',
      title: 'Machine Learning & Neural Networks Certification',
      organization: 'IIIT Allahabad',
      year: 'Academic Certification',
      type: 'certification',
      details:
        'Completed specialized certification focusing on applied machine learning algorithms, deep neural network architectures, backpropagation, and hands-on model training.',
      skills: ['Neural Networks', 'Applied ML', 'Deep Learning', 'Python'],
      badgeColor: '#a855f7',
    },
    {
      id: 'uit-python-ds',
      title: 'Python for Data Science Certification',
      organization: 'United Institute of Technology',
      year: 'Academic Certification',
      type: 'certification',
      details:
        'Comprehensive training in Python data pipelines, NumPy array manipulation, Pandas dataframes, Matplotlib/Seaborn visualization, and data wrangling methodologies.',
      skills: ['Python', 'Data Science', 'Pandas', 'NumPy'],
      badgeColor: '#06b6d4',
    },
    {
      id: 'cwh-data-science',
      title: 'Data Science & Machine Learning Pipeline Training',
      organization: 'CodeWithHarry',
      year: 'Technical Certification',
      type: 'certification',
      details:
        'Rigorous course covering the complete data science lifecycle from exploratory data analysis and feature engineering to model deployment and evaluation metrics.',
      skills: ['Scikit-Learn', 'EDA', 'Feature Engineering', 'Model Deployment'],
      badgeColor: '#3b82f6',
    },
    {
      id: 'gdg-web-quiz',
      title: 'GDG Web Development Competition — Top 5 Finish',
      organization: 'Google Developer Groups (GDG)',
      year: 'Competitive Recognition',
      type: 'award',
      details:
        'Recognized among the Top 5 top-performing competitors in a regional web development tournament evaluating full-stack concepts, JavaScript fundamentals, and UI engineering.',
      skills: ['Web Development', 'JavaScript', 'Problem Solving', 'UI/UX'],
      badgeColor: '#10b981',
    },
    {
      id: 'ecell-ideathon',
      title: 'Innovation Ideathon Participation',
      organization: 'E-Cell UIT',
      year: 'Hackathon & Innovation',
      type: 'event',
      details:
        'Collaborated on conceptualizing and architecting tech-enabled business solutions addressing real-world operational bottlenecks during an intense innovation sprint.',
      skills: ['Product Thinking', 'System Architecture', 'Rapid Prototyping'],
      badgeColor: '#f59e0b',
    },
  ],

  education: {
    institution: 'United Institute of Technology',
    degree: 'Bachelor of Technology (B.Tech)',
    specialization: 'Computer Science and Engineering (AI & ML)',
    cgpa: '7.2',
    duration: '2023 - 2027',
    graduationYear: '2027',
    location: 'Prayagraj / Allahabad, Uttar Pradesh, India',
    highlights: [
      'Core coursework: Artificial Intelligence, Machine Learning, Deep Learning, Data Structures & Algorithms, Database Management Systems, Computer Networks.',
      'Active participant in technical workshops, hackathons, and Google Developer Group activities.',
      'Hands-on laboratory research in computer vision, natural language processing, and full-stack software development.',
    ],
  },

  faqKnowledge: [
    {
      question: 'Who is Harsh Shukla?',
      answer:
        'Harsh Shukla is an AI & Machine Learning Engineer and B.Tech CSE (AIML) student at United Institute of Technology (Class of 2027). He specializes in machine learning models, computer vision, natural language processing, and full-stack web applications with React, Node.js, and Python.',
      keywords: ['who', 'harsh', 'about', 'introduction', 'profile', 'bio'],
      action: { label: 'View About Section', link: '#about' },
    },
    {
      question: 'What projects has Harsh built?',
      answer:
        'Harsh has built 5+ major projects:\n1. Smart Healthcare Remote Monitoring System (React, Node.js, MongoDB, ML predictions)\n2. Twitter Sentiment Analysis Platform (NLP, NLTK, Streamlit, 1000+ tweets)\n3. Face Recognition Attendance System (Python, OpenCV, Tkinter, 90% accuracy)\n4. Speech Emotion Recognition System (CNN, RNN, LSTM, Librosa)\n5. Murder Mystery Detective Game (Node.js, Express, SQLite)',
      keywords: ['project', 'projects', 'built', 'portfolio', 'work', 'showcase'],
      action: { label: 'Explore Projects', link: '#projects' },
    },
    {
      question: 'What technologies and skills does Harsh know?',
      answer:
        'Harsh’s core tech stack includes:\n• Languages: Python, C++, JavaScript (ES6+), TypeScript, SQL\n• AI & ML: Machine Learning, Deep Learning, NLP, OpenCV, Scikit-Learn, CNN, RNN/LSTM\n• Frontend: React.js, Tailwind CSS, HTML5/CSS3, Framer Motion\n• Backend: Node.js, Express.js, Flask, REST APIs\n• Databases: MongoDB, MySQL, Firebase, Supabase, SQLite\n• Tools: Git, GitHub, Postman, VS Code, Vite',
      keywords: ['skills', 'technologies', 'tech stack', 'languages', 'python', 'react', 'tools'],
      action: { label: 'View Tech Stack', link: '#skills' },
    },
    {
      question: 'Tell me about the Smart Healthcare project.',
      answer:
        'The Smart Healthcare Remote Monitoring System is a production full-stack MERN application with AI risk prediction. It allows remote patient vital tracking, doctor triage dashboards, and early warning anomaly detection. It is deployed live on Render.',
      keywords: ['healthcare', 'smart health', 'medical', 'hospital', 'patient'],
      action: { label: 'Open Live Demo', link: 'https://smart-health-rontend.onrender.com' },
    },
    {
      question: 'What is Harsh’s educational background?',
      answer:
        'Harsh is currently pursuing a Bachelor of Technology (B.Tech) in Computer Science & Engineering with a specialization in Artificial Intelligence and Machine Learning (AI & ML) at United Institute of Technology, maintaining a 7.2 CGPA and graduating in 2027.',
      keywords: ['education', 'college', 'degree', 'cgpa', 'university', 'uit', 'school'],
      action: { label: 'View Education', link: '#milestones' },
    },
    {
      question: 'What certifications does Harsh hold?',
      answer:
        'Harsh holds verified certifications in:\n1. Machine Learning & Neural Networks from IIIT Allahabad\n2. Python for Data Science from United Institute of Technology (UIT)\n3. Data Science Training from CodeWithHarry\n4. Top 5 placement in GDG Web Development Competition',
      keywords: ['certification', 'certificates', 'awards', 'iiit', 'recognition', 'achievement'],
      action: { label: 'View Milestones', link: '#milestones' },
    },
    {
      question: 'How can I contact or hire Harsh?',
      answer:
        'You can reach Harsh directly:\n• Email: shuklaharsh0207@gmail.com\n• Phone: +91 8601845515\n• GitHub: github.com/Harshshukla49\n• LinkedIn: linkedin.com/in/harshshukla110724\nHarsh is open for internships, freelance projects, and full-time software/AI engineering roles.',
      keywords: ['contact', 'hire', 'email', 'phone', 'reach', 'linkedin', 'github', 'message', 'job'],
      action: { label: 'Go to Contact Form', link: '#contact' },
    },
    {
      question: 'What is Harsh’s strongest technical skill?',
      answer:
        'Harsh’s strongest domain is Applied AI/ML combined with Full-Stack Engineering in Python and JavaScript/TypeScript. He excels at developing data pipelines, training predictive machine learning models (OpenCV, NLP, Scikit-learn), and packaging them into clean React/Node.js web products.',
      keywords: ['strongest', 'specialty', 'strength', 'best at', 'focus'],
      action: { label: 'View Skills', link: '#skills' },
    },
    {
      question: 'Where can I download Harsh’s resume?',
      answer:
        'You can download Harsh’s verified technical resume directly using the Download Resume button on the hero section or navbar.',
      keywords: ['resume', 'cv', 'download', 'pdf', 'document'],
      action: { label: 'Download Resume', link: '#hero' },
    },
  ],
};
