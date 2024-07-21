const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5002;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projectdb')
  .then(() => {
    console.log("Connected to db server");
  })
  .catch((err) => {
    console.error("Unable to connect with server: " + err);
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
app.use(express.static(path.join(__dirname, 'public'))); // Update this path

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Update this path
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received data:", req.body);

  try {
    // Check if user already exists by name or email
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password
    });

    // Save user to database
    const savedUser = await newUser.save();
    console.log("User registered successfully:", savedUser);
    res.status(201).json({ message: "Registration successfully completed", user: savedUser });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});
