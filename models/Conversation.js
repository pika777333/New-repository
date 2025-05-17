const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  transcript: {
    type: Array,
    default: []
  },
  sentimentTrajectory: {
    type: Array,
    default: []
  },
  topicDistribution: {
    type: Array,
    default: []
  },
  painPoints: {
    type: Array,
    default: []
  },
  budgetEstimation: {
    type: Object,
    default: {}
  },
  keyInsights: {
    type: Array,
    default: []
  },
  audioUrl: {
    type: String
  },
  tags: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
