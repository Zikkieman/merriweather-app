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
 
  return (
    <button
      type="submit"
      className=" flex justify-center items-center border-2 border-sky-500 py-2 px-2 max-sm:px-1 rounded-r-md bg-sky-500 text-white -ml-2 hover:border-sky-700 hover:bg-sky-700"
      onClick={onSearchHandler}
    >
      {children}
    </button>
  );
}
