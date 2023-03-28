import React, { useState } from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "../hooks/useCountdown";
import questions from "../constants/questions.json";
import { useRouter } from "next/router";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a
        href="https://tapasadhikary.com"
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </a>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const [id, setId] = useState(0);
  const [crtAns, setCrtAns] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const reload = () => router.reload();

  return (
    <>
      <header className="h-20 bg-blue-400 flex justify-between absolute w-screen">
        <div className="ml-10 my-auto">
          <h1 className="text-3xl font-md h-full ">Quiz App</h1>
        </div>
        <div className="my-auto text-3xl px-10">
          {days + hours + minutes + seconds > 0 && (
            <ShowCounter
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          )}
        </div>
      </header>
      <section className="h-screen bg-blue-300 flex justify-between flex-col">
        {showModal || days + hours + minutes + seconds <= 0 ? (
          <div className="m-auto text-center text-3xl text-red-600">
            You have answered {crtAns} with in the time
            <button
              onClick={reload}
              className="w-full h-13 py-3 border-solid border-white text-white border-solid border-2 rounded-lg px-10 py-3 mt-5 text-2xl hover:border-dotted hover: border-yellow-100 hover:text-yellow-200 hover:bg-black"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="m-auto text-center">
            <p className=" text-red-600 text-2xl ">
              <span className="text-red-600">Question 1:</span>{" "}
              {questions[id].question}
            </p>
            {questions[id].options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  if (option === questions[id].correctAns) {
                    setCrtAns(crtAns + 1);
                  }
                  if (id === questions.length - 1) {
                    setShowModal(true);
                  }
                  setId(id + 1);
                }}
                className="w-full h-13 py-3 border-solid border-white text-white border-solid border-2 rounded-lg px-10 py-3 mt-5 text-2xl hover:border-dotted hover: border-yellow-100 hover:text-yellow-200 hover:bg-black"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default CountdownTimer;
