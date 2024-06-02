"use client";


import { Button } from "../ui/button";
import Link from "next/link";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "../ui/select";
import { Input } from "../ui/input";
import { CardTitle, CardHeader, CardContent, Card } from "../ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "../ui/table";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Admin() {
  const [data, setData] = useState(null);
  async function fetchData() {
    const response = await axios.get("http://localhost:4000/data");
    console.log(response.data);
    setData(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#1f316e]  text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="Header Logo"
              className="mx-auto h-12 w-auto"
              src="https://www.itvoice.in/wp-content/uploads/2013/12/NIELIT-Logo.png"
            />
          </div>
          <span className="text-lg font-medium">
            National Institute of Electronics and Information Technology Delhi
          </span>
        </div>

        <nav className="flex items-center gap-6">
          <Link className="hover:underline" href="#">
            Home
          </Link>

          <Link className="hover:underline" href="#">
            About
          </Link>
          <Link className="hover:underline" href="#">
            Contact Us
          </Link>
        </nav>
        

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              alt="logo"
              className="rounded-full"
              height="40"
              src="https://imgs.search.brave.com/Q7PYThaDi13HjjC4tlw4GO7M9LQ85X3GRpiA2_9aa9U/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvdXNlci0yMy81/MTIvVXNlcl9BZG1p/bmlzdHJhdG9yXzMu/cG5n"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
            <span className="font-medium">Admin</span>
          </div>
        </div>

        <Button variant="outline">
          <LogOutIcon className="h-5 w-5 mr-2  text-black  bg-[#ebebf9]" />
          Logout
        </Button>
      </header>


    
      <main className=" bg-white p-4 md:p-12  ">
        
          <div className="w-1/2 flex flex-col items-center justify-center bg-white pt-12 pr-12 pb-12 pl-12 border-r border-gray-600">
            <img
              alt="Operator Icon"
              className="h-24 w-auto mb-4"
              src="https://imgs.search.brave.com/Go0JZlJxM7fo_PcSyJUZRZddZaHVc6UMFdCmOH3Moug/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvYnVzaW5lc3Mt/bWFuYWdlbWVudC0x/NTYvNTAvNS02NC5w/bmc"
            />
            <h2 className="text-3xl font-bold mb-4">Add New Batch Details </h2>
           
            <Link
              className="inline-flex items-center rounded-md bg-blue-500 px-6 py-3 text-lg font-medium text-black hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 shadow-md"
              href="/login/operator/batchentry"
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
              Add Batch
            </Link>

            <Link
              className="mt-4 text-blue-500 hover:underline"
              href="/operator-help"
            >
              Need Help?
            </Link>
          </div>
        

        
          <div className="w-1/2 flex flex-col items-center justify-center bg-white pt-12 pr-12 pb-12 pl-12 border-r border-gray-700">
            <img
              alt="Admin Icon"
              className="h-24 w-auto mb-4"
              src="https://img.icons8.com/ios-filled/50/000000/admin-settings-male.png"
            />
            <h2 className="text-3xl font-bold mb-4">Add new Candidate Details </h2>
            
            <Link
              className="inline-flex items-center rounded-md bg-blue-500 px-6 py-3 text-lg font-medium text-black hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md"
              href="/login/operator/candidateentry"
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
              Add Batch-Candidates
            </Link>
            <Link
              className="mt-4 text-gray-500 hover:underline"
              href="/admin-help"
            >
              Need Help?
            </Link>
          </div>
        
      </main>
   

     

      {/* footer section  */}

      <footer className="bg-[#1f316e] text-white py-4 px-6 flex items-center justify-between">
        <span className="flex items-center justify-center">@CC: Developed and Maintained by NIELIT Delhi</span>

        {/* social media Links  */}
        <div className="flex items-center gap-4">
          <Link className="hover:underline" href="#">
            <TwitterIcon className="h-6 w-6" />
          </Link>

          <Link className="hover:underline" href="#">
            <InstagramIcon className="h-6 w-6" />
          </Link>
          <Link className="hover:underline" href="#">
            <LinkedinIcon className="h-6 w-6" />
          </Link>
        </div>
      </footer>

      
    </div>
  );
}


function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
