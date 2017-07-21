(function () {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("generatePdfController",
        [
            "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "Upload",
            "categoryService", "projectService",
            generatePdfController
        ]);
    function
        generatePdfController($scope,
        $rootScope,
        $routeParams,
        $location,
        $filter,
        $timeout,
        $window,
        Upload,
        categoryService,
        projectService) {

        if ($routeParams.projectId)
        {
            projectService.getById($routeParams.projectId)
                .then(function (result) {
                    console.log("generate pdf: " + result);
                    result.DisplayImage = $rootScope.arrayBufferToBase64(result.DisplayImage);
                    $scope.project = result;
                });
        }
      
        $scope.generatePdf = function () {
            console.log("inside pdf");
            html2canvas(document.getElementById('export-this'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 800,
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("ProjectDetails.pdf");
                    
                }
            });
        };


    }


}());