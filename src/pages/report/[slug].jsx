"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";

function Report() {
  const router = useRouter();
  console.log(router.query);

  const jwt = Cookies.get("jwt"); // Replace "myCookie" with the name of your cookie
  const [data, setData] = useState({
    employees: { name: "" },
  });
  const [report, setReport] = useState({ report: { remarks: String } });

  useEffect(() => {
    async function getEmployee() {
      try {
        const resp = await axios.get("/api/userjwt", {
          headers: { authorization: jwt },
        });
        console.log(resp.data);

        setData(resp.data.decoded);
      } catch {
        router.push("/");
      }
    }
    getEmployee();
  }, []);

  useEffect(() => {
    async function getEmployee() {
      try {
        const respReport = await axios.get(
          `/api/report?id=${router.query.slug}`
        );
        console.log(respReport);

        setReport(respReport.data);
      } catch {
        router.push("/");
      }
    }
    getEmployee();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white h-20 flex items-center align-middle border-gray-300 border-b-2 justify-between px-10  bg-gradient-to-r from-blue-500 to-green-300">
        <Link href="/dashboard">
          <p className="font-medium text-white text-3xl">Co Pilot</p>
        </Link>
        <div className="flex justify-between gap-10 text-black">
          <p>
            Hello <span className="font-bold">{data?.name}</span>
          </p>
        </div>
      </div>
      <main className="flex min-h-[90%] flex-col items-center justify-between p-24 bg-white text-black">
        {Object.entries(report.report).map((report_key) => (
          <div key={report_key[0]} className="bg-gray-300 w-5/6">
            <div className="w-full flex m-5">
              <div className="w-1/2 p-1">{report_key[0]}</div>
              <div className="w-1/2 p-1">{report_key[1]}</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Report;
