import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

function Home() {

  const [equipment, setEquipment] =
    useState([]);

  useEffect(() => {

    fetchEquipment();

  }, []);

  const fetchEquipment =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/equipment"
          );

        setEquipment(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="bg-green-50 min-h-screen">

      <Navbar />

      <Hero />

      {/* Featured Equipment */}
      <div className="px-10 py-16">

        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">

          Featured Equipment

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {equipment.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 duration-300"
            >

              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="h-60 w-full object-cover"
              />

              {/* Content */}
              <div className="p-6">

                <h3 className="text-2xl font-bold text-green-700 mb-3">

                  {item.name}

                </h3>

                <p className="text-gray-600 mb-2">

                  Type: {item.type}

                </p>

                <p className="text-gray-600 mb-2">

                  Location: {item.location}

                </p>

                <p className="text-2xl font-bold text-yellow-600 mb-3">

                  ₹{item.pricePerDay}/day

                </p>

                {/* Availability */}
                <p
                  className={
                    item.availability
                      ? "text-green-700 font-bold mb-4"
                      : "text-red-600 font-bold mb-4"
                  }
                >

                  {item.availability
                    ? "Available"
                    : "Unavailable"}

                </p>

                {/* RENT BUTTON */}
                <Link
                  to={`/booking/${item._id}/${item.owner}/${item.pricePerDay}`}
                >

                  <button

                    disabled={!item.availability}

                    className={`w-full py-3 rounded-xl text-white mb-3 ${item.availability
                      ? "bg-green-700 hover:bg-green-800"
                      : "bg-gray-400 cursor-not-allowed"
                      }`}
                  >

                    {item.availability
                      ? "Rent Now"
                      : "Unavailable"}

                  </button>

                </Link>

                {/* REVIEW BUTTON */}
                <Link
                  to={`/review/${item._id}`}
                >

                  <button
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl"
                  >

                    Reviews

                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;