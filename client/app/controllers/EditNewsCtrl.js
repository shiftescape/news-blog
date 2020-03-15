'use strict';

angular.module('myApp')
    .controller('EditNewsCtrl', function ($scope, $routeParams, NewsService, AuthService) {
        $scope.editTitle = '';
        $scope.editContent = '';
        $scope.isLoading = false;
        $scope.invalidForm = false;
        $scope.successUpdate = false;

        $scope.updateNews = function () {
            $scope.invalidForm = false;
            $scope.successUpdate = false;

            // Validate form fields
            if ($scope.editTitle.trim() == '' || $scope.editContent.trim() == '') {
                $scope.invalidForm = true;
                return;
            }

            $scope.isLoading = true;
            NewsService.updateNews($routeParams.id, $scope.editTitle.trim(), $scope.editContent.trim())
                .then((response) => {
                    $scope.successUpdate = true;
                    $scope.isLoading = false;
                })
                .catch((err) => {
                    $scope.isLoading = false;
                    console.error(err);
                });
        }

        $scope.getNewsByID = function() {
            $scope.isLoading = true;
            NewsService.getNewsByID($routeParams.id)
                .then((response) => {
                    const res = response.data;
                    const newsData = res.data.values[0];
                    $scope.editTitle = newsData.title;
                    $scope.editContent = newsData.content;
                    $scope.isLoading = false;
                })
                .catch((err) => console.error(err));
        }

        $scope.getNewsByID();
    });