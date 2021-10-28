const dotenv = require('dotenv');
dotenv.config();
// requiring enviromental parameters'
//const connection = require('./db');
// requiring database connection
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
// requiring basic modules for application.

var indexRouter = require('./routes/index');
var imageRouter = require('./routes/fileRoutes');
// requiring routes
const app = express();
//connection();
// initilising express server

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// intialising modules for use in application
app.use('/', indexRouter);
app.use('/upload', imageRouter);

// intialising routes for use in application

module.exports = app;
// exporting functionality