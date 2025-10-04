const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

// GET books from JSON file
app.get("/api/books", (req, res) => {
  fs.readFile("adventureBooks.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read books data" });
    }
    const books = JSON.parse(data);
    res.json(books);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
