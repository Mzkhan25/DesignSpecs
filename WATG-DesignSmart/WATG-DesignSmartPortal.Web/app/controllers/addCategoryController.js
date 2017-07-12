(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("addCategoryController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
                "categoryService",
                addCategoryController
            ]);
    function
        addCategoryController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            categoryService) {
            function getAll() {
                $scope.busyGettingData = true;
                categoryService.getAll()
                    .then(function(results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].Image = $rootScope.arrayBufferToBase64(results[i].Image);
                        }
                        $scope.records = results;
                        $scope.busyGettingData = false;
                    });
            }
            $scope.uploadPic = function(file) {
                if ($scope.categoryImage && $scope.categoryName)
                    categoryService.save(file, $scope.categoryName);
            };
            $rootScope.categoryUploaded = function() {
                getAll();
            };
            $scope.modalClicked = function(shortCurrencyName, imageBlob) {
                $scope.shortCurrencyName = shortCurrencyName;
                $scope.imageBlob = imageBlob;
            };
            $scope.delete = function(id) {
                categoryService.delete(id)
                    .then(function(result) {
                        $scope.categoryImage = "";
                        $scope.categoryName = "";
                        getAll();
                    });
            };
            $rootScope.validate();
            getAll();
        }
}());