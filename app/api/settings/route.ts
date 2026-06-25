import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import SiteSettings from "@/lib/models/SiteSettings"

export async function GET() {
  try {
    await connectDB()
    let settings = await SiteSettings.findOne()
    // Auto-create defaults if nothing exists yet
    if (!settings) {
      settings = await SiteSettings.create({})
    }
    return NextResponse.json(settings)
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    let settings = await SiteSettings.findOne()
    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, body, { new: true })
    } else {
      settings = await SiteSettings.create(body)
    }
    return NextResponse.json(settings)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
