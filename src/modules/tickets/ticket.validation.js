const Joi = require("joi");

const createTicketSchema =
  Joi.object({

    title: Joi.string()

      .pattern(/[a-zA-Z]/)

      .min(5)

      .max(100)

      .required()

      .messages({

        "string.pattern.base":
          "Title must contain letters"

      }),

    description: Joi.string()

      .pattern(/[a-zA-Z]/)

      .min(10)

      .max(1000)

      .required()

      .messages({

        "string.pattern.base":
          "Description must contain meaningful text"

      }),

    priority: Joi.string()

      .valid("Low", "Medium", "High")

      .required()

  });

module.exports = {
  createTicketSchema
};