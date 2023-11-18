"use client";
import React from "react";
import Head from "next/head";

export default function Loading() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Retrieving Weather Info</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center flex-col">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500"></div>
        </div>
      </div>
    </div>
  );
}
