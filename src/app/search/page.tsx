"use client";
import React from "react";
import TextInput from "./component/textInput";
import NavigationBar from "../components/Navbar";
import axios from "axios";
import Footer from "../components/footer";

export default function Search() {
  return (
    <div className="flex h-screen flex-col justify-between overflow-hidden">
      <NavigationBar />
      <TextInput />
      <Footer />
    </div>
  );
}
