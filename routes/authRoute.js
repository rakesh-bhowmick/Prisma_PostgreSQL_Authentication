import { Router } from "express";
import {registerUser, loginUser} from "../controller/auth/authController.js";

const router = Router();

router.post("/register", registerUser )
router.post("/login", loginUser )

router.get("", (req, res) => {
  res.status(200).json({ message: "Auth API called" });
  console.log("Auth API called");
});

export default router;
