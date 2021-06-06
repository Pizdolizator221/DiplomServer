const User = require('../models/user');

// ПОЛУЧЕНИЕ СПИСКА ПОЛЗАТЕЛЕЙ
exports.getUsers = (req, res) => {
    User.find((error, allUsers) => {
        if(error) return res.status(404).send(error.message);

        res.json(allUsers);
    });
}

// ДОБАВЛЕНИЕ НОВОГО ПОЛЗАТЕЛЯ
exports.createUser = (req, res) => {
    if(!req.body) return res.status(404).send(error.message);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const group = req.body.group;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;

    const user = new User({
        firstName,
        lastName,
        group,
        username,
        email,
        password,
        phoneNumber
    });

    user.save(error => {
        if(error) return res.status(404).send(error.message);

        res.redirect('/api/users');
    });
}

// НАХОЖДЕНИЕ ПОЛЗАТЕЛЯ
exports.findUser = (req, res) => {
    User.findOne(req.query, (error, user) => {
        if(error) return res.status(404).send(error.message);
        res.json(user);
    });
}