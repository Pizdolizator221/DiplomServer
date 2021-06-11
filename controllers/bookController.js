const Book = require('../models/book');

// get list of all books
exports.getBooks = (req, res) => {
    Book.find((error, allBooks) => {
        if (error) return res.status(404).send(error.message);

        res.json(allBooks);
    });
}

// add a new book
exports.addBook = (req, res) => {
    if (!req.body) return res.status(404).send(error.message);

    const author = req.body.author;
    const name = req.body.name;
    const pagesAmount = req.body.pagesAmount;
    const publishment = req.body.publishment;
    const year = req.body.year;

    const book = new Book({
        author,
        name,
        pagesAmount,
        publishment,
        year
    });

    book.save(error => {
        if (error) return res.status(404).send(error.message);

        res.redirect('/api/books');
    });
}

// books search
exports.findBook = (req, res) => {
    Book.find(req.query, (error, books) => {
        if (error) return res.status(404).send(error.message);
        
        res.json(books);
    });
}