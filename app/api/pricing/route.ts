import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PricingPlan from "@/lib/models/PricingPlan"

export async function GET() {
  try {
    await connectDB()
    const plans = await PricingPlan.find({ active: true }).sort({ category: 1, order: 1 })
    return NextResponse.json(plans)
  } catch {
    return NextResponse.json({ error: "Failed to fetch pricing" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const plan = await PricingPlan.create(body)
    return NextResponse.json(plan, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
