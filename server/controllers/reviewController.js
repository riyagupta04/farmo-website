const Review =
  require("../models/Review");



// ADD REVIEW
exports.addReview =
  async (req, res) => {

    try {

      const review =
        new Review(req.body);

      await review.save();

      res.status(201).json({
        message:
          "Review Added",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed",
      });
    }
  };




// GET REVIEWS
exports.getReviews =
  async (req, res) => {

    try {

      const reviews =
        await Review.find({

          equipmentId:
            req.params.id,
        });

      res.json(reviews);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error",
      });
    }
  };