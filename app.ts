/**
 * Created by BryanC on 2016-01-31.
 */


interface Error {
    status?: number;
}

import express = require('express');
import path = require('path');
import http = require('http');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import Schema = mongoose.Schema;
import ObjectId = Schema.ObjectId;
import Factory = require("./module.factory.js");
import mongoose = require('mongoose');



// mongoose.connect('mongodb://localhost/3000', function(err, db) {
//   if (!err) {
//     console.log('Connected to monngoose!');
//   } else {
//     console.dir(err); //failed to connecte
//   }
// });
var mongoURI = "mongodb://localhost:27017/project'";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

var app = express();
//require('./models/Comics');

import routes = require('./routes/index');
import users = require('./routes/userRoutes');
//Matt edit


/*
The link in this mongoose.connect below, is this supposed to be 3000?
*/


class Application {
  constructor() {

    // view engine setup
    //MATT CHANGES BELOW
    app.get('/', routes.index);
    app.get('./users', user.list);
    app.get('./users/:name', user.read);
    app.post('./users/:name', user.create);

    //MATT CHANGES END
    app.set('/views', path.join(__dirname, '/views'));
    app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', routes);
    app.use('/users', users);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    }); 
  }
}
export = app;

//var appTwo = new Application();

// comic factory to create and add comics

//var comicFactory = module.exports = function ComicFactory(options){


//}
