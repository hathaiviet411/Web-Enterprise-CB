const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const UserRole = require('../models/userRole');
require('dotenv').config();
const axios = require('axios');

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

passport.use(
    'local',
    new LocalStrategy(async function (username, password, done) {
        try {
            const user = await User.findOne({
                username: username
            }).select(
                '-__v -createdAt -updateAt'
            );
            if (user === null) {
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                return done(null, false);
            }

            return done(null, user);
        } catch (err) {
            console.log(err);
            return done(err, false);
        }
    })
);

const accessOptions = {};
accessOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
accessOptions.secretOrKey = process.env.ACCESS_TOKEN_SECRET || 'access_token';
passport.use(
    'jwt-access',
    new JwtStrategy(accessOptions, async function (jwt_payload, done) {
        try {
            const user = await UserRole.findOne({
                    user: jwt_payload.payload
                })
                .populate({
                    path: 'role',
                    select: '-__v'
                })
                .populate({
                    path: 'user',
                    select: '-__v -createdAt -updatedAt -password',
                })
                .populate({
                    path: 'department',
                    select: '-__v -createdAt -updatedAt',
                })
                .select('-__v -_id');
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            console.log(err);
            return done(err, false);
        }
    })
);

const refreshOptions = {};
refreshOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
refreshOptions.secretOrKey =
    process.env.REFRESH_TOKEN_SECRET || 'refresh_token';
passport.use(
    'jwt-refresh',
    new JwtStrategy(refreshOptions, async function (jwt_payload, done) {
        User.findOne({
            _id: jwt_payload.payload
        }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }).select('-__v -createdAt -updatedAt -password');
    })
);

passport.serializeUser((user, done) => {
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    return done(null, user);
});