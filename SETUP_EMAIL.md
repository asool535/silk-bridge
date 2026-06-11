# Email Service Setup Guide

This guide explains how to set up Resend email service for your Silk Bridge Trading website.

## 📋 Overview

Your contact form now sends emails using **Resend**, a modern email service built for developers.

**Features:**
- ✅ Email to your business inbox
- ✅ Auto-reply confirmation emails to customers
- ✅ Multilingual email templates (EN, 中文, العربية)
- ✅ Email validation
- ✅ No setup fees (100 free emails/day)

## 🚀 Setup Steps

### Step 1: Create Resend Account

1. Go to **https://resend.com**
2. Click **"Sign Up"**
3. Create account with your email
4. Verify your email address

### Step 2: Get API Key

1. Log in to Resend dashboard
2. Go to **Settings → API Keys**
3. Click **"Create API Key"**
4. Copy the API key (starts with `re_`)

### Step 3: Local Setup (For Testing)

1. Open `.env.local` file in your project
2. Replace `your_resend_api_key_here` with your actual API key:
   ```
   RESEND_API_KEY=re_your_actual_key_here
   ```
3. Save the file

### Step 4: Vercel Deployment Setup

When you deploy to Vercel:

1. Go to **https://vercel.com/dashboard**
2. Select your **`silk-bridge`** project
3. Click **Settings → Environment Variables**
4. Add a new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** (Paste your Resend API key)
5. Click **Save**
6. Redeploy your project

## 📧 Email Configuration

### Admin Email Address

Currently, emails are sent to: `info@silkbridgetrading.com`

To change this, edit `api/send-email.js`:
```javascript
to: 'your-email@example.com', // Change this
```

### Sender Email

Default sender: `Silk Bridge Trading <onboarding@resend.dev>`

To use a custom domain:
1. Go to Resend dashboard
2. Add your domain
3. Follow DNS verification steps
4. Update sender address in `api/send-email.js`

## 🧪 Testing

### Local Testing

1. Start local server:
   ```bash
   python3 -m http.server 8000
   ```

2. Fill out contact form
3. Submit
4. Check for success/error message

### Important

When testing locally, Resend API calls will work if `.env.local` is properly configured.

## 📝 Email Templates

### Admin Email
When a customer submits a form, you receive:
- Customer's name, email, company, and message
- Formatted HTML email
- Reply-to set to customer's email

### Customer Confirmation Email
Customer automatically receives:
- Confirmation message
- Expected response time (24 hours)
- Available in their selected language

## 🌍 Supported Languages

Emails are sent in the language the user selected:
- **English** (EN)
- **Chinese** (中文)
- **Arabic** (العربية)

## 🔒 Security Notes

- **Never commit** `.env.local` with real API keys
- API keys are stored securely in Vercel environment variables
- All emails are validated before sending
- HTML content is escaped to prevent injection

## 🆘 Troubleshooting

### Emails not sending?

1. **Check API Key:**
   ```bash
   echo $RESEND_API_KEY  # Should show your key (local testing)
   ```

2. **Verify in Vercel:**
   - Go to Project Settings
   - Check Environment Variables section
   - Ensure variable is set

3. **Check Admin Email:**
   - Verify `info@silkbridgetrading.com` is correct
   - Check spam/junk folder

4. **Review Function Logs:**
   - In Vercel dashboard
   - Go to Deployments → Function logs
   - Look for error messages

### Emails going to spam?

1. Verify sender domain in Resend
2. Add SPF/DKIM records
3. See Resend documentation for details

## 📞 Contact & Support

- **Resend Support:** https://resend.com/support
- **Resend Docs:** https://resend.com/docs
- **Email Delivery Status:** Check Resend dashboard analytics

## 🔄 Testing Checklist

- [ ] API key obtained from Resend
- [ ] `.env.local` updated with API key (local)
- [ ] Environment variable added in Vercel
- [ ] Contact form submits successfully
- [ ] Confirmation email received (check spam)
- [ ] Admin email received at your inbox
- [ ] Both emails in correct language

## 📚 File Structure

```
silk-bridge/
├── api/
│   └── send-email.js      # Serverless function for emails
├── .env.local             # Local environment variables
├── vercel.json            # Vercel configuration
├── index.html             # Updated contact form
├── script.js              # Updated form submission
└── SETUP_EMAIL.md         # This file
```

## 🚀 Next Steps

1. ✅ Set up Resend account and get API key
2. ✅ Update `.env.local` locally
3. ✅ Commit and push to GitHub
4. ✅ Deploy to Vercel
5. ✅ Add environment variable in Vercel
6. ✅ Test contact form

---

**Need help?** Check the Resend documentation or contact their support team.

**Last Updated:** June 11, 2026
