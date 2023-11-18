"use client";
import { useEffect, useState, useLayoutEffect } from "react";
import HistoryNavbar from "../components/HistoryNavbar";
import WeatherCard from "../components/WeatherCard";
import { deleteWeather } from "../components/deleteWeather";
import { v4 as uuidv4 } from "uuid";

type AllPropsType = {
  cityName: string;
  icon: string;
  temperature: any;
  description: string;
  countryCode: string;
  skyCondition: string;
  _id: string;
  date: string;
};

type AllPropsArrayType = AllPropsType[];

function formattedDate({ date }: any) {
  const formattedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
  };
  const correctDate = formattedDate.toLocaleString(undefined, options);

  return correctDate;
}

export default function History() {
  const [allWeatherInfo, setAllWeatherInfo] = useState<AllPropsArrayType>([]);
  useEffect(() => {
    const getAllWeather = async () => {
      const allWeather = await fetch("/api/allweather");
      const allWeatherResponse = await allWeather.json();
      setAllWeatherInfo(allWeatherResponse.message);
    };
    getAllWeather();
  }, [allWeatherInfo]);

  return (
    <div className="w-full">
      <HistoryNavbar />
      {allWeatherInfo.length === 0 ? (
        <>
          <div className="flex justify-center items-center w-full py-2 mt-40">
            <p className="text-xl">No saved weather Information</p>
          </div>
        </>
      ) : (
        <>
          {allWeatherInfo.map((data, index) => {
            return (
              <div key={uuidv4()} className="w-full h-full">
                <WeatherCard
                  cityName={data.cityName}
                  icon={data.icon}
                  temperature={data.temperature}
                  description={data.description}
                  countryCode={data.countryCode}
                  skyCondition={data.skyCondition}
                  time={formattedDate(data)}
                  button="Delete"
                  buttonAction={() => {
                    deleteWeather(data);
                  }}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
