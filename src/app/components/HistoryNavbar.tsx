"use client";
import React from "react";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function HistoryNavbar() {
  const router = useRouter();

  function goBackHandler() {
    router.back();
  }

  return (
    <div className="flex w-full bg-sky-300 justify-between py-10 px-96 max-md:px-6 max-xl:px-20">
      <div className="flex-1 text-3xl max-md:text-xl text-white">
        <Link href="/"> HISTORY</Link>
      </div>
      <div className="flex flex-1 max-md:hidden justify-end">
        <div className="mr-20 cursor-pointer" onClick={goBackHandler}>
          <p className="text-xl max-md:text-lg text-white">GO BACK</p>{" "}
        </div>
      </div>

      <div className="md:hidden flex flex-1 justify-end">
        <Link href="/result">
          {" "}
          <RiArrowGoBackFill className="text-2xl text-white" />{" "}
        </Link>
      </div>
    </div>
  );
}
