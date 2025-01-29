"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function Home(props) {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Layout title="Home">
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-500 animate-gradient-bg">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-white animate-pulse">
              Coming Soon
            </h1>
            {/* <p className="mt-4 text-white text-lg">
              Coming Soon.
            </p>
            <div className="mt-6 flex justify-center">
              <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300">
                Learn More
              </button>
              <button className="ml-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300">
                Contact Us
              </button>
            </div> */}
          </div>
        </div>
      </Layout>
    </>
  );
}
