import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Service from "@/lib/models/Service"

export async function GET() {
  try {
    await connectDB()
    const services = await Service.find({ active: true }).sort({ order: 1 })
    return NextResponse.json(services)
  } catch {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const service = await Service.create(body)
    return NextResponse.json(service, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
