// import { useState } from "react";

// const Table = ({ data, handleStatusChange, handleTextUpdate }) => {
//   if (!data || Object.keys(data).length === 0)
//     return <p>No data to display</p>;

//   // Get the headers from the first row's object keys
//   const headers = Object.keys(data[Object.keys(data)[0]]);

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full table-auto border-collapse border border-gray-400">
//         <thead>
//           <tr className="bg-gray-200">
//             {headers.map((header, index) => (
//               <th key={index} className="px-4 py-2 border border-gray-300">
//                 {header}
//               </th>
//             ))}
//             <th className="px-4 py-2 border border-gray-300">Status</th> {/* Status column */}
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(data).map(([key, rowData], rowIndex) => (
//             <TableRow
//               key={rowIndex}
//               rowKey={key} // Use unique key for the row
//               rowData={rowData}
//               headers={headers}
//               handleStatusChange={handleStatusChange}
//               handleTextUpdate={handleTextUpdate}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const TableRow = ({ rowKey, rowData, headers, handleStatusChange, handleTextUpdate }) => {
//   const [status, setStatus] = useState(rowData.status || "Pending");

//   // Function to change status
//   const handleStatusUpdate = (newStatus) => {
//     setStatus(newStatus);
//     handleStatusChange(newStatus, rowData);
//   };

//   // Set background color based on status
//   const statusColorClass = () => {
//     switch (status) {
//       case "Pending":
//         return "bg-red-100 text-red-500"; // Red background for Pending
//       case "E-KYC":
//         return "bg-blue-100 text-blue-500"; // Blue background for Approved
//       case "V-KYC":
//         return "bg-green-100 text-green-500"; // Green background for Rejected
//       default:
//         return "";
//     }
//   };

//   return (
//     <tr className="bg-white">
//       {headers.map((header, cellIndex) => (
//         <td key={cellIndex} className="px-4 py-2 border border-gray-300">
//           <input
//             type="text"
//             value={rowData[header]}
//             onChange={(e) => handleTextUpdate(e.target.value, rowKey, header)}
//             className="border border-gray-300 rounded p-1 w-full"
//           />
//         </td>
//       ))}

//       {/* Status dropdown */}
//       <td className={`px-4 py-2 border border-gray-300 ${statusColorClass()}`}>
//         <select
//           value={status}
//           onChange={(e) => handleStatusUpdate(e.target.value)}
//           className="border border-gray-300 rounded p-1"
//         >
//           <option value="Pending">Pending</option>
//           <option value="E-KYC">E-KYC</option>
//           <option value="V-KYC">V-KYC</option>
//         </select>
//       </td>
//     </tr>
//   );
// };

// export default Table;
import { useState } from "react";

const Table = ({ data, handleStatusChange, handleTextUpdate }) => {
  if (!data || Object.keys(data).length === 0) return <p>No data to display</p>;

  // Get the headers from the first row's object keys
  const headers = Object.keys(data[Object.keys(data)[0]]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr className="bg-blue-600 text-white">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 border border-gray-300">
                {header}
              </th>
            ))}
            <th className="px-4 py-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, rowData], rowIndex) => (
            <TableRow
              key={rowIndex}
              rowKey={key}
              rowData={rowData}
              headers={headers}
              handleStatusChange={handleStatusChange}
              handleTextUpdate={handleTextUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({ rowKey, rowData, headers, handleStatusChange, handleTextUpdate }) => {
  const [status, setStatus] = useState(rowData.status || "Pending");
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    handleStatusChange(newStatus, rowKey);
    setIsOpen(false);
  };

  const rowColorClass = "bg-gray-100"; // Set consistent row color

  return (
    <tr className={rowColorClass}>
      {headers.map((header, cellIndex) => (
        <td key={cellIndex} className="px-4 py-2 border border-gray-300">
          <input
            type="text"
            value={rowData[header] || ""}
            onChange={(e) => handleTextUpdate(e.target.value, rowKey, header)}
            className="border border-gray-300 rounded p-1 w-full"
          />
        </td>
      ))}
      <td className={`px-4 py-2 border border-gray-300 relative`}>
        <div className="cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
          <div className={`border border-gray-300 rounded p-1 ${statusColorClass(status)}`}>
            {status}
          </div>
        </div>
        {isOpen && (
          <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg w-full">
            {["Pending", "E-KYC", "V-KYC"].map((option) => (
              <li
                key={option}
                onClick={() => handleStatusUpdate(option)}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${statusColorClass(option)}`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </td>
    </tr>
  );
};

const statusColorClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-red-100 text-red-500";
    case "E-KYC":
      return "bg-blue-100 text-blue-500";
    case "V-KYC":
      return "bg-green-100 text-green-500";
    default:
      return "";
  }
};

export default Table;
