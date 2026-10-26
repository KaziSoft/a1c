import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  planId: string;
  planName: string;
  price: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    planId: { type: String, required: true },
    planName: { type: String, required: true },
    price: { type: Number, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;