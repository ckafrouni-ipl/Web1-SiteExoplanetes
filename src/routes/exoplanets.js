const express = require('express')
const router = express.Router()

const Exoplanet = require('../models/Exoplanets')

router.get('/', async (req, res) => {
	try {
		const { rows } = await Exoplanet.getAll()
		res.render('exoplanets/index.hbs', { exoplanetsTable: rows })
	} catch (err) {
		res.status(400).json(err)
	}
})

router.post('/add', async (req, res) => {
	try {
		await Exoplanet.add(
			req.body.unique_name,
			req.body.h_class,
			parseInt(req.body.discovery_year)
		)
		res.status(201).redirect('back')
	} catch (err) {
		res.status(400).json(err)
	}
})

router.get('/search', async (req, res) => {
	try {
		const { rows } = await Exoplanet.getAll()
		const exoplanet = await Exoplanet.findByUniqueName(req.query.unique_name)

		res.status(200).render('exoplanets/index.hbs', {
			exoplanetsTable: rows, exoplanet: exoplanet.rows[0]
		})
	} catch (err) {
		res.status(400).json(err)
	}
})

router.get('/details', async (req, res) => {
	try {
		const { rows } = await Exoplanet.findById(parseInt(req.query.id))
		res.status(200).render('exoplanets/details.hbs', { exoplanet: rows[0] })
	} catch (err) {
		res.status(400).json(err)
	}
})

router.get('/filter', async (req, res) => {
	if (req.query.h_class) {
		Exoplanet.filterByHClass(req.query.h_class)
			.then(data => res.status(200).render('exoplanets/index.hbs', { exoplanetsTable: data.rows }))
			.catch(err => res.status(400).json(err))
	} else if (req.query.discovery_year) {
		Exoplanet.filterByDiscoveryYear(parseInt(req.query.discovery_year))
			.then(data => res.status(200).render('exoplanets/index.hbs', { exoplanetsTable: data.rows }))
			.catch(err => res.status(400).json(err))
	}
})

router.get('/update', async (req, res) => {
	try {
		const data = await Exoplanet.findById(parseInt(req.query.id))
		let id_error = false
		let exoplanet
		if (data.rows.length.length === 0) id_error = true
		else exoplanet = data.rows[0]
		res.status(200).render('exoplanets/edit.hbs', {
			id_error, exoplanet
		})
	} catch (err) {
		res.status(400).json(err)
	}
})

router.post('/update', async (req, res) => {
	try {
		await Exoplanet.update(parseInt(req.body.id),
			req.body.unique_name,
			req.body.h_class,
			parseInt(req.body.discovery_year),
			parseFloat(req.body.ist),
			req.body.p_class
		)
		res.status(202).redirect(`details?id=${req.body.id}`)
	} catch (err) {
		res.status(400).json(err)
	}
})

module.exports = router
