# Niagara Pet Waste Removal — Setup Guide

## Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

---

## 1. Configure Environment Variables

Edit `.env.local` and set your MongoDB URI:

```
MONGODB_URI=mongodb://localhost:27017/niagara-pet-waste
```

For **MongoDB Atlas** (production), replace with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/niagara-pet-waste
```

Change `NEXTAUTH_SECRET` to a strong random string for production:
```
NEXTAUTH_SECRET=some-random-long-secret-string
```

---

## 2. Seed the Database (run once)

This populates MongoDB with all default content (services, pricing, FAQs, testimonials, settings, and the first admin user).

```bash
npm run seed
```

Output:
```
✅ Connected to MongoDB
✅ Admin user created → dogpoopcrew@gmail.com
✅ Site settings created
✅ Services seeded (4)
✅ Pricing plans seeded (6)
✅ Testimonials seeded (4)
✅ FAQs seeded (6)
🎉 Seed complete!
```

---

## 3. Start the Dev Server

```bash
npm run dev
```

---

## 4. Access the Admin Portal

Visit: **http://localhost:3000/admin**

Login credentials:
- **Email:** `dogpoopcrew@gmail.com`
- **Password:** `NiagaraAdmin2024!`

> ⚠️ Change the password after first login (via Settings page or MongoDB directly).

---

## Admin Portal Pages

| Page | URL | What you can do |
|------|-----|-----------------|
| Dashboard | `/admin` | View submission stats & recent enquiries |
| Submissions | `/admin/submissions` | View, status-track, and delete contact form submissions |
| Services | `/admin/services` | Add / edit / delete services shown on the website |
| Pricing | `/admin/pricing` | Add / edit / delete pricing plans and add-ons |
| Testimonials | `/admin/testimonials` | Add / edit / delete customer reviews |
| FAQs | `/admin/faqs` | Add / edit / delete FAQ questions |
| Settings | `/admin/settings` | Edit phone, email, hours, social links, announcement bar, service areas, SEO |

---

## MongoDB Collections

| Collection | Purpose |
|-----------|---------|
| `adminusers` | Admin login accounts |
| `sitesettings` | Global site settings (phone, email, hours, etc.) |
| `services` | Services shown on /services page |
| `pricingplans` | Plans shown on /pricing page |
| `testimonials` | Reviews shown in testimonials carousel |
| `faqs` | FAQ accordion on /pricing page |
| `submissions` | Contact form submissions (saved + email notification sent) |

---

## Deploying to Production

1. Set environment variables on your hosting platform (Vercel, etc.)
2. Use a MongoDB Atlas URI for `MONGODB_URI`
3. Set `NEXTAUTH_URL` to your live domain (e.g., `https://niagarapetwasteremoval.ca`)
4. Run the seed script once against your production DB
