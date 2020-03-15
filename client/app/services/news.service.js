'use strict';

angular.module('myApp')
  .service('NewsService', function ($http, AuthService) {
    var apiUrl = 'http://localhost:3000/news';

    this.getNews = function (text) {
      return $http.get(apiUrl + (text && text !== '' ? `?text=${text}` : ''));
    }

    this.createNews = function (title, content) {
      return $http.post(apiUrl, { title, content, created_by: AuthService.getUser()});
    }
  });