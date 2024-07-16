import Link from "next/link";
import BatchEntryForm from "../components/form/BatchEntryForm";
import EmployeeEntryForm from "../components/form/EmployeeForm";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function login() {
  return (
    <>
      <Header />

      <main className="bg-gray-100 p-4 md:p-12 flex justify-center items-center min-h-screen">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-500 to-blue-700 p-8 flex flex-col justify-center">
              <img
                alt="Operator Icon"
                className="h-24 w-auto mx-auto"
                src="https://imgs.search.brave.com/Go0JZlJxM7fo_PcSyJUZRZddZaHVc6UMFdCmOH3Moug/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvYnVzaW5lc3Mt/bWFuYWdlbWVudC0x/NTYvNTAvNS02NC5w/bmc"
              />

              <h2 className="text-3xl font-bold mb-4 flex justify-center">
                Are you an Operator?
              </h2>
              <p className="mb-6 text-lg text-center">
                Log in to manage your operations efficiently and effectively.
              </p>
              <h2 className="text-2xl font-bold text-white text-center mt-4">
                Operator Login
              </h2>
              <p className="mt-2 text-white text-center">
                Log in to manage your operations efficiently and effectively.
              </p>

              <a
                href="/login/operator"
                className="mt-4 inline-block flex justify-center"
              >
                <button className="bg-white text-blue-700 hover:bg-gray-100 text-center py-2 px-4 rounded shadow">
                  Operator Login
                </button>
              </a>
            </div>

            <div className="w-full md:w-1/2 bg-gradient-to-r from-green-500 to-green-700 p-8 flex flex-col justify-center">
              <img
                alt="Admin Icon"
                className="h-24 w-auto mx-auto"
                src="https://img.icons8.com/ios-filled/50/000000/admin-settings-male.png"
              />
              <h2 className="text-3xl font-bold mb-4 flex justify-center">
                Are you an Operator?
              </h2>
              <p className="mb-6 text-lg text-center">
                Log in to manage your operations efficiently and effectively.
              </p>
              <h2 className="text-2xl font-bold text-white text-center mt-4">
                Admin Login
              </h2>
              <p className="mt-2 text-white text-center">
                Log in to manage your administrative tasks with ease.
              </p>

              <a
                href="/login/admin"
                className=" inline-block flex justify-center"
              >
                <button className="bg-white text-black-700 hover:bg-gray-100 text-center py-2 px-4 rounded shadow">
                  Admin Login
                </button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
