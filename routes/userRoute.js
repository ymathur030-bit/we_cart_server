const express = require("express");

const router = express.Router();

const { registerController, loginController, userController } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");


router.get("/user", protect, userController);
router.post("/signup", registerController);
router.post('/login', loginController);

module.exports = router;