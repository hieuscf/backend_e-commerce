import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true }, // Sửa lại required
    phone: { type: String }, // Sửa 'string' thành 'String'
    birthDate: { type: String },
    sex: { type: String, enum: ["male", "female"], required: true },
    thumbnail: { type: String },
    email: { type: String, unique: true, required: true },
    role: {
      type: String,
      enum: ["customer", "seller"],
      required: true,
      default: "customer",
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String },
      country: { type: String, required: true },
    },
    bank: {
      cardExpire: { type: String },
      cardNumber: { type: String },
      cardType: {
        type: String,
        enum: ["Credit card", "Debit card", "Prepaid card", "Virtual card"],
        required: true,
        default: "Credit card",
      },
      currency: {
        type: String,
        enum: ["USD", "VND", "EUR", "JPY"],
        required: true,
        default: "USD",
      },
      iban: { type: String },
    },
  },
  { timestamps: true }
);

// Export models
const User = mongoose.model("User", userSchema);

export default User;
