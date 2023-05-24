import express from "express";
import { upload } from "../config/multerConfig.js";

const router = express.Router();
import { login, register } from "../controllers/auth.js";

//   ROUTES
router.post("/login", login);
router.post("/register", upload.single("picture"), register);
export default router;
