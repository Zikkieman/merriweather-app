import { toast } from "react-toastify";

type PropsType = {
  cityName: string;
  icon: string;
  temperature: any;
  description: string;
  countryCode: string;
  skyCondition: string;
};

let setTime = "";

export const saveWeather = async ({
  cityName,
  icon,
  temperature,
  description,
  countryCode,
  skyCondition,
}: PropsType) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const weatherInfo = () => {
      const weather = window.localStorage.getItem("weatherInfo");
      return weather ? JSON.parse(weather) : [];
    };
    const weatherData = weatherInfo();
    const [weatherArrayInfo, time] = weatherData;
    setTime = time;
  }

  const weatherParams = {
    cityName: cityName,
    icon: icon,
    temperature: temperature,
    description: description,
    countryCode: countryCode,
    skyCondition: skyCondition,
    time: setTime,
  };
  const Response = await fetch("/api/saveweather", {
    method: "POST",
    body: JSON.stringify(weatherParams),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const weatherRes = await Response.json();

  if (weatherRes.message === "Weather Saved") {
    toast("Saved, Check History Log", {
      position: "top-right",
      type: "success",
    });
  } else {
    toast(weatherRes.message, { position: "top-right", type: "error" });
  }
};
