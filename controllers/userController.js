const User = require('../models/user');
const passport = require('passport');

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
