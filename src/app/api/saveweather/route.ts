import mongoose from "mongoose";
import { Weather } from "../../../../schema/weather";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") return;

  const weatherParams = await req.json();
  // console.log(weatherParams);
  const {
    cityName,
    icon,
    temperature,
    description,
    countryCode,
    skyCondition,
    time,
  } = weatherParams;

  var dateComponents = time.split(/[\s/:]+/);

  // Convert the components to numbers
  var day = parseInt(dateComponents[0], 10);
  var month = parseInt(dateComponents[1], 10) - 1; // Months are zero-based in JavaScript
  var year = parseInt(dateComponents[2], 10);
  var hour = parseInt(dateComponents[3], 10);
  var minute = parseInt(dateComponents[4], 10);
  
  // Adjust for AM/PM
  if (dateComponents[5].toLowerCase() === 'pm' && hour < 12) {
      hour += 12;
  }
  
  // Create a Date object
  var dateObject = new Date(year, month, day, hour, minute);
  
  // Check if the date is valid
  if (isNaN(dateObject.getTime())) {
      console.log("Invalid date");
  } else {
      console.log("Valid date:", dateObject);
  }

  try {
    const db_password = process.env.DB_Password;
    await mongoose.connect(
      `mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/merriwether?retryWrites=true&w=majority`
    );

    const existingData = await Weather.findOne({ date: dateObject });

    if (existingData) {
      return NextResponse.json({ message: "This data already saved" });
    }

    const newWeather = await new Weather({
      cityName: cityName,
      icon: icon,
      temperature: temperature,
      description: description,
      countryCode: countryCode,
      skyCondition: skyCondition,
      date: dateObject,
    });
    await newWeather.save();
    return NextResponse.json({ message: "Weather Saved" });
  } catch (error) {
    return NextResponse.json({ message: "Oops!! Something Went Wrong" });
  }
}
