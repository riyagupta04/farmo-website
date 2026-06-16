import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      // Role based navigation
      if (response.data.user.role === "producer") {
        navigate("/producer-dashboard");
      } else {
        navigate("/consumer-dashboard");
      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;