const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = require('./router');

mongoose.connect('mongodb://localhost:todoList/todoList');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/v1', router);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

console.log(`Listening on`, HOST, PORT);
app.listen(PORT, HOST);