const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// ==========================
// REGISTER USER
// ==========================
const registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role
      } = req.body;

      // CHECK EXISTING USER
      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER
      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          role,
        });

      res.status(201).json({

        message:
          "User Registered Successfully",

        user: {

          _id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,
        },
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// ==========================
// LOGIN USER
// ==========================
const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // FIND USER
      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.status(400).json({
          message:
            "User not found",
        });
      }

      // COMPARE PASSWORD
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid Password",
        });
      }

      // GENERATE JWT TOKEN
      console.log(process.env.JWT_SECRET);
      const token =
        jwt.sign(

          {
            id: user._id,
            role: user.role,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

      // RESPONSE
      res.status(200).json({

        message:
          "Login Successful",

        token,

        user: {

          _id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,
        },
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };


module.exports = {

  registerUser,

  loginUser,
};