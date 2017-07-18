(function() {
    "use strict";
    var defaultToastrOptions = {
        progressBar: false,
        preventDuplicates: true,
        positionClass: "toast-bottom-right",
        timeOut: 3000
    };
    toastr.options = defaultToastrOptions;

    var modules = [
        "ngRoute",
        "ngFileUpload",
        "angular.filter",
        "agGrid",
        "ngFileUpload"
    ];
    var app = angular.module("watgDesignSmart", modules);
}());