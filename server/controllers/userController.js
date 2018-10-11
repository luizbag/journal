'use strict';
var baseController = require('./baseController');
var config = require('../config');
var User = require('../models/user');
var jwt = require('jsonwebtoken')

var userController = function() {
    var ctrl = baseController(User);

    ctrl.login = function(email, password, cb) {
        User.findOne({
            "email": email
        }, function(err, user) {
            if (err) return cb(err);
            if (user) {
                user.comparePassword(password, function(match) {
                    if (match) {
                        var token = jwt.sign({
                            id: user._id
                        }, config.jwt_secret);
                        cb(null, token);
                    } else {
                        let err = new Error('Unauthorized');
                        err.status = 401;
                        cb(err);
                    }
                });
            }
        });
    };

    return ctrl;
};

module.exports = userController;
