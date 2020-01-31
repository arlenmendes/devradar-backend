const axios = require('axios');
const Developer = require('../models/Developer');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(req, res) {
    const developers = await Developer.find();
    return res.json(developers);
  },

  async store(req, res) {
    const { githubUsername, techs, longitude, latitude } = req.body;

    let developer = await Developer.findOne({ githubUsername });

    if (!developer) {
      const response = await axios.get(
        `https://api.github.com/users/${githubUsername}`
      );

      const { name = login, avatar_url: avatarUrl, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      developer = await Developer.create({
        githubUsername,
        name,
        avatarUrl,
        bio,
        techs: techsArray,
        location
      });

      const socketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(socketMessageTo, 'new-developer', developer);
    }

    return res.json(developer);
  }
};
