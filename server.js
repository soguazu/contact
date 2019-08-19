require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug');
const path = require('path');

const log = debug('http:server');

const config = require('./config');

const contactRouter = require('./routes/contact.router');

// defining the Express app
const app = express();

app.use(helmet());

app.use(cors());

app.use(morgan('combined'));

app.use(express.json());

app.use('/api/v1/contacts', contactRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/contact', { useNewUrlParser: true, useCreateIndex: true }).then(() => log('Database connected successfully'));

app.listen(PORT, () => {
  log(
    `Server listening on port ${
      PORT
    } and running in ${config.envName} environment`,
  );
});
