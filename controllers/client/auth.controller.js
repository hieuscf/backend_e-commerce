// controllers/auth.controller.js
import bcrypt from "bcrypt";
import User from "../../models/UserSchema.js";
import jwt from "jsonwebtoken";
import validator from "validator"; // kiểm tra chuỗi

// Đăng ký
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Tài khoản đã tồn tại" });
    }

    // Kiểm tra email hợp lệ
    if (!validator.isEmail(email)) {
      // Đổi từ userEmail sang email
      return res.json({
        success: false,
        message: "Email không hợp lệ",
      });
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      // Đổi từ userPassword sang password
      return res.json({
        success: false,
        message: "Mật khẩu phải nhiều hơn 6 ký tự",
      });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo người dùng mới
    const newUser = new User({
      fullname: fullName,
      email:email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};
