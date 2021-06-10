const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {Secret} = require('../config/default.json');

// ПОЛУЧЕНИЕ СПИСКА ПОЛЗАТЕЛЕЙ
exports.getUsers = (req, res) => {
    User.find((error, allUsers) => {
        if(error) return res.status(404).send(error.message);

        res.json(allUsers);
    });
}

// НАХОЖДЕНИЕ ПОЛЗАТЕЛЯ
exports.findUser = (req, res) => {
    User.findOne(req.query, (error, user) => {
        if(error) return res.status(404).send(error.message);
        res.json(user);
    });
}

exports.signup = async (req, res, next) => {
    res.json({
        message: 'signup succesful',
        user: req.user
    });
}

exports.login = async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(err);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, Secret);

              return res.json({ token, user });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }