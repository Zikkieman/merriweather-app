"use client";
import { useEffect, useContext } from "react";
import HistoryNavbar from "../components/HistoryNavbar";
import WeatherCard from "../components/WeatherCard";
import { v4 as uuidv4 } from "uuid";
import { WeatherContext } from "../../../context/WeatherContext";
import { toast } from "react-toastify";
import Footer from "../components/footer";

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

type TypeId = {
  _id: string;
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
  const weatherCtx = useContext(WeatherContext);

  useEffect(() => {
    const getAllWeather = async () => {
      const allWeather = await fetch("/api/allweather");
      const allWeatherResponse = await allWeather.json();
      weatherCtx.getAllWeatherInfo(allWeatherResponse.message);
    };
    getAllWeather();
  }, []);

  const deleteWeather = async ({ _id }: TypeId) => {
    try {
      const deleteResponse = await fetch("/api/deleteweather", {
        method: "POST",
        body: JSON.stringify(_id),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await deleteResponse.json();
      if (res.message === "Successfully Deleted") {
        weatherCtx.deleteWeatherInfo(_id);
        toast(res.message, { position: "top-right", type: "success" });
      } else {
        toast(res.message, { position: "top-right", type: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col h-screen overflow-hidden">
      <div className="fixed top-0 w-full z-10">
        <HistoryNavbar />
      </div>

      <div className="flex-1 overflow-auto my-28">
       
        {weatherCtx.weatherState.length === 0 ? (
          <div className="flex justify-center items-center w-full py-2 mt-40">
            <p className="text-2xl">No saved weather information</p>
          </div>
        ) : (
          <div className="">
            {weatherCtx.weatherState.map((data: any) => (
              <WeatherCard
                key={uuidv4()}
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
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full z-10">
        <Footer />
      </div>
    </div>
  );
}
