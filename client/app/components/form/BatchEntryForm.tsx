// "use client";

// import Alert from "@mui/material/Alert";
// import { useEffect, useState } from "react";
// import {
//   CardTitle,
//   CardDescription,
//   CardHeader,
//   CardContent,
//   CardFooter,
//   Card,
// } from "../ui/card";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import {
//   SelectValue,
//   SelectTrigger,
//   SelectItem,
//   SelectContent,
//   Select,
// } from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
// import axios from "axios";
// import CryptoJS from "crypto-js";
// import Header from "../header/Header";
// import Footer from "../footer/Footer";
// export default function Component() {
//   const [alert2, setAlert2] = useState(false);
//   const [batchCode, setBatchCode] = useState<number | null>(null);
//   const [formData, setFormData] = useState({
//     courseDuration: {
//       value: "",
//       format: "weeks",
//     },
//     trainingMode: "offline",
//     venueOfTraining: "NIELIT",
//   });

//   async function fetchBatchCode() {
//     try {
//       const response = await axios.get("http://localhost:4000/batchCode");
//       setBatchCode(parseInt(response.data[0].maxBatchCode) + 1);
//     } catch (error) {
//       console.error("Error fetching batch code:", error);
//     }
//   }

//   useEffect(() => {
//     fetchBatchCode();
//   }, []);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     if (id === "courseDurationValue" || id === "courseDurationFormat") {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         courseDuration: {
//           ...prevFormData.courseDuration,
//           [id === "courseDurationValue" ? "value" : "format"]: value,
//         },
//       }));
//     } else {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [id]: value,
//       }));
//     }
//   };

//   async function handleSubmit() {
//     if (batchCode === null) {
//       console.error("Batch code is not set.");
//       return;
//     }
//     const dataToSubmit = { ...formData, batchCode };
//     console.log(dataToSubmit);
//     const encryptedData = CryptoJS.AES.encrypt(
//       JSON.stringify(dataToSubmit),
//       "secretKey"
//     ).toString();

//     try {
//       const response = await axios.post("http://localhost:4000/submit/batch", {
//         encryptedData,
//       });
//       console.log(response);
//       setAlert2(true);
//       setTimeout(() => {
//         setAlert2(false);
//       }, 3000);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   }

//   return (
//     <>
      
//       <Header/>

//       <Card className="mt-6 mb-6 bg-blue-100 shadow-lg">
//         <CardHeader className="text-center">
//           <img
//             alt="Header Logo"
//             className="mx-auto h-12 w-auto"
//             src="https://www.itvoice.in/wp-content/uploads/2013/12/NIELIT-Logo.png"
//           />
//           <h1 className="text-2xl font-bold mt-4">Batch Entry Form</h1>
//         </CardHeader>

