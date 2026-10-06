import { Router } from "express";
import authRoute from "../routes/authRoute.js";
import movieRoute from "../routes/movieRoute.js";

const router = Router();

router.use("/api/auth", authRoute);

router.use("/api", movieRoute);

export default router;
