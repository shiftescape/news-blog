'use strict';

angular.module('myApp')
  .controller('NewsCtrl', function ($scope, NewsService) {
    $scope.isEmptyNews = false;
    $scope.isErrorNews = false;
    $scope.allNews = [];

    $scope.parseDate = function(date) {
      return new Date(date).toString();
    }

    NewsService.getNews()
      .then(function(response) {
        var response = response.data;
        $scope.isEmptyNews = response.data.results < 1;
        $scope.allNews = response.data.values.filter((news) => news.title && news.content);
        console.log($scope.allNews);
      })
      .catch(function(err) {
        $scope.isErrorNews = true;
        console.error(err);
      })
  });