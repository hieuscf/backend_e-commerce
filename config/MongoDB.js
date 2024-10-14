import dotenv from "dotenv";

dotenv.config();
const database_name = process.env.MONGOOSE_NAME;
const database_pass = process.env.MONGOOSE_PASS;
const MONGODB_URI =
  "mongodb+srv://database_name:database_pass@e-commerce.ryrpm.mongodb.net/?retryWrites=true&w=majority&appName=e-commerce";

export default MONGODB_URI;