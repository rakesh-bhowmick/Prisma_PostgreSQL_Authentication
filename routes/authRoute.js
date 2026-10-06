import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
} from "../controller/auth/authController.js";
import { createMovie } from "../controller/movieController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

// router.post("/createMovie", createMovie);

router.get("", (req, res) => {
  res.status(200).json({ message: "Auth API called" });
  console.log("Auth API called");
});

export default router;
