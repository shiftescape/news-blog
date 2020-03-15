const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const newsRoute = require('./routes/news');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
require('dotenv').config();

const app = express();
const port = process.env.NODE_PORT || 3000;

function start() {
  return app.use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/auth', authRoute)
    .use('/news', newsRoute)
    .use('/users', userRoute)
    .use((_req, res) => res.status(200).json({ success: true, version: '1.0' }))
    .listen(port, () => console.log(`** Server ready on port ${port} **`));
}

module.exports = { start };