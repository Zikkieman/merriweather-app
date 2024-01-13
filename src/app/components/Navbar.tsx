"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import Settings from "./settings";
import Guide from "./guide";

export default function NavigationBar() {
  const [icon, setIcon] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);

  const handleIcon = () => {
    setIcon(!icon);
  };

  function settingsHandler() {
    setOpenSettings(true);
    setIcon(false);
  }

  function guideHandler() {
    setOpenGuide(true);
    setIcon(false);
  }

  return (
    <>
      <div className="flex w-full bg-sky-300 justify-between py-10 md:px-6 max-md:px-6 lg:px-16 xl:px-48 2xl:px-72 ">
        <div
          className="flex-1
       text-3xl max-md:text-xl text-white"
        >
          MERRIWEATHER
        </div>
        <div className="flex flex-1 max-md:hidden justify-end">
          <div className="mr-20" onClick={guideHandler}>
            <p className="text-xl max-md:text-lg text-white cursor-pointer">
              GUIDE
            </p>{" "}
          </div>
          <div className="mr-20">
            <Link href="/history">
              {" "}
              <p className="text-xl max-md:text-lg text-white">HISTORY</p>{" "}
            </Link>
          </div>
          <div
            className=" text-xl text-white max-md:text-lg cursor-pointer"
            onClick={settingsHandler}
          >
            <p>SETTINGS</p>{" "}
          </div>
        </div>

        <div
          className="md:hidden text-2xl border px-1 py-1 rounded-md mr-2 text-white"
          onClick={handleIcon}
        >
          {icon ? <RxCross1 /> : <GiHamburgerMenu />}
        </div>

        {icon && (
          <div className="absolute w-full z-10 shadow-lg bg-sky-500 text-green-950 md:hidden hamburger p-10 bounce dropdown">
            <div className="flex flex-col items-start h-56 gap-5 bounce dropdown">
              <div className="cursor-pointer" onClick={guideHandler}>
                {" "}
                <p className="text-2xl max-md:text-lg text-white">GUIDE</p>
              </div>
              <Link href="/history">
                {" "}
                <p className="text-2xl max-md:text-lg text-white">
                  HISTORY
                </p>{" "}
              </Link>
              <div className="cursor-pointer" onClick={settingsHandler}>
                {" "}
                <p className="text-2xl max-md:text-lg text-white">SETTINGS</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {openSettings && <Settings onClose={setOpenSettings} />}
      {openGuide && <Guide onClose={setOpenGuide} />}
    </>
  );
}
