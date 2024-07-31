const { Router } = require("express");
const {
  hashingWithArgon,
  checkUserIsExist,
  postRegisterData,
} = require("../utils/register.util");
const router = Router();

router.route("/").post(async (req, res) => {
  const { email, username, password } = req.body;

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
  if (!username || username.trim() === "") {
    return res.status(400).json({
      message: "Username Anda masih kosong!",
    });
  }
  try {
    const hashedPassword = await hashingWithArgon({ password });
    await checkUserIsExist({ email });
    await postRegisterData({ username, email, password: hashedPassword });
    res.status(201).json({
      success: true,
      message: "user registered",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
