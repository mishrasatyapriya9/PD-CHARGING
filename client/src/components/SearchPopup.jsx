// import React, { useState } from "react";
// import axios from "axios";

// const SearchPopup = ({ isOpen, onClose }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const handleSearch = async (e) => {
//     setQuery(e.target.value);
//     if (query.length > 2) {
//       try {
//         const response = await axios.get(`/api/search?query=${query}`);
//         setSuggestions(response.data);
//       } catch (error) {
//         console.error("Error fetching search results", error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   return isOpen ? (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-4 rounded">
//         <input
//           type="text"
//           value={query}
//           onChange={handleSearch}
//           placeholder="Search for devices..."
//           className="border border-gray-300 p-2 rounded"
//         />
//         <button onClick={onClose} className="ml-2 text-red-500">
//           Close
//         </button>
//         <ul>
//           {suggestions.map((device) => (
//             <li key={device.id}>
//               {device.device_name} - Fast PD:{" "}
//               {device.fast_pd_compatible ? "Yes" : "No"}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   ) : null;
// };

// export default SearchPopup;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchPopup = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const navigate = useNavigate();

  // Fetch suggestions from the backend
  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(`/api/search?query=${e.target.value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle device selection from dropdown
  const handleSelectDevice = (device) => {
    setSelectedDevice(device);
    setQuery(device.device_name); // Set the input to the selected device's name
    setSuggestions([]); // Close the dropdown
  };

  // Navigate to the details page when the button is clicked
  const handleViewDetails = () => {
    if (selectedDevice) {
      navigate(`/device/${selectedDevice.id}`);
      onClose(); // Close the popup
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded w-96">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for devices..."
          className="border border-gray-300 p-2 rounded w-full"
        />
        {suggestions.length > 0 && (
          <ul className="border border-gray-300 mt-2 max-h-40 overflow-y-auto rounded">
            {suggestions.map((device) => (
              <li
                key={device.id}
                onClick={() => handleSelectDevice(device)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {device.device_name} ({device.brand})
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleViewDetails}
            disabled={!selectedDevice} // Disable if no device is selected
            className={`px-4 py-2 rounded ${
              selectedDevice
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            View Details
          </button>
          <button
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default SearchPopup;
