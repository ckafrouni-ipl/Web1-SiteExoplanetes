require('dotenv').config()
const express = require("express")
const path = require('path')
const logger = require('morgan')
const hbs = require('hbs')


const host = "localhost"
const port = 3000
const node_env = process.env.NODE_ENV || 'development'

/* HandleBars setup */
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

// The {{#exists}} helper checks if a variable is defined.
hbs.registerHelper('exists', function (variable, options) {
    if (typeof variable !== 'undefined') {
        return options.fn(this)
    } else {
        // options.inverse == else block
        return options.inverse(this)
    }
})

//eq checks if value are equal
hbs.registerHelper('eq', function (a, b) {
    return a === b
})

// EXPRESS SETUP
const app = express()

/* VIEW ENGINE SETUP */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(node_env === 'development' ? logger("dev") : logger("combined"))

const {mountApp, displayRoutes} = require("./routes")
mountApp(app)
    .listen(port, host, () => displayRoutes(host, port))