"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import SecButton from "./SecButton";
import { WeatherContext } from "../../../context/WeatherContext";

type PropsType = {
  cityName: string;
  icon: string;
  temperature: any;
  description: string;
  countryCode: string;
  skyCondition: string;
  time?: string;
  button: string;
  buttonAction: () => void;
};

export default function WeatherCard({
  cityName,
  icon,
  temperature,
  description,
  countryCode,
  skyCondition,
  time,
  button,
  buttonAction,
}: PropsType) {

  const [tempUnit, setTempUnit] = useState("");

  const weatherUnitCtx = useContext(WeatherContext);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const weather = window.localStorage.getItem("unit");
      setTempUnit(weather as string);
    }
  }, [tempUnit, weatherUnitCtx.weatherUnit]);

  let unit = "C"

  if(tempUnit === "imperial"){
    unit = "F"
  } else if (tempUnit === ""){
    unit = "K"
  }

  return (
    <div className="flex justify-center items-center w-full h-full px-2 my-5">
      <div className=" flex border-sky-500 border-2 weather-card  bg-sky-500 text-white rounded-lg shadow-md px-1 py-3">
        <div className="mr-2 flex justify-center items-center flex-3">
          <Image
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="icon"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col flex-1">
          <table>
            <tbody>
              <tr>
                <td className="pr-10 max-md:pr-5 pb-2">Weather:</td>
                <td className=" pb-2">{skyCondition}</td>
              </tr>
              <tr>
                <td className="pr-10 max-md:pr-5 pb-2">Description:</td>
                <td className=" pb-2">{description}</td>
              </tr>
              <tr>
                <td className="pr-10 max-md:pr-5 pb-2">Temperature:</td>
                <td className=" pb-2">{temperature} °{unit}</td>
              </tr>
              <tr>
                <td className="pr-10 max-md:pr-5 pb-2">City:</td>
                <td className=" pb-2">{cityName}</td>
              </tr>
              <tr>
                <td className="pr-10 max-md:pr-5 pb-2">Country Code:</td>
                <td className="pb-2">{countryCode}</td>
              </tr>
              <tr>
                <td className="pr-10 max-md:pr-5 pb-2">Time:</td>
                <td className="pb-2">{time}</td>
              </tr>
            </tbody>
          </table>
          <SecButton Propfunc={buttonAction}>{button}</SecButton>
        </div>
      </div>
    </div>
  );
}
