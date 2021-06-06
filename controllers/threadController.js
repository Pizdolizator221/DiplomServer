const Thread = require('../models/thread');

exports.getThreads = (req, res) => {
    Thread.find((error, allThreads) => {
        if(error) return res.status(404).send(error.message);

        res.json(allThreads);
    });
}

exports.createThread = (req, res) => {
    if(!req.body) return res.status(404).send(error.message);

    const authorUsername = req.body.authorUsername;
    const title = req.body.title;
    const contentText = req.body.contentText;

    const thread = new Thread({
        authorUsername,
        title,
        contentText
    });

    thread.save(error => {
        if(error) return res.status(404).send(error.message);

        res.redirect('/api/threads');
    })
}

exports.findThreads = (req, res) => {
    Thread.find(req.query, (error, threads) => {
        if(error) return res.status(404).send(error.message);
        res.json(threads);
    });
}