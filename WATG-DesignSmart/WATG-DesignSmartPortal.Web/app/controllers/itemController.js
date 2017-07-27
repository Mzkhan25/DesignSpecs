(function () {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("itemController",
        [
            "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
            "itemService",
            itemController
        ]);
    function
        itemController($scope,
        $rootScope,
        $routeParams,
        $location,
        $filter,
        $timeout,
        $window,
        itemService) {

        $scope.projectId = $routeParams.projectId;

        var columnDefs = [
            { headerName: "", field: "", cellRenderer: viewButton, width: 100 },
            { headerName: "", field: "", cellRenderer: viewSubItemButton, width: 190 },
            { headerName: "Item #", field: "ItemId"},
            { headerName: "Item Name", field: "ItemName", width: 125 },
            { headerName: "Estimated Qty", field: "EstimatedQty" },
            { headerName: "Area", field: "Area" },
            { headerName: "Type", field: "Type" },
            { headerName: "Category", field: "Category" },
            { headerName: "EstimatedUnitCost", field: "EstimatedUnitCost" },
            { headerName: "InvoiceUnitCost", field: "InvoiceUnitCost" },
        ];

        //var columnDefs = [
        //    { headerName: "Group", field: 'group', cellRenderer: 'group' },
        //    { headerName: "Athlete", field: "athlete" },
        //    { headerName: "Year", field: "year" },
        //    { headerName: "Country", field: "country" }
        //];

        function getNodeChildDetails(rowItem) {
            if (rowItem.participants) {
                return {
                    group: true,
                    // open C be default
                    expanded: rowItem.group === 'Group C',
                    // provide ag-Grid with the children of this group
                    children: rowItem.participants,
                    // the key is used by the default group cellRenderer
                    key: rowItem.group
                };
            } else {
                return null;
            }
        }

        function onFilterChanged(value) {
            gridOptions.api.setQuickFilter(value);
        }

        // setup the grid after the page has finished loading
        document.addEventListener('DOMContentLoaded', function () {
            var gridDiv = document.querySelector('#myGrid');
            new agGrid.Grid(gridDiv, gridOptions);
        });


        function viewButton(params) {
            console.log(params);
            return "<a class='btn btn-info' ng-href='#/addItem?itemId=" + params.data.Id + "'>View</a>";
        }

        function viewSubItemButton(params) {
            console.log(params);
            localStorage.setItem("isAddSubItemFlow", true);
            localStorage.setItem("savedProjectId", $scope.projectId);
            return "<a class='btn btn-info' ng-href='#/addSubItem?itemId=" + params.data.Id + "'>Add Sub Item</a>";
        }
        
        var rowData = [];

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowHeight: 38,
            rowData: rowData,
            enableFilter: true,
            enableSorting: true,
            angularCompileRows: true,
            enableColResize: true,
            getNodeChildDetails: getNodeChildDetails,
            onGridReady: function (params) {
                params.api.sizeColumnsToFit();
            }
        };
        
        $scope.loadItems = function (projectId) {
            //$scope.busyGettingData = true;
            itemService.getAllByProjectId(projectId)
                .then(function (result) {
                    rowData = result;
                    //rowData = [
                    //    {
                    //        group: 'Group A',
                    //        participants: [
                    //            { group: 'A.1', athlete: 'Michael Phelps', year: '2008', country: 'United States' },
                    //            { group: 'A.2', athlete: 'Michael Phelps', year: '2008', country: 'United States' },
                    //            { group: 'A.3', athlete: 'Michael Phelps', year: '2008', country: 'United States' }
                    //        ]
                    //    },
                    //    {
                    //        group: 'Group B', athlete: 'Mix of Names', year: '2000..2012', country: 'Group Country',
                    //        participants: [
                    //            { group: 'B.1', athlete: 'Natalie Coughlin', year: '2008', country: 'United States' },
                    //            { group: 'B.2', athlete: 'Missy Franklin ', year: '2012', country: 'United States' },
                    //            { group: 'B.3', athlete: 'Ole Einar Qjorndalen', year: '2002', country: 'Norway' },
                    //            { group: 'B.4', athlete: 'Marit Bjorgen', year: '2010', country: 'Norway' },
                    //            { group: 'B.5', athlete: 'Ian Thorpe', year: '2000', country: 'Australia' }
                    //        ]
                    //    },
                    //    {
                    //        group: 'Group C',
                    //        participants: [
                    //            { group: 'C.1', athlete: 'Janica Kostelic', year: '2002', country: 'Crotia' },
                    //            { group: 'C.2', athlete: 'An Hyeon-Su', year: '2006', country: 'South Korea' }
                    //        ]
                    //    }
                    //];

                    $scope.gridOptions.api.setRowData(rowData);
                    $scope.busyGettingData = false;
                });
        };

        $scope.loadItems($routeParams.projectId);

    }
}());