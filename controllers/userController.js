const bcrypt = require('bcryptjs');
const USER = require('../models/user');
const jwt = require('jsonwebtoken');




const registerController = async (req, res) => {
  try {
    console.log('Request body is', req.body);
    const { name, address, city, contact, gender, email, password } = req.body;

    // Check required fields
    if (!name || !address || !city || !contact || !gender || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check whether email or contact already exists
    const existingUser = await USER.findOne({ email: email.trim().toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Convert plain password into a bcrypt hash
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new USER({ name, address, city, contact, gender, email, password: hashedPassword });

    // Save user in MongoDB
    const userData = await newUser.save();

    console.log('User registered successfully', userData);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(409).json({ message: error.message });
  }

};



const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });


    // Find user by email
    const user = await USER.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with stored bcrypt hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      message: 'Login successful!', token, user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login failed' });
  }
};



const userController = async (req, res) => {

  try {
    console.log("user controller called")
    const user = await USER.findById(req.user.id).select('-password');
    console.log("user is", user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerController, loginController, userController };