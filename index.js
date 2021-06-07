// import packages
const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const ansiColors = require('ansi-colors');
const {join} = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// middleware
const {Secret} = require('./config/default.json');

app.use(expressSession({secret: Secret}));
app.use(passport.initialize());
app.use(passport.session());

const morgan = require('morgan');
const favicon = require('serve-favicon');

app.use(morgan('combined'));
app.use(favicon(join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes
const userRouter = require('./routers/userRouter');
app.use('/api/users', userRouter);
const threadRouter = require('./routers/threadRouter');
app.use('/api/threads', threadRouter);

app.use((req, res) => {
    res.sendStatus(404);
});

// server startup
const {PORT, ConnectionStrings} = require('./config/default.json');

mongoose.connect(ConnectionStrings.Users, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (error) => {
    if(error) return console.log(error.message);

    app.listen(
        PORT,
        console.log(
            ansiColors.bgGreen.white(`server is listening on http://localhost:${PORT}`)
        )
    )
});