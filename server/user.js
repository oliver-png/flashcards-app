const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },

  answer: {
    type: String,
    required: true
  }
});

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cards: [cardSchema],
  dateCreated: String,
  description: String
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  decks: [deckSchema]
});

module.exports = mongoose.model("User", userSchema);