/**
 * Run once to seed the database with default content:
 *   npx tsx lib/seed.ts
 *
 * It is SAFE to re-run — it skips collections that already have data.
 */

import mongoose from "mongoose"
import bcrypt from "bcryptjs"

// Inline the URI so this script can run without full Next.js env loading
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/niagara-pet-waste"

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log("✅ Connected to MongoDB")

  const db = mongoose.connection.db!

  // ── Admin User ──────────────────────────────────────────────────────────────
  const adminCol = db.collection("adminusers")
  if ((await adminCol.countDocuments()) === 0) {
    const hash = await bcrypt.hash(
      process.env.ADMIN_SEED_PASSWORD || "NiagaraAdmin2024!",
      12
    )
    await adminCol.insertOne({
      name: "Kevin Pearce",
      email: "dogpoopcrew@gmail.com",
      password: hash,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    console.log("✅ Admin user created  →  dogpoopcrew@gmail.com")
  } else {
    console.log("⏭  Admin user already exists — skipped")
  }

  // ── Site Settings ───────────────────────────────────────────────────────────
  const settingsCol = db.collection("sitesettings")
  if ((await settingsCol.countDocuments()) === 0) {
    await settingsCol.insertOne({
      businessName: "Niagara Pet Waste Removal",
      tagline: "Niagara's #1 Pet Waste Removal Service",
      phone: "289-788-1319",
      email: "dogpoopcrew@gmail.com",
      address: "16 Empire St, Welland, ON L3B 2L2, Canada",
      hoursWeekday: "Mon–Sat: 8am – 6pm",
      hoursWeekend: "Sunday: Closed",
      announcementBar: "🐾  Formerly Dog Poo Crew  ✦  FREE First Visit with any 4-week commitment",
      serviceAreas: [
        "Niagara-on-the-Lake","St. Catharines","Niagara Falls","Port Colborne",
        "Welland","Thorold","Pelham","Fort Erie","Grimsby","Lincoln","West Lincoln","Wainfleet",
      ],
      facebookUrl: "https://www.facebook.com/share/1PJZjsTAEf/",
      tiktokUrl: "https://www.tiktok.com/@dogpoocrew",
      metaTitle: "Niagara Pet Waste Removal | Professional Yard Cleaning Services",
      metaDescription: "Niagara's #1 pet waste removal service. Keeping yards clean, one scoop at a time.",
      // CTA Buttons
      heroPrimaryLabel: "Get Free Visit",    heroPrimaryUrl: "/contact",
      heroSecondaryLabel: "289-788-1319",    heroSecondaryUrl: "tel:+12897881319",
      navBookLabel: "Book Now",              navBookUrl: "/contact#quote",
      ctaHeading: "Ready for a Cleaner Yard?",
      ctaSubtext: "Join hundreds of happy pet owners in Niagara. Get started with your FREE first visit!",
      ctaPrimaryLabel: "Book Now",           ctaPrimaryUrl: "/contact#quote",
      ctaSecondaryLabel: "289-788-1319",     ctaSecondaryUrl: "tel:+12897881319",
      ctaFooterNote: "No contracts required • Cancel anytime • 100% satisfaction guarantee",
      floatingCallLabel: "289-788-1319",     floatingTextLabel: "Text Us",
      mobileBarCallLabel: "289-788-1319",    mobileBarBookLabel: "Book Now", mobileBarBookUrl: "/contact#quote",
      footerBookLabel: "Book Free Visit",    footerBookUrl: "/contact",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    console.log("✅ Site settings created")
  } else {
    console.log("⏭  Site settings already exist — skipped")
  }

  // ── Services ────────────────────────────────────────────────────────────────
  const servicesCol = db.collection("services")
  if ((await servicesCol.countDocuments()) === 0) {
    await servicesCol.insertMany([
      {
        id: "weekly",
        icon: "Calendar",
        title: "Weekly & Bi-Weekly Dog Waste Pick-Up and Removal",
        subtitle: "Regular Maintenance",
        description:
          "Scheduled, reliable visits to keep your yard spotless week after week. Our most popular service — perfect for busy pet owners who want a consistently clean outdoor space without the hassle.",
        image: "/Weekly & Bi-Weekly.jpeg",
        serviceValue: "weekly",
        features: [
          "Scheduled visits on your preferred day",
          "Complete yard coverage every visit",
          "Waste properly bagged and disposed",
          "Text reminders before each visit",
          "Flexible rescheduling options",
          "No contracts required",
        ],
        pricing: [
          {
            plan: "Weekly",
            price: "Starting at $23.00",
            desc: "Dog poop cleaning with disposal",
          },
          {
            plan: "Bi-Weekly",
            price: "Starting at $33.50",
            desc: "Dog poop cleaning with disposal",
          },
        ],
        order: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "onetime",
        icon: "Sparkles",
        title: "One-Time Cleanups",
        subtitle: "Deep Clean Service",
        description:
          "Ideal before open houses, special occasions, gatherings, or seasonal clean ups. We will transform even the most neglected yards back to their original pristine state — fast.",
        image: "/One-Time Cleanups.jpeg",
        serviceValue: "onetime",
        features: [
          "Same-week service available",
          "Handles up to 3+ months of buildup",
          "Perfect before open houses & events",
          "Before/after photos provided",
          "Deodorizing treatment included",
          "Satisfaction guaranteed",
        ],
        pricing: [
          {
            plan: "Spring Clean Up",
            price: "Starting at $65.00",
            desc: "One-time clean of dog waste",
          },
        ],
        order: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "sanitizer",
        icon: "Droplets",
        title: "Sanitizer & Deodorizer Treatments",
        subtitle: "Odor Elimination",
        description:
          "Eliminate odors and maintain a fresh, pet-safe lawn. Our professional-grade treatments neutralize waste odors at the source, leaving your yard smelling clean and staying safe for kids and pets.",
        image: "/Sanitizer & Deodorizer Treatments.jpeg",
        serviceValue: "sanitizer",
        features: [
          "Professional-grade deodorizer",
          "Safe for pets, kids & plants",
          "Neutralizes odors instantly",
          "Eco-friendly formula",
          "Applied after every cleanup",
          "Long-lasting freshness",
        ],
        pricing: [
          {
            plan: "Sanitizer & Deodorizer",
            price: "$16.00",
            desc: "Per treatment",
          },
        ],
        order: 3,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "bucket",
        icon: "Trash2",
        title: "Bucket Service — Dog & Cat Poop Disposal",
        subtitle: "Bucket Service",
        description:
          "Bucket Service is the easiest and most hygienic way to manage your pet's waste. We provide and maintain a dedicated waste disposal bucket on your property — you scoop, we empty and sanitize weekly.",
        image: "/Bucket Service.jpeg",
        serviceValue: "bucket",
        features: [
          "Works for dogs AND cats",
          "Dedicated bucket provided",
          "Weekly emptying & sanitizing",
          "Bags and supplies included",
          "Odor control treatment",
          "Weather-resistant container",
        ],
        pricing: [
          {
            plan: "Bucket Service",
            price: "Only $9.00/week",
            desc: "Easiest way to manage pet waste",
          },
        ],
        order: 4,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    console.log("✅ Services seeded (4)")
  } else {
    console.log("⏭  Services already exist — skipped")
  }

  // ── Pricing Plans ───────────────────────────────────────────────────────────
  const pricingCol = db.collection("pricingplans")
  if ((await pricingCol.countDocuments()) === 0) {
    await pricingCol.insertMany([
      {
        name: "Weekly",
        price: "$23",
        period: "+",
        description: "Dog poop cleaning with disposal",
        badge: "Most Popular",
        popular: true,
        features: [
          "Weekly scheduled visits",
          "Complete yard coverage",
          "Waste properly bagged & disposed",
          "Text reminders before each visit",
          "Flexible rescheduling",
          "No contracts required",
        ],
        cta: "Book Now",
        category: "main",
        order: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bi-Weekly",
        price: "$33.50",
        period: "+",
        description: "Dog poop cleaning with disposal",
        badge: null,
        popular: false,
        features: [
          "Every 2 weeks service",
          "Complete yard coverage",
          "Waste properly bagged & disposed",
          "Text reminders before each visit",
          "Flexible scheduling",
          "No contracts required",
        ],
        cta: "Book Now",
        category: "main",
        order: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bucket Service",
        price: "$9",
        period: "/week",
        description: "Dog & cat poop disposal",
        badge: null,
        popular: false,
        features: [
          "Dedicated bucket provided",
          "Weekly emptying & sanitizing",
          "Works for dogs AND cats",
          "Bags & supplies included",
          "Odor control treatment",
          "Weather-resistant container",
        ],
        cta: "Book Now",
        category: "main",
        order: 3,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Spring Clean Up",
        price: "$65+",
        period: "",
        description: "One-time clean of dog waste",
        badge: null,
        popular: false,
        features: [
          "Same-week service available",
          "Handles up to 3+ months of buildup",
          "Perfect before open houses & events",
          "Satisfaction guaranteed",
        ],
        cta: "Book Now",
        category: "addon",
        order: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sanitizer & Deodorizer",
        price: "$16",
        period: "/treatment",
        description: "Eliminate odors, maintain a fresh lawn",
        badge: null,
        popular: false,
        features: [
          "Professional-grade deodorizer",
          "Safe for pets, kids & plants",
          "Eco-friendly formula",
          "Long-lasting freshness",
        ],
        cta: "Book Now",
        category: "addon",
        order: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "FREE First Visit",
        price: "FREE",
        period: "",
        description: "With any 4-week commitment",
        badge: "Special Offer",
        popular: false,
        features: [
          "Weekly or Bi-Weekly plan",
          "No payment until 2nd visit",
          "Full service included",
        ],
        cta: "Claim Offer",
        category: "addon",
        order: 3,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    console.log("✅ Pricing plans seeded (6)")
  } else {
    console.log("⏭  Pricing plans already exist — skipped")
  }

  // ── Testimonials ────────────────────────────────────────────────────────────
  const testimonialsCol = db.collection("testimonials")
  if ((await testimonialsCol.countDocuments()) === 0) {
    await testimonialsCol.insertMany([
      {
        name: "Sarah Mitchell",
        location: "St. Catharines",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Absolutely fantastic service! They show up on time every week and my yard has never looked better. My dogs are happy, and so am I. Highly recommend to any pet owner in Niagara!",
        order: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Michael Chen",
        location: "Niagara Falls",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "I was skeptical at first, but after one visit I was hooked. Professional, thorough, and affordable. They even send text reminders before each visit. Game changer for busy pet parents!",
        order: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Emily Rodriguez",
        location: "Welland",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Best decision I made this year! With 3 dogs, keeping up with the yard was impossible. Now I can actually enjoy my backyard again. The team is friendly and super reliable.",
        order: 3,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "David Thompson",
        location: "Thorold",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Outstanding service from start to finish. They handled my spring cleanup perfectly - you would never know I had let it go all winter. Fair prices and excellent communication.",
        order: 4,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    console.log("✅ Testimonials seeded (4)")
  } else {
    console.log("⏭  Testimonials already exist — skipped")
  }

  // ── FAQs ────────────────────────────────────────────────────────────────────
  const faqsCol = db.collection("faqs")
  if ((await faqsCol.countDocuments()) === 0) {
    await faqsCol.insertMany([
      {
        question: "How does the free first visit work?",
        answer:
          "When you sign up for any 4-week commitment (weekly or bi-weekly), your first visit is completely free! No payment required until your second scheduled service.",
        order: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Do I need to be home during service?",
        answer:
          "Not at all! As long as we have access to your yard, we can complete the service whether you are home or not. We will send you a text when we arrive and when we finish.",
        order: 2,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "What happens in bad weather?",
        answer:
          "We service in most weather conditions. However, if severe weather prevents service, we will reschedule to the next available day at no extra charge.",
        order: 3,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "How do you dispose of the waste?",
        answer:
          "All waste is double-bagged and disposed of according to local regulations. We never leave waste on your property or in public areas.",
        order: 4,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Can I skip a week or pause service?",
        answer:
          "Absolutely! Just let us know at least 24 hours in advance. There are no penalties for skipping visits or pausing your service.",
        order: 5,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "Are you insured?",
        answer:
          "Yes! We carry full liability insurance for your peace of mind. Documentation is available upon request.",
        order: 6,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    console.log("✅ FAQs seeded (6)")
  } else {
    console.log("⏭  FAQs already exist — skipped")
  }

  await mongoose.disconnect()
  console.log("\n🎉 Seed complete!")
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err)
  process.exit(1)
})
