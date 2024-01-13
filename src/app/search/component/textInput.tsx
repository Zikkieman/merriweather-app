"use client";
import Button from "@/app/components/Button";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { SearchSchema } from "../../../../schema/search-yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { WeatherContext } from "../../../../context/WeatherContext";
import axios from "axios";

type ValueType = {
  cityName: string;
};

type searchType = {
  cityName: string;
  unit: any;
};

export default function TextInput() {
  const router = useRouter();
  const WeatherUnitCtx = useContext(WeatherContext);
  const [city, setCity] = useState("");
  const [detectedLocation, setDetectedLocation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [region, setRegion] = useState("");

 
  useEffect(() => {
    (async () => {
      const data = await axios
        .get("https://api.ipregistry.co/?key=lic5jrbl4nsj41j6")
        .then((res) => {
          return res.data.location.city;
        })
        .catch((err) => {
          console.log(err);
        });
      setCity(data);
      if (data !== "" || data !== null) {
        setDetectedLocation(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (detectedLocation) {
      const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = (elapsedTime / 15000) * 100; // 15000 milliseconds is the total duration

        setProgress(progress);
      }, 100);

      const timeoutId = setTimeout(() => {
        setDetectedLocation(false);
        clearInterval(intervalId);
      }, 15000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [detectedLocation, startTime]);

  const onSubmit = async (values: ValueType) => {
    const searchParams = {
      cityName: values.cityName,
      unit: WeatherUnitCtx.weatherUnit,
    };

    const getWeatherData = async (searchParams: searchType) => {
      const WeatherResponse = await fetch("/api/weather", {
        method: "POST",
        body: JSON.stringify(searchParams),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const weatherRes = await WeatherResponse.json();
      if (weatherRes.message1 === "OKAY") {
        localStorage.setItem(
          "weatherInfo",
          JSON.stringify(weatherRes.message2)
        );
        toast("Weather Data Retrieved", {
          position: "top-right",
          type: "success",
        });
        router.push("/result");
      } else if (
        weatherRes.message1 === "Please Try Again" ||
        weatherRes.message1 === "Provide a city name"
      ) {
        toast(weatherRes.message1, { position: "top-right", type: "error" });
        router.push("/search");
      }
    };
    getWeatherData(searchParams);
  };

  const { handleChange, handleBlur, touched, errors, values, handleSubmit, setValues } =
    useFormik({
      initialValues: {
        cityName: region,
      },
      validationSchema: SearchSchema,
      onSubmit,
    });

    const handleCityUpdate = () => {
      if (city !== "" && city !== null) {
        setValues({ ...values, cityName: city });
      } else {
        setValues({ ...values, cityName: "" });
      }
    };
  

  return (
    <div className="h-3/4 flex items-center justify-center relative">
      {detectedLocation && (
        <>
          <div className="flex flex-col shadow-xl items-center rounded-md text-center w-[300px] pt-4 absolute right-0 top-0 mr-4 max-lg:mr-0 gap-y-2">
            <p>Location Detected!!!</p>
            <p>Click OK to use location</p>
            <button
              className="px-2 py-2 bg-sky-500 rounded-md text-white w-fit"
              onClick={handleCityUpdate}
            >
              OK
            </button>
            <div
              className="bg-sky-600 h-1 w-full rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </>
      )}
      <form className="grid grid-rows-2 w-full" onSubmit={handleSubmit}>
        <div className="flex w-full h-1/2 justify-center items-center flex-row ">
          <div className=" sm:w-[400px] search-input">
            <input
              id="cityName"
              value={values.cityName}
              className={`border-sky-500 border-2 p-2 rounded-l-md w-full focus:border-sky-500`}
              placeholder="Enter city name"
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
            />
          </div>
          <Button>Check</Button>
        </div>
        <div className="h-1/2 w-full justify-center items-center flex">
          {errors.cityName && touched.cityName && (
            <p className="mb-0 errors text-red-600">{errors.cityName}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps() {}
