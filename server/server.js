//server/server.js
var express = require('express');
var router = require('./routes/routes.js');
var userRouter = require('./routes/userRoutes.js');
var reservationRouter = require('./routes/reservationRoutes.js');
var serviceRouter = require('./routes/serviceRoutes');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client/')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
mongoose.connect('mongodb://naturalspa:naturalspa@ds241039.mlab.com:41039/naturalspa');
app.use('/', router);
app.use('/user', userRouter);
app.use('/reservation', reservationRouter);
app.use('/service', serviceRouter);
module.exports=app;
