// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminPanel = () => {
//   const [devices, setDevices] = useState([]);
//   const [editingDevice, setEditingDevice] = useState(null);

//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         const response = await axios.get(
//           "https://freetestapi.com/api/v1/products"
//         );
//         setDevices(response.data);
//       } catch (error) {
//         console.error("Error fetching devices", error);
//       }
//     };
//     fetchDevices();
//   }, []);

//   const handleUpdate = async (device) => {
//     try {
//       await axios.put(`/api/devices/${device.id}`, device);
//       setDevices(devices.map((d) => (d.id === device.id ? device : d)));
//     } catch (error) {
//       console.error("Error updating device", error);
//     }
//   };

//   const handleDelete = async (deviceId) => {
//     try {
//       await axios.delete(`/api/devices/${deviceId}`);
//       setDevices(devices.filter((d) => d.id !== deviceId));
//     } catch (error) {
//       console.error("Error deleting device", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Devices</h1>
//       <ul>
//         {devices.map((device) => (
//           <li key={device.id} className="mb-2 flex items-center">
//             <div className="flex-grow">
//               <strong>{device.name}</strong>
//             </div>
//             <button
//               onClick={() => setEditingDevice(device)}
//               className="ml-2 text-blue-500"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(device.id)}
//               className="ml-2 text-red-500"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//       {editingDevice && (
//         <div className="mt-4">
//           <h2 className="text-xl font-bold">Edit Device</h2>
//           <input
//             type="text"
//             value={editingDevice.device_name}
//             onChange={(e) =>
//               setEditingDevice({
//                 ...editingDevice,
//                 device_name: e.target.value,
//               })
//             }
//             className="border border-gray-300 p-2 rounded"
//           />
//           <button
//             onClick={() => handleUpdate(editingDevice)}
//             className="ml-2 text-green-500"
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [devices, setDevices] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);
  const [newDevice, setNewDevice] = useState({
    device_name: "",
    brand: "",
    model: "",
    fast_pd_compatible: "No", // Default to "No"
    power_rating: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          "https://freetestapi.com/api/v1/products"
        );
        setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices", error);
      }
    };
    fetchDevices();
  }, []);

  const handleUpdate = async (device) => {
    try {
      await axios.put(`/api/devices/${device.id}`, device);
      setDevices(devices.map((d) => (d.id === device.id ? device : d)));
    } catch (error) {
      console.error("Error updating device", error);
    }
  };

  const handleDelete = async (deviceId) => {
    try {
      await axios.delete(`/api/devices/${deviceId}`);
      setDevices(devices.filter((d) => d.id !== deviceId));
    } catch (error) {
      console.error("Error deleting device", error);
    }
  };

  const handleAddDevice = async () => {
    // Convert fast_pd_compatible to 1 (true) or 0 (false)
    const newDeviceData = {
      ...newDevice,
      fast_pd_compatible: newDevice.fast_pd_compatible === "Yes" ? 1 : 0,
    };

    try {
      const response = await axios.post("/api/devices", newDeviceData);
      setDevices([...devices, response.data]); // Update devices list
      setNewDevice({
        device_name: "",
        brand: "",
        model: "",
        fast_pd_compatible: "No",
        power_rating: "",
      });
      setShowAddForm(false); // Close the form
    } catch (error) {
      console.error("Error adding device", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Devices</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {showAddForm ? "Close Add Form" : "Add Device"}
        </button>
      </div>

      {showAddForm && (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Add New Device</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={newDevice.device_name}
              onChange={(e) =>
                setNewDevice({ ...newDevice, device_name: e.target.value })
              }
              placeholder="Device Name"
              className="border border-gray-300 p-2 w-full rounded"
            />
            <input
              type="text"
              value={newDevice.brand}
              onChange={(e) =>
                setNewDevice({ ...newDevice, brand: e.target.value })
              }
              placeholder="Brand"
              className="border border-gray-300 p-2 w-full rounded"
            />
            <input
              type="text"
              value={newDevice.model}
              onChange={(e) =>
                setNewDevice({ ...newDevice, model: e.target.value })
              }
              placeholder="Model"
              className="border border-gray-300 p-2 w-full rounded"
            />
            <div className="flex items-center space-x-4">
              <label>Fast PD Compatible:</label>
              <select
                value={newDevice.fast_pd_compatible}
                onChange={(e) =>
                  setNewDevice({
                    ...newDevice,
                    fast_pd_compatible: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 rounded"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <input
              type="text"
              value={newDevice.power_rating}
              onChange={(e) =>
                setNewDevice({ ...newDevice, power_rating: e.target.value })
              }
              placeholder="Power Rating"
              className="border border-gray-300 p-2 w-full rounded"
            />
            <button
              onClick={handleAddDevice}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <ul className="mt-4">
        {devices.map((device) => (
          <li key={device.id} className="mb-2 flex items-center">
            <div className="flex-grow">
              <strong>{device.name}</strong>
            </div>
            <button
              onClick={() => setEditingDevice(device)}
              className="ml-2 text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(device.id)}
              className="ml-2 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {editingDevice && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Edit Device</h2>
          <input
            type="text"
            value={editingDevice.device_name}
            onChange={(e) =>
              setEditingDevice({
                ...editingDevice,
                device_name: e.target.value,
              })
            }
            className="border border-gray-300 p-2 rounded"
          />
          <button
            onClick={() => handleUpdate(editingDevice)}
            className="ml-2 text-green-500"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
