'use strict';

/**
 * @ngdoc function
 * @name itechApp.services:CommonService
 * @description
 * # Common Service
 * Service for REST/mock calls
 */
angular.module('itechApp')
  .service('CommonService', function ($q, $http) {
    var mockDetails = {id: 0,
      name: "Some full Name",
      location : "some Great Location",
      mail: "some@mail.com"
    };
    return {
      initCustomers: function (){
        return $http.get('data/data.json');
      },
      fetchCustomer: function (id) {
        console.log("May make a rest call to fetch details of " + id);
        var deferred = $q.defer();
        deferred.resolve (mockDetails);
        return deferred.promise;
      },
      addCustomer: function (name, location, email) {
        console.log(name + ' - ' + location + ' - ' + email + ' added');
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      }
    }
  });
