'use strict';

/**
 * @ngdoc function
 * @name itechApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the itechApp
 */
angular.module('itechApp')
  .controller('MainCtrl', function (storage, $modal, CommonService, $scope) {
    var that = this;
    that.customersList = [];
    that.details = [];
    that.ss = "add Custmomer"

    that.isSelected = function (id) {
      return that.details && that.details.id == id;
    };

    that.fetchDetails = function (id, index) {
      CommonService.fetchCustomer (id).then (function (res) {
        that.details = res;
        that.details.index = index + 1;
      });
    };

    that.delete = function (id) {
      var currentList = storage.get('customerList');
      storage.set('customerList', currentList.map(function (customer) {
        if(customer.id != id) {
          return customer
        }
      }))
    };

    that.addNewCustomer = function () {
      var modalInstance = $modal.open({
        backdrop: 'static',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: {
          items: function () {
            return [];
          }
        }
      });

      modalInstance.result.then (function () {
        that.details = [];
        that.customersList = storage.get('customerList');
      });
    };

    CommonService.initCustomers().then(function (res) {
      storage.set('customerList', res.data);
      that.customersList = storage.get('customerList');
    });
  });
