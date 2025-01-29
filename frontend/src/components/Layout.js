"use client";

import Head from "next/head";
import NavigationBar from "./NavigationBar";
import DarkModeToggle from "./DarkModeToogle";
// import Footer from "./footer";

import { useState } from "react";

export default function Layout(props) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Head>
        <title>IT Governance Workspace | {props.title}</title>
        <link rel="icon" href=""></link>
      </Head>
      <NavigationBar/>
      {/* <div className="min-h-screen bg-white"> */}
        {/* <div className="flex flex-col justify-center items-center pt-10 md:pt-12 lg:pt-14"> */}
          {props.children}
        {/* </div> */}
      {/* </div> */}
      {/* <Footer/> */}
      <DarkModeToggle />
    </>
  );
}