import mongoose, { Schema, Document } from "mongoose"

export type SubmissionStatus = "new" | "contacted" | "booked" | "closed"

export interface ISubmission extends Document {
  name: string
  phone: string
  email: string
  service: string
  message: string
  status: SubmissionStatus
  notes: string
  createdAt: Date
  updatedAt: Date
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    name:    { type: String, required: true },
    phone:   { type: String, required: true },
    email:   { type: String, default: "" },
    service: { type: String, default: "" },
    message: { type: String, required: true },
    status:  {
      type: String,
      enum: ["new", "contacted", "booked", "closed"],
      default: "new",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
)

export default mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", SubmissionSchema)
