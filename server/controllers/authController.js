// Hayes Meekins

const bcrypt = require("bcrypt");
const User = require("../models/User");

async function register(req, res, next) {
    try {
        const { email, password } = req.body;

        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        if (!email.trim() || password.length < 8) {
            return res.status(400).json({
                message: "Enter an email and a password of at least 8 characters"
            });
        }

        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({
            id: user._id,
            email: user.email
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        const validPassword = user
            ? await bcrypt.compare(password, user.password)
            : false;

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        req.session.regenerate((error) => {
            if (error) {
                return next(error);
            }

            req.session.userId = user._id;

            res.status(200).json({
                id: user._id,
                email: user.email
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
            email: user.email
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

module.exports = {
    register,
    login,
    me,
    logout
};