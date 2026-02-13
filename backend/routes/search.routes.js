import express from "express";
import { recipeDetail, recommendRecipes} from "../controllers/search.controller.js";

const router = express.Router();

router.post("/generate", recommendRecipes)
router.get("/recipe/:name", recipeDetail)

export default router;
