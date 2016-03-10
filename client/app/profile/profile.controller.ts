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
    $scope.profilePicture = Auth.getCurrentUser().profilePicture;
    console.log('in profile controller constructor');
  }
  enableEditor() {
    this.$scope.editorEnabled = true;
    this.$scope.editablePersonalWeb = this.$scope.personalWeb;
    this.$scope.editableInterestsList = this.$scope.interestsList;
  };

  disableEditor() {
    this.$scope.editorEnabled = false;
  };

  save() {
    this.$scope.personalWeb = this.$scope.editablePersonalWeb;
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

 //   var preview = document.querySelector('img');   //for preview
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    var obj = this;

    reader.onloadend = function(e){
       console.log("in the http of profile pic controller %s", this);
       obj.$http.put('api/users/' + obj.Auth.getCurrentUser()._id + '/profile-picture', {id: obj.Auth.getCurrentUser()._id, profilePicture: reader.result} );
       obj.$scope.profilePicture = reader.result;
    }
    //reader.addEventListener("load", function () {//for preview
    //  preview.src = reader.result;
    //}, false);

    if (file) {
      reader.readAsDataURL(file);
    }

    this.disableEditor();
//      Auth.changePassword('test','bbb');  //works to change password
  };

}

angular.module('teamNameApp')
  .controller('ProfileCtrl', ProfileCtrl);
