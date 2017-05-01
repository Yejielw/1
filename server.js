// Dependencies
// -----------------------------------------------------
const express = require('express');
const mongoose = require('mongoose');
const passport = require('./app/passport');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const authRoutes = require('./app/authRoutes.js');

// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
// mongoose.connect(process.env.CONNECTION_STRING);
// app.use(passport.initialize());

//localhost:
mongoose.connect("mongodb://localhost/MeanMapApp");


// Logging and Parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use(express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes
// ------------------------------------------------------
require('./app/routes.js')(app);



app.all('[^.]+', function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
});


// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});
// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);
