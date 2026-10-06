import { Router } from "express";
import { createMovie } from "../controller/movieController.js";

const router = Router();

router.post("/createMovie", createMovie);

router.get("", (req, res) => {
  res.status(200).json({ message: "Auth API called" });
  console.log("Auth API called");
});

export default router;
