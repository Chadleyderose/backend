(function (routeConfig) {

    'use strict';
  
    routeConfig.init = function (app) {
  
      // *** routes *** //
      const server = require('../routes/index');
      const users = require('../routes/users');
      const posts = require('../routes/posts');
      const authRoute = require('../routes/app');
  
      // *** database routes *** //
      app.use('/', server);
      app.use('/users', users);
      app.use('/posts', posts);

      // *** Auth routes *** //
      app.use('/auth', authRoute);
  
    };
  
  })(module.exports);