const {Router} = require('express');
const userController = require('../controllers/userController');
const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/create', userController.createUser);
userRouter.get('/find', userController.findUser);

module.exports = userRouter;