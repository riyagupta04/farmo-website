const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");

// ==========================
// CREATE BOOKING
// ==========================
exports.createBooking = async (req, res) => {

  try {

    const booking = new Booking(req.body);

    await booking.save();

    res.status(201).json({
      message: "Booking Created Successfully",
      booking,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Booking failed",
    });
  }
};

// ==========================
// GET BOOKINGS
// ==========================
exports.getBookings = async (req, res) => {

  try {

    const bookings = await Booking.find()
      .populate("equipmentId");

    res.status(200).json(bookings);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Cannot fetch bookings",
    });
  }
};

// ==========================
// UPDATE BOOKING STATUS
// ==========================
exports.updateBookingStatus = async (req, res) => {

  try {

    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      );

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // ACCEPTED
    if (req.body.status === "accepted") {

      await Equipment.findByIdAndUpdate(
        booking.equipmentId,
        {
          availability: false,
        }
      );
    }

    // REJECTED
    if (req.body.status === "rejected") {

      await Equipment.findByIdAndUpdate(
        booking.equipmentId,
        {
          availability: true,
        }
      );
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// UPDATE PAYMENT STATUS
// ==========================
exports.updatePaymentStatus = async (req, res) => {

  try {

    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          paymentStatus:
            req.body.paymentStatus,
        },
        {
          new: true,
        }
      );

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Payment updated successfully",
      booking,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};