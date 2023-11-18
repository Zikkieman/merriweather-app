import React from "react";
import TextInput from "./component/textInput";
import NavigationBar from "../components/Navbar";

export default function Search() {
  return (
    <div className="flex h-screen flex-col">
      <NavigationBar />
      <TextInput />
    </div>
  );
}
