"use client";
import Alert from "@mui/material/Alert";
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
  SelectGroup,
} from "../ui/select";
import Link from "next/link";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
// import "../app/EmployeeForm.css"
import CryptoJS from "crypto-js";
import axios from "axios";
import { useState } from "react";

export default function CandidateUpdate({children}) {

    const [alert, setAlert] = useState(false);
    const [batchCode, setBatchCode] = useState("");
    const [formData, setFormData] = useState(children);
    const [data, setData] = useState(null);
    const [candidates, setCandidates] = useState();

    async function handleSubmit() {
        // console.log("submit");
        setFormData({ batchCode: batchCode, ...formData });
        console.log(formData);
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(formData),
          "secretKey"
        ).toString();
        console.log(encryptedData);
    
        const response = await axios.put("http://localhost:4000/candidate/update", {
          encryptedData: encryptedData,
        });
        // setAlert(true);
        // setTimeout(() => {
        //   setAlert(false);
        // }, 3000);
        // console.log(response);
      }

    async function fetchData() {
        const response = await axios.get("http://localhost:4000/data");
        console.log(response.data);
        setData(response.data);
      }
      function handleChange(e) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      }
      async function fetchEmployeeData(id: String) {
        try {
          // setLoading(true);
          if (id !== "") {
            const response = await axios.get(
              `http://localhost:4000/employees/${id}`
            );
            // console.log(response.data);
            setCandidates(response.data);
          }
          // setLoading(false);
        } catch (err) {
          console.log(err);
        }
        // setData(response.data);
      }
      const handleCodeChange = (event) => {
        setBatchCode(event.target.value);
      };
  return (
    <>
     
      <Card
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        className="w-full max-w-lg mx-auto py-8 px-6 absolute z-10 left-1/3"
      >
        <CardHeader className="text-center">
          <img
            alt="Header Logo"
            className="mx-auto h-12 w-auto"
            src="https://www.itvoice.in/wp-content/uploads/2013/12/NIELIT-Logo.png"
          />

          <CardTitle className="text-2xl">Candidate Updation Form</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Batch Code {formData.batchCode}
                </InputLabel>
                
              </FormControl>
            </Box>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value = {formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll number</Label>
              <Input
                id="rollNumber"
                type="text"
                onChange={handleChange}
                value = {formData.rollNumber}
                placeholder="Enter your roll number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificateNumber">Certificate number</Label>
              <Input
                id="certificateNumber"
                type="text"
                onChange={handleChange}
                value = {formData.certificateNumber}
                placeholder="Enter your certificate number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                type="text"
                onChange={handleChange}
                value = {formData.designation}
                placeholder="Enter your designation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                type="text"
                onChange={handleChange}
                value = {formData.employeeId}
                placeholder="Enter your employee ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone number</Label>

              <Input
                id="phoneNumber"
                type="numeric"
                onChange={handleChange}
                value = {formData.phoneNumber}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                className="min-h-[100px]"
                id="remarks"
                value = {formData.remarks}
                placeholder="Enter your message"
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end  ">
          <Button variant="outline" style={{ marginRight: "20px" }}>
            Cancel
          </Button>

          <Button
            className=" bg-indigo-900 text-white border-none py-2 px-4 text-center no-underline inline-block text-lg my-1 cursor-pointer rounded-lg"
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
          >
            Update Record
          </Button>
        </CardFooter>
        {alert && (
          <Alert
            severity="info"
            className="mb-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded shadow-lg"
          >
            Record Added Successfully.
          </Alert>
        )}
      </Card>

     
    </>
  );
}
