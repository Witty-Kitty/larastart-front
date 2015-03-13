/**
 * Created by Kathleen on 07/02/2015.
 */

'use strict';

MetronicApp.controller('RequestsController', function($rootScope, $scope, $http, $timeout, projectService, $stateParams, $filter, $modal, $log) {


    $scope.$on('$viewContentLoaded', function() {
        Metronic.initAjax(); // initialize core components
    });




    $rootScope.sidebar = [
        {
            icon: "briefcase",
            title: "Routes",
            uri: "#/requests_routes/p/"+$stateParams.id+"/m/"+$stateParams.mid+"/r/"+$stateParams.rid
        },
        {
            icon: "puzzle",
            title: "Controllers",
            uri: "#/requests_controllers/p/"+$stateParams.id+"/m/"+$stateParams.mid+"/r/"+$stateParams.rid
        },
        {
            icon: "refresh",
            title: "Views",
            uri: "#/requests_views/p/"+$stateParams.id+"/m/"+$stateParams.mid+"/r/"+$stateParams.rid
        },
        {
            icon: "puzzle",
            title: "Transformers",
            uri: "#/requests_transformers/p/"+$stateParams.id+"/m/"+$stateParams.mid+"/r/"+$stateParams.rid
        }
    ]

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id)
        .success(function(project) {
            $scope.project = project;

            $http.get("http://larastart.api/api/v1/projects/" + $stateParams.id + "/modules/" + $stateParams.mid)
                .success(function (module) {
                    $scope.module = module[0];

                    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/requests/"+$stateParams.rid)
                        .success(function(request) {
                            $scope.request = request[0];

                            $rootScope.crumbs = [{
                                link: "#/dashboard.html",
                                name: "Home"
                            },
                                {
                                    link: "#/projects_general/p/" + $stateParams.id,
                                    name: $scope.project['name']
                                }, {
                                    link: "#/projects_modules/p/"+$stateParams.id,
                                    name: 'Modules'
                                }, {
                                    link: "#/module_general/p/"+$stateParams.id+"/m/"+$stateParams.mid,
                                    name: $scope.module['name']
                                }, {
                                    link: "#/module_requests/p/"+$stateParams.id+"/m/"+$stateParams.mid,
                                    name: 'Requests'
                                }, {
                                    link: "#/requests_routes/p/" + $stateParams.id+"/m/"+$stateParams.mid+"/r/"+$stateParams.rid,
                                    name: $scope.request['name']
                                }]
                        })
                })
        })

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/requests/"+$stateParams.rid+"/controllers")
        .success(function(controllers) {
            $scope.controllers = controllers;

        })

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/requests/"+$stateParams.rid+"/views")
        .success(function(views) {
            $scope.views = views;

        })

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/requests/"+$stateParams.rid+"/transformers")
        .success(function(transformers) {
            $scope.transformers = transformers;

        })

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/requests/"+$stateParams.rid+"/routes")
        .success(function(routes) {
            $scope.routes = routes;

        })

    $scope.controllerData = [{
        value: "source",
        text: "Source"
    },{
        value: "function",
        text: "Function"
    }];

    $scope.showData = function() {
        var selected = $filter('filter')($scope.controllerData, {value: $scope.controllerData.data});
        return ($scope.controllerData.data && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.viewTypes = [{
        value: "form",
        text: "Form"
    },{
        value: "table",
        text: "Table"
    }];

    $scope.showTypes = function() {
        var selected = $filter('filter')($scope.viewTypes, {value: $scope.viewTypes.type});
        return ($scope.viewTypes.type && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.viewFields = [{
        value: "name",
        text: "Name"
    },{
        value: "source",
        text: "Source"
    },{
        value: "type",
        text: "Type"
    },{
        value: "attribute",
        text: "Attribute"
    }];

    $scope.showFields = function() {
        var selected = $filter('filter')($scope.viewFields, {value: $scope.viewFields.field});
        return ($scope.viewFields.field && selected.length) ? selected[0].text : 'Not set';
    };

    // add route
    $scope.addRoute = function() {
        $scope.inserted = {
            id: $scope.routes.length+1,
            name: '',
            status: null,
            group: null
        };
        $scope.routes.push($scope.inserted);
    };



    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageSidebarClosed = false;

    //Accordion code
    $scope.oneAtATime = true;

    $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    // remove controller
    $scope.removeController = function(index) {
        $scope.controllers.splice(index, 1);
    };

    // remove view
    $scope.removeView = function(index) {
        $scope.views.splice(index, 1);
    };

    // remove transformer
    $scope.removeTransformer = function(index) {
        $scope.transformers.splice(index, 1);
    };

    $scope.showFormController = function () {;

        var modalInstance = $modal.open({
            templateUrl: 'modal-controller-form.html',
            controller: ModalInstanceControllerCtrl,
            scope: $scope,
            resolve: {
                controllerForm: function () {
                    return $scope.controllerForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.showFormView = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modal-view-form.html',
            controller: ModalInstanceViewCtrl,
            scope: $scope,
            resolve: {
                viewForm: function () {
                    return $scope.viewForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.showFormTransformer = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modal-transformer-form.html',
            controller: ModalInstanceTransformerCtrl,
            scope: $scope,
            resolve: {
                transformerForm: function () {
                    return $scope.transformerForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});

var ModalInstanceControllerCtrl = function ($scope, $modalInstance, $http, $stateParams, controllerForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.controllerForm.$valid) {

            $scope.inserted = {
                id: $scope.controllers.length+1,
                name: $scope.name,
                status: null,
                group: null
            };
            $scope.controllers.push($scope.inserted);

            var dataObject = {
                name : $scope.name
            };

            var responsePromise = $http.post("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/requests/"+$stateParams.rid+"/controllers", dataObject, {});
            responsePromise.success(function(dataFromServer, status, headers, config) {
            });

            responsePromise.error(function(data, status, headers, config) {
            });

            $modalInstance.close('closed');
        } else {
            console.log('controller form is not in scope');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var ModalInstanceViewCtrl = function ($scope, $modalInstance, $http, $stateParams, viewForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.viewForm.$valid) {

            $scope.inserted = {
                id: $scope.views.length+1,
                name: $scope.name,
                status: null,
                group: null
            };
            $scope.views.push($scope.inserted);

            var dataObject = {
                name : $scope.name
            };

            var responsePromise = $http.post("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/requests/"+$stateParams.rid+"/views", dataObject, {});
            responsePromise.success(function(dataFromServer, status, headers, config) {
            });

            responsePromise.error(function(data, status, headers, config) {
            });

            $modalInstance.close('closed');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var ModalInstanceTransformerCtrl = function ($scope, $modalInstance, $http, $stateParams, transformerForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.transformerForm.$valid) {

            $scope.inserted = {
                id: $scope.transformers.length+1,
                name: $scope.name,
                status: null,
                group: null
            };
            $scope.transformers.push($scope.inserted);

            var dataObject = {
                name : $scope.name
            };

            var responsePromise = $http.post("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/requests/"+$stateParams.rid+"/transformers", dataObject, {});
            responsePromise.success(function(dataFromServer, status, headers, config) {
            });

            responsePromise.error(function(data, status, headers, config) {
            });

            $modalInstance.close('closed');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
