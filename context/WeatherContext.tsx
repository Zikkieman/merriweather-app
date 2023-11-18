"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

type ChildrenProps = {
  children: ReactNode | ReactNode[];
};

type PropsType = {
  cityName: string;
  icon: string;
  temperature: any;
  description: string;
  countryCode: string;
};

type PropsArrayType = PropsType[];

export type WeatherContextType = {
  status: string;
  weatherData: PropsArrayType;
  weatherUnit: String;
  getWeatherData: (cityName: string) => void;
  getWeatherUnit: (unit: string) => void;
};

export const WeatherContext = createContext<WeatherContextType>({
  status: "",
  weatherData: [],
  weatherUnit: "",
  getWeatherData: (cityName: string) => {},
  getWeatherUnit: (unit: string) => {},
});

export default function WeatherProvider({ children }: ChildrenProps) {
  const [weatherData, setWeatherData] = useState<PropsArrayType>([]);
  const [status, setStatus] = useState("");
  const [weatherUnit, setWeatherUnit] = useState("");

  const getWeatherData = async (cityName: string) => {
    const WeatherResponse = await fetch("/api/weather", {
      method: "POST",
      body: JSON.stringify(cityName),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const weatherRes = await WeatherResponse.json();
    setWeatherData(weatherRes.message2);
    setStatus(weatherRes.message1);
  };

  const getWeatherUnit = (unit: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("unit", unit);
      const weather = window.localStorage.getItem("unit");
      setWeatherUnit(weather as string);
    }
  };

  console.log(weatherUnit)

  const value = {
    status: status,
    weatherData: weatherData,
    weatherUnit: weatherUnit,
    getWeatherData,
    getWeatherUnit: getWeatherUnit,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}
