require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const messageRoutes = require("./routes/messageRoutes");

// DB CONNECT
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("FarmRent API Running");
});

// ======================
// 1. CREATE HTTP SERVER
// ======================
const server = http.createServer(app);

// ======================
// 2. SOCKET.IO SETUP
// ======================
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your Vite/React Frontend Port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // 1. JOIN ROOM
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} Joined Room: ${roomId}`);
  });

  // 2. LEAVE ROOM (Crucial for switching between producer/consumer chats cleanly)
  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} Left Room: ${roomId}`);
  });

  // 3. BROADCAST SEND MESSAGE
  socket.on("send_message", (data) => {
    console.log("Broadcasting message to room:", data.roomId, "Body:", data.text);

    // socket.to() broadcasts to everyone in the room EXPECT the sender.
    // This stops duplicate message rendering bugs on the sender's client side.
    socket.to(data.roomId).emit("receive_message", data);
  });

  // 4. DISCONNECT
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});


// ======================
// 3. START SERVER
// ======================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});