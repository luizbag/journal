'use strict';
var express = require('express');
var auth = require('../auth');

let createBaseRouter = function(controller, options) {
    let router = express.Router();

    if (options) {
        router.mergeParams = options.mergeParams;
    }

    let isAccessBlocked = function(req, res, next) {
        let authenticate = auth.authenticate();
        if (options !== undefined && options.block !== undefined) {
            if (Array.isArray(options.block)) {
                if (options.block.indexOf(req.method.toLowerCase()) >= 0) {
                    authenticate(req, res, next);
                } else {
                    next();
                }
            } else if (options.block === 'all') {
                authenticate(req, res, next);
            } else if (options.block === 'none') {
                next();
            }
        } else {
            next();
        }
    };

    router.get('/', isAccessBlocked, function(req, res, next) {
        controller.list().then(function(items) {
            res.json(items);
        }, function(err) {
            next(err);
        });
    });

    router.get('/:id', isAccessBlocked, function(req, res, next) {
        controller.get(req.params.id).then(function(item) {
            res.json(item);
        }, function(err) {
            next(err);
        });
    });

    router.post('/', isAccessBlocked, function(req, res, next) {
        controller.create(req.body).then(function(item) {
            res.json(item);
        }, function(err) {
            console.log(err);
            next(err);
        });
    });

    router.put('/:id', isAccessBlocked, function(req, res, next) {
        controller.update(req.params.id, req.body).then(function(item) {
            res.json(item);
        }, function(err) {
            next(err);
        });
    });

    router.delete('/:id', isAccessBlocked, function(req, res, next) {
        controller.delete(req.params.id).then(function(item) {
            res.json(item);
        }, function(err) {
            next(err);
        });
    });

    return router;
};

module.exports = createBaseRouter;
