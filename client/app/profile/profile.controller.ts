'use strict';
/*
angular.module('teamNameApp')
  .controller('ProfileCtrl', function ($scope, Auth, User, $http) {
    $scope.name = Auth.getCurrentUser().name;
    $scope.personalWeb = Auth.getCurrentUser().personalWebsite;
    $scope.interestsList = Auth.getCurrentUser().interestsList;
    $scope.editorEnabled = false;

    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
      $scope.editableName = $scope.name;
      $scope.editablePersonalWeb = $scope.personalWeb;
      $scope.editableInterestsList = $scope.interestsList;
    };

    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.save = function() {
      $scope.personalWeb = $scope.editablePersonalWeb;
      $scope.name = $scope.editableName;
      $scope.interestsList = $scope.editableInterestsList;
//      User.changeI
      console.log('current user id is '+Auth.getCurrentUser()._id);
      $http.put('api/users/'+Auth.getCurrentUser()._id+'/interests-list', {id: Auth.getCurrentUser()._id, interestsList: $scope.interestsList});
      $http.put('api/users/'+Auth.getCurrentUser()._id+'/personal-website', {id: Auth.getCurrentUser()._id, personalWebsite: $scope.personalWeb});
      $scope.disableEditor();
//      Auth.changePassword('test','bbb');  //works to change password


    };
  });

// http://icelab.com.au/articles/click-to-edit-with-angularjs/
*/

class ProfileCtrl {
  constructor($scope, Auth, $http){
    this.Auth = Auth;
    this.$scope = $scope;
    this.$http = $http;
    this.$scope.name = Auth.getCurrentUser().name;
    $scope.personalWeb = Auth.getCurrentUser().personalWebsite;
    $scope.interestsList = Auth.getCurrentUser().interestsList;
    $scope.editorEnabled = false;
  }
  enableEditor() {
    this.$scope.editorEnabled = true;
    this.$scope.editableName = this.$scope.name;
    this.$scope.editablePersonalWeb = this.$scope.personalWeb;
    this.$scope.editableInterestsList = this.$scope.interestsList;
  };

  disableEditor() {
    this.$scope.editorEnabled = false;
  };

  save() {
    this.$scope.personalWeb = this.$scope.editablePersonalWeb;
    this.$scope.name = this.$scope.editableName;
    this.$scope.interestsList = this.$scope.editableInterestsList;
//      User.changeI
    console.log('current user id is ' + this.Auth.getCurrentUser()._id);
    this.$http.put('api/users/' + this.Auth.getCurrentUser()._id + '/interests-list', {
      id: this.Auth.getCurrentUser()._id,
      interestsList: this.$scope.interestsList
    });
    this.$http.put('api/users/' + this.Auth.getCurrentUser()._id + '/personal-website', {
      id: this.Auth.getCurrentUser()._id,
      personalWebsite: this.$scope.personalWeb
    });
    this.disableEditor();
//      Auth.changePassword('test','bbb');  //works to change password
  };

}

angular.module('teamNameApp')
  .controller('ProfileCtrl', ProfileCtrl);
