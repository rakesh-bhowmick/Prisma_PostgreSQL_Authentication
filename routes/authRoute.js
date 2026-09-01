import { Router } from "express";

const router = Router();

router.get("", (req, res) => {
  res.status(200).json({ message: "Auth API called" });
  console.log("Auth API called");
});

export default router;
