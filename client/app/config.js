'use strict';

angular.module('myApp')
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/news', {
      templateUrl: './views/news/news.html',
      controller: 'NewsCtrl'
    })
    .when('/news/create', {
      templateUrl: './views/createNews/createNews.html',
      controller: 'CreateNewsCtrl'
    })
    .otherwise({ redirectTo: '/news' });
  }]);