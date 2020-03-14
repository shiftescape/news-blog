'use strict';

angular.module('myApp')
  .controller('NewsCtrl', function ($scope, NewsService) {
    NewsService.getNews()
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.error(err);
      })
  });