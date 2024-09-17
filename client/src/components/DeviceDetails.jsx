import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DeviceDetails = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await axios.get(`/api/devices/${id}`);
        setDevice(response.data);
      } catch (error) {
        console.error("Error fetching device details", error);
      }
    };
    fetchDevice();
  }, [id]);

  if (!device) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{device.device_name}</h1>
      <p>Brand: {device.brand}</p>
      <p>Model: {device.model}</p>
      <p>Fast PD Compatible: {device.fast_pd_compatible ? "Yes" : "No"}</p>
      <p>Power Rating: {device.power_rating}</p>
    </div>
  );
};

export default DeviceDetails;
