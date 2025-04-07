const User = require("../models/user")
const { setUser } = require("../service/auth")


const allowedFields = ['fullName', 'email', 'password'];
const filterRequestBody = (body, allowedFields) => {
  return allowedFields.reduce((acc, field) => {
    if (body[field] !== undefined) acc[field] = body[field];
    return acc;
  }, {});
};



async function handleUserSignup(req, res) {
  try {

    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' }); 
    }

    const newUser = await User.create(filterRequestBody(req.body, allowedFields));

    return res.status(201).json({
      message: 'User created successfully!',
      user: newUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid email address or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email address or password' });
    }

    const token = setUser(user);
    return res.status(200).json({
      message: 'User logged in successfully!',
      token,
      data: user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong during login',
      error: error.message,
    });
  }
}


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(201).json({
      message: 'users fetched successfully!',
      data: users
    });
  } catch (err) {
    console.error('Error fetching users:', err);
  }
};



async function handleEditUser(req, res) {
  try {
    const updatedData = filterRequestBody(req.body, allowedFields);
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, updatedData, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
      message: 'User updated successfully!',
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
}


module.exports = {
  getAllUsers,
  handleUserSignup,
  handleUserLogin,
  handleEditUser
};