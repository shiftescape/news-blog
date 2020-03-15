'use strict';

angular.module('myApp')
  .service('NewsService', function ($http) {
    var apiUrl = 'http://localhost:3000';

    this.getNews = function (text) {
      return $http.get(apiUrl + '/news' + (text && text !== '' ? `?text=${text}` : ''));
    }
  });