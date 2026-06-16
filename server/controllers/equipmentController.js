const Equipment = require("../models/Equipment");


// ==============================
// ADD EQUIPMENT
// ==============================
exports.addEquipment = async (req, res) => {

  try {

    const equipment =
      new Equipment(req.body);

    await equipment.save();

    res.status(201).json({
      message:
        "Equipment Added Successfully",
      equipment,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to Add Equipment",
    });
  }
};


// ==============================
// GET ALL EQUIPMENT
// ==============================
exports.getEquipment = async (req, res) => {

  try {

    const equipment =
      await Equipment.find();

    res.status(200).json(
      equipment
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Cannot Fetch Equipment",
    });
  }
};


// ==============================
// GET PRODUCER EQUIPMENT
// ==============================
exports.getProducerEquipment =
  async (req, res) => {

    try {

      const equipment =
        await Equipment.find({
          owner:
            req.params.id,
        });

      res.status(200).json(
        equipment
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Cannot Fetch Producer Equipment",
      });
    }
  };