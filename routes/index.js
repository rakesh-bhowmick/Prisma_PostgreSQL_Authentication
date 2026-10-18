import { Router } from "express";
import authRoute from "../routes/authRoute.js";
import movieRoute from "../routes/movieRoute.js";
import watchListRoute from "../routes/watchListRoute.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.use("/api/auth", authRoute);

router.use("/api", movieRoute);

router.use("/api", authMiddleware, watchListRoute);

export default router;
