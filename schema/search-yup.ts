import * as yup from "yup";

export const SearchSchema = yup.object().shape({
  cityName: yup.string().required("A city name is required"),
});
