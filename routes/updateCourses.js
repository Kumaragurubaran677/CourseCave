const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Route: POST /update-courses
router.post('/', (req, res) => {
  const { category, courseHTML } = req.body;

  const filePath = path.join(__dirname, '../courses.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading courses.html:', err);
      return res.status(500).json({ message: 'Failed to read courses.html' });
    }

    // Use regex to find the right <section data-category="...">
    const sectionRegex = new RegExp(
      `<section[^>]*data-category="${category}"[^>]*>([\\s\\S]*?)<\\/section>`,
      'g'
    );

    const updatedHtml = data.replace(sectionRegex, (match) => {
      return match.replace('</section>', courseHTML + '\n</section>');
    });

    fs.writeFile(filePath, updatedHtml, (err) => {
      if (err) {
        console.error('Error writing courses.html:', err);
        return res.status(500).json({ message: 'Failed to update courses.html' });
      }

      res.json({ message: 'courses.html updated successfully' });
    });
  });
});

module.exports = router;
