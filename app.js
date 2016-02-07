/**
 * Created by BryanC on 2016-01-31.
 */
var express = require('express');
var path = require('path');
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
//require('./models/Comics');
var routes = require('./routes/index');
var users = require('./routes/userRoutes');
//Matt edit
/*
The link in this mongoose.connect below, is this supposed to be 3000?
*/
var Application = (function () {
    function Application() {
        // view engine setup
        //MATT CHANGES BELOW
        app.get('/', routes.index);
        app.get('./users', User.list);
        app.get('./users/:name', User.read);
        app.post('./users/:name', User.create);
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
    }
    return Application;
})();
module.exports = app;
//var appTwo = new Application();
// comic factory to create and add comics
//var comicFactory = module.exports = function ComicFactory(options){
//}
