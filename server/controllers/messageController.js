const Message = require("../models/Message");

// SAVE MESSAGE
const saveMessage = async (req, res) => {
  try {

    console.log("BODY:", req.body);

    const {
      senderId,
      receiverId,
      roomId,
      text
    } = req.body;

    if (!senderId || !receiverId || !roomId || !text) {
      return res.status(400).json({
        message: "Missing fields"
      });
    }

    const message = await Message.create({
      senderId,
      receiverId,
      roomId,
      text
    });

    res.status(201).json(message);

  } catch (error) {

    console.log("ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

// GET MESSAGES
const getMessages = async (req, res) => {

  try {

    const messages = await Message.find({
      roomId: req.params.roomId
    });

    res.json(messages);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  saveMessage,
  getMessages
};