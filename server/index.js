// Hayes Meekins

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
}));

app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({ message: "FilmShelf API is running!" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});