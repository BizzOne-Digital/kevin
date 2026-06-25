import mongoose, { Schema, Document } from "mongoose"

export interface IPricingPlan extends Document {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular: boolean
  badge: string | null
  cta: string
  category: "main" | "addon"
  order: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const PricingPlanSchema = new Schema<IPricingPlan>(
  {
    name:        { type: String, required: true },
    price:       { type: String, required: true },
    period:      { type: String, required: true },
    description: { type: String, required: true },
    features:    [{ type: String }],
    popular:     { type: Boolean, default: false },
    badge:       { type: String, default: null },
    cta:         { type: String, default: "Book Now" },
    category:    { type: String, enum: ["main", "addon"], default: "main" },
    order:       { type: Number, default: 0 },
    active:      { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.PricingPlan ||
  mongoose.model<IPricingPlan>("PricingPlan", PricingPlanSchema)
