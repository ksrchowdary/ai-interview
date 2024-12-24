export function passwordResetTemplate(data: { resetLink: string }) {
  return `
    <h1>Reset Your Password</h1>
    <p>Click the button below to reset your password:</p>
    <a href="${data.resetLink}" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:4px;">
      Reset Password
    </a>
    <p>If you didn't request this, please ignore this email.</p>
  `;
}