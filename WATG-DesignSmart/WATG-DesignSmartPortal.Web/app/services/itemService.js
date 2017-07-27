(function () {
    "use strict";
    angular
        .module("watgDesignSmart")
        .factory("itemService", ["$http", "Upload", "$rootScope", itemService]);
    function itemService($http, Upload, $rootScope) {
        return {
            getAll: function () {
                return $http({
                    method: "GET",
                    url: "Item/GetAll"
                })
                    .then(function (response) {
                        return response.data;
                    });
            },
            getAllByProjectId: function (id) {
                return $http({
                    method: "GET",
                    url: "Item/GetAllByProjectId?projectId=" + id
                })
                    .then(function (response) {
                        return response.data;
                    });
            },
            getOne: function (id) {
                return $http({
                    method: "GET",
                    url: "Item/GetOne?id=" + id
                })
                    .then(function (response) {
                        return response.data;
                    });
            },
            save: function (item, image) {
                return Upload.upload({
                    url: "Item/Save",
                    data: { item: item, image: image }
                });
            },
            delete: function (id) {
                return $http({
                    method: "POST",
                    data: {
                        id: id
                    },
                    url: "Item/Delete?id=" + id
                })
                    .then(function (response) {
                        return response.data;
                    });
            }
        };
    }
})();