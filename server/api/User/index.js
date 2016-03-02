'use strict';

var express = require('express');
var controller = require('./User.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show); //, auth.isAuthenticated()
router.post('/', controller.create);
router.put('/:id', controller.update);
//router.patch('/:id', controller.update); //not needed
router.delete('/:id', auth.hasRole('admin'), controller.destroy); //has role says only admin can do this
router.get('/me', controller.me); //auth.isAuthenticated()
router.put('/:id/password',  controller.changePassword); //auth.isAuthenticated(),




module.exports = router;
