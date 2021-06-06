const {Router} = require('express');
const threadController = require('../controllers/threadController');
const userRouter = Router();

userRouter.get('/', threadController.getThreads);
userRouter.post('/create', threadController.createThread);
userRouter.get('/find', threadController.findThreads);

module.exports = userRouter;