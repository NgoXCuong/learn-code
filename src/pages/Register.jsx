import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

import { toast } from "sonner";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserPlus,
} from "lucide-react";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Kiểm tra xem email đã tồn tại chưa
      const checkRes = await fetch(
        `http://localhost:3001/users?email=${encodeURIComponent(data.email)}`
      );
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        toast.error("Email này đã được đăng ký!");
        setIsLoading(false);
        return;
      }

      // Tạo user mới
      const newUser = {
        username: data.fullName,
        email: data.email,
        password_hash: data.password,
        role: "user",
        created_at: new Date().toISOString(),
      };

      // Gửi POST lên JSON Server
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Đăng ký thất bại!");

      toast.success(`Chào mừng ${newUser.username} đến với CodePulse!`);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Lỗi kết nối server!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <div className="text-center mb-8 relative">
            <button
              onClick={() => navigate("/login")}
              className="absolute left-0 top-0 flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
            </button>

            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký</h1>
            <p className="text-gray-600">
              Tham gia cộng đồng học lập trình CodePulse
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 font-medium">
                Họ và tên
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="pl-10 h-12 bg-white/70 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  {...register("fullName", {
                    required: "Họ tên là bắt buộc",
                    minLength: {
                      value: 2,
                      message: "Họ tên phải có ít nhất 2 ký tự",
                    },
                  })}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 h-12 bg-white/70 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  {...register("email", {
                    required: "Email là bắt buộc",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tạo mật khẩu mạnh"
                  className="pl-10 pr-10 h-12 bg-white/70 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  {...register("password", {
                    required: "Mật khẩu là bắt buộc",
                    minLength: {
                      value: 8,
                      message: "Mật khẩu phải có ít nhất 8 ký tự",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 font-medium"
              >
                Xác nhận mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  className="pl-10 pr-10 h-12 bg-white/70 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  {...register("confirmPassword", {
                    required: "Vui lòng xác nhận mật khẩu",
                    validate: (value) =>
                      value === password || "Mật khẩu không khớp",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                {...register("terms", {
                  required: "Bạn phải đồng ý với điều khoản sử dụng",
                })}
                className="mt-1"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-gray-600 cursor-pointer leading-relaxed"
              >
                Tôi đồng ý với{" "}
                <Link
                  to="#"
                  className="text-green-600 hover:text-green-700 underline"
                >
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link
                  to="#"
                  className="text-green-600 hover:text-green-700 underline"
                >
                  Chính sách bảo mật
                </Link>
              </Label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang tạo tài khoản...</span>
                </div>
              ) : (
                "Đăng ký"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-semibold hover:underline"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
