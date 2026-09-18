import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBrain,
  FaXmark,
  FaPaperPlane,
  FaWandMagicSparkles,
  FaRotateLeft,
  FaRobot,
  FaUser,
  FaArrowUpRightFromSquare,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVolumeHigh,
  FaVolumeXmark,
  FaCopy,
  FaCheck,
  FaBolt,
  FaStar,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaLayerGroup,
  FaGithub,
  FaGlobe,
  FaCircleCheck,
  FaStop,
} from 'react-icons/fa6';
import { askHarshAI, AIMessage, RichCard, ProjectCardData, SkillCardData, RecruiterMatchData } from '../services/aiService';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

type PromptCategory = 'projects' | 'aiml' | 'fullstack' | 'match' | 'credentials' | 'contact';

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "👋 **Welcome to HARSH AI Portfolio Intelligence!**\n\nI am Harsh Shukla's interactive neural assistant. I am equipped with real-time portfolio intelligence to assist recruiters, engineers, and collaborators in exploring:\n\n• 🚀 **Verified AI & Full-Stack Projects** (Live demos, metrics & architecture)\n• 🧠 **Technical Skills & Frameworks** (Python, React, DL, OpenCV, Node.js)\n• 🎯 **Recruiter Role Match Evaluations** (Instant suitability score & highlights)\n• 🎓 **Education & Certifications** (UIT / AKTU B.Tech & IIIT Allahabad)\n• 📬 **Direct Contact & Hiring** (Resume PDF, Email, Phone, LinkedIn)\n\nSelect a topic below or speak directly to begin.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: [
        'Evaluate Harsh for an AI/ML role.',
        'What projects has Harsh built?',
        'Tell me about his healthcare project.',
        'Show his full tech stack matrix.',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeCategory, setActiveCategory] = useState<PromptCategory>('projects');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Categorized Quick Prompts
  const categoryTabs = [
    { id: 'projects' as PromptCategory, label: 'Projects', icon: FaLayerGroup },
    { id: 'aiml' as PromptCategory, label: 'AI & ML', icon: FaBrain },
    { id: 'fullstack' as PromptCategory, label: 'Full Stack', icon: FaCode },
    { id: 'match' as PromptCategory, label: 'Recruiter Match', icon: FaBriefcase },
    { id: 'credentials' as PromptCategory, label: 'Credentials', icon: FaGraduationCap },
    { id: 'contact' as PromptCategory, label: 'Contact', icon: FaBolt },
  ];

  const categoryPrompts: Record<PromptCategory, string[]> = {
    projects: [
      'What projects has Harsh built?',
      'Tell me about his healthcare project.',
      'Tell me about his Twitter Sentiment project.',
      'Tell me about his Face Recognition project.',
      'Tell me about his Speech Emotion project.',
    ],
    aiml: [
      'What are his core AI & ML skills?',
      'Tell me about his Computer Vision experience.',
      'How does his Speech Emotion model work?',
      'What is his proficiency in Python?',
    ],
    fullstack: [
      'Show his full tech stack matrix.',
      'What are his React & Web Development skills?',
      'Tell me about his GDG Web Dev ranking.',
      'What databases does Harsh know?',
    ],
    match: [
      'Evaluate Harsh for an AI / ML Engineer role.',
      'Evaluate Harsh for a Full-Stack Developer role.',
      'Evaluate Harsh for a Data Scientist role.',
      'Why should I hire Harsh Shukla?',
    ],
    credentials: [
      'What is Harsh’s educational background?',
      'What certifications does Harsh have?',
      'Tell me about his IIIT Allahabad certification.',
      'Download his official resume PDF.',
    ],
    contact: [
      'How can I contact or hire Harsh?',
      'Where can I download his resume?',
      'What are Harsh’s LinkedIn and GitHub?',
      'Is Harsh available for internships/full-time?',
    ],
  };

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Clean markdown for text-to-speech
  const cleanMarkdownForVoice = (raw: string): string => {
    return raw
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) -> text
      .replace(/[*#_`~>•]/g, '') // remove formatting symbols
      .replace(/👋|🚀|🧠|🎯|🎓|📬|🏥|📊|👁️|🎙️|🕵️|💻|⚡|📜|🥇|💡|🏛️|🏫|🏐|📧|📱|💼|🐙|📍|📥|✉️|🤖|🧬|📝|⚛️|⚙️|🗄️|🛠️|🏆|🔤|✨/g, '') // strip emojis
      .trim();
  };

  // Stop Speech
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }
  }, []);

  // Text to Speech
  const speakMessage = useCallback((id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMsgId === id) {
      stopSpeaking();
      return;
    }

    stopSpeaking();
    const cleanText = cleanMarkdownForVoice(text);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.02;
    utterance.pitch = 1.02;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) =>
        (v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Neural'))) ||
        v.lang.startsWith('en')
    );
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onstart = () => setSpeakingMsgId(id);
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    window.speechSynthesis.speak(utterance);
  }, [speakingMsgId, stopSpeaking]);

  // Stop speech on close
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isOpen, stopSpeaking, isListening]);

  // Speech to Text (Microphone)
  const toggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuery(transcript);
          handleSend(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await askHarshAI(textToSend);

      const assistantMsgId = `ai-${Date.now()}`;
      const assistantMessage: AIMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: response.action,
        suggestedQuestions: response.suggestedQuestions,
        richCard: response.richCard,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (voiceEnabled) {
        speakMessage(assistantMsgId, response.text);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-error-${Date.now()}`,
          sender: 'assistant',
          text: "An error occurred while querying the portfolio knowledge base. Please feel free to reach Harsh directly at shuklaharsh0207@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    stopSpeaking();
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "✨ **Neural Chat Reset!**\n\nAsk me anything about Harsh's AI projects, skills, certifications, or evaluate him for your team's open roles.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          'Evaluate Harsh for an AI/ML role.',
          'What projects has Harsh built?',
          'Tell me about his healthcare project.',
          'How can I contact Harsh?',
        ],
      },
    ]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Section Teleportation Handler
  const handleActionClick = (link: string) => {
    if (link.startsWith('#')) {
      onClose();
      setTimeout(() => {
        const targetEl = document.querySelector(link);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    }
  };

  // Rich Markdown Text Formatter
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      if (!line.trim()) {
        return <div key={lineIdx} className="h-1.5" />;
      }

      const parts = [];
      const inlineRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
      let lastIndex = 0;
      let match;
      let keyIdx = 0;

      while ((match = inlineRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(
            <span key={keyIdx++}>{line.substring(lastIndex, match.index)}</span>
          );
        }

        if (match[2] && match[3]) {
          const isExternal =
            match[3].startsWith('http') ||
            match[3].startsWith('mailto:') ||
            match[3].startsWith('tel:') ||
            match[3].endsWith('.pdf');
          parts.push(
            <a
              key={keyIdx++}
              href={match[3]}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="text-cyan-300 font-semibold underline underline-offset-2 hover:text-cyan-100 transition-colors"
            >
              {match[2]}
            </a>
          );
        } else if (match[4]) {
          parts.push(
            <strong key={keyIdx++} className="font-bold text-white tracking-wide">
              {match[4]}
            </strong>
          );
        } else if (match[5]) {
          parts.push(
            <em key={keyIdx++} className="italic text-purple-200">
              {match[5]}
            </em>
          );
        }
        lastIndex = inlineRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(<span key={keyIdx++}>{line.substring(lastIndex)}</span>);
      }

      return (
        <div key={lineIdx} className="leading-relaxed">
          {parts.length > 0 ? parts : line}
        </div>
      );
    });
  };

  // Render Rich Card inside chat
  const renderRichCard = (card: RichCard) => {
    if (card.type === 'project') {
      const proj = card.data as ProjectCardData;
      return (
        <div className="mt-3 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-purple-950/20 to-black/60 p-3.5 sm:p-4 text-left shadow-lg backdrop-blur-md">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-block rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2 py-0.5 text-[0.65rem] font-mono font-bold text-cyan-300 uppercase tracking-wider mb-1">
                {proj.badge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                {proj.title}
              </h4>
            </div>
            {proj.liveUrl && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 text-[0.6rem] font-mono text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE
              </span>
            )}
          </div>

          <p className="mt-1.5 text-xs text-slate-300 font-mono text-cyan-200/90 font-medium">
            ⚡ {proj.metrics}
          </p>

          <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
            {proj.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {proj.tech.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[0.65rem] font-mono text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-3.5 flex flex-wrap gap-2 pt-2.5 border-t border-white/10">
            {proj.liveUrl && (
              <a
                href={proj.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-xs font-mono font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all"
              >
                <FaGlobe className="text-[0.7rem]" />
                <span>Launch Demo</span>
                <FaArrowUpRightFromSquare className="text-[0.65rem]" />
              </a>
            )}
            {proj.githubUrl && (
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-mono font-bold text-slate-200 hover:border-white/40 hover:bg-white/10 transition-all"
              >
                <FaGithub className="text-[0.7rem]" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      );
    }

    if (card.type === 'projects_list') {
      const list = card.data as ProjectCardData[];
      return (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {list.map((p, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-purple-500/30 bg-white/[0.02] p-3 hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[0.6rem] font-mono font-bold text-purple-300 uppercase">
                    {p.category}
                  </span>
                  <span className="text-[0.6rem] font-mono text-cyan-300">
                    {p.badge}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-white line-clamp-1">{p.title}</h5>
                <p className="mt-1 text-[0.7rem] text-slate-400 line-clamp-2">{p.description}</p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[0.65rem] font-mono text-slate-500">
                  {p.tech.slice(0, 2).join(', ')}
                </span>
                <button
                  onClick={() => handleActionClick('#projects')}
                  className="text-[0.65rem] font-mono font-bold text-cyan-300 hover:text-cyan-100 flex items-center gap-1"
                >
                  <span>View</span>
                  <FaArrowUpRightFromSquare className="text-[0.55rem]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (card.type === 'skill_matrix') {
      const matrices = card.data as SkillCardData[];
      return (
        <div className="mt-3 space-y-3">
          {matrices.map((group, gIdx) => (
            <div
              key={gIdx}
              className="rounded-2xl border border-purple-500/25 bg-black/40 p-3.5 backdrop-blur-sm"
            >
              <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono mb-2.5 flex items-center gap-1.5">
                <FaBolt className="text-[0.7rem] text-cyan-400" />
                {group.category}
              </h5>
              <div className="space-y-2.5">
                {group.skills.map((s, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-slate-200">{s.name}</span>
                      <span className="font-mono font-bold text-cyan-300">{s.level}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.level}%` }}
                        transition={{ duration: 0.8, delay: sIdx * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (card.type === 'recruiter_match') {
      const match = card.data as RecruiterMatchData;
      return (
        <div className="mt-3 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-black/80 to-purple-950/20 p-4 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-left backdrop-blur-md">
          {/* Header & Gauge */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <span className="inline-block rounded-md border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-mono font-bold text-emerald-300 uppercase tracking-wider">
                Role Match Analysis
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                {match.role}
              </h4>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-400/50 bg-emerald-500/10 px-3.5 py-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <span className="text-lg sm:text-xl font-mono font-black text-emerald-300">
                {match.matchScore}%
              </span>
              <span className="text-[0.6rem] font-mono uppercase text-emerald-400">
                Match
              </span>
            </div>
          </div>

          <p className="mt-2.5 text-xs text-emerald-200/90 font-mono font-medium">
            ✅ {match.verdict}
          </p>

          {/* Highlights */}
          <div className="mt-3 space-y-1.5">
            {match.highlights.map((h, hIdx) => (
              <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                <FaCircleCheck className="text-emerald-400 text-[0.75rem] shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Recommended Projects */}
          <div className="mt-3 pt-2.5 border-t border-white/10">
            <span className="text-[0.65rem] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              Key Relevant Projects:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {match.recommendedProjects.map((p, pIdx) => (
                <span
                  key={pIdx}
                  className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[0.65rem] font-mono text-purple-200"
                >
                  🚀 {p}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Contact CTA */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[0.7rem] font-mono text-slate-400">
              Direct Contact: <strong className="text-cyan-300">{match.contactCta}</strong>
            </span>
            <button
              onClick={() => handleActionClick('#contact')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-3.5 py-1.5 text-xs font-mono font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:brightness-110 transition-all"
            >
              <span>Schedule Interview</span>
              <FaArrowUpRightFromSquare className="text-[0.65rem]" />
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Conversational AI Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl -z-10"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative flex h-[680px] max-h-[94vh] w-full max-w-2xl flex-col rounded-3xl border border-purple-500/40 bg-gradient-to-b from-[#0e0e18] via-[#090910] to-[#040407] shadow-[0_25px_90px_rgba(168,85,247,0.35)] backdrop-blur-2xl text-left overflow-hidden"
            >
              {/* Top Cyber HUD Accents */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-purple-500 animate-pulse" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-5 py-3.5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-cyan-400 to-indigo-500 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                    <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-black">
                      <FaBrain className="text-cyan-300 text-lg animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">HARSH AI</h3>
                      <span className="flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-mono text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        ONLINE
                      </span>
                    </div>
                    <p className="text-[0.65rem] font-mono text-slate-400">
                      Portfolio Intelligence • Real-Time Voice & Recruiter Evaluator
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Voice Toggle */}
                  <button
                    onClick={() => {
                      if (voiceEnabled) stopSpeaking();
                      setVoiceEnabled(!voiceEnabled);
                    }}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                      voiceEnabled
                        ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                        : 'border-white/10 bg-white/5 text-slate-500 hover:text-slate-300'
                    }`}
                    title={voiceEnabled ? 'Voice Readout: ON' : 'Voice Readout: OFF'}
                  >
                    {voiceEnabled ? <FaVolumeHigh className="text-xs" /> : <FaVolumeXmark className="text-xs" />}
                  </button>

                  {/* Reset Button */}
                  <button
                    onClick={handleReset}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:text-white transition-all"
                    title="Reset Conversation"
                  >
                    <FaRotateLeft className="text-xs" />
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:text-white transition-all"
                    aria-label="Close AI Chat"
                  >
                    <FaXmark className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  const isSpeakingThis = speakingMsgId === msg.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 sm:gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/40 text-cyan-300 mt-1">
                          <FaRobot className="text-xs" />
                        </div>
                      )}

                      <div
                        className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                          isUser
                            ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white rounded-tr-none'
                            : 'border border-white/10 bg-white/[0.04] text-slate-200 rounded-tl-none backdrop-blur-md'
                        }`}
                      >
                        <div className="space-y-1">{renderFormattedText(msg.text)}</div>

                        {/* Rich Structured Card */}
                        {msg.richCard && renderRichCard(msg.richCard)}

                        {/* Interactive Direct Action Button */}
                        {msg.action && (
                          <div className="mt-3 pt-2.5 border-t border-white/10">
                            <a
                              href={msg.action.link}
                              target={
                                msg.action.link.startsWith('http') ||
                                msg.action.link.endsWith('.pdf') ||
                                msg.action.link.startsWith('mailto:') ||
                                msg.action.link.startsWith('tel:')
                                  ? '_blank'
                                  : undefined
                              }
                              rel={
                                msg.action.link.startsWith('http') ||
                                msg.action.link.endsWith('.pdf')
                                  ? 'noopener noreferrer'
                                  : undefined
                              }
                              onClick={() => handleActionClick(msg.action!.link)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600/40 to-cyan-500/40 border border-cyan-400/50 px-3.5 py-1.5 text-xs font-mono font-bold text-cyan-200 hover:from-purple-600/60 hover:to-cyan-500/60 hover:border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
                            >
                              <span>{msg.action.label}</span>
                              <FaArrowUpRightFromSquare className="text-[0.65rem]" />
                            </a>
                          </div>
                        )}

                        {/* Suggested Follow-up Prompts */}
                        {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                            {msg.suggestedQuestions.map((q) => (
                              <button
                                key={q}
                                onClick={() => handleSend(q)}
                                className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-2 py-1 text-[0.65rem] font-mono text-purple-200 hover:border-purple-400 hover:bg-purple-500/20 transition-all text-left"
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Footer Controls: Audio Readout, Copy, Timestamp */}
                        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[0.6rem] text-slate-500 font-mono">
                          {!isUser ? (
                            <div className="flex items-center gap-2">
                              {/* Speak / Stop Button */}
                              <button
                                onClick={() => speakMessage(msg.id, msg.text)}
                                className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
                                title={isSpeakingThis ? 'Stop Audio' : 'Listen with AI Voice'}
                              >
                                {isSpeakingThis ? (
                                  <>
                                    <FaStop className="text-[0.65rem] text-rose-400 animate-pulse" />
                                    <span className="text-rose-400 font-bold">Stop Voice</span>
                                  </>
                                ) : (
                                  <>
                                    <FaVolumeHigh className="text-[0.65rem]" />
                                    <span>Read Aloud</span>
                                  </>
                                )}
                              </button>

                              {/* Audio Equalizer animation when speaking */}
                              {isSpeakingThis && (
                                <div className="flex items-end gap-0.5 h-3 px-1">
                                  <span className="w-0.5 bg-cyan-400 animate-pulse h-2" />
                                  <span className="w-0.5 bg-purple-400 animate-bounce h-3" />
                                  <span className="w-0.5 bg-cyan-300 animate-pulse h-1.5" />
                                  <span className="w-0.5 bg-emerald-400 animate-bounce h-2.5" />
                                </div>
                              )}

                              {/* Copy Button */}
                              <button
                                onClick={() => copyToClipboard(msg.text, msg.id)}
                                className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
                                title="Copy to clipboard"
                              >
                                {copiedId === msg.id ? (
                                  <>
                                    <FaCheck className="text-[0.65rem] text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <FaCopy className="text-[0.65rem]" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          ) : (
                            <div />
                          )}

                          <span>{msg.timestamp}</span>
                        </div>
                      </div>

                      {isUser && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 mt-1">
                          <FaUser className="text-xs" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-3 justify-start items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/40 text-cyan-300">
                      <FaRobot className="text-xs animate-spin" />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-mono text-slate-400 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span>Neural Engine Reasoning & Formatting Intelligence...</span>
                    </div>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Categorized Quick Prompt Navigation Tabs */}
              <div className="border-t border-white/10 px-3 sm:px-4 py-2 bg-black/60 backdrop-blur-md">
                {/* Category Pills */}
                <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar pb-1.5">
                  {categoryTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveCategory(tab.id)}
                        className={`shrink-0 flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-[0.65rem] font-mono font-bold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600/80 to-cyan-500/80 text-white border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                            : 'border border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="text-[0.65rem]" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Category Prompt Pills */}
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-1">
                  {categoryPrompts[activeCategory].map((p) => (
                    <button
                      key={p}
                      onClick={() => handleSend(p)}
                      className="shrink-0 rounded-lg border border-purple-500/20 bg-purple-500/5 px-2.5 py-1 text-[0.65rem] font-mono text-purple-200 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-white transition-all whitespace-nowrap"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area with Voice STT & Send */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 border-t border-white/10 p-3 sm:p-4 bg-black/85"
              >
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all ${
                    isListening
                      ? 'border-rose-500 bg-rose-500/20 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.6)] animate-pulse'
                      : 'border-white/15 bg-white/[0.03] text-slate-400 hover:border-cyan-400/60 hover:text-cyan-300'
                  }`}
                  title={isListening ? 'Listening... Click to stop' : 'Speak with Microphone'}
                >
                  {isListening ? (
                    <FaMicrophoneSlash className="text-sm text-rose-300" />
                  ) : (
                    <FaMicrophone className="text-sm" />
                  )}
                </button>

                {/* Text Input */}
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={
                    isListening
                      ? '🎙️ Listening... Speak your question now'
                      : "Ask anything about Harsh's AI projects, skills, education..."
                  }
                  className={`flex-1 rounded-2xl border px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                    isListening
                      ? 'border-rose-400/60 bg-rose-950/20 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                      : 'border-white/15 bg-white/[0.03] focus:border-cyan-400/60 focus:bg-white/[0.06]'
                  }`}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isLoading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 transition-all"
                  aria-label="Send Message"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
