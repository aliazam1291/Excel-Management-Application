"use client"; // Ensures this component is rendered on the client side

import { useState } from "react";
import * as XLSX from "xlsx";
import Table from "./Table"; // Ensure Table component is correctly imported

const FileUpload = () => {
  const [data, setData] = useState({}); // Data is now an object (dictionary)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Transform the array data to a dictionary with key-value pairs
        let dictData = {};
        const headerKeys = jsonData[0]; // Use the first row as headers

        jsonData.forEach((item, index) => {
          if (index > 0) {
            let newObject = {};
            headerKeys.forEach((header, headerIndex) => {
              newObject[header] = item[headerIndex]; // Map column to header
            });
            newObject["status"] = "Pending"; // Initialize status for each row
            dictData[item[0]] = newObject; // Use the first column value as the key
          }
        });

        setData(dictData); // Set the transformed data (dictionary)
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleStatusChange = (newStatus, rowKey) => {
    setData((prevData) => {
      const newData = { ...prevData };
      if (newData[rowKey]) {
        newData[rowKey] = { ...newData[rowKey], status: newStatus }; // Update status correctly
      }
      return newData;
    });
  };

  const handleTextUpdate = (newValue, rowKey, headerKey) => {
    setData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[rowKey][headerKey] = newValue; // Update specific field in the dictionary
      return updatedData;
    });
  };

  const handleDownload = () => {
    if (Object.keys(data).length === 0) return;

    const headers = Object.keys(data[Object.keys(data)[0]]);
    const arrayData = [headers];

    Object.entries(data).forEach(([rowKey, row]) => {
      const statusValue = row.status || "Pending";
      const rowDataWithStatus = headers.map((header) => {
        if (header === "status") {
          return statusValue; // Add the status value for the current row
        }
        return row[header] || ""; // Add other row data
      });
      arrayData.push(rowDataWithStatus);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(arrayData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "updated_table_data.xlsx");
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <Table
        data={data}
        handleStatusChange={handleStatusChange}
        handleTextUpdate={handleTextUpdate}
      />
      <button
        onClick={handleDownload}
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download Updated Sheet
      </button>
    </div>
  );
};

export default FileUpload;

