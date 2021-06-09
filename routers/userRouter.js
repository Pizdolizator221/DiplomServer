const {Router} = require('express');
const userController = require('../controllers/userController');
const userRouter = Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {Secret} = require('../config/default.json');

userRouter.get('/', userController.getUsers);
userRouter.get('/find', userController.findUser);

userRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    userController.signup
);
userRouter.post(
  '/login',
  async (req, res, next) => {
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

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = userRouter;