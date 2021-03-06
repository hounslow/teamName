/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Comics              ->  index
 * POST    /api/Comics              ->  create
 * GET     /api/Comics/:id          ->  show
 * PUT     /api/Comics/:id          ->  update
 * DELETE  /api/Comics/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Comic from './Comic.model';



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

// Gets a list of Comics
export function index(req, res) {
  //Comic.findAsync()
  //  .then(respondWithResult(res))
  //  .catch(handleError(res));
  Comic.find().populate('contributors', 'name') //populates only name field of contributor
    .execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Comic from the DB
export function show(req, res) {
  Comic.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Comic in the DB
//exports.create = function(req, res)
export function create(req, res) {
  Comic.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * Add contributor to comic
 */
export function addContributorToComicContributors(req, res, next) {
  console.log('got to add contributor to contributors in comic controller');
  var comicId = String(req.params.id);   //gets the id of the comic from the http.post url
  var state = String(req.body.notSaved);
  var newContributor = String(req.body.contributors);  //contributor id needs to be sent in the request (note use Auth.getCurrentUser()._id which you send in the request
  console.log('comicId '+comicId);
  console.log('contributor id '+newContributor);
  return Comic.updateAsync({_id: comicId}, {$addToSet: {contributors: newContributor}, $set: {notSaved: state}})
      .then(() => {
      res.status(204).end();
})
.catch(handleError(res));
}

export function searchForComics(req, res, next){
  var keywords = String(req.params.keywords);
  console.log('in swerch with keywords '+keywords);
  //Comic.find({}).populate('contributors','name')
  //  .execAsync()
  //  .then(function(result){
  //    var allComics = json(result);
  //    console.log('allComics');
  //    return res.status(204).json(allComics)
  //  })
  //  .catch(handleError(res))
  Comic.find({ "$text" : { "$search" : keywords } }).populate('contributors','name')
    .execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
  //Comic.find({name: keywords}).populate('contributors','name')
  //  .execAsync()
  //  .then(respondWithResult(res))
  //  .catch(handleError(res));
}
export function searchForComicsByUsername(req, res, next){
  var keywords = String(req.params.keywords);
  var arrayOfKeywords = keywords.split(" ");
  console.log('in by username swerch with keywords '+keywords);
  Comic.find().populate('contributors','name')
    .execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function updateComic(req, res, next) {
  console.log('update Comic function controller');
  var comicId = String(req.params.id);
  //var newContent = Array(req.body.content);
  var newState = String(req.body.notSaved);
  console.log(comicId);
  return Comic.updateAsync({_id: comicId}, {$set: {content: req.body.content, notSaved: newState}})
    .then(() => {
      console.log(comicId);
      res.status(204).end();
    })
    .catch(handleError(res));
}

export function updateComic2(req, res, next) {
  console.log('update Comic function controller');
  var comicId = String(req.params.id);
  //var newContent = Array(req.body.content);
  var newState = String(req.body.notSaved);
  console.log(comicId);
  return Comic.updateAsync({_id: comicId}, {$set: {notSaved: newState}})
    .then(() => {
      console.log(comicId);
      res.status(204).end();
    })
    .catch(handleError(res));
}







// Updates an existing Comic in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  var test = req.body.content;
  console.log(test.length);
  Comic.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Comic from the DB

export function destroy(req, res) {
  Comic.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
