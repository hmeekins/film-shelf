// Hayes Meekins

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./models/db");
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const tmdbRoutes = require("./routes/tmdbRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/tmdb", tmdbRoutes);

app.use("/api", (req, res) => {
    res.status(404).json({
        message: "API endpoint not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: "Duplicate entry"
        });
    }

    if (err.status) {
        return res.status(err.status).json({
            message: err.message
        });
    }

    res.status(500).json({
        message: "Internal server error"
    });
});

app.get("/api/test", (req, res) => {
    res.json({ message: "FilmShelf API is running!" });
});

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to start server:", error.message);
        process.exit(1);
    }
}

startServer();