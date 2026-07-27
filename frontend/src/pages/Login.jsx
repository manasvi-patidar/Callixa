import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      // Save token locally
      localStorage.setItem("callixa_token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthForm
      title="Welcome Back"
      buttonText="Sign In"
      fields={[
        {
          name: "username",
          type: "text",
          placeholder: "Username",
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
        },
      ]}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Sign Up"
    />
  );
};

export default Login;
