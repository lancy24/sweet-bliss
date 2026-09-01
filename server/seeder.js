const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [

  // ─── CAKES ───────────────────────────────────
  {
    name: "Red Velvet Cake",
    description: "Classic red velvet with cream cheese frosting",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 599 }, { weight: "1kg", price: 999 }],
  },
  {
    name: "Chocolate Cake",
    description: "Rich dark chocolate cake",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 499 }, { weight: "1kg", price: 899 }],
  },
  {
    name: "Choco Lava Cake",
    description: "Warm chocolate cake with molten lava center",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "150gm", price: 49 }],
  },
  {
    name: "Butterscotch Cake",
    description: "Creamy butterscotch flavored cake",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 399 }, { weight: "1kg", price: 749 }],
  },
  {
    name: "Fruit Cake",
    description: "Fresh seasonal fruits with light cream",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 549 }, { weight: "1kg", price: 999 }],
  },
  {
    name: "Strawberry Cake",
    description: "Fresh strawberry cake with whipped cream",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 649 }, { weight: "1kg", price: 1099}],
  },
  {
    name: "Chocolate Truffle Cake",
    description: "Decadent chocolate truffle layers",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 799 }, { weight: "1kg", price: 1399 }],
  },
  {
    name: "Wedding Cake",
    description: "Elegant multi-tier wedding cake",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "8kg", price: 19999 }],
  },
  {
    name: "Vanilla Cake",
    description: "Classic soft vanilla sponge cake",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 349 }, { weight: "1kg", price: 699 }],
  },
  {
    name: "Blueberry Cake",
    description: "Fresh blueberry cake with cream",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 649 }, { weight: "1kg", price: 1199 }],
  },

  // ─── CHEESECAKES ─────────────────────────────
  {
    name: "Japanese Cheesecake",
    description: "Light and fluffy Japanese style cheesecake",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 599 }, { weight: "1kg", price: 999 }],
  },
  {
    name: "Baklava Cheesecake",
    description: "Fusion of baklava and creamy cheesecake",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 699 }, { weight: "1kg", price: 1199 }],
  },
  {
    name: "Mango Cheesecake",
    description: "Tropical mango flavored cheesecake",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 799 }, { weight: "1kg", price: 1299 }],
  },
  {
    name: "Biscoff Cheesecake",
    description: "Creamy cheesecake with lotus biscoff base",
    category: "cake", inStock: true, image: "",
    sizes: [{ weight: "500gm", price: 750 }, { weight: "1kg", price: 1399 }],
  },

  // ─── PASTRIES ────────────────────────────────
  {
    name: "Choco Pastry",
    description: "Rich chocolate pastry slice",
    category: "pastry", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 60 }],
  },
  {
    name: "Pineapple Pastry",
    description: "Fresh pineapple cream pastry",
    category: "pastry", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 40 }],
  },
  {
    name: "Puff Pastry",
    description: "Flaky puff pastry with strawberry",
    category: "pastry", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 60 }],
  },
  {
    name: "Croissants",
    description: "Buttery flaky almond croissants",
    category: "pastry", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 90 }],
  },
  {
    name: "Black Forest Pastry",
    description: "Classic black forest pastry slice",
    category: "pastry", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 40 }],
  },
  {
    name: "Truffle Pastry",
    description: "Rich chocolate truffle pastry",
    category: "pastry", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 100 }],
  },
  {
    name: "Mango Pastry",
    description: "Fresh mango cream pastry",
    category: "pastry", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 30 }],
  },
  {
    name: "Rasmalai Pastry",
    description: "Indian fusion rasmalai pastry",
    category: "pastry", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 100 }],
  },

  // ─── CUPCAKES ────────────────────────────────
  {
    name: "Oreo Cupcake",
    description: "Chocolate cupcake with oreo frosting",
    category: "cupcake", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 60 }],
  },
  {
    name: "Peanut Butter Cupcake",
    description: "Rich peanut butter frosted cupcake",
    category: "cupcake", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 70 }],
  },
  {
    name: "Nutella Cupcake",
    description: "Chocolate cupcake with nutella frosting",
    category: "cupcake", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 80 }],
  },
  {
    name: "Pista Cupcake",
    description: "Pistachio flavored cupcake with green frosting",
    category: "cupcake", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 75 }],
  },
  {
    name: "Tiramisu Cupcake",
    description: "Coffee flavored tiramisu cupcake",
    category: "cupcake", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 90 }],
  },
  {
    name: "Muffins",
    description: "Soft chocolate chip muffins",
    category: "cupcake", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 50 }],
  },

  // ─── DONUTS ──────────────────────────────────
  {
    name: "Glazed Donut",
    description: "Classic glazed donut",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 50 }],
  },
  {
    name: "Jelly Filled Donut",
    description: "Soft donut filled with strawberry jelly",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 60 }],
  },
  {
    name: "Boston Cream Donut",
    description: "Chocolate glazed donut with cream filling",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 70 }],
  },
  {
    name: "Bagels",
    description: "Sesame seed bagels",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 55 }],
  },

  // ─── COOKIES ─────────────────────────────────
  {
    name: "Choco Chip Cookies",
    description: "Classic chocolate chip cookies",
    category: "cookie", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 80 }],
  },
  {
    name: "Naankhatai",
    description: "Traditional Indian shortbread cookies",
    category: "cookie", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 70 }],
  },
  {
    name: "Butter Cookies",
    description: "Melt in mouth butter cookies",
    category: "cookie", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 60 }],
  },
  {
    name: "Almond Cookies",
    description: "Crunchy almond topped cookies",
    category: "cookie", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 90 }],
  },
  {
    name: "Hazelnut Cookies",
    description: "Rich hazelnut chocolate cookies",
    category: "cookie", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 100 }],
  },
  {
    name: "Coconut Cookies",
    description: "Soft coconut flavored cookies",
    category: "cookie", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 85 }],
  },

  // ─── BROWNIES ────────────────────────────────
  {
    name: "Caramel Brownie",
    description: "Fudgy brownie with caramel swirl",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 140 }],
  },
  {
    name: "Cheesecake Brownie",
    description: "Brownie with cream cheese swirl",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 110 }],
  },
  {
    name: "Chocolate Brownie",
    description: "Classic rich chocolate brownie",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 100 }],
  },
  {
    name: "Millionaire Brownie",
    description: "Layered caramel and chocolate brownie",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 50 }],
  },
  {
    name: "Walnut Brownie",
    description: "Fudgy brownie loaded with walnuts",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 95 }],
  },
  {
    name: "White Chocolate Chips Brownie",
    description: "Dark brownie with white chocolate chips",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "per piece", price: 100 }],
  },

  // ─── COMBOS ──────────────────────────────────
  {
    name: "Brownie with Lava Cake",
    description: "Combo of fudgy brownie and molten lava cake",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "combo", price: 150 }],
  },
  {
    name: "Coffee with Croissant",
    description: "Hot coffee paired with a buttery croissant",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "combo", price: 210 }],
  },
  {
    name: "Cookies with Milkshake",
    description: "Assorted cookies with a thick milkshake",
    category: "other", inStock: true, image: "",
    sizes: [{ weight: "combo", price: 100 }],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    await Product.deleteMany({});
    console.log("Old products cleared");
    await Product.insertMany(products);
    console.log(`${products.length} products added successfully!`);
    mongoose.connection.close();
    console.log("Done! Database seeded.");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();