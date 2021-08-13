(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express');

  // Will find functions in serverHelpers folder
  // Making the dependinces a global variable
  const appConfig = require('../serverHelpers/main-config.js');

  // Making Routes a global variable
  const routeConfig = require('../serverHelpers/routes-config.js');

  // Making errors a global variable
  const errorConfig = require('../serverHelpers/error-config.js');

  // *** express instance *** //
  const app = express();

  // *** config *** //
  appConfig.init(app, express);
  routeConfig.init(app);
  errorConfig.init(app);

  module.exports = app;

}());