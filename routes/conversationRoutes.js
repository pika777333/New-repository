const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth);

// @route   GET api/conversations
// @desc    Get all conversations for the user
// @access  Private
router.get('/', conversationController.getConversations);

// @route   POST api/conversations
// @desc    Create a new conversation
// @access  Private
router.post('/', conversationController.createConversation);

// @route   GET api/conversations/:id
// @desc    Get a specific conversation
// @access  Private
router.get('/:id', conversationController.getConversation);

// @route   PUT api/conversations/:id
// @desc    Update a conversation
// @access  Private
router.put('/:id', conversationController.updateConversation);

// @route   DELETE api/conversations/:id
// @desc    Delete a conversation
// @access  Private
router.delete('/:id', conversationController.deleteConversation);

module.exports = router;
