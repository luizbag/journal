'use strict';
var express = require('express');
var baseRouter = require('./baseRouter');
var createUserController = require('../controllers/userController');
let userController = createUserController();

var router = baseRouter(userController, {
    mergeParams: true,
    block: ['get', 'put', 'delete']
});

router.post('/login', function(req, res, next) {
    userController.login(req.body.email, req.body.password, function(err, token) {
        if (err) return next(err);
        res.json(token);
    });
});

module.exports = router;
