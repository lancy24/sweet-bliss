const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");

// GET all | POST create
router
  .route("/")
  .get(getProducts)
  .post(upload.single("image"), createProduct);

// GET one | PUT update | DELETE
router
  .route("/:id")
  .get(getProductById)
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct);

// POST review
router.route("/:id/reviews").post(createProductReview);

module.exports = router;
