import { toast } from "react-toastify";

type TypeId = {
  _id: string;
};

export const deleteWeather = async ({ _id }: TypeId) => {
  const deleteResponse = await fetch("/api/deleteweather", {
    method: "POST",
    body: JSON.stringify(_id),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await deleteResponse.json();
  if (res.message === "Successfully Deleted") {
    toast(res.message, { position: "top-right", type: "success" });
  } else {
    toast(res.message, { position: "top-right", type: "error" });
  }
};