//         <CardContent>
//           <div className="grid grid-cols-1 gap-6">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2" style={{ width: "50%" }}>
//                 <Label htmlFor="batchCode">Batch code</Label>
//                 {batchCode !== null && (
//                   <Input id="batchCode" type="text" disabled value={batchCode} />
//                 )}
//               </div>
//               <div className="space-y-2" style={{ width: "50%", marginLeft: "20px" }}>
//                 <Label htmlFor="batchDescription">Department Name</Label>
//                 <Input
//                   id="batchDescription"
//                   type="text"
//                   onChange={handleChange}
//                   placeholder="Enter Name of the Department"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="departmentAddress">Address of Department</Label>
//               <Input
//                 id="departmentAddress"
//                 type="text"
//                 onChange={handleChange}
//                 placeholder="Enter departmental address"
//               />
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2" style={{ width: "50%" }}>
//                 <Label htmlFor="trainingMode">Mode of Training :</Label>
//                 <select
//                   id="trainingMode"
//                   className="select-field"
//                   value={formData.trainingMode}
//                   onChange={handleChange}
//                 >
//                   <option value="online">Online</option>
//                   <option value="offline">Offline</option>
//                   <option value="hybrid">Hybrid</option>
//                 </select>
//               </div>
//               <div className="space-y-2" style={{ width: "50%" }}>
//                 <Label htmlFor="venueOfTraining">Venue of Training :</Label>
//                 <select
//                   id="venueOfTraining"
//                   className="select-field"
//                   value={formData.venueOfTraining}
//                   onChange={handleChange}
//                 >
//                   <option value="NIELIT">NIELIT</option>
//                   <option value="outside">Outside NIELIT</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2" style={{ width: "50%" }}>
//                 <Label htmlFor="courseName">Course name</Label>
//                 <Input
//                   id="courseName"
//                   type="text"
//                   onChange={handleChange}
//                   placeholder="Enter your course name"
//                 />
//               </div>
//               <div className="space-y-2" style={{ width: "50%", marginLeft: "20px" }}>
//                 <Label htmlFor="technologyName">Technology</Label>
//                 <Input
//                   id="technologyName"
//                   type="text"
//                   onChange={handleChange}
//                   placeholder="Enter Name of Technology"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="revenueOfBatch">Revenue of Batch</Label>
//               <Input
//                 id="revenueOfBatch"
//                 type="text"
//                 onChange={handleChange}
//                 placeholder="Enter Batch Revenue"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="courseDuration">Course duration :</Label>
//               <select
//                 id="courseDurationFormat"
//                 value={formData.courseDuration.format}
//                 onChange={handleChange}
//               >
//                 <option value="days">Days</option>
//                 <option value="months">Months</option>
//                 <option value="hours">Hours</option>
//                 <option value="weeks">Weeks</option>
//               </select>
//               <Input
//                 id="courseDurationValue"
//                 type="number"
//                 value={formData.courseDuration.value}
//                 onChange={handleChange}
//                 placeholder={`Enter your course duration in ${formData.courseDuration.format}`}
//               />
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2" style={{ width: "50%", marginRight: "20px" }}>
//                 <Label htmlFor="startDate">Start date</Label>
//                 <Input id="startDate" type="date" onChange={handleChange} />
//               </div>
//               <div className="space-y-2" style={{ width: "50%", marginLeft: "20px" }}>
//                 <Label htmlFor="endDate">End date</Label>
//                 <Input id="endDate" type="date" onChange={handleChange} />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="participantsNo">Total Number of Participants</Label>
//               <Input
//                 id="participantsNo"
//                 type="number"
//                 onChange={handleChange}
//                 placeholder="Enter Number of Participants"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="remarks">Remarks</Label>
//               <Textarea
//                 className="min-h-[100px]"
//                 id="remarks"
//                 placeholder="Enter your remarks"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </CardContent>

//         <CardFooter className="flex justify-end">
//           <Button variant="outline" style={{ marginRight: "20px" }}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} type="submit">
//             Submit
//           </Button>
//         </CardFooter>
//         {alert2 && (
//           <Alert
//             severity="info"
//             className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg"
//           >
//             Batch Added Successfully.
//           </Alert>
//         )}
//       </Card>

//      <Footer />
//     </>
//   );
// }



"use client";

