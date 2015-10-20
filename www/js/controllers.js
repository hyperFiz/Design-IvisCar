angular.module('starter', ['ionic'])

.controller('ProfileCtrl', function($scope, ProfileSrvc) {

  $scope.user = ProfileSrvc.user_data;

  $scope.logIn = function() {
    ProfileSrvc.get_user_data();
  };

  $scope.logIn();
})

.factory('ProfileSrvc', function(UserService) {
  var userData = {
    name: '',
    info: '',
    icon: ''
  };

  function getUserData() {
    UserService.GetUsers(1).then(function(items) {
      userData.name = items[0].user.name.first + ' ' + items[0].user.name.last;
      userData.info = items[0].user.location.street + ', ' + items[0].user.location.city;
      userData.icon = items[0].user.picture.medium;
    });
  };

  return {
    user_data: userData,
    get_user_data: getUserData
  }
})

.factory('UserService', function($http) {
  var BASE_URL = "http://api.randomuser.me/";
  var items = [];

  return {
    GetUsers: function(count) {
      return $http.get(BASE_URL + '?results=' + count).then(function(response) {
        items = response.data.results;
        return items;
      });
    }
  }
});

var app = angular.module("myApp",[]);
app.controller("myController", function($scope){
  $scope.name="asd";
  $scope.items = [];
  $scope.addItem = function (itemAmount, itemName) {
   $scope.items.push({
      amount: itemAmount,
      name: itemName
   });
   $scope.itemAmount = "";
   $scope.itemName = "";
 };
  
 $scope.removeItem = function (index) {
   $scope.items.splice(index, 1);
 };
})