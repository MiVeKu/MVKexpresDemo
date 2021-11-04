const dotenv = require('dotenv');
dotenv.config();
// requiring enviromental parameters'
const connection = require('./db');
// requiring database connection
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const cors = require('cors');
// requiring basic modules for application.

var imageRouter = require('./routes/fileRoutes');
const app = express();
connection();
// requiring routes, initilising express server and database connection


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(cors());
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
// intialising modules for use in application

app.use('/', imageRouter);
// intialising routes for use in application

module.exports = app;
// exporting functionality