const AstronomyPost = mongoose.model('AstronomyPost', astronomyPostSchema);

exports.create = async (req, res) => {
  const { title, content, category, imageUrl, source } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Creates a new Post
    const newPost = new AstronomyPost({ title, content, category, imageUrl, source });
    const savedPost = await newPost.save();
    res.json(savedPost);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating astronomy post' });
  }
};

// READ through different route
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await AstronomyPost.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching astronomy posts' });
  }
};

// **Update by ID
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, imageUrl, source } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing post ID' });
  }

  const updates = { title, content, category, imageUrl, source }; // Fields to update

  try {
    const updatedPost = await AstronomyPost.findByIdAndUpdate(id, updates, { new: true }); // Get the updated document
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating astronomy post' });
  }
};

// DELETES by ID
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
    res.status(500).json({ error: 'Error deleting astronomy post' });
  }
};