const Recipe = require("../models/recipes.model");

const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, price, imageUrl } = req.body;
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      price,
      imageUrl,
      userId: req.user.userId,
    });
    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ message: "Recipes fetched successfully", recipes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.userId });
    res.status(200).json({ message: "User recipes fetched successfully", recipes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe fetched successfully", recipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, price, imageUrl } = req.body;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Verify ownership
    if (recipe.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized - You can only update your own recipes" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, description, ingredients, price, imageUrl },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Verify ownership
    if (recipe.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized - You can only delete your own recipes" });
    }

    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createRecipe, getRecipes, getMyRecipes, getRecipeById, updateRecipe, deleteRecipe };
