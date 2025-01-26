const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  wallet: {
    type: String,
  },
  createdMemes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meme'
  },
  likedMemes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meme'
    }
  ],
  viralBets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meme'
    }
  ],
  notViralBets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meme'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;