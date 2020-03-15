'use strict';

angular.module('myApp')
  .controller('CreateNewsCtrl', function ($scope, NewsService, $location, AuthService, UserService) {
    $scope.isLoading = false;
    $scope.successCreate = false;
    $scope.newsTitle = '';
    $scope.newsContent = '';
    $scope.invalidForm = false
    $scope.userNews = [];
    $scope.listOwn = 0;

    $scope.createNews = function() {
      $scope.invalidForm = false;
      $scope.successCreate = false;

      // Validate form fields
      if ($scope.newsTitle.trim() == '' || $scope.newsContent.trim() == '') {
        $scope.invalidForm = true;
        return;
      }
      
      // Confirm first before news creation
      var proceedCreate = confirm('Are you sure you want to post this news?');

      if (proceedCreate) {
        $scope.isLoading = true;

        // Proceed to createNews if no validation error
        NewsService.createNews($scope.newsTitle.trim(), $scope.newsContent.trim())
          .then((response) => {
            $scope.loadUserNews();
            $scope.successCreate = true;
            $scope.isLoading = false;
            $scope.newsTitle = '';
            $scope.newsContent = '';
          })
          .catch((err) => {
            $scope.isLoading = false;
            console.err(err)
          });
      }
    }

    $scope.parseDate = function (date) {
      return new Date(date).toString();
    }

    $scope.deleteNews = function(id) {
      const proceedDelete = confirm('Are you sure you want to delete this news?');
      if (proceedDelete) {
        NewsService.deleteNews(id)
          .then((res) => {
            $scope.loadUserNews();
          })
          .catch((err) => console.error(err));
      }
    }

    $scope.editNews = function(id) {
      $location.path(`/news/${id}/edit`);
    }

    $scope.loadUserNews = function() {
      const username = AuthService.getUser();
      UserService.getNewsByUserName(username)
        .then((response) => {
          const res = response.data;
          $scope.listOwn = [];
          $scope.userNews = res.data.values;
          $scope.listOwn = res.data.results;

        })
        .catch((err) => console.error(err));
    }

    $scope.loadUserNews();
  });