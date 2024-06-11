

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const BatchCodeSelector = () => {
  const [batchCode, setBatchCode] = useState<string>("");
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

  const handleCodeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBatchCode(event.target.value as string);
  };

  return (
    <div>
        
      {batchDetails && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-4">Batch Details</h2>
        <div className="space-y-2 w-4/5">
          <div className="text-gray-700"><strong className="font-semibold">Batch Code:</strong> {batchDetails.batchCode}</div>
          <div className="text-gray-700"><strong className="font-semibold">Description:</strong> {batchDetails.batchDescription}</div>
          <div className="text-gray-700"><strong className="font-semibold">Course Name:</strong> {batchDetails.courseName}</div>
          <div className="text-gray-700"><strong className="font-semibold">Start Date:</strong> {new Date(batchDetails.startDate).toLocaleDateString()}</div>
          <div className="text-gray-700"><strong className="font-semibold">End Date:</strong> {new Date(batchDetails.endDate).toLocaleDateString()}</div>
          <div className="text-gray-700"><strong className="font-semibold">Duration:</strong> {`${batchDetails.courseDuration.value} ${batchDetails.courseDuration.format}`}</div>
        </div>
      </div>
      )}

      <FormControl fullWidth>
        <InputLabel id="batch-code-select-label">Select Batch Code</InputLabel>
        <Select
          labelId="batch-code-select-label"
          id="batch-code-select"
          value={batchCode}
          label="Select Batch Code"
          onChange={handleCodeChange}
        >
          {data?.code.map((item: string, index: number) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Existing table and other UI elements */}
    </div>
  );
};

export default BatchCodeSelector;