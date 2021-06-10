const Thread = require('../models/thread');

// get list of all threads
exports.getThreads = (req, res) => {
    Thread.find((error, allThreads) => {
        if(error) return res.status(404).send(error.message);

        res.json(allThreads);
    });
}

// create new thread
exports.createThread = (req, res) => {
    if(!req.body) return res.status(404).send(error.message);

    console.log(req.body);

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

// find threads
exports.findThreads = (req, res) => {
    Thread.find(req.query, (error, threads) => {
        if(error) return res.status(404).send(error.message);
        res.json(threads);
    });
}

// find one thread by it's _id
exports.findThread = (req, res) => {
    Thread.findById(req.query._id, (error, thread) => {
        if(error) return res.status(404).send(error.message);
        res.json(thread)
    });
}

// find thread by it's _id and add a comment to it's comments parameter
exports.reply = (req, res) => {
    const threadId = req.body.threadId;
    const authorUsername = req.body.authorUsername;
    const contentText = req.body.contentText;

    const comment = {
        authorUsername,
        contentText
    };

    Thread.findByIdAndUpdate(
        threadId,
        { $push: {comments: comment } },
        (error) => {
            if (error) return res.status(404).send(error.message);
        }
    );
}