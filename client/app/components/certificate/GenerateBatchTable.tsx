
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CourseTable = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get('http://localhost:4000/data');
//       const formattedData = response.data.code.map((code, index) => ({
//         batchCode: code,
//         batchDescription: response.data.description[index] || '',
//         courseName: response.data.name[index] || '',
//         startDate: response.data.startDate[index] || '',
//         endDate: response.data.endDate[index] || '',
//         duration: `${response.data.duration[index]?.value || ''} ${response.data.duration[index]?.format || ''}`,
//       }));
//       setData(formattedData);
//     };

//     fetchData();
//   }, []);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Batch Code</th>
//           <th>Batch Description</th>
//           <th>Course Name</th>
//           <th>Start Date</th>
//           <th>End Date</th>
//           <th>Course Duration</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index}>
//             <td>{item.batchCode}</td>
//             <td>{item.batchDescription}</td>
//             <td>{item.courseName}</td>
//             <td>{new Date(item.startDate).toLocaleDateString()}</td>
//             <td>{new Date(item.endDate).toLocaleDateString()}</td>
//             <td>{item.duration}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default CourseTable;




import React, { useState, useEffect } from "react";
import axios from "axios";

interface BatchDetails {
  batchCode: string;
  batchDescription: string;
  courseName: string;
  startDate: string;
  endDate: string;
  courseDuration: { value: number; format: string };
}

interface BatchCodeSelectorProps {
  batchCode: string | null;
}

const BatchCodeSelector: React.FC<BatchCodeSelectorProps> = ({ batchCode }) => {
  const [batchDetails, setBatchDetails] = useState<BatchDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/batch`
        );
        const data = response.data;
        console.log(data);
        setBatchDetails({
          batchCode: data?.batchCode,
          batchDescription: data?.batchDescription,
          courseName: data?.courseName,
          startDate: data?.startDate,
          endDate: data?.endDate,
          courseDuration: data?.value || { value: 0, format: "days" },
        });
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    if (batchCode !== null) {
      console.log(batchCode);
      fetchData();
    }
  }, [batchCode]);

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
