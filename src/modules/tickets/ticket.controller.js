const Ticket = require("../tickets/ticket.model");

const createTicket =
  async (req, res) => {

    try {

      const {
        title,
        description,
        priority
      } = req.body;

      const ticket =
        await Ticket.create({

          title,
          description,
          priority,

          user: req.user.id

        });

      res.status(201).json({
        success: true,
        ticket
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };
  const getMyTickets =
  async (req, res) => {

    try {

      const tickets =
        await Ticket.find({

          user: req.user.id

        }).sort({
          createdAt: -1
        });

      res.status(200).json({

        success: true,

        count: tickets.length,

        tickets

      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };
  const getAllTickets =
  async (req, res) => {

    try {

      const tickets =
        await Ticket.find()

        .populate("user", "name email")

        .sort({
          createdAt: -1
        });

      res.status(200).json({

        success: true,

        tickets

      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };


module.exports = {
  createTicket,getMyTickets,getAllTickets
};