import { Router } from "express";
import authRoute from "../routes/authRoute.js";

const router = Router();

router.use("/api/auth", authRoute);

export default router;
