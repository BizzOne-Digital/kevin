import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PricingPlan from "@/lib/models/PricingPlan"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()
    const plan = await PricingPlan.findByIdAndUpdate(params.id, body, { new: true })
    if (!plan) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(plan)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    await PricingPlan.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
