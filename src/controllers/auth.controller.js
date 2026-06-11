const authService = require("../services/auth.service");
const { generateToken } = require("../utils/jwt.helper");

// Helper to sanitize user object
const sanitizeUser = (user) => {
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

// REGISTER
const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: sanitizeUser(user),
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.loginUser(email, password);

    const token = generateToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userObj,   // ✅ clean response
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  register,
  login,
};