const mongoose = require('mongoose');

const PointSchema = require('./utils/PointSchema');

const DeveloperSchema = new mongoose.Schema({
  name: String,
  githubUsername: String,
  git: String,
  avatarUrl: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  },
  bio: String
});

module.exports = mongoose.model('developer', DeveloperSchema);
