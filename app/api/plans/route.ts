import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // Update path to match your DB connection utility
import Plan from "@/models/Plan";

// GET: Fetch all plans
export async function GET() {
  try {
    await dbConnect();
    const plans = await Plan.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: plans }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST: Add a new plan
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const newPlan = await Plan.create(body);
    return NextResponse.json({ success: true, data: newPlan }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}