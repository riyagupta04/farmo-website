const express = require("express");

const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBookingStatus,
  updatePaymentStatus
} = require("../controllers/bookingController");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");


// ==========================
// CREATE BOOKING
// ONLY CONSUMER
// ==========================
router.post(
  "/",
  authMiddleware,
  roleMiddleware("consumer"),
  createBooking
);


// ==========================
// GET BOOKINGS
// LOGGED IN USERS
// ==========================
router.get(
  "/",
  authMiddleware,
  getBookings
);


// ==========================
// UPDATE BOOKING STATUS
// ONLY PRODUCER
// ==========================
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("producer"),
  updateBookingStatus
);
router.put(
  "/payment/:id",
  updatePaymentStatus
);

module.exports = router;