"use client";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { WeatherContext } from "../../../context/WeatherContext";

type PropsType = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Settings({ onClose }: PropsType) {
  const [defaultOption, setDefaultOption] = useState("metric");

  const weatherUnitCtx = useContext(WeatherContext);

  function unitHandler(event: ChangeEvent) {
    event.preventDefault();
    weatherUnitCtx.getWeatherUnit((event.target as HTMLInputElement).value);
  }

  function handleClose() {
    onClose(false);
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const weather = window.localStorage.getItem("unit");
      setDefaultOption(weather as string);
    }
  }, [defaultOption, weatherUnitCtx.weatherUnit]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-70 bg-sky-100 z-10">
      <IoCloseOutline
        className="absolute top-2 right-2 cursor-pointer text-sky-500 hover:text-sky-700 mt-16 mr-40 max-md:mt-6 max-md:mr-8"
        size={40}
        onClick={handleClose}
      />
      <div className="w-1/4 bg-white rounded-lg shadow-lg h-60 relative setting-card m-2 z-20">
        <div className="ml-4 mt-4">
          <label className="block mb-1">Select Temperature Unit</label>
          <select
            onChange={unitHandler}
            className="border-2 rounded-md p-2 border-sky-500"
          >
            <option selected={defaultOption === "" && true} value="">
              Kelvin
            </option>
            <option
              selected={defaultOption === "metric" && true}
              value="metric"
            >
              Celsius
            </option>
            <option
              selected={defaultOption === "imperial" && true}
              value="imperial"
            >
              Fahrenheit
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
