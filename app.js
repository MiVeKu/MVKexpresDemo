const dotenv = require('dotenv');
dotenv.config();
const connection = require('./db');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var crypto = reguire('crypto');
//var multer = require('multer');
//var GridFsStorage = require('multer-gridfs-storage')
//var Grid = require('gridfs-stream');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();
connection();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
