"use client";

import React, { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import ResultNavbar from "../components/resultNavbar";
import { saveWeather } from "../components/saveWeather";
import { v4 as uuidv4 } from "uuid";


type PropsType = {
  cityName: string;
  icon: string;
  temperature: any;
  description: string;
  skyCondition: string;
  countryCode: string;
  _id: string;
};

export type PropsArrayType = PropsType[];

export default function WeatherResult() {
  const [weatherData, setWeatherData] = useState<PropsArrayType>([]);
  const [weatherArray, setweatherArray] = useState<PropsArrayType>([]);
  const [time, setTime] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const weatherInfo = () => {
        const weather = window.localStorage.getItem("weatherInfo");
        return weather ? JSON.parse(weather) : [];
      };
      const weatherData = weatherInfo();
      setWeatherData(weatherData);
      const [weatherArrayInfo, time] = weatherData;
      setweatherArray(weatherArrayInfo);
      setTime(time)
    }
  }, []);


  return (
    <div className="w-full h-screen">
      <ResultNavbar />
      <div className="h-3/4 w-full">
        {weatherArray.map((data) => {
          return (
            <div key={uuidv4()} className="w-full h-full">
              <WeatherCard
                cityName={data.cityName}
                icon={data.icon}
                temperature={data.temperature}
                description={data.description}
                countryCode={data.countryCode}
                skyCondition={data.skyCondition}
                time={time}
                button="Save"
                buttonAction={() => {
                  saveWeather(data);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
