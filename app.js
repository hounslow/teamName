/**
 * Created by BryanC on 2016-01-31.
 */
///<reference path='types/node/node.d.ts'/>
///<reference path='types/express/express.d.ts'/>


var Application = (function () {
    function Application() {
        var express = require('express');
        var path = require('path');
        var http = require('http');
        var favicon = require('serve-favicon');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        var mongoose = require('mongoose');
        var Schema = mongoose.Schema;
        var ObjectId = Schema.ObjectId;
        var Factory = require("./module.factory.js");
        var routes = require('./routes/index');
        var users = require('./routes/userRoutes');
        var comicModel = require('./models/Comics');
        var app = express();
        app.set('port', process.env.PORT || 3000);
        app.use(express.static(path.join(__dirname, 'public')));
        // view engine setup
        //MATT CHANGES BELOW
        app.use('/', routes.index);
        app.use('/user.list');
        app.use('/users/:name', user.read);
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
        http.createServer(app).listen(app.get('port'), function () {
            console.log("Express server listening on port " + app.get('port'));
        });
        module.exports = app;
    }
    return Application;
})();
var application = new Application();
application.start();
