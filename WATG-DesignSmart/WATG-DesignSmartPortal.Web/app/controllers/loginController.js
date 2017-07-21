(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("loginController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "userService",
                loginController
            ]);
    function
        loginController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            userService) {
            
            if (localStorage.getItem("loggedInUsername")) {
                $location.path("/projects");
            }

            $scope.userAccountName = "";
            $scope.userPassword = "";
            $scope.result = "";
            $scope.invalidUserMsg =
                "Invalid account name or password";
            $scope.invalidPINFlag = false;
            $scope.busyGettingData = false;
            $scope.login = function () {
                if ($scope.userAccountName && $scope.userPassword) {
                    $scope.busyGettingData = true;

                    if ($scope.userAccountName === "atariq" && $scope.userPassword === "abcd1234") {

                        localStorage.setItem('loggedInUsername', $scope.userAccountName);
                        $location.path("/projects");
                    } else {
                        $scope.result = false;
                    }
                    $scope.busyGettingData = false;

                    //userService.login($scope.userAccountName, $scope.userPassword)
                    //    .then(function (result) {
                    //        $scope.busyGettingData = false;
                    //        $scope.result = result;
                    //        if (result === true) {
                    //            localStorage.setItem('loggedInUsername', $scope.userAccountName);
                    //            $location.path("/projects");
                    //        }
                    //    });
                }
            };
        }
}());