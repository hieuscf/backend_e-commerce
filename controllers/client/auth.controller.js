// controllers/auth.controller.js
import bcrypt from "bcrypt";
import User from "../../models/UserSchema.js";
import jwt from "jsonwebtoken";
import validator from "validator"; // kiểm tra chuỗi
import dotenv from "dotenv";
dotenv.config();

// Đăng ký
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

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
      fullname: fullname,
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

// Tạo token với userId và thời gian hết hạn 2 tuần
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "2w", // Token hết hạn sau 2 tuần
  });
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email, deleted: false });
    if (!existingUser) {
      return res.json({ success: false, message: "Tài khoản không tồn tại" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Mật khẩu không chính xác" });
    }

    // Kiểm tra trạng thái tài khoản
    if (existingUser.status !== "active") {
      return res.json({ success: false, message: "Tài khoản đã bị khóa" });
    }

    // Tạo token
    const token = createToken(existingUser._id); // Gọi hàm tạo token với _id

    // Trả về token và thông báo đăng nhập thành công
    return res.json({ success: true, token, message: "Đăng nhập thành công" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};

export const privates = async (req, res) => {
  return res.json({
    success: true,
    data: req.user, // Trả về dữ liệu người dùng đã lưu trong middleware
    message: "Token hợp lệ",
  });
};
