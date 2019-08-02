const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.contentType('application/json');

    User.find({ })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get('/:userId', function(req, res)  {
    res.contentType('application/json');

    User.findOne({ _id: req.params.userId })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.put('/:userId', function(req, res) {
    res.contentType('application/json');

    const userId = req.params.userId;

    User.findByIdAndUpdate({ _id: userId }, req.body)
        .then(() => {
            User.findById({ _id: userId })
                .then((user) => {
                    res.status(200).send(user);
                })
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.delete('/:userId', function(req, res) {
    res.contentType('application/json');

    User.findByIdAndRemove({ _id: req.params.userId })
        .then((status) => {
            res.status(200).send(status);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
});

module.exports = router;