const User = require("./auth.model");
const bcrypt = require("bcrypt");
const generateToken = require("../../shared/utils/generateToken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;





    const user =
    await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });
    }






    const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid credentials"
      });
    }







    // generate jwt

    const token =
    generateToken(user);






    // store in cookie

    res.cookie(
      "token",
      token,
      {
        httpOnly: true,

        secure: false,

        maxAge:
        24 * 60 * 60 * 1000
      }
    );







    // IMPORTANT

    return res.redirect("/");




  } catch (error) {

    return res.status(500).json({
      message: error.message
    });
  }
};
const logout = (req,res)=>{

   res.clearCookie("token");

   res.redirect("/login");
};

module.exports = {
  signup,
  login,logout
};