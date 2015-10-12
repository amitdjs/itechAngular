'use strict';

/**
 * @ngdoc function
 * @name itechApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the itechApp
 */
angular.module('itechApp')
  .controller('AboutCtrl', function ($scope, storage, CommonService, $modalInstance) {
    $scope.addCustomerToList = function () {
      var mailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if($scope.Email == '' || !mailRegex.test($scope.Email)) {
        alert('invalid email');
        return
      }
      CommonService.addCustomer($scope.name, $scope.Location, $scope.Email).then (function(){
        var currentList = storage.get('customerList');
        storage.set('customerList', currentList.concat(
          {"id": currentList[currentList.length-1].id + 1, "name": $scope.name, "location": $scope.Location, "mail": $scope.Email}))
        $modalInstance.close()
      })
    }
    $scope.close = function () {
      $modalInstance.close();
    };

  });
