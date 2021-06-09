const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const {Secret} = require('../config/default.json');

passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (firstName, lastName, username, email, group, phoneNumber, password, done) => {
        try {
          const user = await UserModel.create({ 
                firstName,
                lastName,
                group,
                username,
                email,
                password,
                phoneNumber
            });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

passport.use(
    'login',
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await UserModel.findOne({email});

            if(!user) {
                return done(null, false, { message: 'User not found' });
            }

            const validate = await user.isValidPassword(password);

            if(!validate) {
                return done(null, false, { message: 'Password is wrong' });
            }

            return done(null, user, 'Logged in succesfully')
        } catch (error) {
            done(error)
        }
    })
)

passport.use(
    new JWTstrategy({
        secretOrKey: Secret,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret-token')
    },
    async (token, done) => {
        try {
            return done(token.user);
        } catch (error) {
            return done(error);
        }
    })
)