"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/drop-down";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";

import ShowBatchDetails from "../certificate/ShowBatchDetails";
import BatchEntryForm from "../form/BatchEntryForm";
import EmployeeForm from "../form/EmployeeForm";
import OperatorDashboard from "./OperatorDashboard";
import OperatorDashboard2 from "./OperatorDashboard2";
import OperatorDashboard3 from "./OperatorDashboard3";
import OperatorDashboard4 from "./OperatorDashboard4";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import BatchUpdate from "../form/BatchUpdate";

import CertificateGenerator from "../certificate/CertificateGenerator";

export default function Component() {
  const [activeTab, setActiveTab] = useState("batch");
  const [candidates, setCandidates] = useState();
  return (
    <>
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
          <Link className="hover:underline" href="../">
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
              height="70"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRaEjFnlJLW5piED3eXo2fTr6WJOaNMeJd9A&s" // replace this with your chosen image URL
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width="40"
            />
            <span className="font-medium">Operator</span>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen w-full">
        <div className="hidden w-64 shrink-0 border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-950 md:block">
          <div className="flex h-16 items-center justify-between px-6">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <Package2Icon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
          </div>

          <nav className="flex flex-col gap-1 px-4 py-6">
            <Button
              variant="ghost"
              size="sm"
              className={`justify-start gap-2 text-left ${
                activeTab === "batch" ? "font-bold bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("batch")}
            >
              <LayoutGridIcon className="h-4 w-4" />
              Batch Entry
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`justify-start gap-2 text-left ${
                activeTab === "batchUpdate" ? "font-bold bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("batchUpdate")}
            >
              <UserPlusIcon className="h-4 w-4" />
              BatchUpdate
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`justify-start gap-2 text-left ${
                activeTab === "candidate" ? "font-bold bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("candidate")}
            >
              <UserPlusIcon className="h-4 w-4" />
              Candidate Entry
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`justify-start gap-2 text-left ${
                activeTab === "generateCertificate"
                  ? "font-bold bg-gray-200"
                  : ""
              }`}
              onClick={() => setActiveTab("generateCertificate")}
            >
              <BarChartIcon className="h-4 w-4" />
              Generate Certificate No
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`justify-start gap-2 text-left ${
                activeTab === "dashboard" ? "font-bold bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChartIcon className="h-4 w-4" />
              Candidate Report
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`justify-start gap-2 text-left ${
                activeTab === "dashboard2" ? "font-bold bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("dashboard2")}
            >
              <BarChartIcon className="h-4 w-4" />
              Batch Report
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`justify-start gap-2 text-left ${
                activeTab === "dashboard3" ? "font-bold bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("dashboard3")}
            >
              <BarChartIcon className="h-4 w-4" />
              Batch-Wise Certificate Rep
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`justify-start gap-2 text-left ${
                activeTab === "dashboard4" ? "font-bold bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("dashboard4")}
            >
              <BarChartIcon className="h-4 w-4" />
              Batch MasterData Report
            </Button>
          </nav>
        </div>

        <div className="flex-1">
          <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-950 md:px-6">
            <h1 className="text-lg font-bold">Operator Portal</h1>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <LogOutIcon className="h-5 w-5 mr-2  text-black  bg-[#ebebf9]" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>NIELIT Operator</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link
                      href="/login/operator"
                      className={`font-medium text-[#080808c5] flex justify-center ${
                        activeTab === "logout" ? "font-bold" : ""
                      }`}
                    >
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-6">
            {activeTab === "batch" && <BatchEntryForm />}
            {activeTab === "candidate" && <EmployeeForm />}
            {activeTab === "batchUpdate" && <BatchUpdate />}
            {activeTab === "dashboard" && (
              <OperatorDashboard login="operator" />
            )}
            {activeTab === "dashboard2" && (
              <OperatorDashboard2 login="operator" />
            )}

            {activeTab === "dashboard3" && (
              <OperatorDashboard3 login="operator" />
            )}

            {activeTab === "dashboard4" && (
              <OperatorDashboard4 login="operator" />
            )}
            {activeTab === "generateCertificate" && <CertificateGenerator />}
          </main>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

function BarChartIcon(props) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function ClipboardIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function LayoutGridIcon(props) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function UserPlusIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
