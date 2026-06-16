import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ConsumerDashboard() {

  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (user?._id) {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: {
            authorization:
              localStorage.getItem("token"),
          },
        }
      );

      console.log(
        "Current User:",
        user
      );

      console.log(
        "All Bookings:",
        response.data
      );

      const myBookings =
        response.data.filter(
          (item) =>
            item.consumerId?.toString() ===
            user?._id?.toString()
        );

      console.log(
        "Filtered Bookings:",
        myBookings
      );

      setBookings(myBookings);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-green-50 p-10">

      <h1 className="text-4xl font-bold text-green-700 mb-10">
        Consumer Dashboard
      </h1>

      {bookings.length === 0 ? (

        <p className="text-gray-600">
          No Bookings Found
        </p>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {bookings.map((booking) => {

            console.log(
              "Booking:",
              booking
            );

            console.log(
              "Producer ID:",
              booking.producerId
            );

            return (

              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >

                {booking.equipmentId?.image && (

                  <img
                    src={booking.equipmentId.image}
                    alt={
                      booking.equipmentId?.name
                    }
                    className="h-56 w-full object-cover"
                  />

                )}

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-green-700 mb-2">
                    {booking.equipmentId?.name ||
                      "Equipment"}
                  </h2>

                  <p className="mb-2">
                    Booking Type:
                    {" "}
                    {booking.bookingType}
                  </p>

                  <p className="mb-2">
                    Total Price:
                    {" "}
                    ₹{booking.totalPrice}
                  </p>

                  <p className="mb-2">
                    Start Date:
                    {" "}
                    {booking.startDate?.slice(
                      0,
                      10
                    )}
                  </p>

                  <p className="mb-2">
                    End Date:
                    {" "}
                    {booking.endDate?.slice(
                      0,
                      10
                    )}
                  </p>

                  <p className="mb-4">
                    Status: <span className="font-bold">{booking.status}</span>
                  </p>

                  <p className="mb-2">
                    Payment Method:
                    {" "}
                    <span className="font-bold">
                      {booking.paymentMethod}
                    </span>
                  </p>

                  <p className="mb-4">
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
                  <p className="text-sm text-gray-500 mb-3">
                    Producer ID: {booking.producerId}
                  </p>

                  <Link to={`/chat/${booking.producerId?._id || booking.producerId}`}>
                    <button className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800">
                      Chat With Producer
                    </button>
                  </Link>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}

export default ConsumerDashboard;