const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    contact: {
      type: String,
      required: [true, 'Contact number is required'],
      unique: true,
      match: [/^[0-9]{10}$/, 'Enter a valid 10-digit contact number']
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('users', userSchema);

module.exports = User;