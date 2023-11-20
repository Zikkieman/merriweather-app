"use client";
import Button from "@/app/components/Button";
import { useFormik } from "formik";
import React, {  useContext } from "react";
import { SearchSchema } from "../../../../schema/search-yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { WeatherContext } from "../../../../context/WeatherContext";

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

  const { handleChange, handleBlur, touched, errors, values, handleSubmit } =
    useFormik({
      initialValues: {
        cityName: "",
      },
      validationSchema: SearchSchema,
      onSubmit,
    });

  return (
    <div className="h-3/4 flex items-center justify-center">
      <form className="grid grid-rows-2 w-full" onSubmit={handleSubmit}>
        <div className="flex w-full h-1/2 justify-center items-center flex-row">
          <div className="w-1/4 search-input">
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
