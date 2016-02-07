/**
 * Created by BryanC on 2016-01-31.
 */


interface Error {

    status?: number;

}

import express = require('express');
import path = require('path');
//Matt edit below
import http = require('http');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import Schema = mongoose.Schema;
import ObjectId = Schema.ObjectId;
import Factory = require("./module.factory.js");
import mongoose = require('mongoose');


require('./models/Comics');

import routes = require('./routes/index');
import users = require('./routes/userRoutes');
//Matt edit


/*
The link in this mongoose.connect below, is this supposed to be 3000?
*/
mongoose.connect('mongodb://localhost/mean-type-dev');
var app = express();

export var userSchema = new mongoose.Schema({
  name: String
});

class Application {
  constructor() {

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
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

module.exports = app;

// comic factory to create and add comics

var comicFactory = module.exports = function ComicFactory(options){


}
