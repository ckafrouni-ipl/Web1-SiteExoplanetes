const express = require('express')
const router = express.Router()

const ForumMessages = require("../models/ForumMessages")

router.get('/', (req, res) => {
    ForumMessages.getAll()
        .then(data => res.render('forum/index.hbs', {messagesTable: data.rows}))
        .catch(err => res.status(400).json(err))
})

router.post('/like', (req, res) => {
    if (req.body.id) {
        ForumMessages.incLike(parseInt(req.body.id))
            .then(data => res.status(200).redirect('back'))
            .catch(err => res.status(400).json(err))
    }
})

router.post('/add', (req, res) => {
    ForumMessages.addMessage({
        message: req.body.message,
        author: req.body.author,
    })
        .then(data => res.status(201).redirect('back'))
        .catch(err => res.status(400).json(err))
})

module.exports = router