import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Submission from "@/lib/models/Submission"

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    await connectDB()
    const body = await req.json()
    const sub = await Submission.findByIdAndUpdate(id, body, { new: true })
    if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(sub)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    await connectDB()
    await Submission.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
