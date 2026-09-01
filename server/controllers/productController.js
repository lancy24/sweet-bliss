const Product = require("../models/Product");

// ─────────────────────────────────────────
// GET all products
// GET /api/products
// ─────────────────────────────────────────
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────
// GET single product
// GET /api/products/:id
// ─────────────────────────────────────────
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────
// CREATE product
// POST /api/products
// ─────────────────────────────────────────
const createProduct = async (req, res) => {
  try {
    const { name, description, category, inStock, sizes } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    // sizes comes as JSON string from form-data
    // e.g. '[{"weight":"500g","price":450},{"weight":"1kg","price":850}]'
   let parsedSizes = [];
if (req.body["sizes[0][weight]"]) {
  let i = 0;
  while (req.body[`sizes[${i}][weight]`]) {
    parsedSizes.push({
      weight: req.body[`sizes[${i}][weight]`],
      price: Number(req.body[`sizes[${i}][price]`]),
    });
    i++;
  }
} else if (sizes) {
  try {
    parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
  } catch (e) {
    return res.status(400).json({ message: "Invalid sizes format" });
  }
}

if (parsedSizes.length === 0) {
  return res.status(400).json({ message: "At least one size with price is required" });
}

    const image = req.file ? req.file.filename : "";

    const product = new Product({
      name,
      description,
      category,
      inStock,
      image,
      sizes: parsedSizes,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────
// UPDATE product
// PUT /api/products/:id
// ─────────────────────────────────────────
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description, category, inStock, sizes } = req.body;

    product.name        = name        ?? product.name;
    product.description = description ?? product.description;
    product.category    = category    ?? product.category;
    product.inStock     = inStock     ?? product.inStock;

    if (sizes) {
      product.sizes =
        typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    }

    if (req.file) {
      product.image = req.file.filename;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE product
// DELETE /api/products/:id
// ─────────────────────────────────────────
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────
// ADD review
// POST /api/products/:id/reviews
// ─────────────────────────────────────────
const createProductReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ message: "Name, rating and comment are required" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = { name, rating: Number(rating), comment };
    product.reviews.push(review);

    // Recalculate average rating
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};