'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    //changeInterestsList: {
    //  method: 'PUT',
    //  params: {
    //    controller: 'interests-list'
    //  }
    //},
    //changePersonalWebsite: {
    //  method: 'PUT',
    //  params: {
    //    controller: 'personal-website'
    //  }
    //},
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
}

angular.module('teamNameApp.auth')
  .factory('User', UserResource);

})();
