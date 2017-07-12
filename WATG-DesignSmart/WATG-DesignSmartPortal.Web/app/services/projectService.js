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
            save: function(project, image, document) {
                Upload.upload({
                    url: "Project/Save",
                    data: { project: project, image: image, document: document }
                }).then(function(resp) {
                    $rootScope.projectUploaded();
                });
            }
        };
    }
})();