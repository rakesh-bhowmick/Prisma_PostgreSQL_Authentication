import { Router } from "express";
import {
  addToWatchList,
  getWatchlistItem,
  deleteSingleWatchlistItem,
  deleteAllWatchlistItem,
} from "../controller/watchListController.js";

const router = Router();

router.post("/addToWatchList", addToWatchList);
router.get("/getWatchlistItem", getWatchlistItem);
router.delete("/deleteSingleWatchlistItem/:id", deleteSingleWatchlistItem);
router.delete("/deleteAllWatchlistItem", deleteAllWatchlistItem);

export default router;
