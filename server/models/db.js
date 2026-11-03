//Hayes Meekins

const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB Atlas!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
}

module.exports = connectDB;