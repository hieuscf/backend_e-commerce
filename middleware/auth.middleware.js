import jwt from "jsonwebtoken";
import Account from "../models/Account"; // Đảm bảo bạn đã import model Account
import systemConfig from "../config/system"; // Đảm bảo import đúng config hệ thống

// Middleware xác thực JWT token
export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Lấy token sau "Bearer"

  // Kiểm tra nếu không tồn tại token thì yêu cầu đăng nhập
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token

    // Tìm user trong cơ sở dữ liệu với token hợp lệ
    const user = await Account.findOne({
      _id: decoded.userId, // Giả sử token chứa userId
      deleted: false,
      status: "active",
    });

    // Nếu không tìm thấy user, xoá cookie và yêu cầu đăng nhập lại
    if (!user) {
      res.clearCookie("token");
      return res.json({
        success: false,
        data: "",
        message: "Không tồn tại người dùng Cookies",
      });
    }

    req.user = decoded; // Lưu thông tin user vào request để các middleware sau có thể sử dụng
    next(); // Cho phép tiếp tục request
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
