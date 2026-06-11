# Domain Setup with Resend

This guide helps you configure your custom domain `slkbridge.com` with Resend email service.

## ✅ Current Configuration

- **API Key:** Configured ✓
- **Email Address:** info@slkbridge.com ✓
- **Domain:** slkbridge.com
- **Sender Address:** noreply@slkbridge.com

## 🔧 Domain Configuration in Resend

To ensure emails are properly authenticated and don't go to spam, you need to configure your domain in Resend.

### Step 1: Add Domain in Resend

1. Log in to **Resend Dashboard** (https://resend.com)
2. Go to **Domains**
3. Click **Add Domain**
4. Enter: `slkbridge.com`
5. Click **Add**

### Step 2: Get DNS Records

Resend will provide 3 DNS records to add:
- **DKIM Record**
- **SPF Record**
- **DMARC Record**

### Step 3: Update DNS (Domain Provider)

1. Go to your domain registrar/hosting provider (GoDaddy, Namecheap, etc.)
2. Access your **DNS Settings**
3. Add the three records provided by Resend
4. Save changes

**Note:** DNS propagation can take 24-48 hours.

### Step 4: Verify Domain

1. Go back to Resend dashboard
2. Click **Verify** for your domain
3. Wait for verification (usually instant after DNS propagates)

## ✉️ Email Configuration

### Sender Email
- **From Address:** `noreply@slkbridge.com`
- **From Name:** `Silk Bridge Trading`

### Admin Inbox
- **Receives at:** `info@slkbridge.com`

### Customer Notifications
- **Auto-reply from:** `noreply@slkbridge.com`
- **To:** Customer's email

## 📊 Email Headers

All emails sent will include:
```
From: Silk Bridge Trading <noreply@slkbridge.com>
To: [customer email or info@slkbridge.com]
Reply-To: [customer email]
Domain: slkbridge.com
```

## 🔒 Authentication

Once domain is verified, your emails will have:
- ✅ **DKIM** - Digital signature
- ✅ **SPF** - Sender authentication
- ✅ **DMARC** - Policy specification

This ensures:
- Better inbox placement
- Lower spam score
- Brand reputation protection

## 📧 Testing Domain

Once domain is configured:

1. Submit contact form on your website
2. Check:
   - Admin email arrives at `info@slkbridge.com`
   - Confirmation email arrives at your test email
   - Emails don't go to spam
   - "From" address shows `Silk Bridge Trading <noreply@slkbridge.com>`

## 🆘 Troubleshooting

### Emails still going to spam?

1. Verify all 3 DNS records are added correctly
2. Wait 48 hours for full DNS propagation
3. Check DNS propagation: https://dnschecker.org
4. Contact Resend support if issues persist

### Domain verification failing?

1. Ensure DNS records are exactly as specified
2. Wait for DNS propagation
3. Try verification again after 1 hour

### Emails not sending from domain?

1. Check domain is verified in Resend
2. Verify API key is correct
3. Check `.env.local` has correct API key (local)
4. Check Vercel environment variables have API key (production)

## 📞 Support

- **Resend Support:** https://resend.com/support
- **Resend Docs:** https://resend.com/docs
- **Your Registrar Support:** Contact your domain provider

## 🚀 Next Steps

1. ✅ Add domain in Resend dashboard
2. ✅ Copy DNS records
3. ✅ Add DNS records to your domain provider
4. ✅ Verify domain in Resend
5. ✅ Test by submitting contact form
6. ✅ Monitor email delivery

---

**Timeline:**
- Add domain: 2 minutes
- DNS propagation: 24-48 hours
- Domain verification: Instant after DNS propagates
- Testing: Once verified

**Last Updated:** June 11, 2026
