import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Plan from "@/models/Plan";

// PUT: Update an existing plan by its unique id/slug
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id: planId } = await params;

    const updatedPlan = await Plan.findOneAndUpdate(
      { id: planId },
      body,
      { new: true, runValidators: true }
    );

    if (!updatedPlan) {
      return NextResponse.json(
        { success: false, error: "Plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedPlan },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}

// DELETE: Remove a plan by its unique id/slug
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id: planId } = await params;

    const deletedPlan = await Plan.findOneAndDelete({ id: planId });

    if (!deletedPlan) {
      return NextResponse.json(
        { success: false, error: "Plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Plan deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}