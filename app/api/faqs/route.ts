import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import FAQ from "@/lib/models/FAQ"

export async function GET() {
  try {
    await connectDB()
    const faqs = await FAQ.find({ active: true }).sort({ order: 1 })
    return NextResponse.json(faqs)
  } catch {
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const faq = await FAQ.create(body)
    return NextResponse.json(faq, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
