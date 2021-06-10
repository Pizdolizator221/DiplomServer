const {Router} = require('express');
const threadController = require('../controllers/threadController');
const threadRouter = Router();

threadRouter.get('/', threadController.getThreads);
threadRouter.post('/create', threadController.createThread);
threadRouter.get('/find', threadController.findThreads);
threadRouter.get('/find_by_id', threadController.findThread);
threadRouter.post('/reply', threadController.reply);

module.exports = threadRouter;