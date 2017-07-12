(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("projectDetailController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "projectService",
                projectDetailController
            ]);
    function
        projectDetailController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            projectService) {
            $scope.busyGettingData = true;
            $scope.projectId = $routeParams.projectId;
            var getProjectById = function() {
                projectService.getById($scope.projectId)
                    .then(function(result) {
                        result[0].DisplayImage = $rootScope.arrayBufferToBase64(result[0].DisplayImage);
                        $scope.project = result[0];
                        $scope.busyGettingData = false;
                    });
            };
            $scope.getProject = function() {
                $window.open($scope.project.PdfPath);
            };
            $rootScope.validate();
            getProjectById();
        }
}());