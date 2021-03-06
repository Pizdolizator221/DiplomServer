// import packages
const express = require('express');
const mongoose = require('mongoose');
const ansiColors = require('ansi-colors');
const {join} = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

// middleware

const morgan = require('morgan');
const favicon = require('serve-favicon');

app.use(morgan('combined'));
app.use(favicon(join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
require('./auth/auth');

// cors configuration
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// import routes
const userRouter = require('./routers/userRouter');
app.use('/api/users', userRouter);
const threadRouter = require('./routers/threadRouter');
app.use('/api/threads', threadRouter);
const bookRouter = require('./routers/bookRouter');
app.use('/api/books', bookRouter);

// handle non-existing route
app.use((req, res) => {
    res.sendStatus(404);
});

// PORT used by server and connection string required for MongoDB connection
const {PORT, ConnectionStrings} = require('./config/default.json');

// connection to MongoDB database and server startup
mongoose.connect(ConnectionStrings.Diplom, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (error) => {
    if(error) return console.log(error.message);

    app.listen(
        PORT,
        console.log(
            ansiColors.bgGreen.black(`server is listening on http://localhost:${PORT}`)
        )
    )
});