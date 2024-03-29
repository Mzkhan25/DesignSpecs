(function() {
    "use strict";
    var modules = [
        "ngRoute",
        "ngFileUpload",
        "angular.filter",
        "agGrid",
        "ngFileUpload"
    ];
    var app = angular.module("watgDesignSmart", modules);
}());
(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("addCategoryController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
                "categoryService",
                addCategoryController
            ]);
    function
        addCategoryController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            categoryService) {
            function getAll() {
                $scope.busyGettingData = true;
                categoryService.getAll()
                    .then(function(results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].Image = $rootScope.arrayBufferToBase64(results[i].Image);
                        }
                        $scope.records = results;
                        $scope.busyGettingData = false;
                    });
            }
            $scope.uploadPic = function(file) {
                if ($scope.categoryImage && $scope.categoryName)
                    categoryService.save(file, $scope.categoryName);
            };
            $rootScope.categoryUploaded = function() {
                getAll();
            };
            $scope.modalClicked = function(shortCurrencyName, imageBlob) {
                $scope.shortCurrencyName = shortCurrencyName;
                $scope.imageBlob = imageBlob;
            };
            $scope.delete = function(id) {
                categoryService.delete(id)
                    .then(function(result) {
                        $scope.categoryImage = "";
                        $scope.categoryName = "";
                        getAll();
                    });
            };
            $rootScope.validate();
            getAll();
        }
}());
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
(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("addUserController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "userService",
                addUserController
            ]);
    function
        addUserController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            userService) {
            $scope.busyGettingData = false;
            $scope.roles = [{ Id: 0, Name: "Admin" }, { Id: 1, Name: "User" }];
            $scope.saveUser = function() {
                $scope.busyGettingData = true;
                userService.save($scope.User)
                    .then(function(result) {
                        if (result === true)
                            $scope.User = [];
                        else
                            alert("Unable to save user, kindly try again");
                        $scope.busyGettingData = false;
                    });
            };
            $rootScope.validate();
        }
}());
(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("categoryController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window",
                "categoryService",
                categoryController
            ]);
    function
        categoryController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            categoryService) {
            $scope.categoryList = [];
            $scope.busyGettingData = true;
            $rootScope.arrayBufferToBase64 = function(buffer) {
                var binary = "";
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            };
            $scope.loadProjects = function(id) {
                $location.path("/projects/" + id);
            };
            function getAll() {
                $scope.busyGettingData = true;
                categoryService.getAll()
                    .then(function(results) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].Image = $rootScope.arrayBufferToBase64(results[i].Image);
                        }
                        $scope.records = results;
                        $rootScope.categories = results;
                        $scope.busyGettingData = false;
                    });
            }
            $rootScope.validate();
            getAll();
        }
}());
(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("loginController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "userService",
                loginController
            ]);
    function
        loginController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            userService) {
            
            if (localStorage.getItem("loggedInUsername")) {
                $location.path("/projects");
            }

            $scope.userAccountName = "";
            $scope.userPassword = "";
            $scope.result = "";
            $scope.invalidUserMsg =
                "Invalid account name or password";
            $scope.invalidPINFlag = false;
            $scope.busyGettingData = false;
            $scope.login = function () {
                if ($scope.userAccountName && $scope.userPassword) {
                    $scope.busyGettingData = true;

                    if ($scope.userAccountName === "atariq" && $scope.userPassword === "abcd1234") {

                        localStorage.setItem('loggedInUsername', $scope.userAccountName);
                        $location.path("/projects");
                    } else {
                        $scope.result = false;
                    }
                    $scope.busyGettingData = false;
                    //userService.login($scope.userAccountName, $scope.userPassword)
                    //    .then(function (result) {
                    //        $scope.busyGettingData = false;
                    //        $scope.result = result;
                    //        if (result === true) {
                    //            localStorage.setItem('loggedInUsername', $scope.userAccountName);
                    //            $location.path("/projects");
                    //        }
                    //    });
                }
            };
        }
}());
(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("projectDetailController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "projectService",
                projectDetailController
            ]);
    function
        projectDetailController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            projectService) {
            $scope.busyGettingData = true;
            $scope.projectId = $routeParams.projectId;
            var getProjectById = function() {
                projectService.getById($scope.projectId)
                    .then(function(result) {
                        result[0].DisplayImage = $rootScope.arrayBufferToBase64(result[0].DisplayImage);
                        $scope.project = result[0];
                        $scope.busyGettingData = false;
                    });
            };
            $scope.getProject = function() {
                $window.open($scope.project.PdfPath);
            };
            $rootScope.validate();
            getProjectById();
        }
}());
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

            $scope.busyGettingData = false;
           
            var columnDefs = [
                { headerName: "", field: "", cellRenderer: viewButton, width: 75 },
                { headerName: "Project ID", field: "ProjectId", width: 125 },
                { headerName: "Project Name", field: "ProjectName" },
                { headerName: "Client", field: "ClientName" },
                { headerName: "Location", field: "Location" },
                { headerName: "Active", field: "Active", cellRenderer: displayActiveRadio }
            ];

            function viewButton(params) {
                console.log(params);
                return "<a class='btn btn-info' ng-href='#/addUpdateProject?projectId=" + params.data.ProjectId + "'>View</a>";
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

            //var rowData = [
            //    { ProjectId: 15502, ProjectName: "Four Season Bevely Hills", Client: "", Location: "New York City", Active: true },
            //    { ProjectId: 15503, ProjectName: "Four Seasons Resort Maul", Client: "", Location: "New York City", Active: false },
            //    { ProjectId: 15504, ProjectName: "Grenada Resort Showroom", Client: "", Location: "New York City", Active: true }
            //];

            var rowData = [];
            
            if (localStorage.getItem("savedProjects")) {
                var obj = JSON.parse(localStorage.getItem("savedProjects"));
                rowData = obj.ProjectList;
            }
            

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
                $scope.busyGettingData = true;
               
            };
       
        }
}());
(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .controller("resultController",
            [
                "$scope", "$rootScope", "$routeParams", "$location", "$filter", "$timeout", "$window", "resultService",
                resultController
            ]);
    function
        resultController($scope,
            $rootScope,
            $routeParams,
            $location,
            $filter,
            $timeout,
            $window,
            resultService) {
            var getResults = function() {
                resultService.getAll()
                    .then(function(result) {
                        $scope.resultList = result;
                        $scope.busyGettingData = false;
                    });
            };
            $scope.busyGettingData = true;
            $rootScope.validate();
            getResults();
        }
}());
(function() {
    var app = angular.module("watgDesignSmart");
    app.config(["$httpProvider", "$routeProvider", "$locationProvider", appConfig]);
    app.run([
        "$rootScope", "$location", "$interval", "$filter", "appService", appRun
    ]);
    function appConfig($httpProvider, $routeProvider, $locationProvider) {
        $httpProvider.defaults.useXDomain = true;
        //To resolve 2f issue
        $locationProvider.hashPrefix("");
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $routeProvider.when("/category",
                {
                    templateUrl: "app/views/category.html",
                    controller: "categoryController"
                })
            .when("/login",
                {
                    templateUrl: "app/views/login.html",
                    controller: "loginController"
                })
            .when("/projects",
                {
                    templateUrl: "app/views/projects.html",
                    controller: "projectsController"
                })
            .when("/addCategory",
                {
                    templateUrl: "app/views/addCategory.html",
                    controller: "addCategoryController"
                })
            .when("/addUser",
                {
                    templateUrl: "app/views/addUser.html",
                    controller: "addUserController"
                })
            .when("/addUpdateProject/:projectId?",
                {
                    templateUrl: "app/views/addProject.html",
                    controller: "addProjectController"
                })
            .when("/projectDetail/:projectId?",
                {
                    templateUrl: "app/views/projectDetail.html",
                    controller: "projectDetailController"
                })
            .when("/results",
                {
                    templateUrl: "app/Views/results.html",
                    controller: "resultController"
                })
            .otherwise({ redirectTo: "/login" });
    }
    function appRun($rootScope,
        $location,
        $interval,
        $filter,
        appService) {
        $rootScope.pageTitle = "WATG| Design Awards";
        $rootScope.form = {};
        $rootScope.user = {};
        $rootScope.userApplicationRoles = [];
        $rootScope.currentRoute = "/Login";
        $rootScope.user = "unauthorized";
        $rootScope.arrayBufferToBase64 = function(buffer) {
            var binary = "";
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        };
        $rootScope.validate = function() {
            if ($rootScope.user === "unauthorized")
                $location.path("/login");
        };
        $rootScope.logOut = function() {
            $rootScope.user = "unauthorized";
            $location.path("/login");
        };
      
        $rootScope.signOut = function() {
            //localStorage.clear();
            localStorage.setItem("loggedInUsername","");
            $location.path("/login");
        };
    }
})();
angular.module('watgDesignAwardsConst', [])

