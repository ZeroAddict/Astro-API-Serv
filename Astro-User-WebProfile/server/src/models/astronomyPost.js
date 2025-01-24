const mongoose = require('mongoose');

const astronomyPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  source: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model('AstronomyPost', astronomyPostSchema);

module.exports = { astronomyPostSchema };