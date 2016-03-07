'use strict';

class RegisterCtrl {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
	  //end-non-standard

  constructor(Auth, $location) {
    this.Auth = Auth;
    this.$location = $location;
  }

  register(form) {
    this.submitted = true;
    console.log('got to register controller register');
    console.log(' name: '+this. user.name+'   role: '+this.user.role);
    console.log(' email: '+this. user.email+'   password: '+this.user.password);
    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role   //added along with comma above
      })
      .then(() => {
        // Account created, redirect to the-feed
        this.$location.path('/the-feed');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('teamNameApp')
  .controller('RegisterCtrl', RegisterCtrl);