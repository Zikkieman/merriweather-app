import mongoose, { Schema } from "mongoose";

const weatherSchema = new Schema({
  cityName: String,
  icon: String,
  temperature: Number,
  description: String,
  countryCode: String,
  skyCondition: String,
  date: Date,
});

export const Weather =
  mongoose.models.Weather || mongoose.model("Weather", weatherSchema);
