import { useState, useEffect } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";



function Review() {

  const { equipmentId } =
    useParams();



  const user = JSON.parse(
    localStorage.getItem("user")
  );



  const [rating,
    setRating] =
    useState(5);

  const [comment,
    setComment] =
    useState("");

  const [reviews,
    setReviews] =
    useState([]);




  useEffect(() => {

    fetchReviews();

  }, []);




  // FETCH REVIEWS
  const fetchReviews =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/reviews/${equipmentId}`
          );



        setReviews(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };




  // ADD REVIEW
  const handleReview =
    async () => {

      try {

        await axios.post(

          "http://localhost:5000/api/reviews",

          {

            equipmentId,

            userId:
              user._id,

            rating,

            comment,
          }
        );



        alert(
          "Review Added"
        );



        setComment("");



        fetchReviews();

      } catch (error) {

        console.log(error);

        alert(
          "Failed"
        );
      }
    };




  return (

    <div className="min-h-screen bg-green-50 p-8">

      <h1 className="text-4xl font-bold text-green-700 mb-8">

        Equipment Reviews

      </h1>




      {/* ADD REVIEW */}
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xl mb-10">

        <h2 className="text-2xl font-bold mb-4">

          Add Review

        </h2>



        <select

          value={rating}

          onChange={(e) =>
            setRating(
              e.target.value
            )
          }

          className="w-full border p-3 rounded-lg mb-4"
        >

          <option value="5">
            ⭐⭐⭐⭐⭐
          </option>

          <option value="4">
            ⭐⭐⭐⭐
          </option>

          <option value="3">
            ⭐⭐⭐
          </option>

          <option value="2">
            ⭐⭐
          </option>

          <option value="1">
            ⭐
          </option>

        </select>



        <textarea

          placeholder="Write review..."

          value={comment}

          onChange={(e) =>
            setComment(
              e.target.value
            )
          }

          className="w-full border p-3 rounded-lg mb-4"
        />



        <button

          onClick={handleReview}

          className="bg-green-700 text-white px-6 py-3 rounded-lg"
        >

          Submit Review

        </button>

      </div>




      {/* REVIEWS */}
      <div className="space-y-6">

        {reviews.map((review) => (

          <div
            key={review._id}

            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <h3 className="text-xl font-bold text-yellow-500">

              {"⭐".repeat(
                review.rating
              )}

            </h3>



            <p className="mt-3">

              {review.comment}

            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Review;