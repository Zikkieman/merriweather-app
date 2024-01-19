import React from "react";
import Link from "next/link";
import { FiList } from "react-icons/fi";

export default function ResultNavbar() {
  return (
    <div className="flex w-full bg-sky-300 justify-between py-10  md:px-6 max-md:px-6 lg:px-16 xl:px-48 2xl:px-72">
      <div className="flex-1 text-3xl max-md:text-xl text-white">
        <Link href="/"> HOME PAGE</Link>
      </div>
      <div className="flex flex-1 max-md:hidden justify-end">
        <div className="mr-20">
          <Link href="/history">
            <p className="text-xl max-md:text-lg text-white">HISTORY</p>{" "}
          </Link>
        </div>
      </div>

      <div className="md:hidden flex flex-1 justify-end">
        <Link href="/history">
          {" "}
          <FiList className="text-2xl text-white" />{" "}
        </Link>
      </div>
    </div>
  );
}
