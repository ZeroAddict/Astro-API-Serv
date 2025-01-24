const mongoose = require('mongoose');

const astronomyPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  category: {
    type: String,
    required: true,
    enum: ['Galaxies', 'Stars', 'Planets', 'Nebulae', 'Black Holes', 'Cosmology', 'Other'] // Predefined categories
  },
  imageUrl: {
    type: String,
    trim: true,
    validate: {
      validator: (url) => {
        // Regular expression to validate image URL format (optional)
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=].*/.test(url);
      },
      message: 'Invalid image URL format'
    }
  },
  source: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const Category = mongoose.model('AstronomyPost', astronomyPostSchema);

module.exports = { astronomyPostSchema };