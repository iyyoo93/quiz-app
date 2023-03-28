import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import CountdownTimer from "@/components/CountdownTimer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const THREE_DAYS_IN_MS = 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const daysTime = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <>
      <Head>
        <title>Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CountdownTimer targetDate={daysTime} />
      </main>
    </>
  );
}
