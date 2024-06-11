import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const BatchCodeSelector = ({ batchCode = "" }) => {
  const [batchDetails, setBatchDetails] = useState<any | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/data");
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      setBatchDetails({
        batchCode: data.code[0],
        batchDescription: data.description[0],
        courseName: data.name[0],
        startDate: data.startDate[0],
        endDate: data.endDate[0],
        courseDuration: data.duration[0] || { value: 0, format: "days" },
      });
    }
  }, [data]);

  useEffect(() => {
    if (data && batchCode) {
      const index = data.code.indexOf(batchCode);
      if (index !== -1) {
        setBatchDetails({
          batchCode: data.code[index],
          batchDescription: data.description[index],
          courseName: data.name[index],
          startDate: data.startDate[index],
          endDate: data.endDate[index],
          courseDuration: data.duration[index] || { value: 0, format: "days" },
        });
      }
    }
  }, [batchCode, data]);

  return (
    <div className="mb-5">
      {batchCode && batchDetails && (
        <div className="container my-8 mx-auto p-4 bg-white rounded shadow mb-5">
          <h2 className="text-2xl font-bold text-center mb-6">Batch Details</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Batch Code</th>
                <th className="px-4 py-2 border">Batch Description</th>
                <th className="px-4 py-2 border">Course Name</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Course Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{batchDetails.batchCode}</td>
                <td className="border px-4 py-2">
                  {batchDetails.batchDescription}
                </td>
                <td className="border px-4 py-2">{batchDetails.courseName}</td>
                <td className="border px-4 py-2">
                  {new Date(batchDetails.startDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(batchDetails.endDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{`${batchDetails.courseDuration.value} ${batchDetails.courseDuration.format}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BatchCodeSelector;
