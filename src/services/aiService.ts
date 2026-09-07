import { portfolioData } from '../data/portfolioData';

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action?: { label: string; link: string };
  suggestedQuestions?: string[];
}

export async function askHarshAI(query: string): Promise<{
  text: string;
  action?: { label: string; link: string };
  suggestedQuestions?: string[];
}> {
  const normalized = query.toLowerCase().trim();

  // Artificial short neural thinking latency for realistic AI UX
  await new Promise((resolve) => setTimeout(resolve, 400));

  // 1. Check exact / keyword matches against verified knowledge base
  for (const item of portfolioData.faqKnowledge) {
    if (item.keywords.some((k) => normalized.includes(k))) {
      return {
        text: item.answer,
        action: item.action,
        suggestedQuestions: [
          'What projects has Harsh built?',
          'What technologies does Harsh know?',
          'How can I contact Harsh?',
        ],
      };
    }
  }

  // 2. Check for Specific Projects by name
  for (const proj of portfolioData.projects) {
    const titleWords = proj.title.toLowerCase().split(' ');
    if (titleWords.some((w) => w.length > 3 && normalized.includes(w))) {
      return {
        text: `${proj.title} is a ${proj.category} project.\n\nDescription: ${proj.description}\n\nTech Stack: ${proj.tech.join(', ')}.\nKey Problem Solved: ${proj.caseStudy.problem}`,
        action: proj.liveUrl
          ? { label: 'Open Live Demo', link: proj.liveUrl }
          : { label: 'Explore Projects', link: '#projects' },
      };
    }
  }

  // 3. Check for specific Skill / Language / Database
  const matchedSkill = portfolioData.skills.find(
    (s) => normalized.includes(s.name.toLowerCase()) || normalized.includes(s.category.toLowerCase())
  );
  if (matchedSkill) {
    return {
      text: `Yes! Harsh is highly skilled in ${matchedSkill.name} (${matchedSkill.level}% proficiency).\nCategory: ${matchedSkill.category.toUpperCase()}\nDetails: ${matchedSkill.description}`,
      action: { label: 'View Skills Section', link: '#skills' },
    };
  }

  // 4. Default / Strict Fallback response (Guarantees NO hallucinations)
  return {
    text: `I don't have verified information regarding "${query}" in Harsh's portfolio record.\n\nHarsh specializes in AI & Machine Learning, Computer Vision, NLP, and Full-Stack development. Feel free to contact Harsh directly at ${portfolioData.personal.email} or call ${portfolioData.personal.phone}!`,
    action: { label: 'Contact Harsh Directly', link: '#contact' },
    suggestedQuestions: [
      'What projects has Harsh built?',
      'What are his core AI skills?',
      'Tell me about his healthcare project.',
      'How can I contact Harsh?',
    ],
  };
}
