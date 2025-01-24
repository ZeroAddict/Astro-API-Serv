const express = require('express');
const AstronomyPost = require('../models/astronomyPost');

const router = express.Router();

// Create a new astronomy post
router.post('/', async (req, res) => {
  try {
    const { title, content, category, imageUrl, source } = req.body;

    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPost = new AstronomyPost({ title, content, category, imageUrl, source });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost); // Successful creation client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all astronomy posts (optional: with pagination and filtering)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, filter } = req.query; // Allow pagination and filtering

    let query = {};
    if (filter) {
      try {
        query = JSON.parse(filter); // Parse filter string if valid JSON
      } catch (error) {
        return res.status(400).json({ error: 'Invalid filter format' });
      }
    }

    const posts = await AstronomyPost.find(query)
      .skip((page - 1) * limit) // Skip for pagination
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by creation date (descending)

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an astronomy post by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, category, imageUrl, source } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing post ID' });
  }

  const updates = { title, content, category, imageUrl, source };

  try {
    const updatedPost = await AstronomyPost.findByIdAndUpdate(id, updates, { new: true }); // Return updated document
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an astronomy post by ID 
// (DELETE /astronomyPosts/:id)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Missing post ID' });
  }

  try {
    const deletedPost = await AstronomyPost.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;