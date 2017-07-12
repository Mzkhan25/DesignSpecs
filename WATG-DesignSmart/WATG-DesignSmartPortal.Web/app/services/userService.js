(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .factory("userService", ["$http", "$rootScope", userService]);
    function userService($http, $rootScope) {
        return {
            getAll: function() {
                return $http({
                        method: "GET",
                        url: "User/GetAll"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            login: function(accountName, password) {
                return $http({
                        method: "GET",
                        url: "User/Login?accountName="+accountName+"&password=" + password
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            save: function(user) {
                return $http({
                        method: "POST",
                        data: {
                            user: user
                        },
                        url: "User/Save/"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            delete: function(id) {
                return $http({
                        method: "POST",
                        data: {
                            id: id
                        },
                        url: "User/Delete?id=" + id
                    })
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }
})();