(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("addUserController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "userService",
                addUserController
            ]);
    function
        addUserController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            userService) {
            $scope.busyGettingData = false;
            $scope.roles = [{ Id: 0, Name: "Admin" }, { Id: 1, Name: "User" }];
            $scope.saveUser = function() {
                $scope.busyGettingData = true;
                userService.save($scope.User)
                    .then(function(result) {
                        if (result === true)
                            $scope.User = [];
                        else
                            alert("Unable to save user, kindly try again");
                        $scope.busyGettingData = false;
                    });
            };
            $rootScope.validate();
        }
}());