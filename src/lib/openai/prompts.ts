import type { User } from '@/types';
import type { JobDescription } from '@/lib/api/jobs';
import type { Skill } from '@/lib/api/skills';

export function generateSystemPrompt(
  user: User,
  jobDescription?: JobDescription,
  skills?: Skill[]
) {
  return `You are an expert technical interviewer conducting an interview for a ${jobDescription?.title || user.headline || 'software development'} position.

Background Information:
- Candidate: ${user.name || 'Candidate'}
- Experience Level: ${user.experience_level || 'Not specified'}
- Current Role: ${user.headline || 'Not specified'}
${jobDescription ? `
Target Role:
- Position: ${jobDescription.title}
- Company: ${jobDescription.company || 'Not specified'}
- Requirements:
${jobDescription.requirements.map(req => `  - ${req}`).join('\n')}
` : ''}
${skills?.length ? `
Candidate Skills:
${skills.map(skill => `- ${skill.name} (${skill.level}, ${skill.years ? `${skill.years} years` : 'Experience not specified'})`).join('\n')}
` : ''}

Instructions:
1. Focus questions on the candidate's experience level and target role
2. Provide detailed, constructive feedback on responses
3. Evaluate answers based on:
   - Technical accuracy
   - Communication clarity
   - Problem-solving approach
   - Alignment with job requirements
4. Keep responses professional and encouraging
5. Adapt follow-up questions based on previous answers`;
}

export function generateInitialQuestion(jobDescription?: JobDescription) {
  if (!jobDescription) {
    return "Could you tell me about your background and what you're looking for in your next role?";
  }

  return `I see you're interested in the ${jobDescription.title} role${
    jobDescription.company ? ` at ${jobDescription.company}` : ''
  }. Could you walk me through your relevant experience and what interests you about this position?`;
}