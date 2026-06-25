import mongoose, { Schema, Document } from "mongoose"

export interface ICTAButton {
  label: string
  url: string
  enabled: boolean
}

export interface ISiteSettings extends Document {
  // Business Info
  businessName: string
  tagline: string
  phone: string
  email: string
  address: string
  hoursWeekday: string
  hoursWeekend: string
  // Announcement bar
  announcementBar: string
  // Social
  facebookUrl: string
  tiktokUrl: string
  // SEO
  metaTitle: string
  metaDescription: string
  // Service areas
  serviceAreas: string[]

  // ── CTA Buttons ──
  // Hero section
  heroPrimaryLabel: string
  heroPrimaryUrl: string
  heroSecondaryLabel: string
  heroSecondaryUrl: string
  // Navbar
  navBookLabel: string
  navBookUrl: string
  // CTA section (bottom of every page)
  ctaHeading: string
  ctaSubtext: string
  ctaPrimaryLabel: string
  ctaPrimaryUrl: string
  ctaSecondaryLabel: string
  ctaSecondaryUrl: string
  ctaFooterNote: string
  // Floating CTA (desktop)
  floatingCallLabel: string
  floatingTextLabel: string
  // Mobile sticky bar
  mobileBarCallLabel: string
  mobileBarBookLabel: string
  mobileBarBookUrl: string
  // Footer book button
  footerBookLabel: string
  footerBookUrl: string

  createdAt: Date
  updatedAt: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName:    { type: String, default: "Niagara Pet Waste Removal" },
    tagline:         { type: String, default: "Niagara's #1 Pet Waste Removal Service" },
    phone:           { type: String, default: "289-788-1319" },
    email:           { type: String, default: "dogpoopcrew@gmail.com" },
    address:         { type: String, default: "16 Empire St, Welland, ON L3B 2L2, Canada" },
    hoursWeekday:    { type: String, default: "Mon–Sat: 8am – 6pm" },
    hoursWeekend:    { type: String, default: "Sunday: Closed" },
    announcementBar: { type: String, default: "🐾  Formerly Dog Poo Crew  ✦  FREE First Visit with any 4-week commitment" },
    facebookUrl:     { type: String, default: "https://www.facebook.com/share/1PJZjsTAEf/" },
    tiktokUrl:       { type: String, default: "https://www.tiktok.com/@dogpoocrew" },
    metaTitle:       { type: String, default: "Niagara Pet Waste Removal | Professional Yard Cleaning Services" },
    metaDescription: { type: String, default: "Niagara's #1 pet waste removal service. Keeping yards clean, one scoop at a time." },
    serviceAreas:    [{ type: String }],

    // Hero
    heroPrimaryLabel:   { type: String, default: "Get Free Visit" },
    heroPrimaryUrl:     { type: String, default: "/contact" },
    heroSecondaryLabel: { type: String, default: "289-788-1319" },
    heroSecondaryUrl:   { type: String, default: "tel:+12897881319" },

    // Navbar
    navBookLabel: { type: String, default: "Book Now" },
    navBookUrl:   { type: String, default: "/contact#quote" },

    // CTA Section
    ctaHeading:        { type: String, default: "Ready for a Cleaner Yard?" },
    ctaSubtext:        { type: String, default: "Join hundreds of happy pet owners in Niagara. Get started with your FREE first visit!" },
    ctaPrimaryLabel:   { type: String, default: "Book Now" },
    ctaPrimaryUrl:     { type: String, default: "/contact#quote" },
    ctaSecondaryLabel: { type: String, default: "289-788-1319" },
    ctaSecondaryUrl:   { type: String, default: "tel:+12897881319" },
    ctaFooterNote:     { type: String, default: "No contracts required • Cancel anytime • 100% satisfaction guarantee" },

    // Floating CTA
    floatingCallLabel: { type: String, default: "289-788-1319" },
    floatingTextLabel: { type: String, default: "Text Us" },

    // Mobile sticky bar
    mobileBarCallLabel: { type: String, default: "289-788-1319" },
    mobileBarBookLabel: { type: String, default: "Book Now" },
    mobileBarBookUrl:   { type: String, default: "/contact#quote" },

    // Footer
    footerBookLabel: { type: String, default: "Book Free Visit" },
    footerBookUrl:   { type: String, default: "/contact" },
  },
  { timestamps: true }
)

export default mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema)
