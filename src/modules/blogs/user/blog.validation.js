const Joi = require("joi");

const BlogSchema = Joi.object({

   title:Joi.string()

      .min(5)

      .max(100)

      .required()

      .messages({

         "string.empty":
         "Title is required",

         "string.min":
         "Title must be at least 5 characters"

      }),



   description:Joi.string()

      .min(10)

      .max(1000)

      .required()

      .messages({

         "string.empty":
         "Description is required",

         "string.min":
         "Description must be at least 10 characters"

      })

});


module.exports = {
   BlogSchema
};