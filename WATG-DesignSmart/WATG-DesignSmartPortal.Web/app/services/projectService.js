(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .factory("projectService", ["$http", "Upload", "$rootScope", projectService]);
    function projectService($http, Upload, $rootScope) {
        return {
            getAll: function() {
                return $http({
                        method: "GET",
                        url: "Project/GetAll"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            getByCategory: function(id) {
                return $http({
                        method: "GET",
                        url: "Project/GetByCategory?id=" + id
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            getById: function(id) {
                return $http({
                        method: "GET",
                        url: "Project/GetById?id=" + id
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            save: function (project, image) {
               return Upload.upload({
                    url: "Project/Save",
                    data: { project: project, image: image}
                }).then(function(resp) {
                   // $rootScope.projectUploaded();
                    return resp;
                });
            },
            uploadImage: function (file, currency) {
                Upload.upload({
                    url: "BenefitsImage/Save",
                    data: { currency: currency, file: file }
                }).then(function (resp) {
                    $rootScope.log("Success", "Benefits Image saved successfully", "log", "toast");
                    $rootScope.uploaded();
                },
                    function (resp) {
                        $rootScope.log("Error", "Failed to save budget " + resp.status, "error", "toast");
                    });
            }
        };
    }
})();