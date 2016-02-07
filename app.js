/**
 * Created by BryanC on 2016-01-31.
 */
///<reference path='types/node/node.d.ts'/>
///<reference path='types/express/express.d.ts'/>
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://localhost/news', function (err, db) {
    if (!err) {
        console.log('Connected to monngoose!');
    }
    else {
        console.dir(err); //failed to connecte
    }
});
require('./models/Comics');
var routes = require('./routes/index');
var users = require('./routes/userRoutes');
//Matt edit
/*
The link in this mongoose.connect below, is this supposed to be 3000?
*/
exports.userSchema = new mongoose.Schema({
    name: String
});
var Application = (function () {
    function Application() {
        // view engine setup
        //MATT CHANGES BELOW
        app.get('/', routes.index);
        app.get('/user.list');
        app.get('/users/:name', user.read);
        app.post('/users/:name', user.create);
        //MATT CHANGES END
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
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        // error handlers
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
        module.exports = app;
    }
    return Application;
})();
var appTwo = new Application();
// comic factory to create and add comics
var comicFactory = module.exports = function ComicFactory(options) {
};
