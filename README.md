# 🚜 Farmo - Farm Equipment Rental Platform

Farmo is a full-stack web application that allows farmers and equipment owners to rent agricultural machinery online. The platform connects equipment producers and consumers, making farm equipment accessible, affordable, and easy to book.

## 🌟 Features

### 👨‍🌾 Consumer

* User Registration & Login
* Browse Available Equipment
* Book Equipment (Hourly / Daily)
* Online / Offline Payment Options
* Chat with Equipment Owner
* View Booking History
* Track Booking Status

### 🚜 Producer

* Add Equipment
* Manage Equipment Availability
* View Booking Requests
* Accept / Reject Bookings
* Chat with Consumers
* Track Payments

### 💬 Real-Time Chat

* Producer ↔ Consumer communication
* Socket.IO based messaging
* Persistent message storage

### 💳 Payment System

* Online Payment Support
* Offline Payment Option
* Payment Status Tracking

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication

---

## 📂 Project Structure

farm-rental/

├── client/

│ ├── src/

│ ├── components/

│ ├── pages/

│ └── ...

│

├── server/

│ ├── controllers/

│ ├── routes/

│ ├── models/

│ ├── middleware/

│ └── ...

│

└── README.md

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/riyagupta04/farmo-website.git
cd farmo-website
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 📸 Screenshots

### Home Page

(Add Screenshot)

### Producer Dashboard

(Add Screenshot)

### Consumer Dashboard

(Add Screenshot)

### Booking Page

(Add Screenshot)

### Chat System

(Add Screenshot)

---

## 🎯 Future Enhancements

* Razorpay Integration
* Equipment Reviews & Ratings
* Email Notifications
* Admin Dashboard
* Booking Cancellation
* Equipment Availability Calendar

---

## 👩‍💻 Developer

**Riya Gupta**

M.Tech Information Technology

National Institute of Technology Raipur

GitHub: https://github.com/riyagupta04

---

## 📜 License

This project is developed for educational and learning purposes.
