const express = require("express");
const path = require('path');

let app = express();

let host = "localhost";
let port = 3000;

/* VIEW ENGINE SETUP */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


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