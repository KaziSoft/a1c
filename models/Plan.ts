import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPlan extends Document {
  id: string;
  name: string;
  price: number;
  image: string;
  features: string[];
}

const PlanSchema = new Schema<IPlan>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    features: { type: [String], required: true },
  },
  { timestamps: true }
);

const Plan: Model<IPlan> =
  mongoose.models.Plan || mongoose.model<IPlan>("Plan", PlanSchema);

export default Plan;