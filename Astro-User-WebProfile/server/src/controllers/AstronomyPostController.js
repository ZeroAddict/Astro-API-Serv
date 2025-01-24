const AstronomyPost = mongoose.model('AstronomyPost', astronomyPostSchema);

exports.create = async (req, res) => {
  const { title, content, category, imageUrl, source } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newPost = new AstronomyPost({ title, content, category, imageUrl, source });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating astronomy post' });
  }
};