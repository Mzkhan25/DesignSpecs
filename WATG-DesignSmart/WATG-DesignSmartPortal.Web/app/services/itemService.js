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
                    url: "Category/GetAll"
                })
                    .then(function (response) {
                        return response.data;
                    });
            },
            getOne: function (id) {
                return $http({
                    method: "GET",
                    url: "Category/GetOne?id=" + id
                })
                    .then(function (response) {
                        return response.data;
                    });
            },
            save: function (item) {
                return Upload.upload({
                    url: "Item/Save",
                    data: { item: item}
                })
            },
            delete: function (id) {
                return $http({
                    method: "POST",
                    data: {
                        id: id
                    },
                    url: "Category/Delete?id=" + id
                })
                    .then(function (response) {
                        return response.data;
                    });
            }
        };
    }
})();