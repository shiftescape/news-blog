'use strict';

angular.module('myApp')
  .service('NewsService', function ($http, AuthService) {
    var apiUrl = 'http://localhost:3000/news';

    this.getNews = function (text) {
      return $http.get(apiUrl + (text && text !== '' ? `?text=${text}` : ''));
    }

    this.getNewsByID = function(id) {
      return $http.get(`${apiUrl}/${id}`);
    }

    this.createNews = function (title, content) {
      return $http.post(apiUrl, { title, content, created_by: AuthService.getUser()});
    }

    this.updateNews = function (id, title, content) {
      return $http.put(`${apiUrl}/${id}`, { title, content });
    }

    this.deleteNews = function (id) {
      return $http.delete(`${apiUrl}/${id}`);
    }
  });