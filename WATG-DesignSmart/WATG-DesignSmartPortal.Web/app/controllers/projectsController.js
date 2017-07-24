(function() {
    "use strict";
    agGrid.initialiseAgGridWithAngular1(angular);
    angular
        .module("watgDesignSmart")
        .controller("projectsController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "projectService",
                "resultService", "categoryService",
                projectsController
            ]);
    function
        projectsController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            projectService,
            resultService,
            categoryService) {
            
            if (!localStorage.getItem("loggedInUsername")) {
                $location.path("/login");
            }

            $scope.busyGettingData = true;
           
            var columnDefs = [
                { headerName: "", field: "", cellRenderer: viewButton, width: 75 },
                { headerName: "Project ID", field: "ProjectId", width: 125 },
                { headerName: "Project Name", field: "ProjectName" },
                { headerName: "Client", field: "ClientName" },
                { headerName: "Location", field: "ProjectLocation" },
                { headerName: "Active", field: "Active", cellRenderer: displayActiveRadio }
            ];

            function viewButton(params) {
                console.log(params);
                return "<a class='btn btn-info' ng-href='#/addUpdateProject?projectId=" + params.data.Id + "'>View</a>";
            }
            
            function displayActiveRadio(params) {
                // need to refactor this bad code
                if (params.data.isActive === "Yes") {
                    return "<div class='form-group'>" +
                        "<label><input type='radio' disabled checked value='Yes'>Yes</label>" +
                        "<label><input type='radio' disabled value='No'>No</label>" +
                        "</div >";
                }
                else if (params.data.isActive === "No") {
                    return "<div class='form-group'>" +
                        "<label><input type='radio' disabled value='Yes'>Yes</label>" +
                        "<label><input type='radio' disabled checked value='No'>No</label>" +
                        "</div >";
                } else {
                    return "<div class='form-group'>" +
                        "<label><input type='radio' disabled value='Yes'>Yes</label>" +
                        "<label><input type='radio' disabled value='No'>No</label>" +
                        "</div >";
                }
            }
        
            var rowData = [];
            
            $scope.gridOptions = {
                columnDefs: columnDefs,
                rowHeight: 38,
                rowData: rowData,
                enableFilter: true,
                enableSorting: true,
                angularCompileRows: true,
                enableColResize: true
            };

            $scope.loadProjects = function() {
                //$scope.busyGettingData = true;
                projectService.getAll()
                    .then(function (result) {
                        rowData = result;
                        $scope.gridOptions.api.setRowData(rowData);
                        $scope.busyGettingData = false;
                    });
            };

            $scope.loadProjects();
        }
}());