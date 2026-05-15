const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Open", "Pending", "Resolved"],
    default: "Open"
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, {
  timestamps: true
});

const Ticket =
  mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;