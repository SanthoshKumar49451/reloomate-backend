import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

// Generate JWT token
const generateToken = (id) => {
  console.log(process.env.JWT_SECRETKEY)
  return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
    expiresIn: '7d',
  });
};

// REGISTER CONTROLLER
const register = async (req, res) => {
  try {
    // Validate body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is missing',
      });
    }

    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists. Please login.',
      });
    }

    // Password strength check
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

// LOGIN CONTROLLER
const login = async (req, res) => {
  try {
    // Validate body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is missing',
      });
    }

    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found ,Please Register',
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

//PROFILE
const profile = async (req, res) => {
  try {
    // req.user is set in authMiddleware after verifying the token
    const user = await User.findById(req.user).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    const {name,email}=user

    return res.status(200).json({
      success: true,
      message: 'User profile fetched successfully',
      name,
      email
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message,
    });
  }
};
//ONBOARDING ARRAY
const getOnboardingContent = async (req, res) => {
  try {
    const onboardingSteps = [
      {
        title: "Create Your Profile",
        description: "Tell us about yourself to help match you with roommates.",
        imageUrl: "imageUrl"
      },
      {
        title: "Find the Right Match",
        description: "Browse through potential roommates based on your preferences.",
        imageUrl: "imageUrl"
      },
      {
        title: "Start Chatting",
        description: "Connect and communicate with your selected roommate.",
        imageUrl: "imageUrl"
      }
    ];

    return res.status(200).json({
      success: true,
      message: "Onboarding content fetched successfully",
      data: onboardingSteps
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch onboarding content",
      error: error.message
    });
  }
};





export  {
  register,
  login,
  profile,
  getOnboardingContent
};
