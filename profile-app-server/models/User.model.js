const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    campus: { type: String,
      required: true,
      enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin",
            "Amsterdam", "México", "Sao Paulo", "Lisbon", "Remote"]
    },

    course: { type: String,
      required: true,
      enum: ["Web Dev", "UX/UI", "Data Analytics","Cyber Security"]
    },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
