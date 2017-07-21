(function () {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("addProjectController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window","Upload",
                "categoryService", "projectService",
                addProjectController
            ]);
    function 
        addProjectController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            Upload,
            categoryService,
            projectService) {

        if (!localStorage.getItem("loggedInUsername")) {
            $location.path("/login");
        }

        $scope.busyGettingData = true;

        $scope.isAddFlow = true;
       
        if ($routeParams.projectId === "0") {
            $scope.isAddFlow = true;
            $scope.project = {
                BillingAddress: "",
                ClientName: "",
                CurrencyId: "",
                EstimatedCost: "",
                EstimatedHours: "",
                IsActive: "",
                ProjectId: "",
                ProjectLocation: "",
                ProjectName: "",
                QBTaxCode: "",
                RequiredDeposit: "",
                SaleAgent: "",
                ShipMethod: "",
                ShipToAddress: "",
                ShipToPlace: "",
                TaxPercentage: "",
                Terms: "",
                Tax: "",
                Merchandise: "",
                Labor: "",
                Freight: "",
                MarkupTax: "",
                ReceivingAndDelivery: "",
                Other: "",
                CalcFreight: "",
                DisplayImage: "",
                ProjectImage: ""
            };
        } else {
            searchProject($routeParams.projectId);
            $scope.isAddFlow = false;
        }

        $scope.uploadPic = function (file) {
            if (file && $scope.currency)
                projectService.uploadImage(file, $scope.currency);
        };

        $scope.saveProject = function () {
            
            //var savedProjectsArr = [];
            if ($scope.project.ProjectId && $scope.project.ProjectName && $scope.project.ProjectLocation) {
                projectService.save($scope.project, $scope.project.ProjectImage)
                    .then(function (result) {
                        if(result.data){
                            // show success msg
                            toastr.success('Project added successfully');
                        }
                        else {
                            // show error msg
                            toastr.error('Some error occured');
                        }
                });
                //$scope.isDataSaved = true;

            }
            
        };

        function searchProject(projectId) {
            projectService.getById(projectId)
                .then(function (result) {
                    result.DisplayImage = $rootScope.arrayBufferToBase64(result.DisplayImage);
                    $scope.project = result;
                    $scope.busyGettingData = false;
                });
        }

        $scope.generatePdf = function () {
            $location.host();
            var path = "/default.html#/generatePdf?projectId=" + $routeParams.projectId;
            window.open(path, '_blank');  
        };
      
    }

   
}());