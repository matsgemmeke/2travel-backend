const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const express = require('express');
const router = express.Router();

// Length of the salt on hashed passwords
const saltRounds = 10;

router.post('/login', function(req, res) {
    res.contentType('application/json');

    User.findOne({ username: req.body.username })
        .then((user, err) => {
            // In case of an error
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            // In case of an unknown user
            if (!user) {
                res.status(400).json({
                    success: false,
                    message: 'Authentication failed: User not found'
                });
            }
            // In case of password not given
            const password = req.body.password;

            if (!password) {
                res.status(400).json({
                    success: false,
                    message: 'Authentication failed: Password not given'
                });
            }
            // In case of invalid credentials
            bcrypt.compare(req.body.password, user.password, function(err, res) {
                if (err) {
                    throw err;
                }
            });
            // In case of correct credentials
            res.status(200).json({
                success: true,
                token: jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
            });
        })
});

router.post('/register', function(req, res) {
    res.contentType('application/json');

    // Hash the given password before storing it in the database
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
            throw err;
        }

        const newUser = {
            username: req.body.username,
            name: req.body.name,
            password: hash,
            email: req.body.email,
            birthday: req.body.birthday
        };

        User.create(newUser)
            .then((user) => {
                res.status(200).send(user)
            })
            .catch((err) => {
                res.status(500).json(err)
            });
    });
});

module.exports = router;