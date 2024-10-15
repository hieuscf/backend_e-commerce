// routes/auth.js
import express from "express";
import { signup } from "../../controllers/client/auth.controller.js"; // Đảm bảo import đúng đường dẫn

const router = express.Router();

// Đăng ký
router.post("/signup", signup);

export default router; 
