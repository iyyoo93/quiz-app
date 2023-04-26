"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ReportTable from "./ReportTable";

function UserDashboard(props) {
  const jwt = Cookies.get("jwt"); // Replace "myCookie" with the name of your cookie
  const [data, setData] = useState({
    employees: { name: "" },
    employeeReports: [],
    hotels: [],
  });
  //   const [hotel, setHotel] = useState({ name: "" });
  const router = useRouter();

  useEffect(() => {
    async function getEmployee() {
      try {
        const resp = await axios.get("/api/user", {
          headers: { authorization: jwt },
        });
        console.log(resp.data);

        setData(resp.data);
      } catch {
        Cookies.remove('jwt')
        router.push("/");
      }
    }
    getEmployee();
  }, []);

  return (
    <>
      <div className="bg-white h-20 flex items-center align-middle border-gray-300 border-b-2 justify-between px-10  bg-gradient-to-r from-blue-500 to-green-300">
        <Link href="/dashboard">
          <p className="font-medium text-white text-3xl">Co Pilot</p>
        </Link>
        <div className="flex justify-between gap-10 text-black">
          <p>
            Hello <span className="font-bold">{data.employees?.name}</span>
          </p>
        </div>
      </div>
      <main className="flex min-h-[90%] flex-col items-center justify-between p-24 bg-white text-black">
        <div className="text-2xl font-bold">Your Report</div>
        <div>
          {data.employeeReports.length && (
            <ReportTable reports={data.employeeReports} />
          )}
        </div>
        <div className="mt-10">
          <p className="font-bold">Click the below hotels to see the reports</p>
          {data.hotels.length &&
            data.hotels.map((hotel) => (
              <div className="text-blue-600" key={hotel.id}>
                <Link href={`/hotel/${hotel.slug}`}>{hotel.name}</Link>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}

export default UserDashboard;
