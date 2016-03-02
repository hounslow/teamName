'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/Users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
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
