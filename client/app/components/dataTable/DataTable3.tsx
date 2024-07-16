import React, { useMemo } from "react";
import MaterialTable from "@material-table/core";
import { Button, Stack } from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto"; // For automatic chart type detection

interface Employee {
  batchCode: string;
  certificateNumber: string;
  designation: string;
  email: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  remarks: string;
  rollNumber: string;
  __v: number;
  _id: string;
}

const DataTable = ({ batchData, employeeData, login }) => {
  console.log("tableBatchData", batchData);
  console.log("new EmployeeData", employeeData);

  // Prepare data for the charts
  const chartData = batchData.reduce(
    (acc, batch) => {
      const totalCandidates = employeeData.filter(
        (emp) => emp.batchCode === batch.batchCode
      ).length;
      acc.labels.push(batch.batchCode);
      acc.data.push(totalCandidates);
      return acc;
    },
    { labels: [], data: [] }
  );

  const barChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Total Candidates",
        data: chartData.data,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Total Candidates",
        data: chartData.data,
        backgroundColor: chartData.labels.map((_, index) => {
          // Generate a random color for each batch code
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          return `rgb(${r}, ${g}, ${b})`;
        }),
        hoverOffset: 4,
      },
    ],
  };

  // Function to find smallest and largest certificate numbers for a given batchCode
  function countEmployeesWithBatchCode(
    employeeData: Employee[],
    batchCode: string
  ): number {
    const count = employeeData.filter(
      (employee) => employee.batchCode === batchCode
    ).length;
    return count;
  }

  // Function to find smallest and largest certificate numbers for a given batchCode
  function findCertificateNumberRange(
    employeeData: Employee[],
    batchCode: string
  ): string {
    const filteredEmployees = employeeData.filter(
      (employee) => employee.batchCode === batchCode
    );

    if (filteredEmployees.length === 0) {
      return `NIL`;
    }

    let minCertificateNumber = filteredEmployees[0].certificateNumber;
    let maxCertificateNumber = filteredEmployees[0].certificateNumber;

    filteredEmployees.forEach((employee) => {
      if (employee.certificateNumber < minCertificateNumber) {
        minCertificateNumber = employee.certificateNumber;
      }
      if (employee.certificateNumber > maxCertificateNumber) {
        maxCertificateNumber = employee.certificateNumber;
      }
    });
    return `${minCertificateNumber} - ${maxCertificateNumber}`;
  }

  // Memoized filtered data with unique batchCode
  const uniquebatchData = useMemo(() => {
    const unique = {};
    batchData.forEach((candidate) => {
      if (!unique[candidate.batchCode]) {
        unique[candidate.batchCode] = {
          ...candidate,
          startDate: candidate.startDate
            .split("T")[0]
            .split("-")
            .reverse()
            .join("-"), // Convert startDate to dd-mm-yyyy format
          endDate: candidate.endDate
            .split("T")[0]
            .split("-")
            .reverse()
            .join("-"), // Convert endDate to dd-mm-yyyy format
          courseDuration: `${candidate.courseDuration.value} ${candidate.courseDuration.format}`, // Combine value and format
          departmentName: candidate.departmentAddress, // Added departmentName
          strength: candidate.participantsNo, // Added strength
          total: countEmployeesWithBatchCode(employeeData, candidate.batchCode), // Count of employees in the batch
          certificateNumberRange: findCertificateNumberRange(
            employeeData,
            candidate.batchCode
          ),
        };
      }
    });
    return Object.values(unique);
  }, [batchData]);
  console.log("uniqueData", uniquebatchData);

  const handleExportToExcel = () => {
    // Specify column headers
    const tableColumn = [
      "Batch Code",
      "Department Name",
      "Course Name",

      "Start Date",
      "End Date",
      "Course Duration",

      "Total Certificate Issued",
      "No of Participants",
      "Certificate Number Range",
    ];

    // Extract only the specified columns from batchData
    const filteredData = batchData.map((batch) => ({
      "Batch Code": batch.batchCode,
      "Department Name": batch.batchDescription,
      "Course Name": batch.courseName,

      "Start Date": batch.startDate
        .split("T")[0]
        .split("-")
        .reverse()
        .join("-"),
      "End Date": batch.endDate.split("T")[0].split("-").reverse().join("-"),
      "Course Duration": `${batch.courseDuration.value} ${batch.courseDuration.format}`,

      "Total Certificate Issued": countEmployeesWithBatchCode(
        employeeData,
        batch.batchCode
      ),
      "No of Participants": batch.participantsNo,
      "Certificate Number Range": findCertificateNumberRange(
        employeeData,
        batch.batchCode
      ),
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData, {
      header: tableColumn,
    });

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Batch Data");

    // Save the file
    XLSX.writeFile(workbook, "batch_Report.xlsx");
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

    // Add space between header and table
    const headerHeight = 70; // Adjust as needed

    // Set text color to dark blue and font style to bold for the header
    const tableColumn = [
      "Batch Code",
      "Department Name ",
      "Course Name",
      "Start Date",
      "End Date",
      "Course Duration",

      "No of Participants ",
      "Total Certificate Issued ",
      "Certificate Number Range",
    ];
    const tableRows = [];

    uniquebatchData.forEach((candidate) => {
      const candidateData = [
        candidate.batchCode,
        candidate.batchDescription,
        candidate.courseName,
        candidate.startDate,
        candidate.endDate,
        candidate.courseDuration,

        candidate.strength.toString(), // Added strength

        candidate.total.toString(),
        candidate.certificateNumberRange,

        // Add more fields as necessary
      ];
      tableRows.push(candidateData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 8, cellPadding: 1 },
      columnStyles: {
        batchCode: { cellWidth: 5 },
        batchDescription: { cellWidth: "wrap" }, // Maximum width with wrapping
        courseName: { cellWidth: "wrap" }, // Maximum width with wrapping
        startDate: { cellWidth: 10 },
        endDate: { cellWidth: 10 },
        courseDuration: { cellWidth: 15 },
        // Other columns remain unchanged
        strength: { cellWidth: 10 }, // Reduced width for 'strength'
        total: { cellWidth: 10 }, // Reduced width for 'total'
        certificateNumberRange: { cellWidth: "wrap" }, // Maximum width with wrapping
      },
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
          title="Batch Data"
          columns={[
            {
              title: "Serial No",
              field: "tableData.id",
              render: (rowData) => rowData.tableData.id + 1, // Add 1 because tableData.id starts from 0
              cellStyle: { padding: "2px", paddingLeft: "30px" }, // Reduced cell padding
              headerStyle: {
                padding: "2px",
                paddingLeft: "10px",
                fontWeight: "bold",
              }, // Minimize header padding

              // Highlighted header
              width: "5%", // Adjust width as needed to ensure it's minimal
            },
            {
              title: "Batch Code",
              field: "batchCode",
              cellStyle: { padding: "2px" },
              headerStyle: { padding: "2px", fontWeight: "bold" }, // Highlighted header
              width: "5%",
            },
            {
              title: "Department Name  ",
              field: "batchDescription",
              cellStyle: { width: "4%", maxWidth: "40%", padding: "4px" },
              headerStyle: { fontWeight: "bold" }, // Highlighted header
            },
            {
              title: "Course Name",
              field: "courseName",
              cellStyle: { width: "30%", maxWidth: "35%", padding: "4px" },
              headerStyle: { fontWeight: "bold" }, // Highlighted header
            },
            {
              title: "Start Date",
              field: "startDate",
              cellStyle: { padding: "4px" },
              headerStyle: { fontWeight: "bold" }, // Highlighted header
            },
            {
              title: "End Date ",
              field: "endDate",
              cellStyle: { width: "8%", maxWidth: "8%", padding: "4px" },
              headerStyle: { fontWeight: "bold" }, // Highlighted header
            },
            {
              title: "Course Duration",
              field: "courseDuration",
              cellStyle: { width: "10%", maxWidth: "10%", padding: "4px" },
              headerStyle: { fontWeight: "bold" }, // Highlighted header
            }, // Display combined course duration

            // Add the new column for Strength
            {
              title: "No of Participants",
              field: "strength", // Adjust the field name based on your data structure
              headerStyle: { fontWeight: "bold" }, // Highlighted header
            },
            {
              title: "Total Certificate Issued",
              field: "total",
              cellStyle: { padding: "4px" },
              headerStyle: { fontWeight: "bold" },
              width: "5%",
            },
            {
              title: "CertificateNo Range",
              field: "certificateNumberRange",
              cellStyle: { padding: "2px" },
              headerStyle: { fontWeight: "bold" }, // Highlighted header
            },
          ]}
          // data={batchData}
          data={uniquebatchData} // Use uniquebatchData here
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 0",
        }}
      >
        <div style={{ width: "45%", height: "400px" }}>
          <h2>Batch Code vs Total Candidates</h2>
          <Bar
            data={barChartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <div style={{ width: "45%", height: "400px" }}>
          <h2>Batch Code Distribution</h2>
          <Pie
            data={pieChartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </>
  );
};

export default DataTable;
