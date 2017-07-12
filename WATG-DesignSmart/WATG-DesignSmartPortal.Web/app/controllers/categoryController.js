(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("categoryController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
                "categoryService",
                categoryController
            ]);
    function
        categoryController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            categoryService) {
            $scope.categoryList = [];
            $scope.busyGettingData = true;
            $rootScope.arrayBufferToBase64 = function(buffer) {
                var binary = "";
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            };
            $scope.loadProjects = function(id) {
                $location.path("/projects/" + id);
            };
            function getAll() {
                $scope.busyGettingData = true;
                categoryService.getAll()
                    .then(function(results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].Image = $rootScope.arrayBufferToBase64(results[i].Image);
                        }
                        $scope.records = results;
                        $rootScope.categories = results;
                        $scope.busyGettingData = false;
                    });
            }
            $rootScope.validate();
            getAll();
        }
}());