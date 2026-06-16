const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },

    consumerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    producerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookingType: {
      type: String,
      enum: ["hourly", "daily"],
      required: true,
    },

    hours: {
      type: Number,
      default: 0,
    },

    days: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    // ======================
    // PAYMENT SECTION
    // ======================

    paymentMethod: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    transactionId: {
      type: String,
      default: "",
    },

    // ======================
    // BOOKING STATUS
    // ======================

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "completed",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);