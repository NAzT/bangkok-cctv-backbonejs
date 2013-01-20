'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource']).
  value('version', '0.1').
  factory('Cctv', ['$resource', function ($resource) {
  	var resource = $resource ('/cctvs')
  	return resource;
  }]);