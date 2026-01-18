import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/core/Navbar";
import Footer from "../components/core/Footer";
import api from "../config/api";
import { setAuthStatus } from "../utils/authCheck";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password is not empty
    if (!formData.password || formData.password.trim() === "") {
      const errorMsg = "Password is required";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      const errorMsg = "Password must be at least 6 characters long";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    // Validate confirm password is not empty
    if (!formData.confirmPassword || formData.confirmPassword.trim() === "") {
      const errorMsg = "Please confirm your password";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      const errorMsg = "Passwords do not match";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/users/register", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Token is now stored in httpOnly cookie automatically
      // Set auth status in localStorage
      setAuthStatus(true);
      
      // Show success notification
      toast.success("Account created successfully! Welcome!");

      // Navigate to home page on success
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
              Sign Up
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-0.5 bg-amber-800"></div>
              <span className="text-amber-800 text-2xl">✦</span>
              <div className="w-12 h-0.5 bg-amber-800"></div>
            </div>
            <p className="text-lg text-amber-900 font-serif italic">
              Join our restaurant community
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {error && (
              <div className="mb-4 p-4 bg-red-100 border-2 border-red-800 rounded-md">
                <p className="text-red-900 font-serif text-sm">{error}</p>
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-8 border-2 border-amber-800"
            >
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-amber-900 font-serif font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-amber-900"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-amber-900 font-serif font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-amber-900"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-amber-900 font-serif font-medium mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-amber-900"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-800 text-amber-50 font-serif font-medium py-3 px-6 rounded-md hover:bg-amber-900 transition-colors duration-300 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-amber-900 font-serif font-medium hover:text-amber-800 transition-colors duration-300 underline"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SignUp;
