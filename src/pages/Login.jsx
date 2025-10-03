import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSuccessMessage(""); // reset message

    try {
      // Fetch user từ JSON Server
      const res = await fetch(
        `http://localhost:3001/users?email=${encodeURIComponent(data.email)}`
      );
      const users = await res.json();

      const user = users.find((u) => u.password_hash === data.password);

      if (user) {
        // Lưu info vào localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            name: user.username,
            email: user.email,
            loginTime: new Date().toISOString(),
          })
        );

        const msg = `Chào mừng ${user.username}!`;
        setSuccessMessage(msg);
        toast.success(msg);

        // Chuyển hướng sau 1.5s để user thấy message
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error("Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối server!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <div className="text-center mb-8 relative">
            <button
              onClick={() => navigate("/")}
              className="absolute left-0 top-0 flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
            </button>
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
            <p className="text-gray-600">
              Chào mừng bạn quay trở lại CodePulse
            </p>
          </div>

          {/* Thông báo thành công */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  className="pl-10 h-12 bg-white/70 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  data-testid="email-input"
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

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="pl-10 pr-10 h-12 bg-white/70 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  data-testid="password-input"
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
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  data-testid="toggle-password-btn"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" {...register("remember")} />
                <Label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Ghi nhớ đăng nhập
                </Label>
              </div>
              <Link
                to="#"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              data-testid="login-submit-btn"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng nhập...</span>
                </div>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                data-testid="go-to-register-link"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
