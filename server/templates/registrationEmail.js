/**
 * Hackathon Registration Confirmation Email Template
 * Sender Name: MatruCare AI (never include candidate name in sender)
 * Trigger: Hackathon Registration
 * Content: Confirmation with participant name, event, team details, domain, project name
 */
export const registrationEmailTemplate = (data) => {
  const teamMembersHTML = data.teamMembers && data.teamMembers.length > 0
    ? `
      <div style="margin-top: 20px;">
        <h3 style="color: #667eea; margin-bottom: 10px;">Team Members:</h3>
        ${data.teamMembers.map((member, index) => `
          <p style="margin: 5px 0;">
            <strong>Member ${index + 1}:</strong> ${member.memberName} (${member.memberEmail})
          </p>
        `).join('')}
      </div>
    `
    : '<p style="margin-top: 20px;"><strong>Team Type:</strong> Solo Participant</p>';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmation — MatruCare AI Hackathon</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 650px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          text-align: center;
          color: white;
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
          font-weight: bold;
        }
        .success-icon {
          font-size: 60px;
          margin: 20px 0;
        }
        .content {
          padding: 40px 30px;
        }
        .content h2 {
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }
        .content p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
        }
        .info-box {
          background-color: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .info-row {
          display: flex;
          margin-bottom: 10px;
        }
        .info-label {
          font-weight: bold;
          color: #333;
          min-width: 150px;
        }
        .info-value {
          color: #666;
        }
        .highlight-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin: 30px 0;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        .divider {
          border-top: 1px solid #e0e0e0;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="success-icon">✅</div>
          <h1>MatruCare AI Hackathon</h1>
          <p style="margin: 10px 0 0 0;">Registration Successful!</p>
        </div>
        <div class="content">
          <h2>Congratulations, ${data.fullName}! 🎉</h2>
          <p style="text-align: center;">
            You have successfully registered for the <strong>MatruCare AI Hackathon</strong>.
          </p>
          
          <div class="highlight-box">
            <h3 style="margin: 0 0 10px 0;">Project: ${data.projectName}</h3>
            <p style="margin: 0;">Domain / Track: ${data.domain}</p>
          </div>

          <div class="info-box">
            <h3 style="color: #667eea; margin-top: 0;">Registration Details:</h3>
            
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Mobile:</strong> ${data.mobile}</p>
            
            <div class="divider"></div>
            
            <p><strong>College:</strong> ${data.college}</p>
            <p><strong>Course:</strong> ${data.course}</p>
            <p><strong>Branch:</strong> ${data.branch}</p>
            <p><strong>Year:</strong> ${data.year}</p>
            
            <div class="divider"></div>
            
            <p><strong>Team Size:</strong> ${data.teamSize}</p>
            ${teamMembersHTML}
            
            <div class="divider"></div>
            
            <p><strong>PPT Link:</strong> <a href="${data.pptLink}" style="color: #667eea;">${data.pptLink}</a></p>
            <p><strong>Prototype Link:</strong> <a href="${data.prototypeLink}" style="color: #667eea;">${data.prototypeLink}</a></p>
            ${data.demoVideoLink ? `<p><strong>Demo Video:</strong> <a href="${data.demoVideoLink}" style="color: #667eea;">${data.demoVideoLink}</a></p>` : ''}
          </div>

          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 0; color: #856404;">
              <strong>⚠️ Important:</strong> Please keep this email for your records. 
              You will receive further updates about the hackathon via email at 
              <strong>matrucareai@gmail.com</strong>.
            </p>
          </div>

          <p style="text-align: center; margin-top: 30px;">
            <strong>Next Steps:</strong><br>
            Our team will review your submission and contact you with further details.
          </p>
        </div>
        <div class="footer">
          <p><strong>MatruCare AI</strong> | matrucareai@gmail.com | Full Stack Developer Internship Programme</p>
          <p>&copy; ${new Date().getFullYear()} MatruCare AI. All rights reserved.</p>
          <p>This is an automated email, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};