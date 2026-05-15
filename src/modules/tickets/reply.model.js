const mongoose = require("mongoose");
const Ticket = require("./ticket.model")

const replySchema =
  new mongoose.Schema({

    message: {
      type: String,
      required: true
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true
    }

  }, {
    timestamps: true
  });

const Reply =
  mongoose.model("Reply", replySchema);

module.exports = Reply;