// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");


var compression = require('compression')
require('dotenv').config()
const mainRouter = require('./Router/mainRoute');

const app = express();
// Set up mongoose connection

let crossMid = function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    next()
}

const mongoDB = process.env.MongoDbURI;
mongoose.connect(mongoDB,{ useNewUrlParser: true ,useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors())
app.use(crossMid)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(compression())
app.use('', mainRouter);

const port = process.env.PORT;

db.once('open', function() {
    console.log('Connected!');
    app.listen(port, () => {
        console.log('Server is up and running on port numner ' + port);
    });
});