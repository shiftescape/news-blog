'use strict';

angular.module('myApp')
  .controller('CreateNewsCtrl', function ($scope, NewsService) {
    $scope.isLoading = false;
    $scope.successCreate = false;
    $scope.newsTitle = '';
    $scope.newsContent = '';
    $scope.invalidForm = false

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
  });