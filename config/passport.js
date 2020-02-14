// create passport strategy
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const keys = require('../config/key');
const User = require('../models/User');
const opts = {};
opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.keys;

module.exports = (passport) => {
    passport.use(new JWTStrategy(opts, (jwtpayload, done) => {
        User.findById(jwtpayload.id)
            .then((user) => {
                if (user) {
                    console.log('-----------')
                    console.log(user);
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
            .catch((err) => {
                console.log(err);
                done(err, false);
            })
    }));
}