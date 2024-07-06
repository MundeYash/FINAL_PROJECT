import Link from "next/link";
import BatchEntryForm from "../components/form/BatchEntryForm";
import EmployeeEntryForm from "../components/form/EmployeeForm";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function login() {
  return (
    <>
      <Header />

      <main className=" bg-white p-4 md:p-12  ">
        <section className="border-20 ">
          <div className="w-1/2 flex flex-col items-center justify-center bg-white pt-12 pr-12 pb-12 pl-12 border-r border-gray-600">
            <img
              alt="Operator Icon"
              className="h-24 w-auto mb-4"
              src="https://imgs.search.brave.com/Go0JZlJxM7fo_PcSyJUZRZddZaHVc6UMFdCmOH3Moug/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvYnVzaW5lc3Mt/bWFuYWdlbWVudC0x/NTYvNTAvNS02NC5w/bmc"
            />
            <h2 className="text-3xl font-bold mb-4">Are you an Operator?</h2>
            <p className="mb-6 text-lg text-center">
              Log in to manage your operations efficiently and effectively.
            </p>
            <Link
              className="inline-flex items-center rounded-md bg-blue-500 px-6 py-3 text-lg font-medium text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
              href="/login/operator"
            >
              <svg
                className="h-6 w-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m0 0H9m1-4h1v4h1m0 0h1v-4h1M4 6h16M4 10h16M4 14h16M4 18h16"
                ></path>
              </svg>
              Operator Login
            </Link>

            <Link
              className="mt-4 text-blue-500 hover:underline"
              href="/operator-help"
            >
              Need Help?
            </Link>
          </div>
        </section>

        <section>
          <div className="w-1/2 flex flex-col items-center justify-center bg-white pt-12 pr-12 pb-12 pl-12 border-r border-gray-700">
            <img
              alt="Admin Icon"
              className="h-24 w-auto mb-4"
              src="https://img.icons8.com/ios-filled/50/000000/admin-settings-male.png"
            />
            <h2 className="text-3xl font-bold mb-4">Are you an Admin?</h2>
            <p className="mb-10 text-lg text-center">
              Log in to oversee and manage administrative tasks with ease.
            </p>
            <Link
              className="inline-flex items-center rounded-md bg-blue-500 px-6 py-3 text-lg font-medium text-black hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
              href="/login/admin"
            >
              <svg
                className="h-6 w-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7zM12 5c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"
                ></path>
              </svg>
              Admin Login
            </Link>
            <Link
              className="mt-4 text-gray-500 hover:underline"
              href="/admin-help"
            >
              Need Help?
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
