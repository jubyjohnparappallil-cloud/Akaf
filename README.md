# Booking Page (No Backend)

A fully static booking page that:
- Sends a **confirmation email** to the client (via EmailJS)
- Sends a **WhatsApp message** to the business with booking details

## How It Works

```
Client clicks "Book Now" → Fills form → Submit
                                          ↓
                              Email sent to client (EmailJS)
                                          ↓
                              WhatsApp opens with booking details for business
```

No server. No backend. Just HTML + CSS + JS.

---

## Setup (One-Time, 5 minutes)

### Step 1: Create a free EmailJS account

1. Go to [https://www.emailjs.com](https://www.emailjs.com) and sign up
2. Free plan = 200 emails/month

### Step 2: Connect your email service

1. Go to **Email Services** → Add New Service
2. Choose Gmail / Outlook / any provider
3. Connect your account
4. Note down the **Service ID** (e.g., `service_abc123`)

### Step 3: Create an email template

1. Go to **Email Templates** → Create New Template
2. Use this template content:

**Subject:** Booking Confirmation - {{to_name}}

**Body:**
```
Hi {{to_name}},

Thank you for your booking!

Here are your details:
- Date: {{date}}
- Phone: {{phone}}
- Special Request: {{message}}

We'll confirm your booking shortly.

Best regards,
[Your Business Name]
```

3. In template settings, set **To Email** to: `{{to_email}}`
4. Note down the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get your Public Key

1. Go to **Account** → General
2. Copy your **Public Key**

### Step 5: Update app.js

Open `app.js` and replace these values:

```javascript
const EMAILJS_PUBLIC_KEY = 'your_actual_public_key';
const EMAILJS_SERVICE_ID = 'your_actual_service_id';
const EMAILJS_TEMPLATE_ID = 'your_actual_template_id';
const BUSINESS_WHATSAPP = '919876543210';  // Your business WhatsApp number
```

### Step 6: Deploy

Upload all files to any free static hosting:
- **GitHub Pages** (free)
- **Netlify** (free, drag & drop)
- **Vercel** (free)

Or just open `index.html` in a browser to test locally.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `style.css` | Styling (mobile-friendly) |
| `app.js` | Form logic, EmailJS, WhatsApp redirect |

---

## FAQ

**Q: Is it really free?**
A: Yes. EmailJS free tier = 200 emails/month. WhatsApp link is free forever.

**Q: What if I need more than 200 emails/month?**
A: EmailJS paid plans start at $10/month for 1000 emails. Or switch to Formspree/Resend.

**Q: Where does the QR code point?**
A: Your designer creates a QR code that links to wherever you host this page (e.g., `https://yourdomain.com/booking-page/`).
