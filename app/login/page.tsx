"use client";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth-Provider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn, isAuthenticated, errors } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated]);

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">something</div>
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Login
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        {errors ? (
          <div className="text-white border border-gray-300 bg-red-500 flex flex-col mb-2 p-1">
            {errors.map((error, index) => (
              <span key={index}>{error}</span>
            ))}
          </div>
        ) : (
          ""
        )}
        <form onSubmit={loginUser} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-bold text-gray-600 block"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-600 block"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-300 rounded"
              />
              <label htmlFor="" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <div>
              <li
                onClick={() => router.push("/")}
                className="font-medium text-sm text-blue-500 cursor-pointer list-none"
              >
                Registrate
              </li>
            </div>
          </div>
          <div>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
