import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PricingPlan from "@/lib/models/PricingPlan"

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    await connectDB()
    const body = await req.json()
    const plan = await PricingPlan.findByIdAndUpdate(id, body, { new: true })
    if (!plan) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(plan)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    await connectDB()
    await PricingPlan.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
