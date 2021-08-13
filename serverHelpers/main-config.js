(function(appConfig) {

    'use strict';
  
    // *** main dependencies *** //
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const flash = require('connect-flash');
    const morgan = require('morgan');
    const Cors = require('cors');


    appConfig.init = function(app, express) {
  

  
    //   *** app middleware *** //
      if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));
      }
  
      // *** cross domain requests *** //
      const allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
      };
  
      app.use(allowCrossDomain);
      app.use(cookieParser());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(flash());
      app.use(Cors());
  
    };
  
  })(module.exports);