const mongoose = require("mongoose");

const equipmentSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        required: true,
      },

      pricePerDay: {
        type: Number,
        required: true,
      },

      location: {
        type: String,
        required: true,
      },

      image: {
        type: String,
      },

      availability: {
        type: Boolean,
        default: true,
      },

      owner: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Equipment",
    equipmentSchema
  );