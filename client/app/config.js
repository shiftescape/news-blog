'use strict';

var app = angular.module('myApp')
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/login', {
        templateUrl: './views/login/login.html',
        controller: 'LoginCtrl',
        requireAuth: false
      })
      .when('/news', {
        templateUrl: './views/news/news.html',
        controller: 'NewsCtrl',
        requireAuth: false
      })
      .when('/news/create', {
        templateUrl: './views/news/createNews.html',
        controller: 'CreateNewsCtrl',
        requireAuth: true
      })
      .when('/news/:id/edit', {
        templateUrl: './views/news/editNews.html',
        controller: 'EditNewsCtrl',
        requireAuth: true
      })
      .otherwise({ redirectTo: '/news' });
  }]);

app.run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, newUrl) {
    if (AuthService.isLoggedIn() && newUrl.$$route.originalPath == '/login') {
      $location.path('/news');
    } else if (!AuthService.isLoggedIn() && newUrl.requireAuth) {
      $location.path('/login');
    }
  });
}]);