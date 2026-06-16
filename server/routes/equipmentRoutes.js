const express = require("express");

const router = express.Router();

const Equipment =
  require("../models/Equipment");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");
// ==========================
// ADD EQUIPMENT
// PROTECTED ROUTE
// ==========================
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("producer"),

  async (req, res) => {

    try {

      const equipment =
        new Equipment(req.body);

      await equipment.save();

      res.status(201).json({

        message:
          "Equipment Added Successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to Add Equipment",
      });
    }
  }
);


// ==========================
// GET ALL EQUIPMENT
// ==========================
router.get(
  "/",
  async (req, res) => {

    try {

      const equipment =
        await Equipment.find();

      res.json(equipment);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",
      });
    }
  }
);


// ==========================
// GET PRODUCER EQUIPMENT
// ==========================
router.get(
  "/producer/:id",

  async (req, res) => {

    try {

      console.log(
        "PARAM ID:",
        req.params.id
      );

      const equipment =
        await Equipment.find({

          owner:
            req.params.id,
        });

      console.log(equipment);

      res.json(equipment);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",
      });
    }
  }
);

module.exports = router;