'use strict';

angular.module('myApp')
  .service('NewsService', function ($http) {
    var apiUrl = 'http://localhost:3000';

    this.getNews = function () {
      return $http.get(apiUrl + '/news');
    }
  });