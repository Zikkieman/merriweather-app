import mongoose from "mongoose";
import { Weather } from "../../../../schema/weather";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db_password = process.env.DB_Password;
    await mongoose.connect(
      `mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/merriwether?retryWrites=true&w=majority`
    );

    const newWeather = await Weather.find({});
    return NextResponse.json({ message: newWeather });
  } catch (error) {
    return NextResponse.json({ message: "Oops!! Something Went Wrong" });
  }
}
