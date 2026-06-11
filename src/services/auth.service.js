const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};