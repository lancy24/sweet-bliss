const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["cake", "cupcake", "cookie", "pastry", "bread", "other"],
      default: "cake",
    },

    // ── Weight-based pricing ──────────────────
    sizes: [
      {
        weight: { type: String, required: true }, // "500g", "1kg", "2kg"
        price:  { type: Number, required: true },  // ₹450, ₹850, ₹1600
      },
    ],

    // ── Stock ─────────────────────────────────
    inStock: {
      type: Boolean,
      default: true,
    },

    // ── Reviews ───────────────────────────────
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);