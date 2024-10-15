import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    age: { type: Number}, // Sửa lại required
    phone: { type: String }, // Sửa 'string' thành 'String'
    birthDate: { type: String },
    sex: { type: String, enum: ["male", "female"],default: "male" },
    thumbnail: { type: String },
    email: { type: String, unique: true, required: true },
    role: {
      type: String,
      enum: ["customer", "seller"],
      required: true,
      default: "customer",
    },
    address: {
      street: { type: String },
      city: { type: String },
      zipCode: { type: String },
      country: { type: String},
    },
    bank: {
      cardExpire: { type: String },
      cardNumber: { type: String },
      cardType: {
        type: String,
        enum: ["Credit card", "Debit card", "Prepaid card", "Virtual card"],
        default: "Credit card",
      },
      currency: {
        type: String,
        enum: ["USD", "VND", "EUR", "JPY"],
        default: "USD",
      },
      iban: { type: String },
    },
  },
  { timestamps: true }
);

// Tạo model cho schema 'food', nếu model đã tồn tại thì dùng model hiện tại, nếu không thì tạo mới
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
