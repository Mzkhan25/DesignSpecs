(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .factory("appService", ["$http", "$rootScope", appService]);
    function appService($http, $rootScope) {
        return {
            makeNecessarryFolders: function() {
                return $http({
                        method: "GET",
                        url: "Util/MakeNecessarryFolders"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }
})();