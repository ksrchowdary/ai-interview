export function welcomeTemplate(data: { name: string }) {
  return `
    <h1>Welcome to InterviewAI, ${data.name}! 🎉</h1>
    <p>We're excited to help you prepare for your interviews.</p>
    <p>Here's what you can do to get started:</p>
    <ul>
      <li>Complete your profile</li>
      <li>Upload your resume</li>
      <li>Start your first practice interview</li>
    </ul>
    <p>Need help? Just reply to this email!</p>
  `;
}