import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
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
import axios from "axios";
import CryptoJS from "crypto-js";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Component() {
  const [alert2, setAlert2] = useState(false);
  const [batchCode, setBatchCode] = useState<number | null>(null);
  const [batchCodes, setBatchCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    batchDescription: "",
    departmentAddress: "",
    trainingMode: "offline",
    venueOfTraining: "NIELIT",
    courseName: "",
    technologyName: "",
    revenueOfBatch: "",
    courseDuration: {
      value: "",
      format: "weeks",
    },
    startDate: "",
    endDate: "",
    participantsNo: "",
    remarks: "",
    venueDetails: "",
  });
  const [errors, setErrors] = useState({});

  async function fetchBatchCode() {
    try {
      const response = await axios.get("http://localhost:4000/batchCode");
      setBatchCode(parseInt(response.data[0].maxBatchCode) + 1);
    } catch (error) {
      console.error("Error fetching batch code:", error);
    }
  }

  useEffect(() => {
    fetchBatchCode();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "courseDurationValue" || id === "courseDurationFormat") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        courseDuration: {
          ...prevFormData.courseDuration,
          [id === "courseDurationValue" ? "value" : "format"]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.batchDescription) newErrors.batchDescription = "Batch description is required.";
    if (!formData.departmentAddress) newErrors.departmentAddress = "Department address is required.";
    if (!formData.trainingMode) newErrors.trainingMode = "Training mode is required.";
    if (!formData.venueOfTraining) newErrors.venueOfTraining = "Venue of training is required.";
    if (formData.venueOfTraining === "outside" && !formData.venueDetails)
      newErrors.venueDetails = "Venue details are required for outside NIELIT.";
    if (!formData.courseName) newErrors.courseName = "Course name is required.";
    if (!formData.technologyName) newErrors.technologyName = "Technology name is required.";
    if (!formData.revenueOfBatch) {
      newErrors.revenueOfBatch = "Revenue of batch is required.";
    } else if (parseInt(formData.revenueOfBatch) < 0) {
      newErrors.revenueOfBatch = "Revenue cannot be negative.";
    }
    if (!formData.courseDuration.value) newErrors.courseDuration = "Course duration value is required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.endDate) newErrors.endDate = "End date is required.";
    if (!formData.participantsNo) newErrors.participantsNo = "Number of participants is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      batchDescription: "",
      departmentAddress: "",
      trainingMode: "offline",
      venueOfTraining: "NIELIT",
      courseName: "",
      technologyName: "",
      revenueOfBatch: "",
      courseDuration: {
        value: "",
        format: "weeks",
      },
      startDate: "",
      endDate: "",
      participantsNo: "",
      remarks: "",
      venueDetails: "",
    });
  };


  
  useEffect(() => {
    fetchBatchCodes();
  }, []);

  const fetchBatchCodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/data");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching batch codes', error);
    } finally {
      setLoading(false);
    }
  };

  
  async function handleSubmit() {
    if (batchCode === null) {
      console.error("Batch code is not set.");
      return;
    }
    if (!validateForm()) {
      return;
    }
    const dataToSubmit = { ...formData, batchCode };
    console.log(dataToSubmit);
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(dataToSubmit),
      "secretKey"
    ).toString();

    try {
      const response = await axios.post("http://localhost:4000/submit/batch", {
        encryptedData,
      });
      console.log(response);
      setAlert2(true);
      setTimeout(() => {
        setAlert2(false);
      }, 3000);
      resetForm();

      fetchBatchCodes(); // Fetch updated list of batch codes
      setBatchCode(''); // Reset input field
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <>
      <Header />

      <Card className="mt-6 mb-6 bg-blue-100 shadow-lg">
        <CardHeader className="text-center">
          <img
            alt="Header Logo"
            className="mx-auto h-12 w-auto"
            src="https://www.itvoice.in/wp-content/uploads/2013/12/NIELIT-Logo.png"
          />
          <h1 className="text-2xl font-bold mt-4">Batch Entry Form</h1>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="batchCode">Batch code</Label>
                {batchCode !== null && (
                  <Input id="batchCode" type="text" disabled value={batchCode} />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchDescription">
                  Batch Description <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="batchDescription"
                  type="text"
                  onChange={handleChange}
                  value={formData.batchDescription}
                  placeholder="Enter batch description"
                />
                {errors.batchDescription && (
                  <Alert severity="error">{errors.batchDescription}</Alert>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departmentAddress">
                Address of Department <span className="text-red-500">*</span>
              </Label>
              <Input
                id="departmentAddress"
                type="text"
                onChange={handleChange}
                value={formData.departmentAddress}
                placeholder="Enter departmental address"
              />
              {errors.departmentAddress && (
                <Alert severity="error">{errors.departmentAddress}</Alert>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="trainingMode">
                  Mode of Training <span className="text-red-500">*</span>
                </Label>
                <select
                  id="trainingMode"
                  className="select-field"
                  value={formData.trainingMode}
                  onChange={handleChange}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                {errors.trainingMode && (
                  <Alert severity="error">{errors.trainingMode}</Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="venueOfTraining">
                  Venue of Training <span className="text-red-500">*</span>
                </Label>
                <select
                  id="venueOfTraining"
                  className="select-field"
                  value={formData.venueOfTraining}
                  onChange={handleChange}
                >
                  <option value="NIELIT">NIELIT</option>
                  <option value="outside">Outside NIELIT</option>
                </select>
                {errors.venueOfTraining && (
                  <Alert severity="error">{errors.venueOfTraining}</Alert>
                )}
              </div>
            </div>

            {formData.venueOfTraining === "outside" && (
              <div className="space-y-2">
                <Label htmlFor="venueDetails">
                  Venue Details <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="venueDetails"
                  type="text"
                  onChange={handleChange}
                  value={formData.venueDetails}
                  placeholder="Enter venue details"
                />
                {errors.venueDetails && (
                  <Alert severity="error">{errors.venueDetails}</Alert>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="courseName">
                  Course Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="courseName"
                  type="text"
                  onChange={handleChange}
                  value={formData.courseName}
                  placeholder="Enter course name"
                />
                {errors.courseName && (
                  <Alert severity="error">{errors.courseName}</Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologyName">
                  Technology Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="technologyName"
                  type="text"
                  onChange={handleChange}
                  value={formData.technologyName}
                  placeholder="Enter technology name"
                />
                {errors.technologyName && (
                  <Alert severity="error">{errors.technologyName}</Alert>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenueOfBatch">
                Revenue of Batch <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center">
                <span className="mr-2">₹</span>
                <Input
                  id="revenueOfBatch"
                  type="number"
                  min="0"
                  onChange={handleChange}
                  value={formData.revenueOfBatch}
                  placeholder="Enter batch revenue"
                />
              </div>
              {errors.revenueOfBatch && (
                <Alert severity="error">{errors.revenueOfBatch}</Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseDuration">
                Course Duration <span className="text-red-500">*</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="courseDurationValue"
                  type="number"
                  min="0"
                  onChange={handleChange}
                  value={formData.courseDuration.value}
                  placeholder="Enter Duration"
                />
                <select
                  id="courseDurationFormat"
                  className="select-field"
                  value={formData.courseDuration.format}
                  onChange={handleChange}
                >
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
              {errors.courseDuration && (
                <Alert severity="error">{errors.courseDuration}</Alert>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  onChange={handleChange}
                  value={formData.startDate}
                />
                {errors.startDate && (
                  <Alert severity="error">{errors.startDate}</Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">
                  End Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  onChange={handleChange}
                  value={formData.endDate}
                />
                {errors.endDate && (
                  <Alert severity="error">{errors.endDate}</Alert>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participantsNo">
                Total Number of Participants <span className="text-red-500">*</span>
              </Label>
              <Input
                id="participantsNo"
                type="number"
                min="0"
                onChange={handleChange}
                value={formData.participantsNo}
                placeholder="Enter number of participants"
              />
              {errors.participantsNo && (
                <Alert severity="error">{errors.participantsNo}</Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                onChange={handleChange}
                value={formData.remarks}
                placeholder="Enter remarks"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>

      <div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Batch Codes</th>
            </tr>
          </thead>
          <tbody>
            {batchCodes.map((code, index) => (
              <tr key={index}>
                <td>{code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>

      <Footer />
      {alert2 && <Alert severity="success">Form submitted successfully!</Alert>}
    </>
  );
}
