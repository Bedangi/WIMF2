import { getRecommendations, getRecipe } from "../services/ml.service.js";

export const recommendRecipes = async (req, res) => {
    try {
        const { pantry, maxMissing, cuisine, mealTypes } = req.body;

        const ingredients = pantry.join(",");

        let recipes = await getRecommendations(ingredients);

        if (maxMissing !== null) {
            recipes = recipes.filter(r =>
                Number(r.ExtraIngredientsCount) <= maxMissing
            );
        }

        if (cuisine) {
            recipes = recipes.filter(r =>
                r.Cuisine?.toLowerCase() === cuisine.toLowerCase()
            );
        }

        if (mealTypes && mealTypes.length > 0) {
            recipes = recipes.filter(r =>
                mealTypes.includes(r.Course)
            );
        }

        res.render("recommend", {recipes, query: pantry.join(", ")});

    } catch (error) {
        res.status(500).json({ message: "Error generating recipes" });
    }
};

export const recipeDetail = async (req, res) => {
    try {
        const recipe = await getRecipe(req.params.name);
        
        if (typeof recipe.RecipeSteps === "string"){
            recipe.RecipeSteps = JSON.parse(recipe.RecipeSteps.replace(/'/g, '"') );
        }
        res.render("dish_detail", { recipe });
    } catch (err) {
        res.status(500).send("Error fetching recipe");
    }
};

