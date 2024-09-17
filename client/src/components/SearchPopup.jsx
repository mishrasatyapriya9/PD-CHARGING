// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SearchPopup = ({ isOpen, onClose }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedDevice, setSelectedDevice] = useState(null);
//   const navigate = useNavigate();

//   // Fetch suggestions from the backend
//   const handleSearch = async (e) => {
//     const searchQuery = e.target.value;
//     setQuery(searchQuery);

//     if (searchQuery.length > 2) {
//       try {
//         const response = await axios.get(
//           `${
//             import.meta.env.VITE_BACKEND_API
//           }/api/v1/devices/search?query=${searchQuery}`
//         );
//         if (Array.isArray(response.data)) {
//           setSuggestions(response.data);
//         } else {
//           console.error("Expected an array, but received:", response.data);
//           setSuggestions([]); // Reset to an empty array on error
//         }
//       } catch (error) {
//         console.error("Error fetching search results", error);
//         setSuggestions([]); // Reset to an empty array on error
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Handle device selection from dropdown
//   const handleSelectDevice = (device) => {
//     setSelectedDevice(device);
//     setQuery(device.device_name); // Set the input to the selected device's name
//     setSuggestions([]); // Close the dropdown
//   };

//   // Navigate to the details page when the button is clicked
//   const handleViewDetails = () => {
//     if (selectedDevice) {
//       navigate(`/device/${selectedDevice._id}`);
//       onClose(); // Close the popup
//     }
//   };

//   return isOpen ? (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 absolute">
//       <div className="bg-white p-4 rounded w-96">
//         <input
//           type="text"
//           value={query}
//           onChange={handleSearch}
//           placeholder="Search for devices..."
//           className="border border-gray-300 p-2 rounded w-full"
//         />
//         {suggestions.length > 0 && (
//           <ul className="border border-gray-300 mt-2 max-h-40 overflow-y-auto rounded">
//             {suggestions.map((device) => (
//               <li
//                 key={device._id}
//                 onClick={() => handleSelectDevice(device)}
//                 className="cursor-pointer p-2 hover:bg-gray-100"
//               >
//                 {device.device_name} ({device.brand})
//               </li>
//             ))}
//           </ul>
//         )}
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={handleViewDetails}
//             disabled={!selectedDevice} // Disable if no device is selected
//             className={`px-4 py-2 rounded ${
//               selectedDevice
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-300 text-gray-500"
//             }`}
//           >
//             View Details
//           </button>
//           <button
//             onClick={onClose}
//             className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   ) : null;
// };

// export default SearchPopup;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchPopup = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const navigate = useNavigate();

  // Fetch suggestions from the backend
  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_API
          }/api/v1/devices/search?query=${searchQuery}`
        );
        if (Array.isArray(response.data)) {
          setSuggestions(response.data);
        } else {
          console.error("Expected an array, but received:", response.data);
          setSuggestions([]); // Reset to an empty array on error
        }
      } catch (error) {
        console.error("Error fetching search results", error);
        setSuggestions([]); // Reset to an empty array on error
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
      navigate(`/device/${selectedDevice._id}`);
      onClose(); // Close the popup
    }
  };

  return isOpen ? (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" // Higher z-index for the overlay
      style={{ zIndex: 9999 }} // Inline style to ensure it has the highest z-index
    >
      <div className="bg-white p-4 rounded w-96 relative z-50">
        {" "}
        {/* z-50 ensures the popup content is above the overlay */}
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for devices..."
          className="border border-gray-300 p-2 rounded w-full"
        />
        {suggestions.length > 0 && (
          <ul className="absolute left-0 top-12 border border-gray-300 bg-white mt-2 w-full max-h-40 overflow-y-auto rounded shadow-lg z-50">
            {suggestions.map((device) => (
              <li
                key={device._id}
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
