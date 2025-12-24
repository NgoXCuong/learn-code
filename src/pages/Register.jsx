import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserPlus,
  User,
  ArrowLeft,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

// Mock database
let mockUsers = [];

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
      // Kiểm tra email đã tồn tại trong mock
      const existingUser = mockUsers.find((u) => u.email === data.email);
      if (existingUser) {
        toast.error("Email này đã được đăng ký!");
        setIsLoading(false);
        return;
      }

      if (data.password !== data.confirmPassword) {
        toast.error("Mật khẩu và xác nhận mật khẩu không khớp!");
        setIsLoading(false);
        return;
      }

      const newUser = {
        username: data.fullName,
        email: data.email,
        password_hash: data.password,
        role: "user",
        created_at: new Date().toISOString(),
      };

      // Thêm vào mock database
      mockUsers.push(newUser);

      toast.success(`Chào mừng ${newUser.username} đến với CodePulse!`);

      // Giả lập redirect sau 1s
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi đăng ký!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md relative">
        <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
          <div className="text-center mb-2 relative">
            <button
              onClick={() => navigate("/")}
              className="absolute left-0 top-0 flex items-center text-indigo-600 hover:text-indigo-800 text-base font-medium"
            >
              <ArrowLeft className="w-6 h-6 mr-1" />
            </button>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Đăng ký
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Tạo tài khoản mới để bắt đầu
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Họ và tên
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-white" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="pl-10 h-12 bg-white/70 dark:bg-gray-700/70 border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
                  {...register("fullName", {
                    required: "Họ và tên là bắt buộc",
                  })}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-base">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-white" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 h-12 bg-white/70 dark:bg-gray-700/70 border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
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
                <p className="text-red-500 text-base">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-white" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="pl-10 pr-10 h-12 bg-white/70 dark:bg-gray-700/70 border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
                  {...register("password", {
                    required: "Mật khẩu là bắt buộc",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-base">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Xác nhận mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-white" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  className="pl-10 pr-10 h-12 bg-white/70 dark:bg-gray-700/70 border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
                  {...register("confirmPassword", {
                    required: "Xác nhận mật khẩu là bắt buộc",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-base">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="agree" {...register("agree", { required: true })} />
              <Label
                htmlFor="agree"
                className="text-base text-gray-600 dark:text-gray-300 cursor-pointer"
              >
                Tôi đồng ý với điều khoản sử dụng
              </Label>
            </div>
            {errors.agree && (
              <p className="text-red-500 text-base">
                Bạn cần đồng ý điều khoản
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-500 text-white font-semibold rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng ký...</span>
                </div>
              ) : (
                "Đăng ký"
              )}
            </Button>
          </form>

          <div className="mt-2 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="dark:bg-gray-300 font-semibold hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
