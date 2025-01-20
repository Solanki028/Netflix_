import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required.",
                success: false,
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password.",
                success: false,
            });
        }

        // Verify password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password.",
                success: false,
            });
        }

        // Generate token
        const tokenData = { id: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET || "secret", {
            expiresIn: "1h",
        });

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true,
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "An error occurred. Please try again later.",
            success: false,
        });
    }
};

export const Logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie("token", "", {
            httpOnly: true, // Ensures the cookie is not accessible via client-side scripts
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Helps prevent CSRF attacks
            expires: new Date(0), // Expire the cookie immediately
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully.",
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred. Please try again later.",
        });
    }
};

export const Register = async (req, res) => {
    try {
        // Log incoming request body
        console.log("Incoming Request Body:", req.body);

        const { fullName, email, password } = req.body;

        
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Full name, email, and password are required.",
                success: false,
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "This email is already registered.",
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Create user
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        console.log("User Created Successfully:", newUser);

        return res.status(201).json({
            message: "Account created successfully.",
            user: { fullName: newUser.fullName, email: newUser.email },
            success: true,
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            message: "An error occurred while creating the account. Please try again later.",
            success: false,
        });
    }
};
