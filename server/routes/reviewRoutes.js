const express =
  require("express");

const router =
  express.Router();

const {

  addReview,

  getReviews,

} = require(
  "../controllers/reviewController"
);



// ADD REVIEW
router.post(
  "/",
  addReview
);



// GET REVIEWS
router.get(
  "/:id",
  getReviews
);

module.exports =
  router;