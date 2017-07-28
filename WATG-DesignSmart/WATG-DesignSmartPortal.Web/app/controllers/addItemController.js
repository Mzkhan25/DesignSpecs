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
        $scope.projectId = $routeParams.projectId;
        $scope.busyGettingData = false;
        
        if ($routeParams.itemId)
        {
            $scope.busyGettingData = true;
            itemService.getOne($routeParams.itemId)
                .then(function (result) {
                    $scope.busyGettingData = false;
                    $scope.projectId = result.ProjectId;
                    result.DisplayImage = $rootScope.arrayBufferToBase64(result.DisplayImage);
                    $scope.item = result;
                });
        }
        
        $scope.saveItem = function () {
            
            $scope.item.ProjectId = $routeParams.projectId;
            $scope.item.DisplayImage = $scope.item.Image;
            
            if ($scope.item.ItemName && $scope.item.ItemId) {
                $scope.busyGettingData = true;
                itemService.save($scope.item, $scope.item.Image)
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
                //$scope.readUrl = function(input) {

                //    if (input.files && input.files[0]) {
                //        let reader = new FileReader();
                //        reader.onload = (e) => {
                //            $scope.imgData = e.target.result;
                //            $scope.imgName = input.files[0].name;
                //            input.setAttribute("data-title", imgName);
                //            console.log(e.target.result);
                //        }
                //        reader.readAsDataURL(input.files[0]);
                //    }

                //}
            }

        };

    }
}());