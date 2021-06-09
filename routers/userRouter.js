const {Router} = require('express');
const userController = require('../controllers/userController');
const userRouter = Router();
const passport = require('passport');


userRouter.get('/', userController.getUsers);
userRouter.get('/find', userController.findUser);

userRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    userController.signup
);
userRouter.post('/login', userController.login);

module.exports = userRouter;