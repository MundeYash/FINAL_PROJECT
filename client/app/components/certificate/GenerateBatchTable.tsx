import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BatchDetailsTable = () => {
  const [batchData, setBatchData] = useState({
    code: [],
    description: [],
    name: [],
    startDate: [],
    endDate: [],
    duration: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/data');
        setBatchData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto mb-4">
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
          {batchData.code.map((code, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{code}</td>
              <td className="px-4 py-2 border">{batchData.description[index]}</td>
              <td className="px-4 py-2 border">{batchData.name[index]}</td>
              <td className="px-4 py-2 border">{new Date(batchData.startDate[index]).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{new Date(batchData.endDate[index]).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{`${batchData.duration[index]?.value || ''} ${batchData.duration[index]?.format || ''}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchDetailsTable;
