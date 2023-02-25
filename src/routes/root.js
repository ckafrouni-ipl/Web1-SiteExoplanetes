const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	const today = new Date()
	const todayString = 'Nous sommes le ' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + '.'
	const hourtodayString = 'Il est ' + today.getHours() + ':' + today.getMinutes() + ' à Bruxelles'
	res.render('index.hbs', { today: todayString + ' ' + hourtodayString })
})

module.exports = router
