// import packages
const {Router} = require('express');
const bookController = require('../controllers/bookController');
const bookRouter = Router();

// book endpoints
bookRouter.get('/', bookController.getBooks);
bookRouter.post('/add', bookController.addBook);
bookRouter.get('/search', bookController.findBook);

module.exports = bookRouter;