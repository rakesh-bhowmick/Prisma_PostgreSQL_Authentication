import { Router } from "express";
import {
  createMovie,
  getMovie,
  getSingleMovie,
  deleteSingleMovie,
} from "../controller/movieController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/createMovie", authMiddleware, createMovie);
router.get("/getMovie", authMiddleware, getMovie);
router.get("/getSingleMovie/:id", authMiddleware, getSingleMovie);
router.delete("/deleteSingleMovie/:id", authMiddleware, deleteSingleMovie);

router.get("", (req, res) => {
  res.status(200).json({ message: "Auth API called" });
  console.log("Auth API called");
});

export default router;
