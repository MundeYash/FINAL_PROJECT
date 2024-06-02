import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import Footer from "../footer/Footer";
import Header from "../header/Header";

import Link from "next/link";
export default function Operator() {
  return (
    <>
      <header className="flex items-center justify-between bg-[#1f316e] px-4 py-3 text-white sm:px-6 lg:px-8">
        <div className="flex items-center">
          <img
            alt="NIELIT Logo"
            className="h-8 w-auto"
            src="https://www.itvoice.in/wp-content/uploads/2013/12/NIELIT-Logo.png"
          />
          <div className="ml-4 text-lg font-bold">
            National Institute of Electronics and Information Technology
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4 text-sm">
            Ministry of Electronics and Information Technology
            <br />
            Government of India
          </div>

          <img
            alt="Indian Emblem"
            className="h-8 w-auto"
            src="https://imgs.search.brave.com/5pd2BEDPcnDaUv_M-HSA9QSwyQthxDYGJeZ-Qo4Hokw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL0UvRW1ibGVt/X29mX0luZGlhLWxv/Z28tRTRDNkMwRkY2/Mi1zZWVrbG9nby5j/b20ucG5n"
          />
        </div>
      </header>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Header Logo"
            className="mx-auto h-12 w-auto"
            src="https://www.itvoice.in/wp-content/uploads/2013/12/NIELIT-Logo.png"
          />

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {" "}
            Operator Sign In
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form action="#" className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="option"
                  className=" flex justify-center text-sm font-medium text-black "
                >
                  Choose Centre{" "}
                </label>

                <select
                  name="option"
                  id="option"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500  hover:bg-[#6262db] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <option value="select">Select</option>
                  <option value="nielit_karkardooma">NIELIT Karkardooma</option>
                  <option value="nielit_inderlok">NIELIT Inderlok </option>
                  <option value="nielit_janakpuri">NIELIT Janakpuri</option>
                </select>

                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  User Name
                </label>

                <div className="mt-1">
                  <Input
                    autoComplete="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="email"
                    name="email"
                    placeholder="Enter User Name"
                    required
                    type="email"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="mt-1">
                  <Input
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    type="password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" name="remember-me" />
                  <label
                    className="ml-2 block text-sm text-gray-900"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    href="#"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                {/* <Button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-[#51d193] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                >
                  Sign in
                </Button> */}

                <Link
                  href="/login/operator/dashboard"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </Link>
              </div>

              <p>
                <Link
                  href="/login/operator/signup"
                  className="font-medium  text-[#080808c5]   flex justify-center "
                >
                  {" "}
                  New Operator ? Register{" "}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-[#1f316e] text-white py-4 px-4 flex items-center justify-center">
        <div className="flex items-center gap-4 text-sm">
          @CC: Developed and Maintained by NIELIT Delhi
        </div>
      </footer>
    </>
  );
}
