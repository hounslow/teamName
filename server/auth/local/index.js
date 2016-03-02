'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, User, info) {
    console.log(User);
    console.log(info);
    console.log('tu');
    var error = err || info;
    if (error) {
      console.log('som tu v local');
      return res.status(401).json(error);
    }
    if (!User) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(User._id, User.role);
    res.json({ token });
  })(req, res, next)
});

export default router;
