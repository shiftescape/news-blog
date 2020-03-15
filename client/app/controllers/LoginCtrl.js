'use strict';

angular.module('myApp')
    .controller('LoginCtrl', function ($scope, $window, $location, AuthService) {
        $scope.unauthorized = false;
        $scope.username = '';
        $scope.password = '';

        $scope.login = function() {
            $scope.unauthorized = false;
            AuthService.loginUser($scope.username.trim(), $scope.password.trim())
                .then((response) => {
                    const res = response.data;
                    $scope.unauthorized = res.data.results < 1;
                    if (res.data.results > 0) {
                        AuthService.setUser(res.data.values[0].username);
                        $window.location.href = '#!/news';
                        $window.location.reload();
                    }
                })
                .catch((err) => console.error(err));
        }

        $scope.isFormValid = function() {
            return $scope.username.trim() === '' && $scope.password.trim() === '';
        }
    });