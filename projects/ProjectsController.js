/**
 * Created by Kathleen on 04/02/2015.
 */
'use strict';

MetronicApp.controller('ProjectsController', function ($rootScope, $scope, $http, $timeout, projectService, $stateParams, $filter, $modal, $log, growl) {

    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });

    $scope.addSpecialWarnMessage = function() {
        growl.addWarnMessage("This adds a warn message");
        growl.addInfoMessage("This adds a info message");
        growl.addSuccessMessage("Successful!");
        growl.addErrorMessage("Oops! Something went wrong. Try again?");
    }


    $rootScope.creations = [{
        formMethod: "showFormPackage()",
        name: "New Package"
    },{
        formMethod: "showFormModule()",
        name: "New Module"
    }]

    $scope.sideTab = [{
        page: "General"
    }, {
        page: "Packages"

    }, {
        page: "Modules"
    }]


    $rootScope.sidebar = [
        {
            icon: "briefcase",
            title: $scope.sideTab[0]["page"],
            uri: "#/projects_general/p/" + $stateParams.id
        },
        {
            icon: "puzzle",
            title: "Packages",
            uri: "#/projects_packages/p/" + $stateParams.id
        },
        {
            icon: "refresh",
            title: "Modules",
            uri: "#/projects_modules/p/" + $stateParams.id
        }]


    $http.get("http://larastart.api/api/v1/projects/" + $stateParams.id)
        .success(function (project) {
            $scope.project = project;

            $rootScope.crumbs = [{
                link: "#/dashboard.html",
                name: "Home"
            },
                {
                    link: "#/projects_general/p/" + $stateParams.id,
                    name: $scope.project['name']
                }]

        })



    $http.get("http://larastart.api/api/v1/projects/" + $stateParams.id + "/packages")
        .success(function (packages) {
            $scope.packages = packages;

        })

    $http.get("http://larastart.api/api/v1/projects/" + $stateParams.id + "/modules")
        .success(function (modules) {
            $scope.modules = modules;

        })

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageSidebarClosed = false;

    $scope.packageOptions = [{
        value: "assets",
        text: "Assets"
    }, {
        value: "views",
        text: "Views"
    }, {
        value: "migrations",
        text: "Migrations"
    }, {
        value: "configuration",
        text: "Configuration"
    }];

    $scope.showOptions = function () {
        var selected = [];
        angular.forEach($scope.packageOptions, function (p) {
            if ($scope.packages.options.indexOf(p.value) >= 0) {
                selected.push(p.text);
            }
        });
        return selected.length ? selected.join(', ') : 'Not set';
    };

    $scope.projectTypes = [
        {value: "api", text: 'API'},
        {value: "front-end", text: 'Front-end'}
    ];

    $scope.showTypes = function () {
        var selected = $filter('filter')($scope.projectTypes, {value: $scope.project.type});
        return ($scope.project.type && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.projectVersions = [
        {value: 5.0, text: '5.0'},
        {value: 4.2, text: '4.2'}
    ];

    $scope.showVersions = function () {
        var selected = $filter('filter')($scope.projectVersions, {value: $scope.project.version});
        return ($scope.project.version && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.package0Version = [{
        value: "5.0",
        text: "5.0"
    }, {
        value: "4.2",
        text: "4.2"
    }];

    $scope.showPackageVersion = function () {
        var selected = $filter('filter')($scope.package0Version, {value: $scope.package0Version.version});
        return ($scope.package0Version.version && selected.length) ? selected[0].text : 'Not set';
    };

    //Accordion code
    $scope.oneAtATime = true;

    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };


    $scope.showFormPackage = function () {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);

        var modalInstance = $modal.open({
            templateUrl: 'modal-package-form.html',
            controller: ModalInstancePackageCtrl,
            scope: $scope,
            resolve: {
                packageForm: function () {
                    return $scope.packageForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.showFormModule = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modal-module-form.html',
            controller: ModalInstanceModuleCtrl,
            scope: $scope,
            resolve: {
                moduleForm: function () {
                    return $scope.moduleForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //update project
    $scope.saveProjectName = function (data, id) {

        var dataObject = {
            name: data
        }

        var responsePromise = $http.put("http://larastart.api/api/v1/projects/" + id, dataObject, {});
        responsePromise.success(function (dataFromServer, status, headers, config) {
            console.log('hello there!');
            growl.addSuccessMessage('successful!');
        });

        responsePromise.error(function (data, status, headers, config) {

        });
    }

    ////update package
    //$scope.savePackageName = function(data, id, pid){
    //
    //    var dataObject = {
    //        name : data
    //    }
    //
    //    console.log(id);
    //    console.log(pid);
    //    console.log(dataObject);
    //    //var responsePromise = $http.put("http://larastart.api/api/v1/projects/"+id+"/packages/"+pid, dataObject, {});
    //    //responsePromise.success(function(dataFromServer, status, headers, config) {
    //    //
    //    //});
    //    //
    //    //responsePromise.error(function(data, status, headers, config) {
    //    //
    //    //});
    //}

    $scope.saveProjectVersion = function (data, id) {
        var dataObject = {
            version: data
        }
        console.log(dataObject);
        console.log("http://larastart.api/api/v1/projects/" + id);
        var responsePromise = $http.put("http://larastart.api/api/v1/projects/" + id, dataObject, {});
        responsePromise.success(function (dataFromServer, status, headers, config) {
        });

        responsePromise.error(function (data, status, headers, config) {
        });
    }

    $scope.saveProjectType = function (data, id) {
        var dataObject = {
            type: data
        }
        console.log(dataObject);
        console.log("http://larastart.api/api/v1/projects/" + id);
        var responsePromise = $http.put("http://larastart.api/api/v1/projects/" + id, dataObject, {});
        responsePromise.success(function (dataFromServer, status, headers, config) {
        });

        responsePromise.error(function (data, status, headers, config) {
        });
    }

    //update package
    $scope.savePackage = function (data, id) {
        //$scope.user not updated yet
        angular.extend(data, {id: id});
        console.log(data);
        var dataObject = {
            name: data['name'],
            //version  : data['version'],
            options: {
                assets: data['publish.assets'],
                views: data['publish.views'],
                configuration: data['publish.configuration'],
                migrations: data['publish.migrations']
            }
            //providers: data['providers'],
            //aliases: [
            //    {alias: data['alias']},
            //    {facade: data['facade']}
            //]
        };

        console.log(dataObject);
        console.log(id);
        console.log("http://larastart.api/api/v1/projects/" + $stateParams.id + "/packages/" + id);
        var responsePromise = $http.put("http://larastart.api/api/v1/projects/" + $stateParams.id + "/packages/" + id, dataObject, {});
        responsePromise.success(function (dataFromServer, status, headers, config) {
            alert("Success");
        });

        responsePromise.error(function (data, status, headers, config) {
            alert("No luck :-(");
        });

    }

    // remove package
    $scope.removePackage = function (index, id) {
        $scope.packages.splice(index, 1);

        console.log("http://larastart.api/api/v1/projects/" + $stateParams.id + "/packages/" + id);

        $http.delete("http://larastart.api/api/v1/projects/" + $stateParams.id + "/packages/" + id)
            .success(function (package1) {
                $scope.package1 = package1;

            })

    };

});

var ModalInstancePackageCtrl = function ($scope, $modalInstance, $http, $stateParams, packageForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.packageForm.$valid) {

            $scope.inserted = {
                id: $scope.packages.length + 1,
                name: $scope.name,
                status: null,
                group: null
            };
            $scope.packages.push($scope.inserted);

            var dataObject = {
                name: $scope.name
            };

            var responsePromise = $http.post("http://larastart.api/api/v1/projects/" + $stateParams.id + "/packages", dataObject, {});
            responsePromise.success(function (dataFromServer, status, headers, config) {
            });

            responsePromise.error(function (data, status, headers, config) {
            });

            $modalInstance.close('closed');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var ModalInstanceModuleCtrl = function ($scope, $modalInstance, $http, $stateParams, moduleForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.moduleForm.$valid) {

            $scope.inserted = {
                id: $scope.modules.length + 1,
                name: $scope.name,
                status: null,
                group: null
            };
            $scope.modules.push($scope.inserted);

            var dataObject = {
                name: $scope.name
            };

            var responsePromise = $http.post("http://larastart.api/api/v1/projects/" + $stateParams.id + "/modules", dataObject, {});
            responsePromise.success(function (dataFromServer, status, headers, config) {

            });

            responsePromise.error(function (data, status, headers, config) {

            });


            $modalInstance.close('closed');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};