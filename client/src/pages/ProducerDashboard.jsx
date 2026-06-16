import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProducerDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =========================
  // EQUIPMENT FORM STATE
  // =========================
  const [equipment, setEquipment] =
    useState({
      name: "",
      type: "",
      pricePerDay: "",
      location: "",
      image: "",
    });

  // =========================
  // MY EQUIPMENT
  // =========================
  const [myEquipment, setMyEquipment] =
    useState([]);

  // =========================
  // BOOKINGS
  // =========================
  const [bookings, setBookings] =
    useState([]);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {

    if (user?._id) {

      fetchMyEquipment();

      fetchBookings();
    }

  }, []);

  // =========================
  // FETCH MY EQUIPMENT
  // =========================
  // FETCH MY EQUIPMENT
  const fetchMyEquipment = async () => {

    try {

      console.log(
        "USER ID:",
        user._id
      );

      const response =
        await axios.get(
          `http://localhost:5000/api/equipment/producer/${user._id}`
        );

      console.log(
        "MY EQUIPMENT:"
      );

      console.log(
        response.data
      );

      setMyEquipment(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };
  // =========================
  // FETCH BOOKINGS
  // =========================
  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("Logged In Producer:", user._id);

      response.data.forEach((booking) => {
        console.log(
          "Booking Producer ID:",
          booking.producerId
        );
      });

      const filteredBookings = response.data.filter(
        (item) =>
          item.producerId?.toString() ===
          user._id?.toString()
      );

      console.log(
        "Filtered Bookings:",
        filteredBookings
      );

      setBookings(filteredBookings);

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {

    setEquipment({
      ...equipment,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // ADD EQUIPMENT
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = {
        name: equipment.name,
        type: equipment.type,
        pricePerDay: equipment.pricePerDay,
        location: equipment.location,
        image: equipment.image,
        owner: user._id,
      };

      console.log(data);

      const response =
        await axios.post(

          "http://localhost:5000/api/equipment/add",

          data,

          {
            headers: {
              authorization:
                localStorage.getItem("token"),
            },
          }
        );

      alert("Equipment Added");

      console.log(response.data);

      fetchMyEquipment();

      setEquipment({
        name: "",
        type: "",
        pricePerDay: "",
        location: "",
        image: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed");
    }
  };
  const markPaymentPaid = async (bookingId) => {

    try {

      await axios.put(
        `http://localhost:5000/api/bookings/payment/${bookingId}`,
        {
          paymentStatus: "paid",
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Payment marked as paid");

      fetchBookings();

    } catch (error) {

      console.log(error);

      alert("Failed to update payment");
    }
  };
  // =========================
  // UPDATE BOOKING STATUS
  // =========================
  const updateBookingStatus = async (id, status) => {

    console.log("Button Clicked");
    console.log("Booking ID:", id);
    console.log("Status:", status);

    try {

      const response = await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        { status },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);

      alert(`Booking ${status}`);

      fetchBookings();
      fetchMyEquipment();

    } catch (error) {

      console.log("ERROR:", error);

    }
  };
  console.log("Current User:", user);
  console.log("Bookings State:", bookings);
  return (

    <div className="min-h-screen bg-green-50 p-8">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Producer Dashboard
      </h1>

      <p className="mb-8 text-lg">
        Welcome, {user?.name}
      </p>

      {/* ========================= */}
      {/* ADD EQUIPMENT */}
      {/* ========================= */}

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl mb-12">

        <h2 className="text-2xl font-semibold mb-6">
          Add Equipment
        </h2>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Equipment Name"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            value={equipment.name}
            required
          />

          <input
            type="text"
            name="type"
            placeholder="Type"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            value={equipment.type}
            required
          />

          <input
            type="number"
            name="pricePerDay"
            placeholder="Price Per Day"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            value={equipment.pricePerDay}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            value={equipment.location}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            value={equipment.image}
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
          >
            Add Equipment
          </button>

        </form>

      </div>

      {/* ========================= */}
      {/* MY EQUIPMENT */}
      {/* ========================= */}

      <h2 className="text-3xl font-bold mb-6">
        My Equipment
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

        {myEquipment.length > 0 ? (

          myEquipment.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              <img
                src={item.image}
                alt={item.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">

                <h3 className="text-2xl font-bold text-green-700">
                  {item.name}
                </h3>

                <p>
                  Type: {item.type}
                </p>

                <p>
                  Location: {item.location}
                </p>

                <p className="font-bold text-yellow-600">
                  ₹{item.pricePerDay}/day
                </p>

                <p
                  className={
                    item.availability
                      ? "text-green-700 font-bold"
                      : "text-red-600 font-bold"
                  }
                >

                  {item.availability
                    ? "Available"
                    : "Booked"}

                </p>

              </div>

            </div>

          ))

        ) : (

          <p className="text-gray-600">
            No Equipment Added Yet
          </p>

        )}

      </div>

      {/* ========================= */}
      {/* BOOKING REQUESTS */}
      {/* ========================= */}

      <h2 className="text-3xl font-bold mb-6">
        Booking Requests
      </h2>

      <div className="space-y-6">

        {bookings.length > 0 ? (

          bookings.map((booking) => (

            <div
              key={booking._id}
              className="bg-white p-6 rounded-xl shadow-lg"
            >

              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Booking Request
              </h3>

              <p>
                Consumer ID: {booking.consumerId}
              </p>

              <p>
                Booking Type: {booking.bookingType}
              </p>

              <p>
                Total Price: ₹{booking.totalPrice}
              </p>

              <p>
                Start Date: {booking.startDate?.slice(0, 10)}
              </p>

              <p>
                End Date: {booking.endDate?.slice(0, 10)}
              </p>

              {/* <p className="mb-4">
                Status:
                {" "}
                <span
                  className={
                    booking.status === "accepted"
                      ? "text-green-700 font-bold"
                      : booking.status === "rejected"
                        ? "text-red-600 font-bold"
                        : "text-yellow-600 font-bold"
                  }
                >
                  {booking.status}
                </span>
              </p> */}
              <p>
                Payment Method:
                {" "}
                <span className="font-bold">
                  {booking.paymentMethod}
                </span>
              </p>

              <p>
                Payment Status:
                {" "}
                <span
                  className={`font-bold ${booking.paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-red-600"
                    }`}
                >
                  {booking.paymentStatus}
                </span>
              </p>
              <div className="flex gap-4 flex-wrap">

                {booking.status === "pending" && (

                  <>
                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking._id,
                          "accepted"
                        )
                      }
                      className="bg-green-700 text-white px-6 py-2 rounded-lg"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking._id,
                          "rejected"
                        )
                      }
                      className="bg-red-600 text-white px-6 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </>

                )}

                {
                  booking.paymentMethod === "offline" &&
                  booking.paymentStatus !== "paid" && (

                    <button
                      onClick={() =>
                        markPaymentPaid(booking._id)
                      }
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                      Mark As Paid
                    </button>

                  )
                }


                <Link to={`/chat/${booking.consumerId?._id || booking.consumerId}`}>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                    Chat With Consumer
                  </button>
                </Link>

              </div>

            </div>

          ))

        ) : (

          <p className="text-gray-600">
            No Booking Requests
          </p>

        )}

      </div>
    </div>
  );
}

export default ProducerDashboard;