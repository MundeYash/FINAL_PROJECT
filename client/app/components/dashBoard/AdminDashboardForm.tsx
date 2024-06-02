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
  console.log(data);
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

      <section className="bg-gray-100 py-6 px-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Filters</h2>
          <Button>Apply Filters</Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Filter selection options  */}

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Batch Code " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data &&
                  data?.code?.map((item, index) => {
                    return (
                      <SelectItem key={index} value={`batch${index}`}>
                        {item}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Batch Description " />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {data &&
                  data?.description?.map((item, index) => {
                    return (
                      <SelectItem key={index} value={`batch${index}`}>
                        {item}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Course Content/Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data &&
                  data?.name?.map((item, index) => {
                    return (
                      <SelectItem key={index} value={`batch${index}`}>
                        {item}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Duration in weeks" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {data &&
                  data?.duration?.map((item, index) => {
                    return (
                      <SelectItem key={index} value={`duration${index}`}>
                        {item.value + " " + item.format}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <div>
              {" "}
              Start Date
              <Input className="w-full" type="date" />
            </div>

            <span>-</span>

            <div>
              End Date
              <Input className="w-full" type="date" />
            </div>
          </div>
        </div>
      </section>

      {/* Report Printing options  */}

      <section className="bg-gray-100 py-6 px-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold"> Report Data</h2>

          <div className="flex items-center gap-4">
            <Button>PDF</Button>
            <Button>Excel</Button>
            <Button>Doc</Button>
            <Button>Download</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Code</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Certificate Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>203</TableCell>
                <TableCell>203819</TableCell>
                <TableCell>8293221</TableCell>

                <TableCell>Aman Kumar</TableCell>
                <TableCell>Associate Professor </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>209</TableCell>
                <TableCell>29321</TableCell>
                <TableCell>6728281</TableCell>

                <TableCell>Dr. P. Bhalla</TableCell>
                <TableCell>Director Professor </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>210</TableCell>
                <TableCell>203819</TableCell>
                <TableCell>8293221</TableCell>

                <TableCell>Aman Kumar</TableCell>
                <TableCell>Associate Professor </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* graphs display : bar graph and pie chart  */}

      <div className="flex-1 grid grid-cols-[1fr] gap-6 p-6">
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Candidate Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* footer section  */}

      <footer className="bg-[#1f316e] text-white py-4 px-6 flex items-center justify-between">
        <span className="flex items-center justify-center">
          @CC: Developed and Maintained by NIELIT Delhi
        </span>

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

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
          { name: "July", count: 92 },
          { name: "Aug", count: 21 },
          { name: "Sept", count: 12 },
          { name: "Oct", count: 32 },
          { name: "Nov", count: 78 },
          { name: "Dec", count: 75 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
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

function PieChart(props) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "Jan", value: 111 },
          { id: "Feb", value: 157 },
          { id: "Mar", value: 129 },
          { id: "Apr", value: 150 },
          { id: "May", value: 119 },
          { id: "Jun", value: 72 },
          { id: "July", value: 92 },
          { id: "Aug", value: 21 },
          { id: "Sept", value: 12 },
          { id: "Oct", value: 32 },
          { id: "Nov", value: 78 },
          { id: "Dec", value: 75 },
        ]}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.65}
        colors={["#2563eb"]}
        theme={{
          labels: {
            text: {
              fontSize: "10px",
            },
          },
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        role="application"
      />
    </div>
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
