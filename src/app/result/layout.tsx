"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
type ChildrenType = {
  children: ReactNode | ReactNode[];
};

export default function ResultLayout({ children }: ChildrenType) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const weather = window.localStorage.getItem("weatherInfo");
      if (!weather) {
        router.push("/search");
      }
    }
  });

  return <div>{children}</div>;
}
