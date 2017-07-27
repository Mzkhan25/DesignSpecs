(function () {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("addItemController",
        [
            "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
            "itemService",
            addItemController
        ]);
    function
        addItemController($scope,
        $rootScope,
        $routeParams,
        $location,
        $filter,
        $timeout,
        $window,
        itemService) {

        $scope.item = {};
        $scope.item.Image = "";

        $scope.saveItem = function () {
            
            $scope.item.ProjectId = $routeParams.projectId;
            $scope.busyGettingData = true;
            if ($scope.item.ItemName && $scope.item.ItemId) {
                itemService.save($scope.item)
                    .then(function (result) {
                        if (result.data) {
                            $scope.busyGettingData = false;
                            // show success msg
                            toastr.success('Item added successfully');
                        }
                        else {
                            // show error msg
                            toastr.error('Some error occured');
                        }
                    });
                //$scope.isDataSaved = true;
                $scope.readUrl = function(input) {

                    if (input.files && input.files[0]) {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            $scope.imgData = e.target.result;
                            $scope.imgName = input.files[0].name;
                            input.setAttribute("data-title", imgName);
                            console.log(e.target.result);
                        }
                        reader.readAsDataURL(input.files[0]);
                    }

                }
            }

        };

    }
}());