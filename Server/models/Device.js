import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  device_image: {
    type: String,
  },
  device_name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  device_type: {
    type: String,
    required: true,
  },
  fast_pd_compatible: {
    type: Boolean, // Boolean makes more sense for compatibility
    required: true,
  },
  power_rating: {
    type: String, // Could be string if it contains units (e.g., "45W")
    required: true,
  },
});

export default mongoose.model("Devices", deviceSchema);

//Example Device
// {
//     "device_image": "images/hp_pavilion_14.png",
//     "device_name": "HP Pavilion 14",
//     "brand": "HP",
//     "model": "14-dv0070wm",
//     "fast_pd_compatible": 1,
//     "power_rating": "45W"
// }
