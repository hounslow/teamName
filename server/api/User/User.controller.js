/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Users              ->  index
 * POST    /api/Users              ->  create
 * GET     /api/Users/:id          ->  show
 * PUT     /api/Users/:id          ->  update
 * DELETE  /api/Users/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import User from './User.model';
import passport from 'passport';
import config from '../../config/environment';
var jwt = require('jsonwebtoken');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Users
export function index(req, res) {
  User.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single User from the DB
export function show(req, res) {
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*// Creates a new User in the DB
export function create(req, res) {
  User.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}*/

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function(User) {
      var token = jwt.sign({ _id: User._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

// Updates an existing User in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a User from the DB
export function destroy(req, res) {
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(User => {
      if (User.authenticate(oldPass)) {
        User.password = newPass;
        return User.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  console.log('got to before requresting id');

  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(User => { // don't ever give out the password or salt
      if (!User) {
        return res.status(401).end();
      }
  console.log('got here');
      res.json(User);
    })
    .catch(err => next(err));
}



/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/login'); //I changed to login
}
