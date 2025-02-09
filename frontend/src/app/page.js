"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import MemberCard from "@/components/MemberCard";

export default function Home(props) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Layout title="Home">
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="w-4/6 flex flex-col gap-4 text-center">
            <h1 className="text-base md:text-4xl font-bold text-black">
              IT Governance Workspace bank bjb
            </h1>
            <p className="text-black">
              Selamat datang di <strong>IT Governance Workspace</strong>, platform terintegrasi untuk memantau dan mengelola temuan audit serta tugas-tugas yang berkaitan dengan Tata Kelola TI di <strong>bank bjb</strong>.
            </p>
            <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 grid-rows-3 gap-3 text-black">
              <MemberCard name={"Rachmat Rasidi"} position={"Manager IT Governance"} />
              <MemberCard name={"Marina Wanda Putri"} position={"Officer IT Governance"} />
              <MemberCard name={"Melissa Lasilkvie Sennivena"} position={"Staff IT Governance"} />
              <MemberCard name={"Alifa Puspa Yuninda"} position={"Staff IT Governance"} />
              <MemberCard name={"Marcha Salsabila Afiani"} position={"Staff IT Governance"} />
              <MemberCard name={"Craig Koljaan"} position={"Staff IT Governance"} />
            </div>
          </div> 
        </div>
      </Layout>
    </>
  );
}
