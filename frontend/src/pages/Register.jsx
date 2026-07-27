import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthForm from "../components/AuthForm";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", formData);

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthForm
      title="Create Account"
      buttonText="Sign Up"
      fields={[
        {
          name: "name",
          type: "text",
          placeholder: "Full Name",
        },
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
      footerText="Already have an account?"
      footerLink="/"
      footerLinkText="Sign In"
    />
  );
};

export default Register;
