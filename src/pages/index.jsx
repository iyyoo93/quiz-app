import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white h-20 flex items-center align-middle border-gray-300 border-b-2 justify-between px-10  bg-gradient-to-r from-blue-500 to-green-300">
        <Link href="/">
          <p className="font-medium text-white text-3xl">Co Pilot</p>
        </Link>
        <div className="flex justify-between gap-10 text-black">
          <p>Login</p>
          <p>Register</p>
        </div>
      </div>
      <main className="flex min-h-[90%] flex-col items-center justify-between p-24 bg-white text-black">
        <div className="border-blue-600 border-solid border-2 flex min-h-[93%] flex-col items-center justify-between  p-10 min-w-min">
          <p className="text-2xl">Login</p>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
