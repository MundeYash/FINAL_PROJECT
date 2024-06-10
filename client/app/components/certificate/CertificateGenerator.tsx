import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "../ui/select";

function CertificateGenerator() {
  const [data, setData] = useState(null);
  const [batchCodes, setBatchCodes] = useState([]);
  const [selectedBatchCode, setSelectedBatchCode] = useState('');
  const handleBatchCodeChange = (value) => setSelectedBatchCode(value);

  useEffect(() => {
    fetchBatchCodes();
  }, []);

  async function fetchBatchCodes() {
    try {
      const response = await axios.get("http://localhost:4000/candidates");
      setBatchCodes(response.data); // Assuming the API returns an array of batch codes
    } catch (error) {
      console.error("Error fetching batch codes:", error);
    }
  }



  const generateCertificate = () => {
    // Logic to generate certificate for the selected batch code
    console.log(`Generating certificate for batch code: ${selectedBatchCode}`);
    // This could involve another API call or local processing
  };

  return (
    <div>
      <h1>Certificate Generator</h1>
      <div>
        <label htmlFor="batchCodeSelect">Select Batch Code:</label>
        <Select onValueChange={handleBatchCodeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Batch Code " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data &&
                  data?.code?.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
      </div>
      <button onClick={generateCertificate}>Generate Certificate</button>
    </div>
  );
}

export default CertificateGenerator;