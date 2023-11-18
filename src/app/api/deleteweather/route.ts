import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Weather } from "../../../../schema/weather";

export async function POST(req: Request) {
  if (req.method !== "POST") return;
  const weatherId = await req.json();

  if (!weatherId) {
    return NextResponse.json({ message: "Please Try Again" });
  }

  try {
    const db_password = process.env.DB_Password;
    await mongoose.connect(
      `mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/merriwether?retryWrites=true&w=majority`
    );
    await Weather.deleteOne({ _id: weatherId });
    return NextResponse.json({ message: "Successfully Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Please Try Again" });
  }
}
