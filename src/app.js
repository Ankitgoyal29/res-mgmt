const express         = require('express');
// const compression     = require('compression');
// const session         = require('express-session');
const bodyParser      = require('body-parser');
const logger          = require('morgan');
const chalk           = require('chalk');
// const errorHandler    = require('errorhandler');
const dotenv          = require('dotenv');
// const MongoStore      = require('connect-mongo')(session);
// const flash           = require('express-flash');
const path            = require('path');
// const mongoose        = require('mongoose');
// const passport        = require('passport');
const expressValidator = require('express-validator');
// const expressStatusMonitor = require('express-status-monitor');
// const multer          = require('multer');
// const expressJwt      = require('express-jwt');
// const cors            = require('cors');
// const upload          = multer({ dest: path.join(__dirname, 'uploads') });


// dotenv.load({ path: '.env' });



/**
 * API keys and Passport configuration.
 */
// const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, { useMongoClient: true });
// mongoose.connection.on('error', (err) => {
//   console.error(err);
//   console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
//   process.exit();
// });

/**
 * Express configuration.
 */
// app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.PORT || 8080);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(expressStatusMonitor());
// app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());
// app.use(cors())
// app.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.SESSION_SECRET,
//   store: new MongoStore({
//     url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
//     autoReconnect: true,
//     clear_interval: 3600
//   })
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.locals.moment = require('moment');


/**
 * Controllers (route handlers).
 */

require('./routes')(app);


// app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
