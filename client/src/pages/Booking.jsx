import { useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

function Booking() {

  const {
    equipmentId,
    producerId,
    price
  } = useParams();



  const user = JSON.parse(
    localStorage.getItem("user")
  );



  const numericPrice =
    Number(price);




  const [bookingType,
    setBookingType] =
    useState("daily");

  const [hours,
    setHours] =
    useState(1);

  const [days,
    setDays] =
    useState(1);

  const [startDate,
    setStartDate] =
    useState("");

  const [endDate,
    setEndDate] =
    useState("");




  // TOTAL PRICE
  const totalPrice =
    bookingType ===
      "hourly"

      ? numericPrice * hours

      : numericPrice * days;




  // PAYMENT + BOOKING
  const handleBooking = async () => {

    try {

      // OFFLINE PAYMENT
      if (paymentMethod === "offline") {

        const bookingData = {

          equipmentId,
          consumerId: user._id,
          producerId,
          bookingType,

          hours:
            bookingType === "hourly"
              ? Number(hours)
              : 0,

          days:
            bookingType === "daily"
              ? Number(days)
              : 0,

          totalPrice,

          startDate,
          endDate,

          paymentMethod: "offline",

          paymentStatus:
            "pending",

          status: "pending",
        };

        await axios.post(
          "http://localhost:5000/api/bookings",
          bookingData,
          {
            headers: {
              authorization:
                localStorage.getItem("token"),
            },
          }
        );

        alert(
          "Booking Created Successfully"
        );

        return;
      }

      // ONLINE PAYMENT

      const orderResponse =
        await axios.post(
          "http://localhost:5000/api/payment/create-order",
          {
            amount: totalPrice,
          }
        );

      const options = {

        key:
          "YOUR_RAZORPAY_KEY",

        amount:
          orderResponse.data.amount,

        currency:
          orderResponse.data.currency,

        order_id:
          orderResponse.data.id,

        name: "FarmRent",

        description:
          "Equipment Booking",

        handler:
          async function (
            response
          ) {

            const bookingData = {

              equipmentId,
              consumerId:
                user._id,

              producerId,

              bookingType,

              hours:
                bookingType ===
                  "hourly"
                  ? Number(hours)
                  : 0,

              days:
                bookingType ===
                  "daily"
                  ? Number(days)
                  : 0,

              totalPrice,

              startDate,
              endDate,

              paymentMethod:
                "online",

              paymentStatus:
                "paid",

              paymentId:
                response.razorpay_payment_id,

              status:
                "pending",
            };

            await axios.post(
              "http://localhost:5000/api/bookings",
              bookingData,
              {
                headers: {
                  authorization:
                    localStorage.getItem(
                      "token"
                    ),
                },
              }
            );

            alert(
              "Payment Successful"
            );
          },
      };

      const rzp =
        new window.Razorpay(
          options
        );

      rzp.open();

    } catch (error) {

      console.log(error);

      alert(
        "Booking Failed"
      );
    }
  };



  return (

    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">

        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">

          Rent Equipment

        </h1>




        {/* Booking Type */}
        <select
          value={bookingType}

          onChange={(e) =>
            setBookingType(
              e.target.value
            )
          }

          className="w-full border p-3 rounded-lg mb-4"
        >

          <option value="daily">
            Daily Rent
          </option>

          <option value="hourly">
            Hourly Rent
          </option>

        </select>




        {/* HOURS */}
        {bookingType ===
          "hourly" && (

            <input
              type="number"

              placeholder="Enter Hours"

              value={hours}

              onChange={(e) =>
                setHours(
                  e.target.value
                )
              }

              className="w-full border p-3 rounded-lg mb-4"
            />
          )}




        {/* DAYS */}
        {bookingType ===
          "daily" && (

            <input
              type="number"

              placeholder="Enter Days"

              value={days}

              onChange={(e) =>
                setDays(
                  e.target.value
                )
              }

              className="w-full border p-3 rounded-lg mb-4"
            />
          )}




        {/* START DATE */}
        <input
          type="date"

          value={startDate}

          onChange={(e) =>
            setStartDate(
              e.target.value
            )
          }

          className="w-full border p-3 rounded-lg mb-4"
        />




        {/* END DATE */}
        <input
          type="date"

          value={endDate}

          onChange={(e) =>
            setEndDate(
              e.target.value
            )
          }

          className="w-full border p-3 rounded-lg mb-4"
        />


        {/* PAYMENT METHOD */}

        <div className="mb-4">

          <label className="font-bold">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg mt-2"
          >

            <option value="offline">
              Offline Payment
            </option>

            <option value="online">
              Online Payment
            </option>

          </select>

        </div>

        {/* TOTAL */}
        <div className="text-2xl font-bold text-green-700 mb-6">

          Total Price:
          {" "}
          ₹{totalPrice}

        </div>




        {/* BUTTON */}
        <button
          onClick={handleBooking}

          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
        >

          Pay & Confirm Booking

        </button>

      </div>

    </div>
  );
}

export default Booking;