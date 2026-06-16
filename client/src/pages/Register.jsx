import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(response.data.message);

      console.log(response.data);

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Register
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <select
            name="role"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="producer">Producer</option>
            <option value="consumer">Consumer</option>
          </select>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;