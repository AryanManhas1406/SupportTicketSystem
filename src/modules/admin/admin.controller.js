

const Ticket =
  require("../tickets/ticket.model");

const Reply =
  require("../tickets/reply.model");

const replyToTicket =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        message,
        status
      } = req.body;

      const ticket =
        await Ticket.findById(id);

      if (!ticket) {

        return res.status(404).json({
          message: "Ticket not found"
        });

      }

      const reply =
        await Reply.create({

          message,

          sender: req.user.id,

          ticket: id

        });

      if (status) {

        ticket.status = status;

        await ticket.save();

      }

      res.status(201).json({

        success: true,

        message:
          "Reply sent successfully",

        reply,

        updatedStatus:
          ticket.status

      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };

module.exports =
  replyToTicket;

