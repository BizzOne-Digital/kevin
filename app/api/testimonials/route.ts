import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Testimonial from "@/lib/models/Testimonial"

export async function GET() {
  try {
    await connectDB()
    const testimonials = await Testimonial.find({ active: true }).sort({ order: 1 })
    return NextResponse.json(testimonials)
  } catch {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const testimonial = await Testimonial.create(body)
    return NextResponse.json(testimonial, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
