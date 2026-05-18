const express = require("express");

const {login,signup} = require("./auth.controller");
const validate = require("../../middlewares/validateMiddleware");
const {
  signupSchema,
  loginSchema} = require("./auth.validation");
  const controller =
require("./auth.controller");

const router = express.Router();

router.post('/signup',validate(signupSchema),signup);
router.post(
  '/login',
  validate(loginSchema),
  login
);
router.get(
   "/logout",
   controller.logout
);
module.exports = router