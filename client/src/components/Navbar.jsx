import { Link } from "react-router-dom";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );



  return (

    <nav className="flex justify-between items-center px-8 py-4 bg-green-700 text-white shadow-md">

      {/* Logo */}
      <Link to="/">

        <h1 className="text-2xl font-bold cursor-pointer">

          🌾 FarmRent

        </h1>

      </Link>




      {/* Menu */}
      <div className="flex items-center gap-4 text-lg">

        <Link
          to="/"
          className="hover:text-yellow-300 transition"
        >
          Home
        </Link>




        {/* IF USER NOT LOGIN */}
        {!user && (
          <>
            <Link
              to="/login"
              className="hover:text-yellow-300 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-yellow-300 transition"
            >
              Register
            </Link>
          </>
        )}




        {/* IF USER LOGIN */}
        {user && (
          <>
            <Link to="/producer-dashboard">

              <button className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300">

                Dashboard

              </button>

            </Link>




            <Link to="/consumer-dashboard">

              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500">

                My Bookings

              </button>

            </Link>




            <button

              onClick={() => {

                localStorage.removeItem(
                  "user"
                );

                window.location.href =
                  "/login";
              }}

              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >

              Logout

            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;