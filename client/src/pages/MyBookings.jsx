import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {

  const [bookings, setBookings] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  // FETCH BOOKINGS
  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/bookings"
        );

        // CONSUMER BOOKINGS
        const myBookings =
          response.data.filter(
            (booking) =>
              booking.consumerId._id ===
              user._id
          );

        setBookings(myBookings);

      } catch (error) {

        console.log(error);
      }
    };

    fetchBookings();

  }, []);



  return (
    <div className="min-h-screen bg-green-50 p-8">

      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        My Bookings
      </h1>


      <div className="grid gap-6">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold text-green-700">
              {
                booking.equipmentId.name
              }
            </h2>

            <p className="mt-2">
              Booking Type:
              {" "}
              {
                booking.bookingType
              }
            </p>

            <p>
              Total Price:
              ₹
              {
                booking.totalPrice
              }
            </p>

            <p>
              Start Date:
              {" "}
              {
                new Date(
                  booking.startDate
                ).toLocaleDateString()
              }
            </p>

            <p>
              End Date:
              {" "}
              {
                new Date(
                  booking.endDate
                ).toLocaleDateString()
              }
            </p>

            <p className="mt-2">
              Status:
              {" "}
              <span
                className={`font-bold ${booking.status ===
                  "accepted"
                  ? "text-green-700"
                  : booking.status ===
                    "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                  }`}
              >
                {booking.status}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyBookings;