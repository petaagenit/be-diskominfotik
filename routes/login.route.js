const { Router } = require("express");
const router = Router();
const {
  getJWTToken,
  checkUserIsRegistered,
  checkPassword,
} = require("../utils/login.util");
require("dotenv").config();

router.route("/").post(async (req, res) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({
      message: "Email Anda masih kosong!",
    });
  }
  if (!password || password.trim() === "") {
    return res.status(400).json({
      message: "Password Anda masih kosong!",
    });
  }

  try {
    const jwtToken = getJWTToken({ email });
    const data = await checkUserIsRegistered({ email });

    const authStatus = await checkPassword({
      password,
      passwordFromDb: data.password,
    });

    if (!authStatus)
      return res
        .status(401)
        .json({ success: false, message: "Password anda salah" });

    return res
      .cookie("access-token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully 😊 👌",
        "access-token": jwtToken,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
