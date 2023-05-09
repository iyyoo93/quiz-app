"use client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import * as microsoftTeams from "@microsoft/teams-js";


function LoginForm() {
  const [error, setError] = useState("");
  const [name, setName] = useState('');
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function getUserInfo() {
    try {
      // Authenticate the user and get an access token
      const authToken = await microsoftTeams.authentication.authenticateAsync({
        url: window.location.origin + '/auth-start.html',
        width: 600,
        height: 535,
        successCallback: () => {
          console.log('Authentication successful');
        },
        failureCallback: (reason) => {
          console.error('Authentication failed:', reason);
        }
      });
  
      // Use the access token to call the Microsoft Graph API to retrieve user information
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      });
  
      const data = await response.json();
      console.log('Logged-in user:', data.displayName);
      console.log('Logged-in user email:', data.mail);
    } catch (error) {
      console.error('Error retrieving user information:', error);
    }
  }

  useEffect(() => {
    const getFunc = async () => {
      await microsoftTeams.initializeApp();
      getUserInfo()
    }
    getFunc()
  }, [])

  const jwt = Cookies.get("jwt"); // Replace "myCookie" with the name of your cookie
  //   const [hotel, setHotel] = useState({ name: "" });
  const router = useRouter();

  if (jwt) {
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="mt-7">Email id - {name || 'user'}</label>
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
