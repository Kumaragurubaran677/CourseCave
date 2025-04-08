require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'Kishore@555';

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

  app.use(cors()); // Allow all origins for now
app.use(bodyParser.json());

// Define User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 }
});
const User = mongoose.model('User', UserSchema);

// Signup Route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "Signup successful" });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, user: { email: user.email } });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

//admin route
const Admin = require('./models/Admin'); // Adjust path as needed

app.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: admin.email }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Admin login successful", token, name: admin.name });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});



// Middleware to Protect Pages
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = user;
        next();
    });
};

// Protected Route
app.get('/protected', authenticate, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to CourseCave API!");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


// Dashboard
const fs = require('fs');
const path = require('path');

// Route to update courses.html
app.post('/update-courses', (req, res) => {
    const { category, courseHTML } = req.body;

    if (!category || !courseHTML) {
        return res.status(400).send("Category and Course HTML are required.");
    }

    const filePath = path.join(__dirname, 'courses.html'); // adjust if needed

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading courses.html:", err);
            return res.status(500).send("Failed to read courses.html.");
        }

        // Regex to match the correct section by data-category
        const sectionRegex = new RegExp(`<section[^>]*data-category="${category}"[^>]*>([\\s\\S]*?)</section>`, 'i');
        const match = data.match(sectionRegex);

        if (!match) {
            return res.status(404).send(`Section for category "${category}" not found.`);
        }

        const updatedSection = match[0].replace('</section>', `\n${courseHTML}\n</section>`);
        const updatedHtml = data.replace(sectionRegex, updatedSection);

        fs.writeFile(filePath, updatedHtml, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error("Error writing to courses.html:", writeErr);
                return res.status(500).send("Failed to update courses.html.");
            }

            res.send("✅ Course added successfully!");
        });
    });
});
