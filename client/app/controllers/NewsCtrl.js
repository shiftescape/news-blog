'use strict';

angular.module('myApp')
  .controller('NewsCtrl', function ($scope, NewsService) {
    $scope.initLoad = true;
    $scope.isLoading = false;
    $scope.isEmptyNews = false;
    $scope.isErrorNews = false;
    $scope.searchText = '';
    $scope.errorNews = 'Unexpected error occured. Please try again some time.';
    $scope.allNews = [];

    $scope.parseDate = function(date) {
      return new Date(date).toString();
    }

    $scope.filterNews = function (searchText) {
      $scope.loadNews(searchText);
    }

    $scope.loadNews = function(searchText) {
      $scope.isLoading = true;
      NewsService.getNews(searchText)
        .then(function (response) {
          var response = response.data;
          $scope.isEmptyNews = response.data.results < 1;
          $scope.allNews = response.data.values.filter((news) => news.title && news.content);
          $scope.isLoading = false;
          $scope.initLoad = false;
        })
        .catch(function (err) {
          $scope.isLoading = false;
          $scope.isErrorNews = true;
          console.error(err);
        });
    }

    // Load all news (initialize)
    $scope.loadNews('');

  });