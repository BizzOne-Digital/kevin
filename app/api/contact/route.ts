import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { connectDB } from "@/lib/mongodb"
import Submission from "@/lib/models/Submission"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, service, message } = await req.json()

    // 1. Save to MongoDB
    await connectDB()
    await Submission.create({ name, phone, email, service, message })

    // 2. Send email notification
    await transporter.sendMail({
      from: `"Niagara Pet Waste Removal Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Quote Request — ${service || "Not specified"}`,
      html: `
        <h2 style="color:#1db954">New Quote Request from Website</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Email</td><td style="padding:8px;border:1px solid #ddd">${email || "Not provided"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Service</td><td style="padding:8px;border:1px solid #ddd">${service || "Not specified"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Message</td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>
        </table>
        <p style="color:#666;margin-top:16px">View all submissions in your <a href="${process.env.NEXTAUTH_URL}/admin/submissions" style="color:#1db954">Admin Portal</a></p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact error:", err)
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 })
  }
}
