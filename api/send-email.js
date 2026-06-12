// Serverless function to send emails using Resend
// Deploy to Vercel and set RESEND_API_KEY environment variable

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get form data from request body
    const { name, email, company, message, language } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if API key is configured
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Send email via Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Silk Bridge Trading <noreply@slkbridge.com>',
        to: 'info@slkbridge.com',
        replyTo: email,
        subject: `New Contact Form Submission - From ${name}`,
        html: generateEmailHTML(name, email, company, message, language),
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.json();
      console.error('Resend API error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // Also send confirmation email to the customer
    const confirmationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Silk Bridge Trading <noreply@slkbridge.com>',
        to: email,
        subject: getConfirmationSubject(language),
        html: generateConfirmationHTML(name, language),
      }),
    });

    if (!confirmationResponse.ok) {
      console.warn('Failed to send confirmation email, but main email was sent');
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Generate HTML email for admin
function generateEmailHTML(name, email, company, message, language) {
  const lang = language || 'en';
  const subject = {
    en: 'New Contact Form Submission',
    zh: '新的联系表格提交',
    ar: 'رسالة جديدة من نموذج الاتصال',
  };

  const labels = {
    en: { name: 'Name', email: 'Email', company: 'Company', message: 'Message' },
    zh: { name: '姓名', email: '电子邮件', company: '公司', message: '留言' },
    ar: { name: 'الاسم', email: 'البريد الإلكتروني', company: 'الشركة', message: 'الرسالة' },
  };

  const currentLabels = labels[lang] || labels.en;

  return `
    <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0a1428 0%, #1a2847 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-family: 'Space Grotesk', Arial, sans-serif;">${subject[lang] || subject.en}</h1>
      </div>

      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        <p><strong>${currentLabels.name}:</strong> ${name}</p>
        <p><strong>${currentLabels.email}:</strong> ${email}</p>
        <p><strong>${currentLabels.company}:</strong> ${company || 'N/A'}</p>

        <div style="background: white; padding: 15px; border-left: 4px solid #d4af37; margin-top: 20px;">
          <p><strong>${currentLabels.message}:</strong></p>
          <p style="white-space: pre-wrap; color: #555;">${escapeHtml(message)}</p>
        </div>
      </div>

      <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
        <p>Silk Bridge Trading © 2026 | www.slkbridge.com</p>
      </div>
    </div>
  `;
}

// Generate confirmation email for customer
function generateConfirmationHTML(name, language) {
  const lang = language || 'en';

  const messages = {
    en: {
      subject: 'Thank you for contacting Silk Bridge Trading',
      greeting: `Hello ${name},`,
      body: 'We have received your message and will get back to you within 24 hours.',
      thank: 'Thank you for your interest in Silk Bridge Trading!',
    },
    zh: {
      subject: '感谢您联系丝绸桥贸易',
      greeting: `您好 ${name},`,
      body: '我们已收到您的消息，将在24小时内与您联系。',
      thank: '感谢您对丝绸桥贸易的关注！',
    },
    ar: {
      subject: 'شكراً على الاتصال بنا',
      greeting: `مرحباً ${name},`,
      body: 'لقد استقبلنا رسالتك وسنرد عليك في غضون 24 ساعة.',
      thank: 'شكراً لك على اهتمامك بجسر الحرير للتجارة!',
    },
  };

  const content = messages[lang] || messages.en;

  return `
    <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0a1428 0%, #1a2847 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-family: 'Space Grotesk', Arial, sans-serif;">Silk Bridge Trading</h1>
      </div>

      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <p>${content.greeting}</p>
        <p>${content.body}</p>

        <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0;">
          <p style="margin: 0; color: #d4af37; font-weight: 600;">${content.thank}</p>
        </div>

        <p>Best regards,<br><strong>Silk Bridge Trading Team</strong></p>
      </div>

      <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
        <p>Silk Bridge Trading © 2026 | www.slkbridge.com | Guangzhou, China</p>
      </div>
    </div>
  `;
}

// Get confirmation email subject in different languages
function getConfirmationSubject(language) {
  const subjects = {
    en: 'Thank you for contacting Silk Bridge Trading',
    zh: '感谢您联系丝绸桥贸易',
    ar: 'شكراً على الاتصال بنا',
  };

  return subjects[language] || subjects.en;
}

// Escape HTML special characters
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
