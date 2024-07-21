const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5002;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projectdb')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "Registration successful", user: savedUser });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Define Watches Schema and Model
const watchesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const Watches = mongoose.model('Watches', watchesSchema);

app.post("/add-product", async (req, res) => {
  const { name, image, price } = req.body;

  if (!name || !image || !price) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newWatch = new Watches({ name, image, price });
    await newWatch.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).json({ message: "Error adding product: " + err.message });
  }
});

app.get("/products", async (req, res) => {
  const { category } = req.query;
  try {
    const products = await Watches.find({}); // Optionally filter by category if needed
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Update Product
app.put("/update-product/:id", async (req, res) => {
  const { id } = req.params;
  const { name, image, price } = req.body;

  if (!name || !image || !price) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const updatedProduct = await Watches.findByIdAndUpdate(id, { name, image, price }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ message: "Error updating product: " + err.message });
  }
});

// Delete Product
app.delete("/delete-product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Watches.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ message: "Error deleting product: " + err.message });
  }
});

