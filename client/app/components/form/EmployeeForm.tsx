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
import CloseIcon from '@mui/icons-material/Close';
// import "../app/EmployeeForm.css"
import { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import { Car } from "lucide-react";
import CandidateUpdate from "./CandidateUpdate";

export default function Component() {
  const [batchCode, setBatchCode] = useState("");
  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);
  const [candidates, setCandidates] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [editform, seteditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  async function fetchData() {
    const response = await axios.get("http://localhost:4000/data");
    console.log(response.data);
    setData(response.data);
  }

  async function fetchCandidateDetails(id: string) {
    try{
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/candidate/${id}`);
      setEditData(response.data);
      seteditForm(true);
      console.log(response.data);
      setLoading(false);
    }
    catch(err){
      setLoading(false);
      console.log(err);
    }
  }
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  async function fetchEmployeeData(id: string) {
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
      setLoading(false);
      console.log(err);
    }
    // setData(response.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchEmployeeData(batchCode);
    console.log(candidates);
  }, [batchCode]);

  const handleCodeChange = (event) => {
    setBatchCode(event.target.value);
  };
  async function handleSubmit() {
    // console.log("submit");
    setFormData({ batchCode: batchCode, ...formData });
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(formData),
      "secretKey"
    ).toString();
    console.log(encryptedData);

    const response = await axios.post("http://localhost:4000/submit/employee", {
      encryptedData: encryptedData,
    });
    setAlert2(true);
    setTimeout(() => {
      setAlert2(false);
    }, 3000);
    handleScroll();
    console.log(response);
  }

  async function handleEdit(id:string) {
    fetchCandidateDetails(id);
  }

  async function handleDelete(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:4000/candidate/delete/${id}`
      );
      fetchEmployeeData(batchCode);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      handleScroll();
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
  
    {editform &&
    <div className="w-[700px] h-auto bg-gray-400">
      <CloseIcon className="z-20 absolute right-1/4 " onClick={()=> {seteditForm(false); fetchEmployeeData(batchCode);}}/>
      <CandidateUpdate>{editData}</CandidateUpdate>
    </div>
      }
      <header className="flex items-center justify-between bg-[#1f316e] px-4 py-5 text-white sm:px-6 lg:px-8">
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
        className="w-full max-w-lg mx-auto py-8 px-6  "
      >
        <CardHeader className="text-center">
          <img
            alt="Header Logo"
            className="mx-auto h-12 w-auto"
            src="https://www.itvoice.in/wp-content/uploads/2013/12/NIELIT-Logo.png"
          />

          <CardTitle className="text-2xl">Candidate Entry Form</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Batch Code
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={batchCode}
                  label="Select Batch Code"
                  onChange={handleCodeChange}
                >
                  {data &&
                    data.code.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  type="text"
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
                placeholder="Enter your roll number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificateNumber">Certificate number</Label>
              <Input
                id="certificateNumber"
                type="text"
                onChange={handleChange}
                placeholder="Enter your certificate number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                type="text"
                onChange={handleChange}
                placeholder="Enter your designation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                type="text"
                onChange={handleChange}
                placeholder="Enter your employee ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone number</Label>

              <Input
                id="phoneNumber"
                type="numeric"
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                className="min-h-[100px]"
                id="remarks"
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
            className="  bg-[#2c3658] text-white border-none py-2 px-4 text-center no-underline inline-block text-lg my-1 cursor-pointer rounded-lg"
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
          >
            Add Candidate
          </Button>
        </CardFooter>
        {alert2 && (
          <Alert
            severity="info"
            className="mb-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded shadow-lg"
          >
            Record Added Successfully.
          </Alert>
        )}
      </Card>

      <Card className="py-8 px-8 ">
        <CardContent>
          <section className="bg-gray-100 py-6 px-6 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              <span className="">Candidates of Batch</span>
            </h2>

            <table className="table-auto w-full border-collapse">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">S. No.</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Roll Number</th>
                  <th className="px-4 py-2">Certificate Number</th>
                  <th className="px-4 py-2">Designation</th>
                  <th className="px-4 py-2">Employee Id</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Remarks</th>
                  <th className="px-4 py-2">Update </th>
                  <th className="px-4 py-2">Delete </th>
                  {/* Add more table headers for other fields if needed */}
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {candidates &&
                  candidates.map((candidate, index) => (
                    <tr key={candidate._id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{`${candidate.firstName} ${candidate.lastName}`}</td>
                      <td className="border px-4 py-2">
                        {candidate.rollNumber}
                      </td>
                      <td className="border px-4 py-2">
                        {candidate.certificateNumber}
                      </td>
                      <td className="border px-4 py-2">
                        {candidate.designation}
                      </td>
                      <td className="border px-4 py-2">
                        {candidate.employeeId}
                      </td>

                      <td className="border px-4 py-2">{candidate.email}</td>
                      <td className="border px-4 py-2">
                        {candidate.phoneNumber}
                      </td>
                      <td className="border px-4 py-2">{candidate.remarks}</td>
                      <td className="border px-4 py-2">
                        <Button className="bg-green-500 text-white border-none py-2 px-4 text-center no-underline inline-block text-lg my-1 cursor-pointer rounded-lg"
                        onClick={()=>{                            
                          handleEdit(candidate._id);
                        }}>
                          Edit
                        </Button>
                      </td>

                      <td className="border px-4 py-2">
                        <Button
                          onClick={() => handleDelete(candidate._id)}
                          className="bg-red-500 text-white border-none py-2 px-4 text-center no-underline inline-block text-lg my-1 cursor-pointer rounded-lg"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {alert && (
              <Alert
                severity="success"
                className="mr-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
              >
                Record Deleted Successfully.
              </Alert>
            )}
          </section>
        </CardContent>
      </Card>

      <footer className="bg-[#1f316e] text-white py-4 px-4 flex items-center justify-center">
        <div className="flex items-center gap-4 text-sm">
          @CC: Developed and Maintained by NIELIT Delhi
        </div>
      </footer>
    </>
  );
}
