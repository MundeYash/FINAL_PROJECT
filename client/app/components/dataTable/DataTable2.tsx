import React from 'react';
import MaterialTable from '@material-table/core';
import { Button, Stack } from '@mui/material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



const DataTable = ({ candidatesData ,login}) => {




  const handleExportToExcel = () => {
    // Specify column headers
    const tableColumn = ["Batch Code", "Roll No", "Certificate Number", "Name", "Designation"];

    // Extract only the specified columns from candidatesData
    const filteredData = candidatesData.map(candidate => ({
      "Batch Code": candidate.batchCode,
      "Roll No": candidate.rollNumber,
      "Certificate Number": candidate.certificateNumber,
      "Name": `${candidate.firstName} ${candidate.lastName}`,
      "Designation": candidate.designation,
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData, { header: tableColumn });

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidates Data');

    // Save the file
    XLSX.writeFile(workbook, 'candidates_data.xlsx');
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    
    const tableColumn = ["Batch Code", "Roll No", "Certificate Number", "Name", "Designation"];
    const tableRows = [];

    candidatesData.forEach(candidate => {
      const candidateData = [
        candidate.batchCode,
        candidate.rollNumber,
        candidate.certificateNumber,
        `${candidate.firstName} ${candidate.lastName}`,
        candidate.designation,
      ];
      tableRows.push(candidateData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('candidates_data.pdf');
  };

  return (
    <>
    <div>
      <Stack direction="row" spacing={2} marginBottom={2}>
        {login!=="operator"?<>
        <Button onClick={handleExportToExcel} variant="contained" color="primary">
          Export to Excel
        </Button>
        <Button onClick={handleExportToPDF} variant="contained" color="secondary">
          Export to PDF
        </Button>
        </> : null}

      </Stack>

      <MaterialTable
        title="Candidates Data"
        columns={[
          { title: 'Batch Code', field: 'batchCode' },
          { title: 'Batch Description ', field: 'batchCode' },
          { title: 'Course Name', field: 'batchCode' },
          { title: 'Duration', field: 'batchCode' },
          { title: 'Total', field: 'batchCode' },
          { title: 'Certificate No: From - To', field: 'batchCode' },
         
        ]}
        data={candidatesData}
        options={{
           search: true, 
          paging: true,
          filtering: true,
          exportButton: true,
          sorting: true,
        }}
      />


      
    </div>

    </>
  );
};

export default DataTable;
