const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  isComplete: {
    type: String,
    required: true,
  },
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  task: [taskSchema]
 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
