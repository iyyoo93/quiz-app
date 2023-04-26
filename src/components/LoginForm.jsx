"use client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function LoginForm() {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const jwt = Cookies.get("jwt"); // Replace "myCookie" with the name of your cookie
  //   const [hotel, setHotel] = useState({ name: "" });
  const router = useRouter();

  if (jwt) {
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="mt-7">Email id</label>
      <input
        type="email"
        value={data.email}
        onChange={handleChange}
        id="email"
        required
        className="border-blue w-full m-3 border-solid border-2 h-10 p-2"
      />
      <label>Password</label>
      <input
        type="password"
        value={data.password}
        onChange={handleChange}
        id="password"
        required
        className="border-blue w-full m-3 border-solid border-2 h-10 p-2"
      />
      {error && <p className="text-red-700">{error}</p>}
      <div className="flex justify-center mt-8">
        <button className="bg-blue-300 w-1/2 h-11 rounded" type="submit">
          Login
        </button>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-300 w-1/2 h-11 rounded"
          type="button"
          onClick={clickButton}
        >
          Test login
        </button>
      </div>
    </form>
  );

  async function clickButton() {
    try {
      await axios.post("/api/login", {
        email_id: "john.smith@example.com",
        password: "pa55w0rd",
      });
      router.push("/dashboard");
    } catch (e) {
      console.log(e);
      setError(e.response.data);
    }
  }

  function handleChange({ target: { value, id } }) {
    setError("");
    setData({ ...data, [id]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(Object.keys(data));
    try {
      await axios.post("/api/login", {
        email_id: data.email,
        password: data.password,
      });
      router.push("/dashboard");
    } catch (e) {
      console.log(e);

      setError(e.response.data);
    }
  }
}

export default LoginForm;
