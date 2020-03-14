'use strict';

angular.module('myApp.createNews', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/news/create', {
    templateUrl: 'components/createNews/createNews.html',
    controller: 'createNewsCtrl'
  });
}])

.controller('createNewsCtrl', [function() {

}]);