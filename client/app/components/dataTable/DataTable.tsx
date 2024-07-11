import React from "react";
import MaterialTable from "@material-table/core";
import { Button, Stack } from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DataTable = ({ candidatesData, login }) => {
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

    doc.setTextColor(0, 0, 128); // Dark blue

    // Adjust font size and position for English translation
    doc.setFontSize(13);
    doc.text(
      "National Institute of Electronics and Information Technology (NIELIT)",
      20,
      25
    );

    // Set font for additional information
    doc.setFontSize(8);
    doc.setFont("times", "normal");
    doc.text(
      "(An Autonomous Scientific Society of Ministry of Electronics and Information Technology. MeitY, Govt. of India)",
      23,
      30
    );
    doc.text(
      "[2nd Floor, Parsvanath Metro Mall, Inderlok Metro Station, Inderlok, Delhi-110052]",
      25,
      36
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
      startY: 40,
    });

    doc.save("candidates_Report.pdf");
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
              render: rowData => rowData.tableData.id + 1, // Add 1 because tableData.id starts from 0
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: { padding: "2px", paddingLeft: "30px",fontWeight: "bold" }, // Minimize header padding
              width: "10%", // Adjust width as needed to ensure it's minimal
            },
            {
              title: "Batch Code",
              field: "batchCode",
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: { padding: "2px", paddingLeft: "30px",fontWeight: "bold"  }, // Minimize header padding
              width: "10%", // Adjust width as needed to ensure it's minimal
            },
            {
              title: "Roll No",
              field: "rollNumber",
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: { padding: "2px", paddingLeft: "30px",fontWeight: "bold"  }, // Minimize header padding
              width: "10%", // Adjust width as needed to ensure it's minimal
            },
            {
              title: "Certificate Number",
              field: "certificateNumber",
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: { padding: "2px", paddingLeft: "30px",fontWeight: "bold"  }, // Minimize header padding
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
                  headerStyle: { padding: "2px", paddingLeft: "30px" ,fontWeight: "bold" }, // Minimize header padding
                  width: "10%", // Adjust width as needed to ensure it's minimal
            },
            {
              title: "Designation",
              field: "designation",
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: { padding: "2px", paddingLeft: "30px",fontWeight: "bold"  }, // Minimize header padding
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
              backgroundColor: index % 2 === 0 ? "#6495ed" : "#e6e6fa", // Light grey for odd rows, white for even
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
