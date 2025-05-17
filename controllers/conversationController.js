const Conversation = require('../models/Conversation');

// @desc    Get all conversations for the user
// @route   GET /api/conversations
// @access  Private
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ user: req.user.id })
      .sort({ date: -1 }) // Most recent first
      .select('title date keyInsights'); // Only return essential data for listing
    
    res.json(conversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new conversation
// @route   POST /api/conversations
// @access  Private
exports.createConversation = async (req, res) => {
  try {
    const {
      title,
      transcript,
      sentimentTrajectory,
      topicDistribution,
      painPoints,
      budgetEstimation,
      keyInsights,
      audioUrl,
      tags
    } = req.body;
    
    // Create new conversation
    const newConversation = new Conversation({
      user: req.user.id,
      title,
      transcript,
      sentimentTrajectory,
      topicDistribution,
      painPoints,
      budgetEstimation,
      keyInsights,
      audioUrl,
      tags
    });
    
    // Save to database
    const conversation = await newConversation.save();
    
    res.json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a specific conversation
// @route   GET /api/conversations/:id
// @access  Private
exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    
    // Check if conversation exists
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    // Check if user owns the conversation
    if (conversation.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    res.json(conversation);
  } catch (err) {
    console.error(err.message);
    
    // Handle invalid ObjectId format
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a conversation
// @route   PUT /api/conversations/:id
// @access  Private
exports.updateConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    
    // Check if conversation exists
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    // Check if user owns the conversation
    if (conversation.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    // Update fields based on what's provided in request body
    const updateFields = {};
    
    // Only update fields that are provided
    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.transcript) updateFields.transcript = req.body.transcript;
    if (req.body.sentimentTrajectory) updateFields.sentimentTrajectory = req.body.sentimentTrajectory;
    if (req.body.topicDistribution) updateFields.topicDistribution = req.body.topicDistribution;
    if (req.body.painPoints) updateFields.painPoints = req.body.painPoints;
    if (req.body.budgetEstimation) updateFields.budgetEstimation = req.body.budgetEstimation;
    if (req.body.keyInsights) updateFields.keyInsights = req.body.keyInsights;
    if (req.body.audioUrl) updateFields.audioUrl = req.body.audioUrl;
    if (req.body.tags) updateFields.tags = req.body.tags;
    
    // Update the conversation
    const updatedConversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    
    res.json(updatedConversation);
  } catch (err) {
    console.error(err.message);
    
    // Handle invalid ObjectId format
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a conversation
// @route   DELETE /api/conversations/:id
// @access  Private
exports.deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    
    // Check if conversation exists
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    // Check if user owns the conversation
    if (conversation.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    // Remove conversation
    await conversation.remove();
    
    res.json({ message: 'Conversation removed' });
  } catch (err) {
    console.error(err.message);
    
    // Handle invalid ObjectId format
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};
