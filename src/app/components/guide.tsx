import React from "react";
import { IoCloseOutline } from "react-icons/io5";

type PropsType = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Guide({ onClose }: PropsType) {
  function handleClose() {
    onClose(false);
  }

  return (
    <div>
      <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-70 bg-sky-100 z-50">
        <IoCloseOutline
          className="absolute top-2 right-2 cursor-pointer text-sky-500 hover:text-sky-700 mt-16 mr-40 max-md:mt-6 max-md:mr-8"
          size={40}
          onClick={handleClose}
        />
        <div className="setting-card shadow-lg bg-white text-black w-1/4 rounded-lg relative m-2 p-4">
          <div className="section mb-3">
            <h2 className="text-xl font-bold mb-2">Weather Forecasts</h2>
            <p className="">
              Allow users to access daily weather forecasts for any city by
              entering the city name in the input field.
            </p>
          </div>
          <div className="section mb-3">
            <h2 className="text-xl font-bold mb-2">Temperature Units</h2>
            <p className="">
              Choose your preferred temperature unit within the settings menu.
              Options include Kelvin, Celsius, or Fahrenheit, with Celsius as
              the default unit.
            </p>
          </div>
          <div className="section">
            <h2 className="text-xl font-bold mb-2">Current Weather Data</h2>
            <p className="">
              For accurate and up-to-date current weather data, it is
              recommended to check at hourly intervals to ensure the most
              precise and recent information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
