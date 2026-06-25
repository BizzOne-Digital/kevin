import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Submission from "@/lib/models/Submission"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()
    const sub = await Submission.findByIdAndUpdate(params.id, body, { new: true })
    if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(sub)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    await Submission.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
