// routes/auth.js
import express from "express";
import { signup , login , privates } from "../../controllers/client/auth.controller.js"; 
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Đăng ký
router.post("/signup", signup);

// Đăng nhập
router.post("/login", login);

router.post("/logout", logout);

router.post("/private", privates);





export default router; 
