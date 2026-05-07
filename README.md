# Wow Shotz Studio — Next.js Website + Admin Dashboard

Premium photography studio website with admin dashboard for Tirunelveli's most loved studio.

## 🚀 Getting Started

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
/app
  /                   → Home page (hero video, services, portfolio, testimonials)
  /about              → About page (story, team, values)
  /portfolio          → Portfolio with category filter
  /details            → Packages, pricing & FAQ
  /shop               → Print shop with cart
  /blog               → Blog listing with featured post
  /contact            → Contact form + map
  /admin
    /login            → Admin login (admin@wowshotz.com / Admin@123456)
    /dashboard        → Stats, quick actions, recent inquiries
    /projects         → Portfolio management
    /products         → Shop products management
    /blogs            → Blog post management
    /services         → Services management
    /team             → Team management
    /testimonials     → Reviews management
    /inquiries        → Enquiry inbox
    /settings         → Studio settings

/components
  /layout             → Navigation, Footer, PublicLayout
  /sections           → Hero, Marquee, Stats, Services, FeaturedWork, About, Testimonials
  /chatbot            → AI Chatbot (powered by Claude API)
```

## ✨ Features

- **Luxury light theme** — cream, ivory & gold palette
- **AI Chatbot** — Claude-powered, knows all studio details
- **Video hero** — autoplay background with overlay
- **Mobile responsive** — all pages mobile-friendly
- **SEO optimised** — metadata, OG tags, structured data
- **Shop with cart** — WhatsApp checkout
- **Admin dashboard** — full CRUD for all content
- **Smooth animations** — Framer Motion throughout

## 🔑 Admin Login
- Email: `admin@wowshotz.com`
- Password: `Admin@123456`

## 📞 Studio Details
- **Phone**: 096558 37868
- **WhatsApp**: [wa.me/9655837868](https://wa.me/9655837868)
- **Address**: 94G/2, 1st Main Rd, Kodeeswaran Nagar, Pettai, Tirunelveli 627004
- **Hours**: Mon–Sun, 9 AM – 8 PM

## 🛠 Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Framer Motion
- Tailwind CSS
- Claude AI (Anthropic API)

## 🌐 Deploy
```bash
npm run build
# Deploy to Vercel, Netlify, or your server
```
