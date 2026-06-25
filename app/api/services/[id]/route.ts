import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Service from "@/lib/models/Service"

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    await connectDB()
    const service = await Service.findById(id)
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(service)
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    await connectDB()
    const body = await req.json()
    const service = await Service.findByIdAndUpdate(id, body, { new: true })
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(service)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    await connectDB()
    await Service.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
