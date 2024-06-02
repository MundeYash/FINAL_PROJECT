"use client";

import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "../ui/select";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function Component() {
  const [alert2, setAlert2] = useState(false);
  const [batchCode, setbatchCode] = useState(null);

  const [formData, setFormData] = useState({
    courseDuration: {
      value: "",
      format: "weeks",
    },
    trainingMode: "offline", // Initialize trainingMode with default value
    venueOfTraining: "NIELIT", // Initialize venueOfTraining with default value
  });

  async function fetchBatchCode() {
    try {
      const response = await axios.get("http://localhost:4000/batchCode");

      console.log(response);

      setbatchCode(parseInt(response.data[0].maxBatchCode) + 1);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    fetchBatchCode();
    console.log("use effect running");
  }, []);

  const [durationFormat, setDurationFormat] = useState("weeks");
  const [numericValue, setNumericValue] = useState("");

  const [address, setAddress] = useState("");

  const [trainingMode, setTrainingMode] = useState("online");

  function handleChange(e) {
    const { id, value } = e.target;
    if (id === "courseDurationValue" || id === "courseDurationFormat") {
      setFormData({
        ...formData,
        courseDuration: {
          ...formData.courseDuration,
          [id === "courseDurationValue" ? "value" : "format"]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  }

  // AFTER CHANGES

  async function handleSubmit() {
    // console.log("submit");
    batchCode && setFormData({ ...formData, batchCode: batchCode });
    console.log(formData);
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(formData),
      "secretKey"
    ).toString();
    // console.log(encryptedData);

    const response = await axios.post("http://localhost:4000/submit/batch", {
      encryptedData: encryptedData,
    });

    setAlert2(true);
    setTimeout(() => {
      setAlert2(false);
    }, 3000);
    handleScroll();
    console.log(response);
  }

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

      <Card
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        className="mt-6 p-6"
      >
        <CardHeader className="text-center">
          <img
            alt="Header Logo"
            className="mx-auto h-12 w-auto"
            src="https://www.itvoice.in/wp-content/uploads/2013/12/NIELIT-Logo.png"
          />

          <h1 className="text-2xl font-bold  mt-4 ">Batch Entry Form </h1>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <div
              style={{ display: "flex" }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <div className="space-y-2" style={{ width: "50%" }}>
                <Label htmlFor="batchCode">Batch code</Label>

                {batchCode !== null && (
                  <Input
                    id="batchCode"
                    type="text"
                    disabled
                    value={batchCode}
                  />
                )}
              </div>

              <div
                className="space-y-2"
                style={{ width: "50%", marginLeft: "20px" }}
              >
                <Label htmlFor="batchDescription">Department Name</Label>
                <Input
                  id="batchDescription"
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Name of the Department"
                />
              </div>
            </div>

            {/* ADDING THE ADDRESS SECTION  */}
            <div className="space-y-2">
              <Label htmlFor="departmentAddress">Address of Department</Label>
              <Input
                id="departmentAddress"
                type="text"
                onChange={handleChange}
                placeholder="Enter departmental address"
              />
            </div>

            {/* ADDING MODE OF TRAINING SECTION AND VENUE OF TRAINING   */}
            <div style={{ display: "flex" }}>
              <div className="space-y-2" style={{ width: "50%" }}>
                <Label htmlFor="trainingMode">Mode of Training :</Label>
                <select
                  id="trainingMode"
                  className="select-field"
                  value={formData.trainingMode || "offline"}
                  onChange={handleChange}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="space-y-2" style={{ width: "50%" }}>
                <Label htmlFor="venueOfTraining">Venue of Training :</Label>
                <select
                  id="venueOfTraining"
                  className="select-field"
                  value={formData.venueOfTraining || "NIELIT"}
                  onChange={handleChange}
                >
                  <option value="NIELIT">NIELIT</option>
                  <option value="outside">Outside NIELIT</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              {/* ADDING THE COURSE NAME SECTION  */}
              <div className="space-y-2" style={{ width: "50%" }}>
                <Label htmlFor="courseName">Course name</Label>
                <Input
                  id="courseName"
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter your course name"
                />
              </div>

              {/* ADDING THE TECHNOLOGY SECTION  */}
              <div
                className="space-y-2"
                style={{ width: "50%", marginLeft: "20px" }}
              >
                <Label htmlFor="technologyName">Technology</Label>
                <Input
                  id="technologyName"
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Name of Technology"
                />
              </div>
            </div>

            {/* ADDING REVENUE OF BATCH SECTION  */}
            <div className="space-y-2">
              <Label htmlFor="revenueOfBatch">Revenue of Batch </Label>
              <Input
                id="revenueOfBatch"
                type="text"
                onChange={handleChange}
                placeholder="Enter Batch Revenue"
              />
            </div>

            <div className="space-y-2   ">
              <Label htmlFor="courseDuration">Course duration :</Label>
              <select
                id="courseDurationFormat"
                value={formData.courseDuration.format}
                onChange={handleChange}
              >
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="hours">Hours</option>
                <option value="weeks">Weeks</option>
              </select>
              <Input
                id="courseDurationValue"
                type="number"
                value={formData.courseDuration.value}
                onChange={handleChange}
                placeholder={`Enter your course duration in ${formData.courseDuration.format}`}
              />
            </div>

            <div style={{ display: "flex" }}>
              <div
                className="space-y-2"
                style={{ width: "50%", marginRight: "20px" }}
              >
                <Label htmlFor="startDate">Start date</Label>
                <Input id="startDate" type="date" onChange={handleChange} />
              </div>

              <div
                className="space-y-2"
                style={{ width: "50%", marginLeft: "20px" }}
              >
                <Label htmlFor="endDate">End date</Label>
                <Input id="endDate" type="date" onChange={handleChange} />
              </div>
            </div>

            {/* ADDING TOTAL NUMBER OF PARTICIPANTS  */}
            <div className="space-y-2">
              <Label htmlFor="participantsNo">
                Total Number of Participants{" "}
              </Label>
              <Input
                id="participantsNo"
                type="number"
                onChange={handleChange}
                placeholder="Enter Number of Participants"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                className="min-h-[100px]"
                id="remarks"
                placeholder="Enter your remarks"
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button variant="outline" style={{ marginRight: "20px" }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </CardFooter>
        {alert2 && (
          <Alert
            severity="info"
            className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg"
          >
            Batch Added Successfully.
          </Alert>
        )}
      </Card>

      <footer className="bg-[#1f316e] text-white py-4 px-4 flex items-center justify-center">
        <div className="flex items-center gap-4 text-sm">
          @CC: Developed and Maintained by NIELIT Delhi
        </div>
      </footer>
    </>
  );
}
