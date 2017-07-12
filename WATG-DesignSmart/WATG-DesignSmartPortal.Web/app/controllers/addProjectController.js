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

        $scope.isDataSaved = false;
        $scope.isAddFlow = true;

        if ($routeParams.projectId === "0") {
            $scope.isAddFlow = true;
            $scope.project = {
                ProjectName: "",
                ClienttName: "",
                ProjectId: "",
                isActive: "",
                BillingAddress: "",
                ShipAddressRadio: "",
                ShippingAddress: "",
                Terms: "",
                RequiredDeposit: "",
                ShipMethod: "",
                Tax: "",
                QBTaxCode: "",
                SaleAgent: "",
                Currency: "",
                Merchandise: "",
                Labor: "",
                Freight: "",
                MarkupTax: "",
                ReceivingAndDelivery: "",
                Other: "",
                CalcFreight: "",
                EstimatedHours: "",
                EstimatedCost: ""
            };
        } else {
            $scope.project = searchProject($routeParams.projectId);
            $scope.isAddFlow = false;
        }

            $scope.submit = function() {
                if ($scope.form.file.$valid && $scope.file) {
                    $scope.upload($scope.file);
                }
            };
 
            // upload on file select or drop 
            $scope.upload = function (file) {
                Upload.upload({
                    url: 'upload/url',
                    data: {file: file, 'username': $scope.username}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };
            // for multiple files: 
            $scope.uploadFiles = function(files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        Upload.upload({ data: { file: files[i] } });
                    }
                    // or send them all together for HTML5 browsers: 
                    Upload.upload({ data: { file: files } });
                }
            };

        $scope.saveProject = function () {

            //var savedProjectsArr = [];
            if ($scope.project.ProjectId && $scope.project.ProjectName && $scope.project.Location) {
                var savedProjectsArr = '{"ProjectList":[]}';

                if (localStorage.getItem("savedProjects")) {
                    savedProjectsArr = localStorage.getItem("savedProjects");
                }

                var obj = JSON.parse(savedProjectsArr);
                obj.ProjectList.push($scope.project);
                savedProjectsArr = JSON.stringify(obj);

                localStorage.setItem("savedProjects", savedProjectsArr);

                $scope.isDataSaved = true;
            }
            
        };

            function searchProject(projectId) {
                if (JSON.parse(localStorage.getItem("savedProjects"))) {
                    var projectList = JSON.parse(localStorage.getItem("savedProjects"));

                    for (var i = 0; i < projectList.ProjectList.length; i++) {
                        if (projectList.ProjectList[i].ProjectId === projectId) {
                            return projectList.ProjectList[i];
                        }
                    }
                }
                return null;
            }
    }

   
}());