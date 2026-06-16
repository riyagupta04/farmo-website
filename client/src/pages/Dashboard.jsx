import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [equipmentCount, setEquipmentCount] =
    useState(0);

  const [bookingCount, setBookingCount] =
    useState(0);

  const [pendingBookings, setPendingBookings] =
    useState(0);

  const [earnings, setEarnings] =
    useState(0);



  useEffect(() => {

    fetchDashboardData();

  }, []);



  const fetchDashboardData = async () => {

    try {

      // GET EQUIPMENT
      const equipmentRes =
        await axios.get(
          "http://localhost:5000/api/equipment"
        );

      // GET BOOKINGS
      const bookingRes =
        await axios.get(
          "http://localhost:5000/api/bookings"
        );



      // PRODUCER DASHBOARD
      if (user.role === "producer") {

        const myEquipment =
          equipmentRes.data.filter(
            (item) =>
              item.owner === user._id
          );

        setEquipmentCount(
          myEquipment.length
        );


        const myBookings =
          bookingRes.data.filter(
            (booking) =>
              booking.producerId ===
              user._id
          );

        setBookingCount(
          myBookings.length
        );


        const pending =
          myBookings.filter(
            (booking) =>
              booking.status ===
              "pending"
          );

        setPendingBookings(
          pending.length
        );


        let total = 0;

        myBookings.forEach(
          (booking) => {
            total +=
              booking.totalPrice;
          }
        );

        setEarnings(total);

      }


      // CONSUMER DASHBOARD
      else {

        const myBookings =
          bookingRes.data.filter(
            (booking) =>
              booking.consumerId ===
              user._id
          );

        setBookingCount(
          myBookings.length
        );

      }

    } catch (error) {

      console.log(error);
    }
  };



  return (
    <div className="min-h-screen bg-green-50 p-8">

      <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
        Dashboard
      </h1>



      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Equipment */}
        {user.role === "producer" && (

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-bold text-gray-700">
              Total Equipment
            </h2>

            <p className="text-4xl font-bold text-green-700 mt-4">
              {equipmentCount}
            </p>

          </div>

        )}



        {/* Bookings */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-bold text-gray-700">
            Total Bookings
          </h2>

          <p className="text-4xl font-bold text-green-700 mt-4">
            {bookingCount}
          </p>

        </div>



        {/* Pending */}
        {user.role === "producer" && (

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-bold text-gray-700">
              Pending Requests
            </h2>

            <p className="text-4xl font-bold text-yellow-600 mt-4">
              {pendingBookings}
            </p>

          </div>

        )}



        {/* Earnings */}
        {user.role === "producer" && (

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-bold text-gray-700">
              Earnings
            </h2>

            <p className="text-4xl font-bold text-green-700 mt-4">
              ₹{earnings}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;