/**
 * Created by Kathleen on 07/02/2015.
 */

'use strict';

MetronicApp.controller('ModuleController', function($rootScope, $scope, $http, $timeout, projectService, $stateParams, $state, $modal, $log) {

    var project;

    $scope.$on('$viewContentLoaded', function() {
        Metronic.initAjax(); // initialize core components
    });




    $rootScope.sidebar = [
        {
            icon: "briefcase",
            title: "General",
            uri: "#/module_general/p/"+$stateParams.id+"/m/"+$stateParams.mid
        },
        {
            icon: "puzzle",
            title: "Entities",
            uri: "#/module_entities/p/"+$stateParams.id+"/m/"+$stateParams.mid
        },
        {
            icon: "refresh",
            title: "Requests",
            uri: "#/module_requests/p/"+$stateParams.id+"/m/"+$stateParams.mid
        }
    ]


    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id)
        .success(function(project){
            $scope.project = project;

            $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid)
                .success(function(module) {
                    $scope.module = module[0];


            $rootScope.crumbs = [{
                link: "#/dashboard.html",
                name: "Home"
            },
                {
                    link: "#/projects_general/p/"+$stateParams.id,
                    name: $scope.project['name']
                },{
                    link: "#/projects_modules/p/"+$stateParams.id,
                    name: 'Modules'
                },{
                    link: "#/module_general/p/"+$stateParams.id+"/m/"+$stateParams.mid,
                    name: $scope.module['name']
                }]

                })

        })

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/entities")
        .success(function(entities) {
            $scope.entities = entities;

        })

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/requests")
        .success(function(requests) {
            $scope.requests = requests;

        })

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageSidebarClosed = false;

    $scope.showFormEntity = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modal-entity-form.html',
            controller: ModalInstanceEntityCtrl,
            scope: $scope,
            resolve: {
                entityForm: function () {
                    return $scope.entityForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.showFormRequest = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modal-request-form.html',
            controller: ModalInstanceRequestCtrl,
            scope: $scope,
            resolve: {
                requestForm: function () {
                    return $scope.requestForm;
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

var ModalInstanceEntityCtrl = function ($scope, $modalInstance, $stateParams, $http, entityForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.entityForm.$valid) {

            $scope.inserted = {
                id: $scope.entities.length+1,
                name: $scope.name,
                status: null,
                group: null
            };
            $scope.entities.push($scope.inserted);

            var dataObject = {
                name : $scope.name
            };

            var responsePromise = $http.post("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/entities", dataObject, {});
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

var ModalInstanceRequestCtrl = function ($scope, $modalInstance, $http, $stateParams, requestForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.requestForm.$valid) {;

            $scope.inserted = {
                id: $scope.requests.length+1,
                name: $scope.name,
                status: null,
                group: null
            };
            $scope.requests.push($scope.inserted);

            var dataObject = {
                name : $scope.name
            };

            var responsePromise = $http.post("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/requests", dataObject, {});
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