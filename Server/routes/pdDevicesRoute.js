import Express from "express";
import {
  getDevices,
  createDevice,
  testTest,
  getDeviceById,
  updateDevice,
  deleteDevice,
  deviceType,
} from "../controller/deviceController.js";
const router = Express.Router();

router.get("/getAllDevice", getDevices);
router.get("/test", testTest);
router.post("/addDevice", createDevice);
router.get("/device/:id", getDeviceById);
router.put("/deviceUpdate/:id", updateDevice); // Update device by ID
router.delete("/deviceDelete/:id", deleteDevice); // Delete device by ID
router.get("/deviceType/:type", deviceType);
export default router;
