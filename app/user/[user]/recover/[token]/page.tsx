"use client";
import { resetPasswordParams } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const page = ({ params }: any) => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with email:", password, "and password:");
    const reset = await resetPasswordParams(
      password,
      params.user,
      params.token
    );
    console.log(reset, "reseted");
    // @ts-ignore
    if (reset.status === 200 && reset.data.status) {
      router.push("/");
    }
  };

  console.log(params.user, params.token, "paramss");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter new Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: solid/lock-closed --> */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4 8a6 6 0 1112 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm2-2V5a4 4 0 118 0v1h2a1 1 0 011 1v5a4 4 0 11-8 0V6a1 1 0 011-1h2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
