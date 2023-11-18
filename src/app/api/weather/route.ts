import { NextResponse } from "next/server";
import { getFormattedDateTime } from "../saveweather/formatTime";

export async function POST(req: Request) {
  if (req.method !== "POST") return;

  const searchParams = await req.json();

  const { cityName, unit } = searchParams;

  let temp = "metric";

  if (unit === "") {
    temp = "";
  } else if (unit === "imperial") {
    temp = "imperial";
  }

  if (!cityName) {
    return NextResponse.json({ message1: "Provide a city name" });
  }

  const API_KEY = process.env.API_KEY;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${temp}`;
  try {
    const response = await fetch(API_URL);
    const weatherData = await response.json();
    console.log(weatherData);
    const weatherRes = [
      {
        cityName: weatherData.name,
        countryCode: weatherData.sys.country,
        skyCondition: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        temperature: weatherData.main.temp,
      },
    ];
    const time = getFormattedDateTime();
    return NextResponse.json({
      message1: "OKAY",
      message2: [weatherRes, time],
    });
  } catch (error) {
    return NextResponse.json({ message1: "Please Try Again" });
  }
}
