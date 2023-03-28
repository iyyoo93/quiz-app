import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className="h-20 bg-blue-400 flex justify-between absolute w-screen">
          <div className="ml-10 my-auto"><h1 className="text-3xl font-md h-full ">Quiz App</h1></div>
          <nav className="mr-10 my-auto flex justify-between gap-5 cursor-pointer">
            <a href="" className="text-white hover:text-green-400">Login</a>
            <a href="" className="text-white hover:text-green-400">Register</a>
          </nav>
        </header>
        <section className="h-screen bg-blue-300 flex justify-between flex-col">
          <div className="m-auto text-center">
            <p className=" text-white text-2xl "> Welcome to the Quiz App, Press below button to start the Quiz</p>
            <a href="/quiz">
              <button 
                className="mt-5 border-white border-solid border-white text-white border-solid border-2 rounded-lg px-10 py-3 hover:border-dotted hover: border-yellow-100 hover:text-yellow-200 hover:bg-black">
                  Start Quiz
                </button>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
