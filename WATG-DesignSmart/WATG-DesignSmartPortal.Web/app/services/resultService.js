(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .factory("resultService", ["$http", "$rootScope", resultService]);
    function resultService($http, $rootScope) {
        return {
            getAll: function() {
                return $http({
                        method: "GET",
                        url: "Result/GetAll"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            getOne: function(id) {
                return $http({
                        method: "GET",
                        url: "Result/GetOne?id=" + id
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            checkUserVote: function(categoryId, userId) {
                return $http({
                        method: "GET",
                        url: "Result/CheckUserVote?categoryId=" + categoryId + "&userId=" + userId
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            save: function(result) {
                return $http({
                        method: "POST",
                        data: {
                            result: result
                        },
                        url: "Result/Save/"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }
})();