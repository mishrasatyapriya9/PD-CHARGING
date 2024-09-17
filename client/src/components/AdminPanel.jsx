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
    device_type: "mobile", // Default to mobile
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // New state for modal

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/api/v1/devices/getAllDevice`
        );

        setDevices(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching devices", error);
      }
    };
    fetchDevices();
  }, []);

  const handleUpdate = async () => {
    const updatedDeviceData = {
      ...editingDevice,
      fast_pd_compatible:
        editingDevice.fast_pd_compatible === "Yes" ||
        editingDevice.fast_pd_compatible === true
          ? 1
          : 0, // Ensure fast_pd_compatible is a boolean or 0/1
    };

    try {
      // Use `editingDevice._id` to get the device ID for the update
      await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/devices/deviceUpdate/${
          editingDevice._id
        }`,
        updatedDeviceData
      );

      setDevices(
        devices.map((d) =>
          d._id === editingDevice._id ? updatedDeviceData : d
        )
      );
      setShowEditModal(false); // Close modal after saving
    } catch (error) {
      console.error("Error updating device", error);
    }
  };

  const handleDelete = async (deviceId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/v1/devices/deviceDelete/${deviceId}`
      );

      setDevices(devices.filter((d) => d._id !== deviceId));
    } catch (error) {
      console.error("Error deleting device", error);
    }
  };

  const handleAddDevice = async () => {
    const newDeviceData = {
      ...newDevice,
      fast_pd_compatible: newDevice.fast_pd_compatible === "Yes" ? 1 : 0,
    };
    console.log(newDeviceData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/devices/addDevice`,
        newDeviceData
      );

      setDevices([...devices, response.data]); // Update devices list
      console.log(response);

      // Reset form fields after submission
      setNewDevice({
        device_name: "",
        brand: "",
        model: "",
        fast_pd_compatible: "No", // Reset to default
        power_rating: "",
        device_type: "mobile", // Reset to default
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
            <div className="flex items-center space-x-4">
              <label>Device Type:</label>
              <select
                value={newDevice.device_type}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, device_type: e.target.value })
                }
                className="border border-gray-300 p-2 rounded"
              >
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
                <option value="laptop">Laptop</option>
              </select>
            </div>
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
          <li key={device._id} className="mb-2 flex items-center">
            <div className="flex-grow">
              <strong>{device.device_name}</strong>
            </div>
            <button
              onClick={() => {
                setEditingDevice(device);
                setShowEditModal(true);
              }}
              className="ml-2 text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(device._id)}
              className="ml-2 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Modal for editing device */}
      {showEditModal && editingDevice && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Device</h2>
            <div className="space-y-2">
              <input
                type="text"
                value={editingDevice.device_name}
                onChange={(e) =>
                  setEditingDevice({
                    ...editingDevice,
                    device_name: e.target.value,
                  })
                }
                placeholder="Device Name"
                className="border border-gray-300 p-2 w-full rounded"
              />
              <input
                type="text"
                value={editingDevice.brand}
                onChange={(e) =>
                  setEditingDevice({ ...editingDevice, brand: e.target.value })
                }
                placeholder="Brand"
                className="border border-gray-300 p-2 w-full rounded"
              />
              <input
                type="text"
                value={editingDevice.model}
                onChange={(e) =>
                  setEditingDevice({ ...editingDevice, model: e.target.value })
                }
                placeholder="Model"
                className="border border-gray-300 p-2 w-full rounded"
              />
              <div className="flex items-center space-x-4">
                <label>Fast PD Compatible:</label>
                <select
                  value={editingDevice.fast_pd_compatible ? "Yes" : "No"}
                  onChange={(e) =>
                    setEditingDevice({
                      ...editingDevice,
                      fast_pd_compatible: e.target.value === "Yes",
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
                value={editingDevice.power_rating}
                onChange={(e) =>
                  setEditingDevice({
                    ...editingDevice,
                    power_rating: e.target.value,
                  })
                }
                placeholder="Power Rating"
                className="border border-gray-300 p-2 w-full rounded"
              />
              <div className="flex items-center space-x-4">
                <label>Device Type:</label>
                <select
                  value={editingDevice.device_type}
                  onChange={(e) =>
                    setEditingDevice({
                      ...editingDevice,
                      device_type: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-2 rounded"
                >
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                  <option value="laptop">Laptop</option>
                </select>
              </div>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
