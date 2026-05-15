const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../../middlewares/authMiddleware");

const validate =
  require("../../middlewares/validateMiddleware");

const {
  createTicketSchema
} = require("./ticket.validation");

const {
  createTicket,getMyTickets,getAllTickets
} = require("./ticket.controller");
const replyToTicket = require("../admin/admin.controller");
const adminMiddleware = require("../../middlewares/adminMiddleware");

router.post(
  "/tickets",

  authMiddleware,

  validate(createTicketSchema),

  createTicket
);
router.get(
  "/api/my-tickets",
  authMiddleware,
  getMyTickets
);
router.get(
  "/api/admin/tickets",

  authMiddleware,

  adminMiddleware,

  getAllTickets
);

router.post(
  "/api/tickets/:id/reply",

  authMiddleware,

  adminMiddleware,

  replyToTicket
);

module.exports = router;