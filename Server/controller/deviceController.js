import Device from "../models/Device.js";

//get all devices
// export const getDevices = async (req, res) => {
//   try {
//     const devices = await Device.find();
//     res.status(200).send({
//       success: true,
//       message: "Retriving all devices is sucessfull",
//       devices,
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: "Error in retriving all Devices",
//       error,
//     });
//   }
// };
export const getDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//create
// Create a new device
export const createDevice = async (req, res) => {
  const {
    device_image,
    device_name,
    brand,
    model,
    device_type,
    fast_pd_compatible,
    power_rating,
  } = req.body;

  const newDevice = new Device({
    device_image,
    device_name,
    brand,
    model,
    device_type,
    fast_pd_compatible,
    power_rating,
  });

  try {
    const savedDevice = await newDevice.save();
    res.status(201).json(savedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const testTest = async (req, res) => {
  try {
    res.send("<h1>hii welcome to PD_charging_Device_Checking webapp</h1>");
  } catch (error) {
    res.status(600).send({
      success: false,
      message: "error in testing",
      error,
    });
  }
};
// Get a single device by ID
export const getDeviceById = async (req, res) => {
  try {
    console.log("hii");
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ message: "Device not found" });
    res.status(200).json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update a device by ID
export const updateDevice = async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDevice)
      return res.status(404).json({ message: "Device not found" });
    res.status(200).json(updatedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a device by ID
export const deleteDevice = async (req, res) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);
    if (!deletedDevice)
      return res.status(404).json({ message: "Device not found" });
    res.status(200).json({ message: "Device deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get devices acording to the devicetypes
export const deviceType = async (req, res) => {
  try {
    const devices = await Device.find({ device_type: req.params.type });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//search devices
export const searchDevices = async (req, res) => {
  const { query } = req.query;

  if (!query || query.length < 3) {
    return res.status(400).json({ message: "Query too short." });
  }

  try {
    // Perform a case-insensitive search for devices based on the device name or brand
    const devices = await Device.find({
      $or: [
        { device_name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
      ],
    }).limit(10); // Limit results to avoid overloading the client

    if (devices.length === 0) {
      return res.status(404).json({ message: "No devices found." });
    }
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ message: "Server error" });
  }
};
