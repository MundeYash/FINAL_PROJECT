"use client";
import jsPDF from "jspdf";

import html2canvas from "html2canvas";

import * as XLSX from "xlsx";
import ExcelExportButton from "../format/ExcelExportButton";
import DataTable from "../dataTable/DataTable";
import DataTable2 from "../dataTable/DataTable2";
import Header from "../header/Header";

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

export default function Operator({ login }) {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [candidatesData, setCandidatesData] = useState([]);

  const [selectedBatchCode, setSelectedBatchCode] = useState("");
  const [selectedBatchDescription, setSelectedBatchDescription] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function fetchData() {
    const response = await axios.get("http://localhost:4000/data");
    console.log(response.data);
    setData(response.data);
  }

  useEffect(() => {
    fetchData();
    fetchCandidatesData();
  }, []);

  const handleBatchCodeChange = (value) => setSelectedBatchCode(value);
  const handleBatchDescriptionChange = (value) =>
    setSelectedBatchDescription(value);
  const handleCourseNameChange = (value) => setSelectedCourseName(value);
  const handleDurationChange = (value) => setSelectedDuration(value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  async function fetchCandidatesData() {
    const response = await axios.get("http://localhost:4000/candidates");
    console.log(response.data);
    setFilteredData(response.data);
  }

 

 
  const applyFilters = () => {
    if (!filteredData) return;
    console.log(`filteredData`, filteredData);
    console.log(`selectedBatchCode`, selectedBatchCode);
    console.log(`selectedBatchDescription`, selectedBatchDescription);
    console.log(`selectedCourseName`, selectedCourseName);
    console.log(`selectedDuration`, selectedDuration);
    console.log(`startDate`, startDate);
    console.log(`endDate`, endDate);

    const filteredBatchCodes = filteredData.batchData
      ?.filter((item) => {
        const batchCodeMatch = selectedBatchCode
          ? item.batchCode === selectedBatchCode
          : true;
        const batchDescriptionMatch = selectedBatchDescription
          ? item.batchDescription === selectedBatchDescription
          : true;
        const courseNameMatch = selectedCourseName
          ? item.courseName === selectedCourseName
          : true;
        const durationMatch = selectedDuration
          ? item.courseDuration.value === selectedDuration.value &&
            item.courseDuration.format === selectedDuration.format
          : true;
        const startDateMatch = startDate
          ? new Date(item.startDate) >= new Date(startDate)
          : true;
        const endDateMatch = endDate
          ? new Date(item.endDate) <= new Date(endDate)
          : true;

        return (
          batchCodeMatch &&
          batchDescriptionMatch &&
          courseNameMatch &&
          durationMatch &&
          startDateMatch &&
          endDateMatch
        );
      })
      .map((item) => item.batchCode);
    const filteredCandidates = filteredData.employeeData.filter((candidate) =>
      filteredBatchCodes.includes(candidate.batchCode)
    );

    setCandidatesData(filteredCandidates);
  };


  const clearFilters = () => {
    setSelectedBatchCode('');
    setSelectedBatchDescription('');
    setSelectedCourseName('');
    setSelectedDuration({ value: '', format: '' });
    setStartDate('');
    setEndDate('');
    setCandidatesData(data?.employeeData || []); // Reset candidates data to initial data
  };

  const handleGeneratePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define a height for the table
    const tableHeight = 10 + candidatesData.length * 10; // Adjust the multiplier based on the number of rows

    // Use html2canvas to capture the table and convert it to a canvas
    html2canvas(document.querySelector("#pdfTable"), { scale: 1 }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Add an image to the PDF
        doc.addImage(imgData, "PNG", 10, 10, 180, tableHeight);

        // Save the PDF
        doc.save("table.pdf");
      }
    );
  };

  const handleExport = () => {
    // Creating a new workbook
    const workbook = XLSX.utils.book_new();

    // Creating a worksheet
    const worksheet = XLSX.utils.json_to_sheet(candidatesData);

    // Adding the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates Data");

    // Exporting the workbook as an Excel file
    XLSX.writeFile(workbook, "candidates_data.xlsx");
  };

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

      <section className="bg-gray-100 py-6 px-6 flex flex-col gap-4 mt-6 tb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Filters</h2>
          <div className="flex space-x-2">
            <Button onClick={applyFilters}>Apply Filters</Button>
            <Button onClick={() => window.location.reload()}>Clear </Button>
            {/* <Button onClick={clearFilters}>Clear</Button> */}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Filter selection options  */}

          <div className="flex items-center gap-2">
            <div>
              Start Date
              <Input
                className="w-full"
                type="date"
                onClick={handleStartDateChange}
              />
            </div>

            <span>-</span>

            <div>
              End Date
              <Input
                className="w-full"
                type="date"
                onClick={handleEndDateChange}
              />
            </div>
          </div>

          <Select onValueChange={handleBatchCodeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Batch Code " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data &&
                  data?.code?.sort().map((item, index) => {
                    if (item ){
                      return (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      );
                    }

                    return null ;
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handleBatchDescriptionChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Batch Description " />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {data &&
                  data?.description?.sort().map((item, index) => {
                   if (item ){
                    return (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    );
                   }

                   return null ;
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handleCourseNameChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Course Content/Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data &&
                  data?.name?.sort().map((item, index) => {
                    if (item) {
                      return (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      );
                    }
                    return null ;
                   
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handleDurationChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Duration in weeks" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {data &&
                  data?.duration?.sort().map((item, index) => {

                    if (item ){
                      return (
                        <SelectItem key={index} value={item}>
                          {item.value + " " + item.format}
                        </SelectItem>
                      );
                    }
                    return null ;
                    
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Report Printing options  */}

      <section className="bg-gray-100 py-6 px-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold"> Report </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <DataTable2 candidatesData={candidatesData} login={login} />
        </div>
      </section>

      {/* footer section  */}

      <footer className="bg-[#1f316e] text-white py-4 px-6 flex items-center justify-between">
        <span className="flex items-center justify-center">
          @CC: Developed and Maintained by NIELIT Delhi
        </span>
      </footer>
    </div>
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
