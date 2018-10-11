'use strict';
var passport = require('passport');
var passportJwt = require('passport-jwt');
var createUserController = require('./controllers/userController');
var config = require('./config');
var ExtractJwt = passportJwt.ExtractJwt;
var Strategy = passportJwt.Strategy;

var params = {
    secretOrKey: config.jwt_secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

var strategy = new Strategy(params, function(payload, done) {
    var userCtrl = createUserController();
    userCtrl.get(payload.id).then(function(user) {
        return done(null, user);
    }, function(err) {
        return done(err, false);
    });
});

passport.use(strategy);

module.exports = {
    initialize: function() {
        return passport.initialize();
    },
    authenticate: function() {
        return passport.authenticate("jwt", config.session);
    }
};
