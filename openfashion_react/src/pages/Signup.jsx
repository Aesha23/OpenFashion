import { useState } from "react";
import { signup } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SIGNUP_MESSAGES } from "../constants/appConstants";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const toastStyle = (bgColor = "#1e1e1e") => ({
      fontSize: "18px",
      padding: "16px 24px",
      background: bgColor,
      color: "#fff",
      borderRadius: "12px",
      minWidth: "300px",
      textAlign: "center",
    });

    const { name, email, password } = form;

    if (!name && !email && !password) {
      toast.error(SIGNUP_MESSAGES.CONFIRM_ALL_FIELDS, {
        style: toastStyle("#ff6464"),
      });
      return;
    }

    if (!name) {
      toast.error(SIGNUP_MESSAGES.CONFIRM_NAME);
      return;
    }

    if (!email) {
      toast.error(SIGNUP_MESSAGES.CONFIRM_EMAIL);
      return;
    }

    if (!password) {
      toast.error(SIGNUP_MESSAGES.CONFIRM_PASSWORD, {});
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error(SIGNUP_MESSAGES.CONFIRM_EMAIL);
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      toast.error(SIGNUP_MESSAGES.CONFIRM_PASSWORD);
      return;
    }

    signup(form);
    toast.success(SIGNUP_MESSAGES.SIGNUP_SUCCESS, {
      style: toastStyle("#4caf50"),
    });
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button>Create Account</button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
