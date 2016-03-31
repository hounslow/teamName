'use strict';

var express = require('express');
var controller = require('./Comic.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.updateComic);
router.put('/:id/cancel', controller.updateComic2);
//router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/:id/contributors', controller.addContributorToComicContributors); //contributor id needs to be sent in the request (note use Auth.getCurrentUser()._id which you send in the request
router.get('/search/:keywords', controller.searchForComics);
router.get('/search-username/:keywords', controller.searchForComicsByUsername);


module.exports = router;

