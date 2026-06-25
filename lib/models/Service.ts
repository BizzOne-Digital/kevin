import mongoose, { Schema, Document } from "mongoose"

export interface IServicePricing {
  plan: string
  price: string
  desc: string
}

export interface IService extends Document {
  id: string
  icon: string
  title: string
  subtitle: string
  description: string
  image: string
  serviceValue: string
  features: string[]
  pricing: IServicePricing[]
  order: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const ServicePricingSchema = new Schema<IServicePricing>({
  plan:  { type: String, required: true },
  price: { type: String, required: true },
  desc:  { type: String, required: true },
})

const ServiceSchema = new Schema<IService>(
  {
    id:           { type: String, required: true, unique: true },
    icon:         { type: String, required: true },
    title:        { type: String, required: true },
    subtitle:     { type: String, required: true },
    description:  { type: String, required: true },
    image:        { type: String, required: true },
    serviceValue: { type: String, required: true },
    features:     [{ type: String }],
    pricing:      [ServicePricingSchema],
    order:        { type: Number, default: 0 },
    active:       { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.Service ||
  mongoose.model<IService>("Service", ServiceSchema)
