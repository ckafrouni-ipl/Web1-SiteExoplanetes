require('dotenv').config()
const express = require("express");
const path = require('path');
const logger = require('morgan');

const app = express();

const host = "localhost";
const port = 3000;
const node_env = process.env.NODE_ENV || 'development';



/* VIEW ENGINE SETUP */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(node_env === 'development' ? logger("dev") : logger("combined"));


/* ROUTES SETUP */
const indexRouter = require('./routes/index');
// const xRouter = require('./routes/x');

let routes = [
	['/', indexRouter],
	// Add paths & routers here
	// ['/x', xRouter]
];

routes.forEach((value) => {
	app.use(...value);
});


/* START SERVER */
app.listen(port, host, () => {
	console.log('Routes are up paths :');
	routes.forEach((value) => {
		console.log(`\thttp://${host}:${port}${value[0]}`);
	})
})