import React, { ReactNode } from "react";
import { toast } from "react-toastify";

type childrenPropsType = {
  children: string | ReactNode;
  onSearchHandler?: () => void;
};

export default function Button({
  children,
  onSearchHandler,
}: childrenPropsType) {
 

type TypeId = {
  _id: string;
};

// export const deleteWeather = async ({ _id }: TypeId) => {
//   const deleteResponse = await fetch("/api/deleteweather", {
//     method: "POST",
//     body: JSON.stringify(_id),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const res = await deleteResponse.json();
//   if (res.message === "Successfully Deleted") {
//     toast(res.message, { position: "top-right", type: "success" });
//   } else {
//     toast(res.message, { position: "top-right", type: "error" });
//   }
// };
  return (
    <button
      type="submit"
      className=" flex justify-center items-center border-2 border-sky-500 py-2 px-2 max-sm:px-1 rounded-r-md bg-sky-500 text-white"
      onClick={onSearchHandler}
    >
      {children}
    </button>
  );
}
