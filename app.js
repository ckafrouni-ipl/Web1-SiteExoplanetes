require('dotenv').config()
const express = require("express");
const path = require('path');
const logger = require('morgan');
const hbs = require('hbs');

const app = express();

const host = "localhost";
const port = 3000;
const node_env = process.env.NODE_ENV || 'development';


/* VIEW ENGINE SETUP */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// The {{#exists}} helper checks if a variable is defined.
hbs.registerHelper('exists', function (variable, options) {
    if (typeof variable !== 'undefined') {
        return options.fn(this);
    } else {
        // options.inverse == else block
        return options.inverse(this);
    }
});

//eq checks if value are equal
hbs.registerHelper('eq', function (a, b) {
    return a === b;
});


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(node_env === 'development' ? logger("dev") : logger("combined"));


/* ROUTES SETUP */
const indexRouter = require('./routes/index');
// const xRouter = require('./routes/x');

let routes = [
    {path: '/', router: indexRouter},
    // Add paths & routers here
    // ['/x', xRouter]
];

routes.forEach((route) => {
    app.use(route.path, route.router);
});


/* START SERVER */
app.listen(port, host, () => {
    console.log('Quick links :');
    routes.forEach((route) => {
        console.log(`\thttp://${host}:${port}${route.path}`);
    })
})