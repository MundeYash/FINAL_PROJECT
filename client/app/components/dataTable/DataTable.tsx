
import React from "react";
import MaterialTable from "@material-table/core";
import { Button, Stack } from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DataTable = ({ candidatesData, login }) => {
  // Sort candidatesData first by batchCode, then by name (firstName + lastName)
  const sortedCandidatesData = [...candidatesData].sort((a, b) => {
    if (a.batchCode < b.batchCode) return -1;
    if (a.batchCode > b.batchCode) return 1;
    // If batchCode is equal, sort by name
    const nameA = `${a.firstName} ${a.lastName}`;
    const nameB = `${b.firstName} ${b.lastName}`;
    return nameA.localeCompare(nameB);
  });

  const handleExportToExcel = () => {
    // Specify column headers
    const tableColumn = [
      "Batch Code",
      "Roll No",
      "Certificate Number",
      "Name",
      "Designation",
    ];

    // Extract only the specified columns from sortedCandidatesData
    const filteredData = sortedCandidatesData.map((candidate) => ({
      "Batch Code": candidate.batchCode,
      "Roll No": candidate.rollNumber,
      "Certificate Number": candidate.certificateNumber,
      Name: `${candidate.firstName} ${candidate.lastName}`,
      Designation: candidate.designation,
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData, {
      header: tableColumn,
    });

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates Data");

    // Save the file
    XLSX.writeFile(workbook, "candidates_data.xlsx");
  };

  const handleExportToPDF = async () => {
    const doc = new jsPDF();

     
      // Fetch image from URL and convert to base64
  const imageUrl = 'https://upload.wikimedia.org/wikipedia/en/b/b4/NIELIT_Logo.jpg';
  const imageResponse = await fetch(imageUrl);
  const imageBlob = await imageResponse.blob();
  const reader = new FileReader();

  reader.readAsDataURL(imageBlob); 
  reader.onloadend = function() {
    const base64data = reader.result;  
    // Add image to PDF at top left corner
    doc.addImage(base64data, 'JPEG', 10, 9, 23, 20); // Adjust position and size as needed

       // Set the position for the organization name to ensure it does not overlap with the logo
       const orgNameXPosition = 10 + 30 + 10; // Image width + 10 units for padding
       const orgNameYPosition = 9;  // Adjust based on the height of your logo


    doc.setTextColor(0, 0, 128); // Dark blue

    // Adjust font size and position for English translation
    doc.setFontSize(13);
    doc.text(
      "National Institute of Electronics and Information Technology (NIELIT)",
      40,
      20
    );

    // Set font for additional information
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text(
      "(An Autonomous Scientific Society of Ministry of Electronics and Information Technology. MeitY, Govt. of India)",
      32,
      30
    );

    // Add space between header and table
    const headerHeight = 70; // Adjust as needed

    // Set text color to dark blue and font style to bold for the header
    const tableColumn = [
      "Batch Code",
      "Roll No",
      "Certificate Number",
      "Name",
      "Designation",
    ];
    const tableRows = [];

    sortedCandidatesData.forEach((candidate) => {
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
      startY: 40,
    });

    doc.save("candidates_Report.pdf");

  };
  };

  return (
    <>
      <div>
        <Stack direction="row" spacing={2} marginBottom={2}>
          {login !== "operator" ? (
            <>
              <Button
                onClick={handleExportToExcel}
                variant="contained"
                color="primary"
              >
                Export to Excel
              </Button>
              <Button
                onClick={handleExportToPDF}
                variant="contained"
                color="secondary"
              >
                Export to PDF
              </Button>
            </>
          ) : null}
        </Stack>

        <MaterialTable
          title="Candidates Data"
          columns={[
            {
              title: "Serial No",
              field: "tableData.id",
              render: (rowData) => rowData.tableData.id + 1, // Add 1 because tableData.id starts from 0
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: {
                padding: "2px",
                paddingLeft: "30px",
                fontWeight: "bold",
              }, // Minimize header padding
              width: "10%", // Adjust width as needed to ensure it's minimal
            },
            {
              title: "Batch Code",
              field: "batchCode",
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: {
                padding: "2px",
                paddingLeft: "30px",
                fontWeight: "bold",
              }, // Minimize header padding
              width: "10%", // Adjust width as needed to ensure it's minimal
            },
            {
              title: "Roll No",
              field: "rollNumber",
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: {
                padding: "2px",
                paddingLeft: "30px",
                fontWeight: "bold",
              }, // Minimize header padding
              width: "10%", // Adjust width as needed to ensure it's minimal
            },
            {
              title: "Certificate Number",
              field: "certificateNumber",
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: {
                padding: "2px",
                paddingLeft: "30px",
                fontWeight: "bold",
              }, // Minimize header padding
              width: "10%", // Adjust width as needed to ensure it's minimal
            },
            {
              title: "Name",
              render: (rowData) => `${rowData.firstName} ${rowData.lastName}`,
              customFilterAndSearch: (term, rowData) =>
                `${rowData.firstName} ${rowData.lastName}`
                  .toLowerCase()
                  .includes(term.toLowerCase()),
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: {
                padding: "2px",
                paddingLeft: "30px",
                fontWeight: "bold",
              }, // Minimize header padding
              width: "10%", // Adjust width as needed to ensure it's minimal
            },
            {
              title: "Designation",
              field: "designation",
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: {
                padding: "2px",
                paddingLeft: "30px",
                fontWeight: "bold",
              }, // Minimize header padding
              width: "10%", // Adjust width as needed to ensure it's minimal
            },
          ]}
          data={sortedCandidatesData} // Use sorted data for the table
          options={{
            search: true,
            paging: true,
            filtering: true,
            exportButton: true,
            sorting: true,
            rowStyle: (rowData, index) => ({
              backgroundColor: index % 2 === 0 ? "#" : "#CCCCFF", // Light grey for odd rows, white for even
            }),
            headerStyle: {
              backgroundColor: "#039be5", // Darker shade for header
              color: "#FFF", // White text color for header
            },
            pageSize: 10, // Default number of rows to display
            pageSizeOptions: [5, 10, 20, 50, 100], // Options for changing the number of rows displayed
          }}
        />
      </div>
    </>
  );
};

export default DataTable;