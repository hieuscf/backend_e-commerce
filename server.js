import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/client/auth.route.js";
import productsRoutes from "./routes/client/products.route.js"
import { connectDB } from "./config/MongoDB.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//connect monggosee
connectDB();

//auth
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
