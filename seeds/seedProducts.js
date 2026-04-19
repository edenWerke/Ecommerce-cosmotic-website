const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("../models/Product");

const products = [
  {
    name: "Rose Hydration Serum",
    price: 38,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80",
    description: "Deep hydration serum with rose water and hyaluronic acid for soft, plump skin.",
  },
  {
    name: "Rose Quartz Face Roller",
    price: 22,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
    description: "Cooling roller to massage skin and help reduce morning puffiness.",
  },
  {
    name: "Mini Eyeshadow Quad",
    price: 27,
    image: "https://images.unsplash.com/photo-1570172619644-d06303a4de37?auto=format&fit=crop&w=900&q=80",
    description: "Four blendable shades for soft daytime looks or smoky evening eyes.",
  },
  {
    name: "Blush Bloom Palette",
    price: 32,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    description: "Multi-tone blush palette that blends smoothly for all-day color.",
  },
  {
    name: "Luminous Highlighter Duo",
    price: 29,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    description: "Two highlighter shades for soft glow or full glam shine.",
  },
  {
    name: "Botanical Cleansing Foam",
    price: 24,
    image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=900&q=80",
    description: "Gentle botanical cleanser that removes makeup without dryness.",
  },
  {
    name: "Vitamin C Day Cream",
    price: 34,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    description: "Brightening day cream with vitamin C and antioxidant support.",
  },
  {
    name: "Overnight Repair Mask",
    price: 36,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=900&q=80",
    description: "Night repair mask that restores moisture and smooth texture by morning.",
  },
  {
    name: "Brow Sculpt Gel",
    price: 18,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
    description: "Flexible hold gel that shapes and defines brows with a clean finish.",
  },
  {
    name: "Glossy Tint Balm",
    price: 21,
    image: "https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&w=900&q=80",
    description: "Hydrating lip balm tint with glossy shine and buildable color.",
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log(`Seed complete: ${products.length} products inserted.`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

seedProducts();
