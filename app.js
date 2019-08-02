const auth = require('./middleware/auth');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Read environment variables from the .env file
dotenv.config();

// Initialize mongodb connection
mongoose.connect(process.env.MONGO_DB_ADDRESS, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Middleware
app.use(bodyParser.json());

// Initialize auth routes
app.use('/auth', require('./controllers/auth.controller'));

// Authentication middleware
app.use(auth);

// Initialize api routes
app.use('/api/users', require('./controllers/user.controller'));

// Error handling middleware
app.use(function(err, req, res, next) {
   res.status(422).send({
       error: err.message
   });
});

// Initialize fallback route
app.use('*', function (req, res) {
    res.status(404).json({
        'error': 'Unavailable URL'
    });
});

module.exports = app.listen(process.env.PORT);