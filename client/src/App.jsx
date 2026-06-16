import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProducerDashboard from "./pages/ProducerDashboard";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import Chat from "./pages/Chat";
import Equipment from "./pages/Equipment";
import Booking from "./pages/Booking";
import ProducerBookings from "./pages/ProducerBookings";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import Review from "./pages/Review";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {

  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/equipment" element={<Equipment />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/producer-dashboard"
        element={
          <ProtectedRoute role="producer">
            <ProducerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/consumer-dashboard"
        element={
          <ProtectedRoute role="consumer">
            <ConsumerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat/:receiverId"
        element={<Chat />}
      />
      <Route
        path="/booking/:equipmentId/:producerId/:price"
        element={<Booking />}
      />

      <Route
        path="/producer-bookings"
        element={<ProducerBookings />}
      />
      <Route
        path="/my-bookings"
        element={<MyBookings />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
      <Route
        path="/review/:equipmentId"
        element={<Review />}
      />
    </Routes>
  );
}

export default App;