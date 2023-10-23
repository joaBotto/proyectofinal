require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index');
require('./scheduled tasks/sendEmailAtTheEndOfTheReservation.js')
const Stripe = require('stripe');

const stripe = new Stripe(process.env.API_KEY_STRIPE); 

const passport = require('passport'); //La biblioteca de autenticación para Node.js.
require('../middlewares/authLocal');
require('../middlewares/google');
const Users = require('../src/models/user');
const flash = require('connect-flash');
const session = require('express-session');

const multer = require('multer');
const storage = multer.memoryStorage(); // Almacenamiento en memoria (puedes cambiarlo para guardar en disco si lo prefieres)

const server = express();

const corsOptions = {
	origin: "*", // Permite solicitudes desde este origen
	methods: 'GET, POST, OPTIONS, PUT, DELETE',
	allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', // Solo permite estos encabezados
	credentials: true, // Permite enviar cookies
	optionsSuccessStatus: 204,
};

server.use(express.json());
server.use(cors(corsOptions));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
	console.log('Cookies que llegan:', req.cookies);
	next(); // Continúa con la ejecución de la solicitud
});

//CONFIG DE EXPRESS-SESSION
server.use(
	session({
		secret: 'inmuebles', // ESTA CADENA SE UTILIZA PARA FIRMAR COOKIES Y DEBE MANTENERSE EN SECRETO
		resave: false, // ESTA OPCION DETERMINA SI LA SESION SE DEBE VOLVER A GUARDAR EN EL ALMACEN DE SESIONES INCLUSO SI NO HA HABIDO CAMBIOS DURANTE LA SOLICITUD (FALSE)
		saveUninitialized: false, // ESTA OPCION DETERMINA SI LA SESION SE DEBE VOLVER A GUARDAR INCLUSO SI NO HA SIDO MODIFICADA DUARNTE LA SOLICITUD, SE GUARDA EN EL SERVIDOR (TRUE)
		cookie: { secure: false }, // ESTA OPCION TE PERMITE CONFIGURAR LAS PROPIEDADES DE LAS COOKIES DE SESION. SI ESTA EN FALSE SE PUEDEN ENVIAR DE CONEXIONES NO SEGURAS EN PRODUCCION SE SETEA EN (TRUE)
		logErrors: true,
	})
);
// MIDDLEWARE DE PASSPORT
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser((user, done) => {
	console.log('Serializando usuario:', user);
	return done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
	console.log('Deserializando usuario por ID:', _id);
	try {
		const user = await Users.findById(_id);
		if (!user) {
			console.log('Usuario no encontrado.');
			return done(null, false);
		}
		console.log('Usuario deserializado:', user);
		return done(null, user);
	} catch (err) {
		console.log('error en la deserializacion');
		return done(err, null);
	}
});

// CONFIGURA LOS MSJS QUE LLEGAN DE LA ESTRATEGIA
server.use(flash());

//back para pasarela de pagos
server.post('/api/checkout', async (req, res) => {
	try {
		const { id, amount } = req.body;

		const payment = await stripe.paymentIntents.create({
			amount,
			currency: 'USD',
			description: '',
			payment_method: id,
			confirm: true,
			return_url: 'http://localhost:3000',
		});

		res.send({ message: 'succesfull payment' });
	} catch (error) {
		res.json({ message: error.message });
	}
});
//back para pasarela de pagos fin

server.use('/', routes);

server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
