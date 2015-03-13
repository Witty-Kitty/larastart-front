/**
 * Created by Kathleen on 07/02/2015.
 */

'use strict';

MetronicApp.controller('EntitiesController', function($rootScope, $scope, $http, $timeout, projectService, $stateParams, $modal, $log) {


    $scope.$on('$viewContentLoaded', function() {
        Metronic.initAjax(); // initialize core components
    });




    $rootScope.sidebar = [
        {
            icon: "briefcase",
            title: "General",
            uri: "#/entities_general/p/"+$stateParams.id+"/m/"+$stateParams.mid+"/e/"+$stateParams.eid
        },
        {
            icon: "puzzle",
            title: "Tables",
            uri: "#/entities_tables/p/"+$stateParams.id+"/m/"+$stateParams.mid+"/e/"+$stateParams.eid
        },
        {
            icon: "refresh",
            title: "Seeds",
            uri: "#/entities_seeds/p/"+$stateParams.id+"/m/"+$stateParams.mid+"/e/"+$stateParams.eid
        },
        {
            icon: "puzzle",
            title: "Model",
            uri: "#/entities_model/p/"+$stateParams.id+"/m/"+$stateParams.mid+"/e/"+$stateParams.eid
        }
    ]

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id)
        .success(function(project) {
            $scope.project = project;

            $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid)
                .success(function(module) {
                    $scope.module = module[0];

                    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/entities/"+$stateParams.eid)
                        .success(function(entity) {
                            $scope.entity = entity[0];

            $rootScope.crumbs = [{
                link: "#/dashboard.html",
                name: "Home"
            },
                {
                    link: "#/projects_general/p/"+$stateParams.id,
                    name: $scope.project['name']
                }, {
                    link: "#/projects_modules/p/"+$stateParams.id,
                    name: 'Modules'
                },{
                    link: "#/module_general/p/"+$stateParams.id+"/m/"+$stateParams.mid,
                    name: $scope.module['name']
                },{
                    link: "#/module_entities/p/"+$stateParams.id+"/m/"+$stateParams.mid,
                    name: 'Entities'
                }, {
                    link: "#/entities_general/p/"+$stateParams.id+"/m/"+$stateParams.mid+"/e/"+$stateParams.eid,
                    name: $scope.entity['name']
                }]

                        })
                    })
        })

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/entities/"+$stateParams.eid+"/tables")
        .success(function(tables) {
            $scope.tables = tables;

        })

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/entities/"+$stateParams.eid+"/models")
        .success(function(model) {
            $scope.model = model[0];
        })

    $http.get("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/entities/"+$stateParams.eid+"/seeds")
        .success(function(seeds) {
            $scope.seeds = seeds;
        })


    $scope.entityAttributes = [{
        value: "softdeletes",
        text: "Softdeletes"
    },{
        value: "one",
        text: "one"
    },{
        value: "two",
        text: "two"
    },{
        value: "three",
        text: "three"
    }];

    $scope.showAttributes = function() {
        var selected = [];
        angular.forEach($scope.entityAttributes, function(e) {
            if ($scope.entityAttributes.indexOf(e.value) >= 0) {
                selected.push(e.text);
            }
        });
        return selected.length ? selected.join(', ') : 'Not set';
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

    $scope.showFormTable = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modal-table-form.html',
            controller: ModalInstanceTableCtrl,
            scope: $scope,
            resolve: {
                tableForm: function () {
                    return $scope.tableForm;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.showFormSeed = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modal-seed-form.html',
            controller: ModalInstanceSeedCtrl,
            scope: $scope,
            resolve: {
                seedForm: function () {
                    return $scope.seedForm;
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

var ModalInstanceTableCtrl = function ($scope, $modalInstance, $http, $stateParams, tableForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.tableForm.$valid) {

            $scope.inserted = {
                id: $scope.tables.length+1,
                name: $scope.name,
                status: null,
                group: null
            };
            $scope.tables.push($scope.inserted);

            var dataObject = {
                name : $scope.name
            };

            var responsePromise = $http.post("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/entities/"+$stateParams.eid+"/tables", dataObject, {});
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

var ModalInstanceSeedCtrl = function ($scope, $modalInstance, $http, $stateParams, seedForm) {
    $scope.form = {}
    $scope.submitForm = function () {
        if ($scope.form.seedForm.$valid) {

            $scope.inserted = {
                id: $scope.seeds.length+1,
                name: $scope.name,
                status: null,
                group: null
            };
            $scope.seeds.push($scope.inserted);

            var dataObject = {
                name : $scope.name
            };

            var responsePromise = $http.post("http://larastart.api/api/v1/projects/"+$stateParams.id+"/modules/"+$stateParams.mid+"/entities/"+$stateParams.eid+"/seeds", dataObject, {});
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
