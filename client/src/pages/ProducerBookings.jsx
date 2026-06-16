import { useEffect, useState } from "react";

import axios from "axios";

function ProducerBookings() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [bookings, setBookings] =
    useState([]);




  useEffect(() => {

    fetchBookings();

  }, []);




  const fetchBookings = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/bookings"
        );

      const producerBookings =
        response.data.filter(
          (booking) =>
            booking.producerId ===
            user._id
        );

      setBookings(
        producerBookings
      );

    } catch (error) {

      console.log(error);
    }
  };




  // ACCEPT BOOKING
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        { status }
      );

      alert(
        `Booking ${status}`
      );

      fetchBookings();

    } catch (error) {

      console.log(error);
    }
  };




  return (

    <div className="min-h-screen bg-green-50 p-8">

      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">

        Producer Bookings

      </h1>



      <div className="grid gap-6">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-2">

              Booking Request

            </h2>

            <p>
              Booking Type:
              {" "}
              {booking.bookingType}
            </p>

            <p>
              Total Price:
              {" "}
              ₹{booking.totalPrice}
            </p>

            <p>
              Start Date:
              {" "}
              {booking.startDate?.slice(
                0,
                10
              )}
            </p>

            <p>
              End Date:
              {" "}
              {booking.endDate?.slice(
                0,
                10
              )}
            </p>

            <p className="mb-4">
              Status:
              {" "}
              <span className="font-bold text-yellow-600">
                {booking.status}
              </span>
            </p>



            <div className="flex gap-4">

              <button
                onClick={() =>
                  updateStatus(
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
                  updateStatus(
                    booking._id,
                    "rejected"
                  )
                }
                className="bg-red-600 text-white px-6 py-2 rounded-lg"
              >
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProducerBookings;