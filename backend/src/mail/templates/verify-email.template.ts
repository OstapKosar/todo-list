import { MailResponseDto } from 'src/mail/dto/mail.response-dto';
import * as path from 'path';

export const verifyEmailTemplate = (
  email: string,
  code: string,
  userName?: string,
): MailResponseDto => {
  const greeting = userName ? `Hello ${userName}` : 'Hello';

  return {
    recipients: [email],
    subject: 'Verify Your Account - Smart Tasks Matrix',
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(process.cwd(), 'src/assets/logo.png'),
        cid: 'logo',
      },
    ],
    html: `
		<!DOCTYPE html>
		<html lang="en">
		<head>
		  <meta charset="UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <title>Account Verification</title>
		  <style>
			body {
			  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			  line-height: 1.6;
			  color: #333;
			  max-width: 600px;
			  margin: 0 auto;
			  padding: 20px;
			  background-color: #f8f9fa;
			}
			.container {
			  background: white;
			  border-radius: 8px;
			  padding: 40px;
			  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			}
			.header {
			  text-align: center;
			  margin-bottom: 30px;
			}
			.logo-container {
			  margin-bottom: 20px;
			}
			.logo {
			  width: 60px;
			  height: 60px;
			}
			.logo img {
			  width: 60px;
			  height: 60px;
			}
			.app-name {
			  font-size: 20px;
			  font-weight: 600;
			  color: #2563eb;
			  vertical-align: middle;
			}
			.verification-code {
			  background: #f3f4f6;
			  border: 2px dashed #d1d5db;
			  border-radius: 8px;
			  padding: 20px;
			  text-align: center;
			  margin: 30px 0;
			}
			.code {
			  font-size: 32px;
			  font-weight: bold;
			  color: #2563eb;
			  letter-spacing: 4px;
			  font-family: 'Courier New', monospace;
			}
			.footer {
			  margin-top: 30px;
			  padding-top: 20px;
			  border-top: 1px solid #e5e7eb;
			  font-size: 14px;
			  color: #6b7280;
			  text-align: center;
			}
			.button {
			  display: inline-block;
			  background: #2563eb;
			  color: white;
			  padding: 12px 24px;
			  text-decoration: none;
			  border-radius: 6px;
			  margin: 20px 0;
			}
		  </style>
		</head>
		<body>
		  <div class="container">
			<div class="header">
			  <div class="logo-container">
				<table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
				  <tr>
					<td style="padding-right: 10px;">
					  <div class="logo">
						<img src="cid:logo" alt="Smart Tasks Matrix Logo" />
					  </div>
					</td>
					<td>
					  <div class="app-name">Smart Tasks Matrix</div>
					</td>
				  </tr>
				</table>
			  </div>
			  <h1>📝 Verify Your Account</h1>
			</div>
			
			<p>${greeting}!</p>
			
			<p>Thanks for joining Smart Tasks Matrix! To activate your account and start managing your tasks efficiently, please verify your email address using the code below:</p>
			
			<div class="verification-code">
			  <div class="code">${code}</div>
			</div>
			
			<p><strong>Important:</strong></p>
			<ul>
			  <li>This code will expire in 5 minutes</li>
			  <li>If you didn't create an account, please ignore this email</li>
			  <li>For security reasons, never share this code with anyone</li>
			</ul>
			
			<p>Once verified, you'll be able to:</p>
			<ul>
			  <li>Create and manage your projects</li>
			  <li>Organize tasks with due dates and priorities</li>
			  <li>Collaborate with team members</li>
			  <li>Track your productivity</li>
			</ul>
			
			<div class="footer">
			  <p>This email was sent by Smart Tasks Matrix. If you have any questions, please contact our support team.</p>
			  <p>&copy; 2025 Smart Tasks Matrix. All rights reserved.</p>
			</div>
		  </div>
		</body>
		</html>
	  `,
    text: `
  ${greeting}!
  
  Thanks for joining Smart Tasks Matrix! To activate your account and start managing your tasks efficiently, please verify your email address using the code below:
  
  Verification Code: ${code}
  
  This code will expire in 5 minutes.
  
  Important:
  - If you didn't create an account, please ignore this email
  - For security reasons, never share this code with anyone
  
  Once verified, you'll be able to:
  - Create and manage your projects
  - Organize tasks with due dates and priorities
  - Collaborate with team members
  - Track your productivity
  
  This email was sent by Smart Tasks Matrix. If you have any questions, please contact our support team.
  
  © 2025 Smart Tasks Matrix. All rights reserved.
	  `.trim(),
  };
};
