"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IoCloseCircle } from "react-icons/io5";
import ShowBatchDetails from './ShowBatchDetails'

import Header from "../header/Header";
import Footer from "../footer/Footer";
import { FormData, Candidate } from "../form/lib/types";

export default function Component() {
  const [batchCode, setBatchCode] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [data, setData] = useState<any>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  // const [editForm, setEditForm] = useState(false);
  // const [editData, setEditData] = useState<Partial<Candidate>>({});
  const [errors, setErrors] = useState<FormData>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (batchCode) {
      fetchEmployeeData(batchCode);
    }
  }, [batchCode]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/data");
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const fetchEmployeeData = async (id: string) => {
    try {
      if (id) {
        const response = await axios.get(
          `http://localhost:4000/employees/${id}`
        );
        setCandidates(response.data);
      }
    } catch (err) {
      console.error("Error fetching employee data", err);
    }
  };

  const handleCodeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBatchCode(event.target.value as string);
  };

  const generateCertificates = async () => {
    try {
      // Fetch the last certificate number assigned for the given batchCode
      const response = await axios.get(
        `http://localhost:4000/certificate/${batchCode}`
      );
      let maxCertNumber = response.data.lastCertificateNumber;
  
      // Update candidates with new certificate numbers locally
      const updatedCandidates = candidates.map((candidate) => {
        maxCertNumber += 1;
        return {
          ...candidate,
          certificateNumber: `${maxCertNumber}`,
        };
      });
      
      // Update the state with the new candidate data
      setCandidates(updatedCandidates);

      //send the updated candidate data to the server
      const res = await axios.post(`http://localhost:4000/assignCertificates/${batchCode}`,updatedCandidates);

      setAlert({
        type: "success",
        message: "Certificate numbers assigned successfully!",
      });
    } catch (error) {
      console.error("Error generating certificates", error);
      setAlert({
        type: "error",
        message: "Failed to assign certificate numbers.",
      });
    }
  };

  // logical for deleting the entry 
  const deleteCandidate = async (id) => {
    try {
      // await axios.delete(`http://localhost:4000/candidate/${id}`);
      setCandidates(candidates.filter(candidate => candidate._id !== id));
      setAlert({
        type: "success",
        message: "Candidate deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting candidate", error);
      setAlert({
        type: "error",
        message: "Failed to delete candidate",
      });
    }
  };
  
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <Header />

      <CardHeader className="text-center">
        <img
          alt="Header Logo"
          className="mx-auto h-12 w-auto"
          src="https://www.itvoice.in/wp-content/uploads/2013/12/NIELIT-Logo.png"
        />
        <CardTitle className="text-2xl">Assign Certificate Numbers </CardTitle>
      </CardHeader>
      
      <div className="mt-5 mb-4">

       


        
        <div>
        <ShowBatchDetails batchCode={batchCode} />
      </div>

       <div className="flex items-center space-x-4">
       <Box sx={{ minWidth: 120 }}>
          <FormControl sx ={{minWidth:200}}>
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
              data.code.sort().map((item, index) =>(
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

      
        <Button onClick={generateCertificates} className="mt-4 self-start">Generate Certificate</Button>
        
       </div>

        {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

        {batchCode && (
          <div className="container my-8 mx-auto p-4 bg-white rounded shadow mb-4">
            <h2 className="text-2xl font-bold text-center mb-6">Candidates</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">S. No.</th>
                  <th className="py-2 px-4 border"> Name</th>

                  <th className="py-2 px-4 border">Roll Number</th>

                  <th className="py-2 px-4 border">Designation</th>
                  <th className="py-2 px-4 border">Employee ID</th>
                  <th className="py-2 px-4 border">Phone Number</th>
                  <th className="py-2 px-4 border">Certificate Number</th>

                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr key={candidate._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="py-2 px-4 border">
                      {candidate.firstName + " " + candidate.lastName}
                    </td>

                    <td className="py-2 px-4 border">{candidate.rollNumber}</td>

                    <td className="py-2 px-4 border">
                      {candidate.designation}
                    </td>
                    <td className="py-2 px-4 border">{candidate.employeeId}</td>
                    <td className="py-2 px-4 border">
                      {candidate.phoneNumber}
                    </td>
                    <td className="py-2 px-4 border">
                      {candidate.certificateNumber}
                    </td>

                    <td className="py-2 px-4 border">
                      <div className="flex space-x-2">
                      <Button onClick={() => deleteCandidate(candidate._id)}>Delete</Button>
                        {/* <IoCloseCircle className="text-4xl" /> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        )}

      </div>
      <Footer />
    </>
  );
}


// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Alert from "@mui/material/Alert";
// import { CardTitle, CardHeader, Card } from "../ui/card";
// import { Button } from "../ui/button";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { IoCloseCircle } from "react-icons/io5";

// import Header from "../header/Header";
// import Footer from "../footer/Footer";
// import { FormData, Candidate } from "../form/lib/types";

// export default function Component() {
//   const [batchCode, setBatchCode] = useState<string | null>(null);
//   const [data, setData] = useState<any>(null);
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState({ type: "", message: "" });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (batchCode) {
//       fetchEmployeeData(batchCode);
//     }
//   }, [batchCode]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/data");
//       setData(response.data);
//     } catch (err) {
//       console.error("Error fetching data", err);
//     }
//   };

//   const fetchEmployeeData = async (id: string) => {
//     try {
//       if (id) {
//         const response = await axios.get(
//           `http://localhost:4000/employees/${id}`
//         );
//         setCandidates(response.data);
//       }
//     } catch (err) {
//       console.error("Error fetching employee data", err);
//     }
//   };

//   const handleCodeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setBatchCode(event.target.value as string);
//   };

//   const generateCertificates = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/certificate/${batchCode}`
//       );
//       let maxCertNumber = response.data;

//       const updatedCandidates = candidates.map((candidate) => {
//         maxCertNumber += 1;
//         return {
//           ...candidate,
//           certificateNumber: `${maxCertNumber}`,
//         };
//       });

//       await axios.post(
//         `http://localhost:4000/assignCertificates/${batchCode}`,
//         updatedCandidates
//       );

//       setCandidates(updatedCandidates);
//       setAlert({
//         type: "success",
//         message: "Certificate numbers assigned successfully!",
//       });
//     } catch (error) {
//       console.error("Error generating certificates", error);
//       setAlert({
//         type: "error",
//         message: "Failed to assign certificate numbers.",
//       });
//     }
//   };

//   if (loading) return <h1>Loading...</h1>;

//   return (
//     <>
//       <Header />

//       <CardHeader className="text-center">
//         <img
//           alt="Header Logo"
//           className="mx-auto h-12 w-auto"
//           src="https://www.itvoice.in/wp-content/uploads/2013/12/NIELIT-Logo.png"
//         />
//         <CardTitle className="text-2xl">Assign Certificate Numbers</CardTitle>
//       </CardHeader>
//       <div className="mt-5 mb-4">
//         <Box sx={{ minWidth: 120 }}>
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">
//               Select Batch Code
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={batchCode}
//               label="Select Batch Code"
//               onChange={handleCodeChange}
//             >
//               {data &&
//                 data.code.map((item, index) => (
//                   <MenuItem key={index} value={item}>
//                     {item}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </Box>

//         <div>
//           <Button onClick={generateCertificates} className="mt-4">
//             Generate Certificate
//           </Button>
//         </div>

//         {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

//         {batchCode && (
//           <div className="container my-8 mx-auto p-4 bg-white rounded shadow mb-4">
//             <h2 className="text-2xl font-bold text-center mb-6">Candidates</h2>
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 border">S. No.</th>
//                   <th className="py-2 px-4 border">Name</th>
//                   <th className="py-2 px-4 border">Roll Number</th>
//                   <th className="py-2 px-4 border">Designation</th>
//                   <th className="py-2 px-4 border">Employee ID</th>
//                   <th className="py-2 px-4 border">Phone Number</th>
//                   <th className="py-2 px-4 border">Certificate Number</th>
//                   <th className="py-2 px-4 border">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {candidates.map((candidate, index) => (
//                   <tr key={candidate._id}>
//                     <td className="border px-4 py-2">{index + 1}</td>
//                     <td className="py-2 px-4 border">
//                       {candidate.firstName + " " + candidate.lastName}
//                     </td>
//                     <td className="py-2 px-4 border">{candidate.rollNumber}</td>
//                     <td className="py-2 px-4 border">
//                       {candidate.designation}
//                     </td>
//                     <td className="py-2 px-4 border">{candidate.employeeId}</td>
//                     <td className="py-2 px-4 border">
//                       {candidate.phoneNumber}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       {candidate.certificateNumber}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       <div className="flex space-x-2">
//                         <Button>Delete</Button>
//                         <IoCloseCircle className="text-4xl" />
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }


