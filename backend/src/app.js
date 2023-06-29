require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, '../public')));

const router = require('./router');

app.use('/api', router);

module.exports = app;
