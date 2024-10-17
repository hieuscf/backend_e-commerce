import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import product from "../../controllers/client/product.controller.js"

const router = express.Router();
router.post("/product",product);



export default router; 