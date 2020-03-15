'use strict';

angular.module('myApp')
    .factory('AuthService', function ($window, $location, $http) {
        const authUrl = 'http://localhost:3000/auth/login'
        return {
            loginUser: function(username, password) {
                return $http.post(authUrl, { username, password });
            },
            logoutUser: function() {
                $window.localStorage.clear();
            },
            setUser: function (user) {
                $window.localStorage.setItem('USER', user);
            },
            getUser: function () {
                return $window.localStorage.getItem('USER');
            },
            isLoggedIn: function () {
                const user = $window.localStorage.getItem('USER');
                return (user) ? user : false;
            }
        }
    });