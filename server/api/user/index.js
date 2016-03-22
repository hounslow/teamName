'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

console.log('in index ja in api user');
router.get('/', controller.index); //auth.hasRole('admin'),
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/interests-list', controller.changeInterestsList); //for interests  auth.isAuthenticated(),
router.put('/:id/personal-website', controller.changePersonalWebsite); //for personal website auth.isAuthenticated(),
router.put('/:id/profile-picture', controller.changeProfilePicture);
router.post('/:id/my-comics', controller.addComicToMyComics);
router.post('/:id/my-favourites', controller.addComicToMyFavourites);
router.get('/:id', controller.show); //auth.isAuthenticated(),
router.post('/', controller.create);
router.patch('/:id/my-favourites', controller.removeFromFavourites);

export default router;
