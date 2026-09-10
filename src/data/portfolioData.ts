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
  level: number;
  category: 'languages' | 'aiml' | 'frontend' | 'backend' | 'database' | 'tools' | 'concepts';
  description: string;
  iconName: string;
  popular?: boolean;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  domain: string;
  status: string;
  imageUrl: string;
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
  date: string;
  type: 'certification' | 'award' | 'event';
  details: string;
  skills: string[];
  badgeColor?: string;
}

export interface EducationEntry {
  qualification: string;
  institution: string;
  board: string;
  year: string;
  highlights?: string;
}

export const portfolioData = {
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
    bio: 'B.Tech Computer Science (AI & ML) student with hands-on experience in Python, Machine Learning, Data Science, and Full-Stack Development. Developed AI-based projects in sentiment analysis, face recognition, and speech processing. Seeking opportunities to apply technical and analytical skills in real-world environments.',
    shortBio: 'Specializing in machine learning models, computer vision, natural language processing, and high-performance full-stack web applications.',
    status: 'Available for Internships & Full-Time Roles',
    availability: 'Open for Opportunities',
    email: 'shuklaharsh0207@gmail.com',
    phone: '+91 86018 45515',
    location: 'India',
    github: 'https://github.com/Harshshukla49',
    linkedIn: 'https://linkedin.com/in/harshshukla110724',
    resumeUrl: '/Harsh_Shukla_Resume.pdf',
    photoUrl: '/harsh-photo.jpg',
  },

  stats: [
    { label: 'Projects Built', value: '5+', description: 'Healthcare, Vision & NLP Systems' },
    { label: 'Degree', value: 'B.Tech', description: 'CSE (AI & ML) 2023-2027' },
    { label: 'Certifications', value: '5+', description: 'IIIT Allahabad & UIT' },
    { label: 'Recognition', value: 'Top 5', description: 'GDG Web Dev Competition' },
  ],

  about: {
    heading: 'BUILDING INTELLIGENT SYSTEMS WITH CODE, DATA & AI.',
    subheading: 'Bridging Machine Learning Research with Production Engineering',
    paragraphs: [
      'I am an AI & Machine Learning Engineer pursuing B.Tech in Computer Science (AI & ML) at United Institute of Technology, affiliated with Dr. APJ Abdul Kalam Technical University (2023-2027).',
      'My hands-on experience spans developing full-stack AI remote healthcare platforms, automated computer vision attendance systems (90% accuracy), NLP sentiment analysis pipelines, and acoustic deep learning speech emotion classifiers.',
      'Beyond academics and coding, I represented my college volleyball team, strengthening my teamwork, discipline, and strategic problem-solving abilities.',
    ],
    pillars: [
      {
        title: 'AI & Deep Learning',
        subtitle: 'Predictive & Neural Models',
        description: 'Trained CNNs, LSTMs, and Scikit-learn models for acoustic emotion detection, facial biometrics, and sentiment mining.',
        icon: 'brain',
        tags: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'CNN/LSTM'],
      },
      {
        title: 'Full Stack Engineering',
        subtitle: 'Modern Web Architecture',
        description: 'Building responsive, scalable web applications with React.js, Tailwind CSS, Node.js, Express, Firebase, and RESTful APIs.',
        icon: 'code',
        tags: ['React.js', 'Node.js', 'Express', 'Tailwind CSS'],
      },
      {
        title: 'Computer Vision & NLP',
        subtitle: 'Perception & Language',
        description: 'Developing automated facial recognition with OpenCV (85% manual effort reduction) and Twitter sentiment NLP with NLTK/Streamlit.',
        icon: 'eye',
        tags: ['OpenCV', 'NLTK', 'Text Processing', 'Face Recognition'],
      },
      {
        title: 'Data & Cloud Infrastructure',
        subtitle: 'Storage & Deployment',
        description: 'Designing normalized SQL and NoSQL database schemas with MongoDB, MySQL, Firebase, Supabase, and SQLite.',
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
    { name: 'JavaScript', level: 90, category: 'languages', description: 'Asynchronous frontend scripting, DOM manipulation, and Node.js', iconName: 'javascript', popular: true },
    { name: 'SQL', level: 88, category: 'languages', description: 'Relational querying, joins, indexing, and schema optimization', iconName: 'sql', popular: true },

    // AI / ML
    { name: 'Machine Learning', level: 92, category: 'aiml', description: 'Supervised/unsupervised algorithms, regression, classification, clustering', iconName: 'ml', popular: true },
    { name: 'Deep Learning', level: 86, category: 'aiml', description: 'Neural networks, CNNs for vision, RNNs/LSTMs for sequences', iconName: 'dl', popular: true },
    { name: 'NLP & Text Mining', level: 88, category: 'aiml', description: 'NLTK, TF-IDF vectorization, tokenization, sentiment classification', iconName: 'nlp', popular: true },
    { name: 'Computer Vision (OpenCV)', level: 89, category: 'aiml', description: 'Face detection, feature extraction, real-time webcam processing', iconName: 'opencv', popular: true },
    { name: 'Scikit-Learn', level: 92, category: 'aiml', description: 'Model evaluation, hyperparameter tuning, ML pipelines', iconName: 'scikit' },
    { name: 'Data Science & Analytics', level: 90, category: 'aiml', description: 'Pandas, NumPy, data cleaning, exploratory data analysis', iconName: 'datascience' },

    // Frontend
    { name: 'React.js', level: 92, category: 'frontend', description: 'Component lifecycle, state hooks, SPAs, responsive dashboards', iconName: 'react', popular: true },
    { name: 'Tailwind CSS', level: 95, category: 'frontend', description: 'Modern utility-first styling, glassmorphism, responsive UI', iconName: 'tailwind', popular: true },
    { name: 'HTML & CSS', level: 95, category: 'frontend', description: 'Semantic markup, modern layout models (Flexbox, Grid)', iconName: 'html' },

    // Backend
    { name: 'Node.js', level: 88, category: 'backend', description: 'Event-driven server runtimes, asynchronous microservices', iconName: 'node', popular: true },
    { name: 'Express.js', level: 90, category: 'backend', description: 'RESTful routing, middleware authentication, error handling', iconName: 'express', popular: true },
    { name: 'Flask', level: 84, category: 'backend', description: 'Lightweight Python microservices for deploying ML models and APIs', iconName: 'flask' },
    { name: 'REST APIs', level: 92, category: 'backend', description: 'Secure CRUD pipelines, JSON payloads, status code contracts', iconName: 'api', popular: true },

    // Database
    { name: 'MongoDB', level: 90, category: 'database', description: 'NoSQL document modeling, Mongoose aggregation pipelines', iconName: 'mongodb', popular: true },
    { name: 'MySQL', level: 86, category: 'database', description: 'Relational schema design, normalization, ACID compliance', iconName: 'mysql' },
    { name: 'Firebase', level: 85, category: 'database', description: 'Cloud Firestore, real-time database, and authentication', iconName: 'firebase', popular: true },
    { name: 'Supabase', level: 80, category: 'database', description: 'Postgres backend as a service, real-time subscriptions, and auth', iconName: 'supabase' },
    { name: 'SQLite', level: 85, category: 'database', description: 'Embedded relational database for game and desktop applications', iconName: 'sqlite' },

    // Tools
    { name: 'Git & GitHub', level: 94, category: 'tools', description: 'Version control, branching strategies, collaborative workflows', iconName: 'git', popular: true },
    { name: 'Postman', level: 90, category: 'tools', description: 'API testing, automated request collections, environment mocks', iconName: 'postman' },
    { name: 'VS Code', level: 96, category: 'tools', description: 'Full-stack IDE configuration, debugging, extensions', iconName: 'vscode' },
  ],

  coreConcepts: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming (OOP)',
    'Database Management Systems (DBMS)',
    'Operating Systems',
  ],

  projects: [
    {
      id: 'smart-healthcare',
      number: '01',
      title: 'Smart Healthcare Remote Monitoring System',
      category: 'AI Healthcare / Full Stack',
      domain: 'AI Healthcare & Telemetry',
      status: 'LIVE ON RENDER',
      imageUrl: '/projects/smart-healthcare.jpg',
      tagline: 'Real-time patient tracking with doctor-patient dashboards and ML predictions.',
      description:
        'Full-stack healthcare monitoring platform with real-time patient vital tracking, doctor-patient dashboards, and machine learning risk score predictions.',
      tech: ['React.js', 'Node.js', 'Firebase', 'Machine Learning', 'Express.js', 'Tailwind CSS'],
      liveUrl: 'https://smart-health-rontend.onrender.com',
      githubUrl: 'https://github.com/Harshshukla49',
      featured: true,
      accentColor: '#06b6d4',
      stats: [
        { label: 'Latency', value: '<100ms' },
        { label: 'Role Portals', value: 'Doctor / Patient' },
        { label: 'Stack', value: 'React + Node + Firebase' },
      ],
      caseStudy: {
        problem:
          'Remote patient health metrics are often fragmented, leaving doctors unable to intervene promptly when patient vital signs deteriorate outside clinics.',
        solution:
          'Engineered a centralized real-time web portal where patient vital data streams into a secure Node.js/Firebase backend, combined with an AI risk-prediction model that alerts physicians.',
        architecture: [
          'Frontend: Responsive React.js application with role-based doctor/patient portals, vital metric graphs, and appointment scheduling.',
          'Backend: Express.js REST API with Firebase authentication and real-time vital synchronization.',
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
        techStack: ['React.js', 'Node.js', 'Express', 'Firebase', 'Tailwind CSS', 'Scikit-Learn', 'Render Cloud'],
      },
    },

    {
      id: 'twitter-sentiment',
      number: '02',
      title: 'Twitter Sentiment Analysis Platform',
      category: 'NLP / Machine Learning',
      domain: 'Natural Language Processing',
      status: 'PRODUCTION DEPLOYED',
      imageUrl: '/projects/twitter-sentiment.jpg',
      tagline: 'Processed 1,000+ tweets using Twitter API and NLP, boosting accuracy by 12%.',
      description:
        'Processed 1,000+ tweets using Twitter API and NLP techniques. Improved sentiment classification accuracy by 12% and deployed via Streamlit interactive dashboard.',
      tech: ['Python', 'NLP', 'Scikit-Learn', 'NLTK', 'Streamlit', 'Twitter API'],
      githubUrl: 'https://github.com/Harshshukla49',
      featured: true,
      accentColor: '#a855f7',
      stats: [
        { label: 'Dataset', value: '1,000+ Tweets' },
        { label: 'Accuracy Gain', value: '+12%' },
        { label: 'Deployment', value: 'Streamlit' },
      ],
      caseStudy: {
        problem:
          'Social media generates vast unstructured conversational text with slang, abbreviations, and emojis that conventional keyword matching fails to accurately interpret.',
        solution:
          'Developed a tailored NLP text preprocessing pipeline using NLTK (stopword removal, lemmatization, tokenization) paired with TF-IDF vectorization and trained classifiers.',
        architecture: [
          'Data Extraction: Twitter API ingestion pipeline collecting real-time tweets.',
          'Preprocessing: Regex cleaning, URL stripping, hashtag parsing, lemmatization.',
          'Vectorization & Modeling: TF-IDF feature matrix with trained Scikit-learn classifiers (+12% accuracy gain).',
          'UI Dashboard: Streamlit interactive interface allowing live sentence sentiment prediction.',
        ],
        challenges: [
          'Handling noisy social media text and ambiguous phrasing.',
          'Balancing dataset class distributions to prevent negative-bias skew.',
        ],
        results: [
          'Processed and evaluated over 1,000+ raw tweets with 12% higher classification accuracy.',
          'Built an interactive dashboard allowing instantaneous sentiment polarity calculation.',
        ],
        techStack: ['Python', 'NLTK', 'Scikit-Learn', 'Streamlit', 'Pandas', 'Twitter API'],
      },
    },

    {
      id: 'face-recognition-attendance',
      number: '03',
      title: 'Face Recognition Attendance Monitoring System',
      category: 'Computer Vision',
      domain: 'Biometrics & Vision AI',
      status: '90% ACCURACY',
      imageUrl: '/projects/face-recognition.jpg',
      tagline: 'Automated biometric attendance with 90% accuracy, cutting manual effort by 85%.',
      description:
        'Developed automated attendance system using facial recognition techniques in Python, OpenCV, and Tkinter. Achieved 90% recognition accuracy and reduced manual effort by 85%.',
      tech: ['Python', 'OpenCV', 'Tkinter', 'Haar Cascades', 'SQLite'],
      githubUrl: 'https://github.com/Harshshukla49',
      featured: true,
      accentColor: '#3b82f6',
      stats: [
        { label: 'Accuracy', value: '90%' },
        { label: 'Effort Reduction', value: '85%' },
        { label: 'Verification', value: 'Real-Time' },
      ],
      caseStudy: {
        problem:
          'Traditional roll-call and paper attendance systems suffer from proxy sign-ins, administrative bottlenecks, and slow manual recording.',
        solution:
          'Built an autonomous facial recognition application that detects and matches user faces in real time using OpenCV, cutting manual attendance logging effort by 85%.',
        architecture: [
          'Camera Feed: OpenCV real-time video capture pipeline.',
          'Face Detection: Haar Cascade multi-scale facial landmark extraction.',
          'Recognition Model: Facial embeddings matcher achieving 90% verification accuracy.',
          'GUI & Database: Tkinter desktop interface connected to SQLite database storage.',
        ],
        challenges: [
          'Maintaining high recognition accuracy under variable lighting conditions.',
          'Optimizing frame throughput on commodity CPU hardware without GPU acceleration.',
        ],
        results: [
          'Achieved 90% recognition accuracy and slashed manual record-keeping by 85%.',
          'Automated instantaneous attendance generation with CSV and database export.',
        ],
        techStack: ['Python', 'OpenCV', 'Tkinter', 'SQLite', 'NumPy'],
      },
    },

    {
      id: 'murder-mystery-game',
      number: '04',
      title: 'Murder Mystery Detective Game',
      category: 'Full Stack & Web Systems',
      domain: 'Narrative Engine & REST API',
      status: 'AUTHENTICATED STATE',
      imageUrl: '/projects/murder-mystery.jpg',
      tagline: 'Interactive investigative narrative engine with secure REST APIs & optimized SQLite.',
      description:
        'Built full-stack web application with authentication and REST APIs. Optimized SQLite queries for improved performance and seamless detective gameplay experience.',
      tech: ['Node.js', 'Express.js', 'SQLite', 'JavaScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Harshshukla49',
      featured: false,
      accentColor: '#8b5cf6',
      stats: [
        { label: 'Backend', value: 'Express REST' },
        { label: 'Database', value: 'Optimized SQLite' },
        { label: 'Feature', value: 'Authentication' },
      ],
      caseStudy: {
        problem:
          'Interactive story games require intricate branching state management where player decisions alter subsequent evidence accessibility without lag.',
        solution:
          'Architected an Express.js backend with an atomic state tracker and optimized SQLite database queries to persist player decisions and evidence unlocks.',
        architecture: [
          'Backend: Node.js & Express REST API with parameterized, indexed SQLite queries.',
          'State Engine: Clue dependency tree validating unlocked evidence.',
          'Frontend: Dark aesthetic interactive UI for atmospheric detective storytelling.',
        ],
        challenges: [
          'Designing an airtight clue graph preventing players from bypassing puzzle states.',
          'Optimizing SQLite queries for instantaneous game state transitions.',
        ],
        results: [
          'Delivered a fully playable detective game with authenticated save states and zero-lag query execution.',
        ],
        techStack: ['Node.js', 'Express.js', 'SQLite', 'JavaScript', 'HTML5', 'Tailwind CSS'],
      },
    },

    {
      id: 'speech-emotion-recognition',
      number: '05',
      title: 'Speech Recognition System / Speech Emotion Recognition',
      category: 'Deep Learning / Audio AI',
      domain: 'Acoustic Deep Learning',
      status: '85% ACCURACY',
      imageUrl: '/projects/speech-emotion.jpg',
      tagline: 'Deep learning CNN & LSTM model achieving 85% classification accuracy via MFCC.',
      description:
        'Developed deep learning model for speech emotion recognition using CNN, RNN, and LSTM architectures. Achieved 85% classification accuracy using MFCC-based acoustic features.',
      tech: ['Python', 'CNN', 'RNN', 'LSTM', 'MFCC Features', 'Scikit-Learn'],
      githubUrl: 'https://github.com/Harshshukla49',
      featured: true,
      accentColor: '#ec4899',
      stats: [
        { label: 'Accuracy', value: '85%' },
        { label: 'Features', value: 'MFCC Audio' },
        { label: 'Architecture', value: 'CNN + LSTM' },
      ],
      caseStudy: {
        problem:
          'Voice interfaces often miss human affective context because they process only words rather than vocal frequencies and emotional inflection.',
        solution:
          'Designed a deep neural network combining CNN layers for spatial acoustic frequency pattern extraction and LSTM recurrent cells for temporal voice modulation, achieving 85% accuracy.',
        architecture: [
          'Feature Engineering: Audio spectral feature extraction (MFCCs) via Python audio libraries.',
          'Neural Architecture: 1D CNN feature extractors + LSTM recurrent layers + Softmax classifier.',
          'Inference Pipeline: Real-time audio waveform processing returning emotion probability distributions.',
        ],
        challenges: [
          'Filtering background ambient noise from raw voice recordings.',
          'Preventing model overfitting across diverse vocal pitch ranges.',
        ],
        results: [
          'Achieved 85% emotion classification accuracy using MFCC-based feature sets.',
        ],
        techStack: ['Python', 'CNN', 'RNN', 'LSTM', 'MFCC', 'Scikit-Learn', 'NumPy'],
      },
    },
  ],

  milestones: [
    {
      id: 'iiit-allahabad-ml',
      title: 'Machine Learning and Neural Networks Certification',
      organization: 'IIIT Allahabad',
      year: 'July 2025',
      date: 'July 2025',
      type: 'certification',
      details:
        'Completed specialized certification focusing on applied machine learning algorithms, deep neural network architectures, backpropagation, and hands-on model training.',
      skills: ['Neural Networks', 'Machine Learning', 'Deep Learning', 'Python'],
      badgeColor: '#a855f7',
    },
    {
      id: 'uit-python-ds',
      title: 'Python for Data Science Certification',
      organization: 'United Institute of Technology (UIT)',
      year: 'August 2024',
      date: 'August 2024',
      type: 'certification',
      details:
        'Comprehensive training in Python data pipelines, NumPy array manipulation, Pandas dataframes, Matplotlib visualization, and data wrangling methodologies.',
      skills: ['Python', 'Data Science', 'Pandas', 'NumPy'],
      badgeColor: '#06b6d4',
    },
    {
      id: 'gdg-web-quiz',
      title: 'Web Development Quiz (Top 5)',
      organization: 'GDG On Campus UIT',
      year: 'July 2025',
      date: 'July 2025',
      type: 'award',
      details:
        'Recognized among the Top 5 top-performing competitors in a web development tournament evaluating full-stack concepts, JavaScript fundamentals, and UI engineering.',
      skills: ['Web Development', 'JavaScript', 'Problem Solving', 'UI/UX'],
      badgeColor: '#10b981',
    },
    {
      id: 'cwh-data-science',
      title: 'Data Science Course',
      organization: 'Code With Harry',
      year: 'March 2026',
      date: 'March 2026',
      type: 'certification',
      details:
        'Rigorous course covering the complete data science lifecycle from exploratory data analysis and feature engineering to model deployment and evaluation metrics.',
      skills: ['Data Science', 'Scikit-Learn', 'EDA', 'Model Deployment'],
      badgeColor: '#3b82f6',
    },
    {
      id: 'ecell-ideathon',
      title: 'Ideathon Participation Certificate',
      organization: 'E-Cell UIT, United Incubation Hub',
      year: 'Innovation Sprint',
      date: 'Innovation Sprint',
      type: 'event',
      details:
        'Collaborated on conceptualizing and architecting tech-enabled business solutions addressing real-world operational bottlenecks during an intense innovation sprint.',
      skills: ['Product Thinking', 'System Architecture', 'Rapid Prototyping'],
      badgeColor: '#f59e0b',
    },
  ],

  educationHistory: [
    {
      qualification: 'B.Tech in Computer Science & Engineering (AI & ML)',
      institution: 'United Institute Of Technology',
      board: 'Dr. APJ Abdul Kalam Technical University',
      year: '2023 - 2027',
      highlights: 'Focus on Artificial Intelligence, Machine Learning, Deep Learning, Data Science, and Full Stack Engineering.',
    },
    {
      qualification: 'Intermediate (12th Grade)',
      institution: 'Green View Public School',
      board: 'CBSE Board',
      year: '2021',
      highlights: 'Science & Mathematics stream with strong foundational physics and computer science.',
    },
    {
      qualification: 'High School (10th Grade)',
      institution: 'G.D Memorial Children’s Academy',
      board: 'CBSE Board',
      year: '2019',
      highlights: 'Secondary education with distinctions in Science and Mathematics.',
    },
  ],

  extraCurricular: {
    activity: 'College Volleyball Team',
    description: 'Represented college volleyball team, improving teamwork, discipline, leadership, and on-court tactical strategy.',
  },

  faqKnowledge: [
    {
      question: 'Who is Harsh Shukla?',
      answer:
        'Harsh Shukla is an AI & Machine Learning Engineer and B.Tech CSE (AI & ML) student at United Institute of Technology, Dr. APJ Abdul Kalam Technical University (2023-2027). He specializes in machine learning models, computer vision, natural language processing, and full-stack web applications.',
      keywords: ['who', 'harsh', 'about', 'introduction', 'profile', 'bio'],
      action: { label: 'View About Section', link: '#about' },
    },
    {
      question: 'What projects has Harsh built?',
      answer:
        'Harsh has built 5 major projects:\n1. Smart Healthcare Remote Monitoring System (React.js, Node.js, Firebase, ML)\n2. Twitter Sentiment Analysis Platform (Python, NLP, Scikit-learn, NLTK, Streamlit — +12% accuracy)\n3. Face Recognition Attendance Monitoring System (Python, OpenCV, Tkinter — 90% accuracy, 85% effort reduction)\n4. Murder Mystery Detective Game (Node.js, Express.js, SQLite)\n5. Speech Recognition System (Python, CNN, RNN, LSTM — 85% accuracy with MFCCs)',
      keywords: ['project', 'projects', 'built', 'portfolio', 'work', 'showcase'],
      action: { label: 'Explore Projects', link: '#projects' },
    },
    {
      question: 'What technologies and skills does Harsh know?',
      answer:
        'Harsh’s core skills:\n• Languages: Python, C++, JavaScript, SQL\n• Frontend: HTML, CSS, React.js, Tailwind CSS\n• Backend: Node.js, Express.js, Flask\n• Databases: MongoDB, MySQL, Firebase, Supabase, SQLite\n• Tools: Git, GitHub, Postman, VS Code\n• Core Concepts: DSA, OOP, DBMS, Operating Systems\n• Technologies: Machine Learning, NLP, Deep Learning, REST APIs',
      keywords: ['skills', 'technologies', 'tech stack', 'languages', 'python', 'react', 'tools'],
      action: { label: 'View Tech Stack', link: '#skills' },
    },
    {
      question: 'Tell me about the Smart Healthcare project.',
      answer:
        'The Smart Healthcare Remote Monitoring System is a full-stack platform built with React.js, Node.js, Firebase, and ML. It enables real-time patient telemetry, doctor-patient dashboards, and predictive health risk score anomaly detection. Live Demo: https://smart-health-rontend.onrender.com',
      keywords: ['healthcare', 'smart health', 'medical', 'hospital', 'patient'],
      action: { label: 'Open Live Demo', link: 'https://smart-health-rontend.onrender.com' },
    },
    {
      question: 'What is Harsh’s educational background?',
      answer:
        'Harsh’s education:\n1. United Institute Of Technology (B.Tech in CSE AI & ML) — Dr. APJ Abdul Kalam Technical University (2023-2027)\n2. Green View Public School (Intermediate, CBSE Board, 2021)\n3. G.D Memorial Children’s Academy (High School, CBSE Board, 2019)',
      keywords: ['education', 'college', 'degree', 'cgpa', 'university', 'uit', 'school', 'board', 'akktu'],
      action: { label: 'View Education', link: '#milestones' },
    },
    {
      question: 'What certifications does Harsh hold?',
      answer:
        'Harsh holds verified certifications in:\n1. Machine Learning and Neural Networks Certification — IIIT Allahabad (July 2025)\n2. Python for Data Science Certification — UIT (August 2024)\n3. Web Development Quiz (Top 5) — GDG On Campus UIT (July 2025)\n4. Data Science Course — Code With Harry (March 2026)\n5. Ideathon Participation Certificate — E-Cell UIT, United Incubation Hub',
      keywords: ['certification', 'certificates', 'awards', 'iiit', 'recognition', 'achievement', 'training'],
      action: { label: 'View Milestones', link: '#milestones' },
    },
    {
      question: 'How can I contact or hire Harsh?',
      answer:
        'You can reach Harsh directly:\n• Email: shuklaharsh0207@gmail.com\n• Phone: +91 86018 45515\n• GitHub: github.com/Harshshukla49\n• LinkedIn: linkedin.com/in/harshshukla110724',
      keywords: ['contact', 'hire', 'email', 'phone', 'reach', 'linkedin', 'github', 'message', 'job'],
      action: { label: 'Go to Contact Form', link: '#contact' },
    },
    {
      question: 'Where can I download Harsh’s resume?',
      answer:
        'You can download Harsh’s official PDF resume directly using the Download Resume button on the hero section or navbar.',
      keywords: ['resume', 'cv', 'download', 'pdf', 'document'],
      action: { label: 'Download Resume', link: '/Harsh_Shukla_Resume.pdf' },
    },
  ],
};
