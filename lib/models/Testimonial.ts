import mongoose, { Schema, Document } from "mongoose"

export interface ITestimonial extends Document {
  name: string
  location: string
  avatar: string
  rating: number
  text: string
  order: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name:     { type: String, required: true },
    location: { type: String, required: true },
    avatar:   { type: String, default: "" },
    rating:   { type: Number, min: 1, max: 5, default: 5 },
    text:     { type: String, required: true },
    order:    { type: Number, default: 0 },
    active:   { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema)
