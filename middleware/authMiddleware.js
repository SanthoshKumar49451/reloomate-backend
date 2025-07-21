import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated - token missing',
      });
    }


    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Attach user id to the request object
    req.user = decoded.id;

    next(); // proceed to the next middleware/route
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

export default authMiddleware;
