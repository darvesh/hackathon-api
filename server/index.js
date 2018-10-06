const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
//instantiate configuration variables
require('./config/config')
require('./middlewares/passport');
require('./models/Users');

const app = express();

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;


//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';


if (!isProduction) app.use(morgan('dev'));

//importing important files
const config = require('./config/config');
const v1 = require('./routes/v1');

//Configure app
app.use(cors());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: CONFIG.SECRET,
	cookie: {
		maxAge: CONFIG.MAXAGE
	},
	resave: false,
	saveUninitialized: false
}));

if (!isProduction) {
	app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect(`mongodb://${CONFIG.DBUSER}:${CONFIG.DBPASSWORD}@ds111913.mlab.com:11913/drop-it`,{
	useNewUrlParser: true,
	useCreateIndex: true
});
mongoose.set('debug', true);

app.use('/v1', v1);


app.get('/', (req, res) => {
	res.status(200).send({hi:"Hello!"})
});


if (!isProduction) {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message,
				error: err,
			},
		});
	});
}

app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.status || 500);
	res.json({
		errors: {
			message: err.message,
			error: {},
		},
	});
	next();
});

app.listen(CONFIG.PORT, () => {
	console.info(`APP Running on port ${CONFIG.PORT}`)
});