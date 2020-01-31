const socketio = require('socket.io');

const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDiscante = require('./utils/calculateDistance');
// TODO: colocar a lista de connections no REDIS
const connections = [];

let io;

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: { latitude: Number(latitude), longitude: Number(longitude) },
      techs: parseStringAsArray(techs)
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDiscante(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(tech => techs.includes(tech))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
