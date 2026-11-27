// Hayes Meekins

const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const path = require("path");
const User = require("../models/User");

async function register(req, res, next) {
    try {
        const { username, email, password } = req.body;

        if (
            typeof username !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Username, email, and password are required"
            });
        }

        if (username.trim().length < 4) {
            return res.status(400).json({
                message: "Username must be at least 4 characters"
            });
        }

        if (!email.trim() || password.length < 8) {
            return res.status(400).json({
                message: "Enter an email and a password of at least 8 characters"
            });
        }

        const existingUser = await User.findOne({
            $or: [
                { username: username.trim().toLowerCase() },
                { email: email.trim().toLowerCase() }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username or email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { identifier, password } = req.body;

        if (
            typeof identifier !== "string" ||
            typeof password !== "string" ||
            !identifier.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Username or email and password are required"
            });
        }

        const loginIdentifier = identifier.trim().toLowerCase();

        const user = await User.findOne({
            $or: [
                { username: loginIdentifier },
                { email: loginIdentifier }
            ]
        });

        const validPassword = user
            ? await bcrypt.compare(password, user.password)
            : false;

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid username/email or password"
            });
        }

        req.session.regenerate((error) => {
            if (error) return next(error);

            req.session.userId = user._id;

            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture
            });
        });
    } catch (error) {
        next(error);
    }
}

async function me(req, res, next) {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        const user = await User.findById(req.session.userId)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        next(error);
    }
}

function logout(req, res, next) {
    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }

        res.clearCookie("connect.sid");
        res.sendStatus(204);
    });
}

async function deleteProfilePicture(filename) {
    if (!filename) {
        return;
    }

    try {
        await fs.unlink(path.join("uploads", filename));
    } catch (error) {
        if (error.code !== "ENOENT") {
            console.error("Error deleting profile picture:", error);
        }
    }
}

async function uploadProfilePicture(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "Please upload a JPEG, PNG, or WebP image."
            });
        }

        const user = await User.findById(req.session.userId);

        if (!user) {
            await deleteProfilePicture(req.file.filename);

            return res.status(404).json({
                error: "User not found."
            });
        }

        const oldProfilePicture = user.profilePicture;

        user.profilePicture = req.file.filename;

        await user.save();

        await deleteProfilePicture(oldProfilePicture);

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        next(error);
    }
}

async function changePassword(req, res, next) {
    try {
        const { currentPassword, newPassword } = req.body;

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (typeof currentPassword !== "string" || !currentPassword) {
            return res.status(400).json({
                message: "Current password is required"
            });
        }

        if (
            typeof newPassword !== "string" ||
            !passwordPattern.test(newPassword) ||
            Buffer.byteLength(newPassword, "utf8") > 72
        ) {
            return res.status(400).json({
                message: "New password does not meet requirements"
            });
        }

        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }

        if (await bcrypt.compare(newPassword, user.password)) {
            return res.status(400).json({
                message: "New password must be different"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({
            message: "Password changed successfully"
        });
    } catch (error) {
        next(error);
    }
}

async function deleteAccount(req, res, next) {
    try {
        const { username, password } = req.body;

        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (username.trim().toLowerCase() !== user.username) {
            return res.status(400).json({
                message: "Username does not match"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Password is incorrect"
            });
        }

        await User.findByIdAndDelete(user._id);

        await deleteProfilePicture(user.profilePicture);

        req.session.destroy((error) => {
            if (error) {
                return next(error);
            }

            res.clearCookie("connect.sid");
            res.status(204).end();
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    me,
    logout,
    uploadProfilePicture,
    changePassword,
    deleteAccount
};