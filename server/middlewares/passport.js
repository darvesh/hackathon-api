const mongoose = require('mongoose');
const passport = require('passport');
// const LocalStrategy = require('passport-local');
var LocalStrategy = require('passport-local').Strategy;

const Users = require('../models/Users');

passport.use(new LocalStrategy({
	usernameField: 'user[username]',
	passwordField: 'user[password]',
}, (username, password, done) => {
	Users.findOne({
			username
		})
		.then((user) => {
			if (!user || !user.validatePassword(password)) {
				return done(null, false, {
					errors: {
						'Username or password': 'is invalid'
					}
				});
			}

			return done(null, user);
		}).catch(done);
}));