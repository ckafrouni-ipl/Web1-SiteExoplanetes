const express = require('express');
const router = express.Router();

const ForumMessages = require("../models/forumMessages");


router.get('/', (req, res) => {
    res.render('forum.hbs', {messagesTable: ForumMessages.getAll()});
});

router.post('/like', (req, res) => {
    if (req.body.id) {
        console.log(req.body.id);
        ForumMessages.incLike(parseInt(req.body.id));
    }

    res.redirect('back');
})

router.post('/add', (req, res) => {

    ForumMessages.addMessage({
        message: req.body.message,
        author: req.body.author,
    });

    res.redirect('back');
});

module.exports = router;