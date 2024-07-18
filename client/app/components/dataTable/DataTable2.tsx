import React from "react";
import MaterialTable from "@material-table/core";
import { Button, Stack } from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import html2canvas from 'html2canvas';

// Add an interface for batchDetails prop
interface BatchDetails {
  batchCode: string;
  batchDescription: string;
  courseName: string;
  startDate: string;
  endDate: string;
}

const DataTable = ({ candidatesData, login, selectedBatchCode }) => {
  console.log("new value " + selectedBatchCode);
  const handleExportToExcel = () => {
    // Specify column headers
    const tableColumn = [
      "Batch Code",
      "Roll No",
      "Certificate Number",
      "Name",
      "Designation",
    ];

    // Extract only the specified columns from candidatesData
    const filteredData = candidatesData.map((candidate) => ({
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
  
    // URL of the logo
    const imageUrl = 'https://akm-img-a-in.tosshub.com/aajtak/images/story/201506/logo_650_062915055832.jpg?size=1200:675';
  
    // Fetch image from URL and convert to base64
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();
    const reader = new FileReader();
  
    reader.readAsDataURL(imageBlob); 
    reader.onloadend = async function() {
      const base64data = reader.result;
  
      // Add image to PDF at top left corner
       // Add image to PDF at top left corner
    doc.addImage(base64data, 'JPEG', 10, 9, 23, 20); // Adjust position and size as needed
  
      // Set font size and position for organization name
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
  
      // Fetch batch details for selectedBatchCode
      let batchDetails = null;
      if (selectedBatchCode) {
        try {
          const response = await axios.get(
            `http://localhost:4000/batch/${selectedBatchCode}`
          );
          batchDetails = response.data;
        } catch (err) {
          console.error("Error fetching batch details", err);
        }
      }
  
      // Display batch details after the header
      if (batchDetails) {
        doc.setTextColor(0, 0, 0); // Black
        doc.setFillColor(128, 128, 128); // Grey background
        doc.setFontSize(15);
        
        doc.text(`Batch Code: ${batchDetails.batchCode}                                Batch Description: ${batchDetails.batchDescription}`, 20, 50);
        // doc.text(`Batch Description: ${batchDetails.batchDescription}`, 20, 55);
        doc.text(`Course Name: ${batchDetails.courseName}           Duration : ${batchDetails.courseDuration.value} ${batchDetails.courseDuration.format}`, 20, 60);
        // doc.text(
        //   `Duration : ${batchDetails.courseDuration.value} ${batchDetails.courseDuration.format}`,
        //   20,
        //   65
        // );
        doc.text(
          `Start Date: ${new Date(batchDetails.startDate).toLocaleDateString()}                            End Date: ${new Date(batchDetails.endDate).toLocaleDateString()}`,
          20,
          70
        );
      }
  
      // Adjust startY position based on whether batch details were included
      const startY = batchDetails ? 80 : 50;
  
      // Set text color to dark blue and font style to bold for the header
      const tableColumn = [
        "Batch Code",
        "Roll No",
        "Certificate Number",
        "Name",
        "Designation",
      ];
      const tableRows = [];
  
      candidatesData.forEach((candidate) => {
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
        startY: startY,
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
          title="Batch Data"
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
            // { title: 'Name', render: rowData => `${rowData.firstName} ${rowData.lastName}` },
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
          data={candidatesData}
          options={{
            search: true,
            paging: true,
            filtering: true,
            exportButton: true,
            sorting: true,
            rowStyle: (rowData, index) => ({
              backgroundColor: index % 2 === 0 ? "#" : "#bfff00", // Light grey for odd rows, white for even
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
