require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const hbs = require('hbs')

const host = 'localhost'
const port = 3000
const nodeEnv = process.env.NODE_ENV || 'development'

/*
 * HBS SETUP
 *
 * Adds {{#exists}} helper to check if variable exists
 **/
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

hbs.registerHelper('exists', function (variable, options) {
	if (typeof variable !== 'undefined') {
		return options.fn(this)
	} else {
		// options.inverse == else block
		return options.inverse(this)
	}
})

// eq checks if value are equal
hbs.registerHelper('eq', (a, b) => a === b)

// EXPRESS SETUP
const app = express()
app.disable('x-powered-by')

/* VIEW ENGINE SETUP */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(nodeEnv === 'development' ? logger('dev') : logger('combined'))

const { mountApp, displayRoutes } = require('./routes')
mountApp(app)
	.listen(port, host, () => displayRoutes(host, port))
