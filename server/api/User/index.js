'use strict';

var express = require('express');
var controller = require('./User.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
//router.patch('/:id', controller.update); //not needed
router.delete('/:id', auth.hasRole('admin'), controller.destroy); //has role says only admin can do this
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);




module.exports = router;
