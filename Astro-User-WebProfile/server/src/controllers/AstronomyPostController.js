const AstronomyPost = mongoose.model('AstronomyPost', AstronomyPostSchema);

// Improved error handlings
exports.create = async (req, res) => {
  try {
    const { title, content, category, imageUrl, source } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Missing required field: title' });
    }
    if (!content) {
      return res.status(400).json({ error: 'Missing required field: content' });
    }
    if (!category) {
      return res.status(400).json({ error: 'Missing required field: category' });
    }

    // Create a new astronomy post
    const newPost = new AstronomyPost({ title, content, category, imageUrl, source });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost); // Use 201 Created for successful creation
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' }); // Generic error for unexpected issues
  }
};

// Pagination
exports.getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, filter } = req.query; // Allow pagination and filtering

    // Build query based on filter parameters (if provided)
    const query = {};
    if (filter) {
      try {
        query = JSON.parse(filter); // Parse filter string if valid JSON
      } catch (error) {
        return res.status(400).json({ error: 'Invalid filter format' });
      }
    }

    // Find posts with pagination
    const posts = await AstronomyPost.find(query)
      .skip((page - 1) * limit) // Skip for pagination
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by creation date (descending)

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Improved validation and error handling
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, imageUrl, source } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing post ID' });
  }

  const updates = { title, content, category, imageUrl, source };

  try {
    const updatedPost = await AstronomyPost.findByIdAndUpdate(id, updates, { new: true }); // Get updated document

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error(error);

    // Handling specific validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({ error: 'Validation errors', validationErrors });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Improved error handling
exports.deletePost = async (req, res) => {
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
     res.status(500).json({ error: 'Error occured deleting astronomy post' });
  }

};