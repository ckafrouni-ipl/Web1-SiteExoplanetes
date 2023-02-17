const express = require('express')
const router = express.Router()

const ForumMessages = require("../models/ForumMessages")

router.get('/', async (req, res) => {
    try {
        let {rows} = await ForumMessages.getAll()
        res.render('forum/index.hbs', {messagesTable: rows})
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/like', async (req, res) => {
    try {
        let data = await ForumMessages.incLike(parseInt(req.body.id))
        res.status(200).redirect('back')
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/add', async (req, res) => {
    try {
        let data = await ForumMessages.addMessage({
            message: req.body.message,
            author: req.body.author,
        })
        res.status(201).redirect('back')
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router