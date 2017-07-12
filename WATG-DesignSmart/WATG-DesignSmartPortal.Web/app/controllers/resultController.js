(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("resultController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "resultService",
                resultController
            ]);
    function
        resultController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            resultService) {
            var getResults = function() {
                resultService.getAll()
                    .then(function(result) {
                        $scope.resultList = result;
                        $scope.busyGettingData = false;
                    });
            };
            $scope.busyGettingData = true;
            $rootScope.validate();
            getResults();
        }
}());