const express = require("express");
const { createRecipe, getRecipes, getMyRecipes, getRecipeById, updateRecipe, deleteRecipe } = require("../controller/recipesController");
const auth = require("../middlewares/auth");
const router = express.Router();


router.post("/create", auth, createRecipe);
router.get("/get", getRecipes);
router.get("/my-recipes", auth, getMyRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);
module.exports = router;