.constant('CONST_WATGXRESTAPIURL', 'http://localhost:8080/api')

.constant('CONST_RESOURCEURL', 'http://localhost:8081')

.constant('CONST_LOGSENABLED', true)

.constant('CONST_W1_STAFF_PROFILE_URL', 'http://itstage.watg.com/watg1/#teamMemberDetails/')

;
(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .factory("appService", ["$http", "$rootScope", appService]);
    function appService($http, $rootScope) {
        return {
            makeNecessarryFolders: function() {
                return $http({
                        method: "GET",
                        url: "Util/MakeNecessarryFolders"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }
})();
(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .factory("categoryService", ["$http", "Upload", "$rootScope", categoryService]);
    function categoryService($http, Upload, $rootScope) {
        return {
            getAll: function() {
                return $http({
                        method: "GET",
                        url: "Category/GetAll"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            getOne: function(id) {
                return $http({
                        method: "GET",
                        url: "Category/GetOne?id=" + id
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            save: function(file, name) {
                Upload.upload({
                    url: "Category/Save",
                    data: { name: name, file: file }
                }).then(function(resp) {
                    $rootScope.categoryUploaded();
                });
            },
            delete: function(id) {
                return $http({
                        method: "POST",
                        data: {
                            id: id
                        },
                        url: "Category/Delete?id=" + id
                    })
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }
})();
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
(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .factory("resultService", ["$http", "$rootScope", resultService]);
    function resultService($http, $rootScope) {
        return {
            getAll: function() {
                return $http({
                        method: "GET",
                        url: "Result/GetAll"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            getOne: function(id) {
                return $http({
                        method: "GET",
                        url: "Result/GetOne?id=" + id
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            checkUserVote: function(categoryId, userId) {
                return $http({
                        method: "GET",
                        url: "Result/CheckUserVote?categoryId=" + categoryId + "&userId=" + userId
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            save: function(result) {
                return $http({
                        method: "POST",
                        data: {
                            result: result
                        },
                        url: "Result/Save/"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }
})();
(function() {
    "use strict";
    angular
        .module("watgDesignSmart")
        .factory("userService", ["$http", "$rootScope", userService]);
    function userService($http, $rootScope) {
        return {
            getAll: function() {
                return $http({
                        method: "GET",
                        url: "User/GetAll"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            login: function(accountName, password) {
                return $http({
                        method: "GET",
                        url: "User/Login?accountName="+accountName+"&password=" + password
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            save: function(user) {
                return $http({
                        method: "POST",
                        data: {
                            user: user
                        },
                        url: "User/Save/"
                    })
                    .then(function(response) {
                        return response.data;
                    });
            },
            delete: function(id) {
                return $http({
                        method: "POST",
                        data: {
                            id: id
                        },
                        url: "User/Delete?id=" + id
                    })
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }
})();