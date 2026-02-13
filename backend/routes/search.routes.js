import express from "express";
import { saveSearchState } from "../controllers/search.controller.js";

const router = express.Router();

router.post("/state", saveSearchState);

export default router;
