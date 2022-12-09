import { protect } from "../middleware/checkAuth";

const express = require("express");
const { fetchData, login, tomcatWelcome, register, getAllUsers } = require("../controller");

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "welcome to node!" });
});
router.get("/welcome", tomcatWelcome);
router.post("/login", login);
router.post("/register", register);
router.get("/userData", protect, fetchData);
router.get("/users", protect, getAllUsers);

export default router;
