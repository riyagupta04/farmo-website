import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Equipment() {

  const [equipment, setEquipment] = useState([]);

  const navigate = useNavigate();

  // FETCH EQUIPMENT
  useEffect(() => {

    const fetchEquipment = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/equipment"
        );

        setEquipment(response.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchEquipment();

  }, []);


  return (
    <div className="min-h-screen bg-green-50 p-8">

      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Available Equipment
      </h1>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {equipment.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            {/* Image */}
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
              }
              alt={item.name}
              className="w-full h-52 object-cover"
            />

            {/* Content */}
            <div className="p-5">

              <h2 className="text-2xl font-semibold text-green-700">
                {item.name}
              </h2>

              <p className="text-gray-600 mt-2">
                Type: {item.type}
              </p>

              <p className="text-gray-600">
                Location: {item.location}
              </p>

              <p className="text-xl font-bold mt-3 text-green-700">
                ₹{item.pricePerDay}/day
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    navigate(
                      `/booking/${item._id}/${item.owner}/${item.pricePerDay}`
                    )
                  }
                  className="flex-1 bg-green-700 text-white py-2 rounded-lg"
                >
                  Rent Now
                </button>

                <button
                  onClick={() =>
                    navigate(`/chat/${item.owner}`)
                  }
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg"
                >
                  Chat
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Equipment;