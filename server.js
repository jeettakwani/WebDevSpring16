var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var mongoose = require('mongoose');
var app = express();
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');


//var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1:27017/webDevSp16';

var connectionString = 'mongodb://127.0.0.1:27017/webDevSp16';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string =
        process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

multer();
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require('./public/app.js')(app, db, mongoose);
app.listen(port, ipaddress);