// use client
import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState("");
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    setYear(year.toString());
  }, [year]);
  return (
    <div className="bg-sky-300 text-white py-8 flex justify-center text-xl">
      <div>
        <p>© {year} DevEazy</p>
      </div>
    </div>
  );
}
