import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VITE_BACKEND_API from "../config/config";

const DeviceList = () => {
  const { type } = useParams(); // Get device type from URL
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          `${VITE_BACKEND_API}/api/v1/devices/deviceType/${type}`
        );
        setDevices(response.data);
        console.log(response);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, [type]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{type} Devices</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {devices.map((device) => (
          <div key={device._id} className="bg-white shadow rounded-lg p-4">
            <img
              src={device.device_image}
              alt={device.device_name}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-bold mt-2">{device.device_name}</h2>
            <p>Brand: {device.brand}</p>
            <p>Model: {device.model}</p>
            <p>
              Fast PD Compatible: {device.fast_pd_compatible ? "Yes" : "No"}
            </p>
            <p>Power Rating: {device.power_rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
