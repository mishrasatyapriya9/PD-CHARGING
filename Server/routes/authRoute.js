import Express from "express";
import { registerController } from "../controller/authController.js";
import {
  loginController,
  testController,
} from "../controller/authController.js";
import { requireSignin, isAdmin } from "../middlewares/authMiddleware.js";
const router = Express.Router();
//User authentication
router.post("/register", registerController);
router.post("/login", loginController); 

export default router;
