export function sessionReportTemplate(data: {
  totalSessions: number;
  averageScore: number;
  timeSpent: number;
  topSkills: string[];
}) {
  return `
    <h1>Your Interview Progress Report</h1>
    <div style="margin:20px 0;">
      <h3>Overview</h3>
      <ul>
        <li>Total Sessions: ${data.totalSessions}</li>
        <li>Average Score: ${data.averageScore}%</li>
        <li>Time Spent: ${data.timeSpent} minutes</li>
      </ul>
    </div>
    <div style="margin:20px 0;">
      <h3>Top Performing Skills</h3>
      <ul>
        ${data.topSkills.map(skill => `<li>${skill}</li>`).join('')}
      </ul>
    </div>
  `;
}