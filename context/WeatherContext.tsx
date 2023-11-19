"use client";
import { createContext, useState, ReactNode, useReducer } from "react";

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
  weatherState: any;
  weatherUnit: String;
  getWeatherUnit: (unit: string) => void;
  getAllWeatherInfo: (allweather: any) => void;
  deleteWeatherInfo: (_id: string) => void;
};

export const WeatherContext = createContext<WeatherContextType>({
  weatherState: [],
  weatherUnit: "",
  getWeatherUnit: (unit: string) => {},
  getAllWeatherInfo: (allweather: any) => {},
  deleteWeatherInfo: (_id: string) => {},
});

const weatherReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET":
      return [...action.payload];
    case "DELETE":
      return state.filter((weather: any) => {
        return weather._id !== action.payload;
      });
    default:
      return state;
  }
};

export default function WeatherProvider({ children }: ChildrenProps) {
  const [weatherState, dispatch] = useReducer(weatherReducer, []);
  const [weatherUnit, setWeatherUnit] = useState("metric");
  // const [storedWeather, setStoredWeather] = useState([]) as any;

  // I want to use context to store all saved weather by tomorrow

  const getWeatherUnit = (unit: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("unit", unit);
      const weather = window.localStorage.getItem("unit");
      setWeatherUnit(weather as string);
    }
  };

  const getAllWeatherInfo = (allWeather: any) => {
    dispatch({ type: "GET", payload: allWeather });
  };

  const deleteWeatherInfo = (_id: string) => {
    dispatch({ type: "DELETE", payload: _id });
  };

  const value = {
    weatherState: weatherState,
    weatherUnit: weatherUnit,
    getWeatherUnit: getWeatherUnit,
    getAllWeatherInfo,
    deleteWeatherInfo,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}
