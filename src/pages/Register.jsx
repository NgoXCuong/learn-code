import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
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

// Import React Hot Toast
import { Toaster, toast } from "react-hot-toast";

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
      const checkRes = await fetch(
        `http://localhost:3001/users?email=${encodeURIComponent(data.email)}`
      );
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        toast.error("Email này đã được đăng ký!");
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 relative">
      {/* Toaster để hiển thị toast */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md relative">
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          {/* ...phần header và form như bạn viết */}
          {/* Chỉ thay toast.success / toast.error là dùng React Hot Toast */}
        </Card>
      </div>
    </div>
  );
};

export default Register;
