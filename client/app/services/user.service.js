'use strict';

angular.module('myApp')
    .service('UserService', function ($http) {
        var userUrl = 'http://localhost:3000/users';

        this.getNewsByUserName = function (username) {
            return $http.get(`${userUrl}/${username}/news`);
        }
    });