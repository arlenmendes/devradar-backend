require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();

const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(
  `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASSWORD}@${process.env.MONGOOSE_HOST}/${process.env.MONGOOSE_COLECTION}?retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

app.use(cors());
app.use(express.json());

app.use(routes);

server.listen(PORT, HOST);
