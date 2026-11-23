// Hayes Meekins

const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const {
    register,
    login,
    me,
    logout,
    uploadProfilePicture
} = require("../controllers/authController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        cb(null, `${crypto.randomUUID()}${extension}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

router.post("/register", register);
router.post("/login", login);
router.get("/me", me);
router.post("/logout", logout);

router.post(
    "/profile-picture",
    requireAuth,
    upload.single("image"),
    uploadProfilePicture
);

module.exports = router;