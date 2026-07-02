import type { IconType } from 'react-icons';
import { FaBrain, FaCode, FaLaptopCode } from 'react-icons/fa6';
import { SiGit, SiMongodb, SiNodedotjs, SiReact, SiTypescript } from 'react-icons/si';

export type SkillCategory = {
  title: string;
  icon: IconType;
  items: string[];
};

export type Project = {
  title: string;
  tech: string[];
  description: string;
  live?: string;
  github?: string;
};

export type Milestone = {
  title: string;
  organization: string;
  details: string;
};

export const owner = {
  name: 'Harsh Shukla',
  role: 'AI & Machine Learning Engineer',
  tagline: 'Building Intelligent Solutions with AI, Machine Learning & Full Stack Development',
  email: 'shuklaharsh0207@gmail.com',
  phone: '+91 8601845515',
  github: 'https://github.com/Harshshukla49',
  linkedIn: 'https://linkedin.com/in/harshshukla110724',
};

export const stats = [
  { label: 'Projects', value: '5+' },
  { label: 'AIML Student', value: 'Student' },
  { label: 'Certifications', value: '2+' },
  { label: 'Python Developer', value: 'Primary' },
];

export const skillGroups: SkillCategory[] = [
  {
    title: 'Languages',
    icon: SiTypescript,
    items: ['Python', 'C++', 'JavaScript', 'SQL'],
  },
  {
    title: 'Frontend',
    icon: SiReact,
    items: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: SiNodedotjs,
    items: ['Node.js', 'Express.js', 'Flask'],
  },
  {
    title: 'Databases',
    icon: SiMongodb,
    items: ['MongoDB', 'MySQL', 'Firebase', 'Supabase'],
  },
  {
    title: 'AI & ML',
    icon: FaBrain,
    items: ['Machine Learning', 'Deep Learning', 'NLP', 'Scikit-learn'],
  },
  {
    title: 'Tools',
    icon: SiGit,
    items: ['Git', 'GitHub', 'Postman', 'VS Code'],
  },
];

export const projects: Project[] = [
  {
    title: 'Smart Healthcare Remote Monitoring System',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Machine Learning'],
    description:
      'Full-stack healthcare monitoring platform with real-time patient tracking, doctor dashboards, and AI-powered predictions.',
    live: 'https://smart-health-rontend.onrender.com',
    github: owner.github,
  },
  {
    title: 'Twitter Sentiment Analysis Platform',
    tech: ['Python', 'NLP', 'NLTK', 'Scikit-learn', 'Streamlit'],
    description: 'Processed 1000+ tweets and improved sentiment classification using machine learning techniques.',
    github: owner.github,
  },
  {
    title: 'Face Recognition Attendance System',
    tech: ['Python', 'OpenCV', 'Tkinter'],
    description: 'Automated attendance management system with 90% facial recognition accuracy.',
    github: owner.github,
  },
  {
    title: 'Speech Emotion Recognition System',
    tech: ['CNN', 'RNN', 'LSTM', 'Python'],
    description: 'Deep learning model capable of detecting emotions from speech signals.',
    github: owner.github,
  },
  {
    title: 'Murder Mystery Detective Game',
    tech: ['Node.js', 'Express.js', 'SQLite'],
    description: 'Interactive detective game featuring authentication, REST APIs, and optimized database queries.',
    github: owner.github,
  },
];

export const certifications: Milestone[] = [
  {
    title: 'Machine Learning & Neural Networks',
    organization: 'IIIT Allahabad',
    details: 'Focused on applied ML, neural architectures, and practical model development.',
  },
  {
    title: 'Python for Data Science',
    organization: 'UIT',
    details: 'Strengthened Python workflows for analysis, automation, and data handling.',
  },
  {
    title: 'Data Science Course',
    organization: 'CodeWithHarry',
    details: 'Built core foundations across data analysis, visualization, and ML pipelines.',
  },
  {
    title: 'GDG Web Development Quiz',
    organization: 'Top 5',
    details: 'Recognized among the top performers in a competitive web development quiz.',
  },
  {
    title: 'Ideathon Participation',
    organization: 'E-Cell UIT',
    details: 'Participated in problem-solving and innovation-driven ideation sessions.',
  },
];

export const education = {
  institution: 'United Institute of Technology',
  degree: 'B.Tech Computer Science (AIML)',
  cgpa: '7.2',
  graduation: '2027',
};

export const aboutPoints = [
  'I am a B.Tech Computer Science (AI & ML) student passionate about Artificial Intelligence, Machine Learning, Data Science, and Full Stack Development.',
  'I enjoy building intelligent applications that combine powerful algorithms with beautiful user experiences.',
  'I continuously learn emerging technologies and transform innovative ideas into impactful software solutions.',
];

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];
