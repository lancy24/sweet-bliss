const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  saveCart,
  googleAuth,

} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.get("/me", protect, getMe);
router.put("/save-cart", protect, saveCart);

module.exports = router;