const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); // Import admin model

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) return res.status(400).json({ message: "Admin not found" });

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id }, "your-secret-key", { expiresIn: "1h" });

        res.json({ success: true, token, name: admin.name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
