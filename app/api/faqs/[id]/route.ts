import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import FAQ from "@/lib/models/FAQ"

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    await connectDB()
    const body = await req.json()
    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true })
    if (!faq) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(faq)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    await connectDB()
    await FAQ.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
