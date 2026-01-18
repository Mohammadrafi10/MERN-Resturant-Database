const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['sweet', 'main', 'ice cream', 'dessert'],
      required: [true, "Category is required"],
      default: 'main',
    },
  },
  { timestamps: true }
);
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
