'use strict';

angular.module('myApp')
    .controller('MainCtrl', function ($scope, $window, AuthService) {
        $scope.isLoggedIn = AuthService.isLoggedIn();
        $scope.logoutUser = function() {
            AuthService.logoutUser();
            $window.location.href = '#!/news';
            $window.location.reload();
        }
    });