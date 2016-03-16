'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
console.log('in index ja in api user controller');
function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.interestsList = 'No interests added';
  newUser.personalWebsite = 'No personal website added';
  newUser.profilePciture = '';
  newUser.myComics = [];
  newUser.myFavourites = [];
//  newUser.role = 'user';  //not necessary anymore
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
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
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
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
 * Change a user's interests
 */
export function changeInterestsList(req, res, next) {
  console.log('got to change i-l in users controller');
  var userId = String(req.body.id);
  var newInterestsList = String(req.body.interestsList);

  User.findByIdAsync(userId)
    .then(user => {
    user.interestsList = newInterestsList;
    return user.saveAsync()
        .then(() => {
        res.status(204).end();
  })
  .catch(validationError(res));
});
}

/**
 * Change a user's personal website
 */
export function changePersonalWebsite(req, res, next) {
  console.log('got to change personal website in users controller');
  var userId = String(req.body.id);
  var newPersonalWebsite = String(req.body.personalWebsite);

  User.findByIdAsync(userId)
    .then(user => {
    user.personalWebsite = newPersonalWebsite;
  return user.saveAsync()
      .then(() => {
      res.status(204).end();
})
.catch(validationError(res));
});
}

/**
 * Change a user's profile picture
 */
export function changeProfilePicture(req, res, next) {
  console.log('got to change i-l in users controller');
  var userId = String(req.body.id);
  var newProfilePicture = String(req.body.profilePicture);

  User.findByIdAsync(userId)
    .then(user => {
    user.profilePicture = newProfilePicture;
  return user.saveAsync()
      .then(() => {
      res.status(204).end();
})
.catch(validationError(res));
});
}

/**
 * Add comic to my comics
 */
export function addComicToMyComics(req, res, next) {
  console.log('got to add comic to my comics in users controller');
  var userId = String(req.body.id);
  var newMyComic = String(req.body.myComics);

  User.findByIdAsync(userId)
    .then(user => {
    user.myComics.push(newMyComic);
    return user.saveAsync()
      .then(() => {
      res.status(204).end();
})
.catch(validationError(res));
});
}

/**
 * Add comic to my favourites
 */
export function addComicToMyFavourites(req, res, next) {
  console.log('got to add comic to my favourites in users controller');
  var userId = String(req.body.id);
  var newMyComic = String(req.body.myComics);

  User.findByIdAsync(userId)
    .then(user => {
    user.myFavourites.push(newMyComic);
  return user.saveAsync()
      .then(() => {
      res.status(204).end();
})
.catch(validationError(res));
});
}



/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
