import type { Interview } from '@/types';

export function interviewSummaryTemplate(data: { 
  interview: Interview;
  score: number;
  strengths: string[];
  improvements: string[];
}) {
  return `
    <h1>Your Interview Summary</h1>
    <h2>Interview: ${data.interview.title}</h2>
    <div style="margin:20px 0;">
      <strong>Overall Score:</strong> ${data.score}%
    </div>
    <div style="margin:20px 0;">
      <h3>Key Strengths</h3>
      <ul>
        ${data.strengths.map(s => `<li>${s}</li>`).join('')}
      </ul>
    </div>
    <div style="margin:20px 0;">
      <h3>Areas for Improvement</h3>
      <ul>
        ${data.improvements.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>
  `;
}