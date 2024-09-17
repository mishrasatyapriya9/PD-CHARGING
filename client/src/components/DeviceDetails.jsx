import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DeviceDetails = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/api/v1/devices/device/${id}`
        );
        setDevice(response.data);
      } catch (error) {
        console.error("Error fetching device details", error);
      }
    };
    fetchDevice();
  }, [id]);

  if (!device) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative w-full h-64">
        <img
          src={device.device_image}
          alt={device.device_name}
          className="absolute inset-0 w-full h-full object-contain z-9999"
        />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">{device.device_name}</h1>
        <p className="text-lg mb-2">Brand: {device.brand}</p>
        <p className="text-lg mb-2">Model: {device.model}</p>
        <p className="text-lg mb-2">
          Fast PD Compatible: {device.fast_pd_compatible ? "Yes" : "No"}
        </p>
        <p className="text-lg">Power Rating: {device.power_rating}</p>
      </div>
    </div>
  );
};

export default DeviceDetails;
