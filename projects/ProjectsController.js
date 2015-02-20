/**
 * Created by Kathleen on 04/02/2015.
 */
'use strict';

MetronicApp.controller('ProjectsController', function($rootScope, $scope, $http, $timeout, projectService, $stateParams, $filter, $modal, $log) {

    var project;

    $scope.$on('$viewContentLoaded', function() {
        Metronic.initAjax(); // initialize core components
    });


    $scope.sideTab = [{
        page: "General"
    },{
        page: "Packages"
    },{
        page: "Modules"
    }]


    $rootScope.sidebar = [
        {
            icon: "briefcase",
            title: $scope.sideTab[0]["page"],
            uri: "#/projects_general/"+$stateParams.id
        },
        {
            icon: "puzzle",
            title: "Packages",
            uri: "#/projects_packages/"+$stateParams.id
        },
        {
            icon: "refresh",
            title: "Modules",
            uri: "#/projects_modules/"+$stateParams.id
        }]

    project = projectService.get({ id: $stateParams.id }, function() {
        console.log(project);

       $scope.project = project;

        $rootScope.crumbs = [{
            link: "#/dashboard.html",
            name: "Home"
        },
            {
                link: "#/projects_general/"+$stateParams.id,
                name: $scope.project['name']
            }]
    })


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageSidebarClosed = false;

    $scope.packageOptions = [{
        value: "assets",
        text: "Assets"
    },{
        value: "views",
        text: "Views"
    },{
        value: "migrations",
        text: "Migrations"
    },{
        value: "configuration",
        text: "Configuration"
    }];

    $scope.showOptions = function() {
        var selected = [];
        angular.forEach($scope.packageOptions, function(p) {
            if ($scope.packageOptions.indexOf(p.value) >= 0) {
                selected.push(p.text);
            }
        });
        return selected.length ? selected.join(', ') : 'Not set';
    };

    $scope.projectTypes = [
        {value: 'api', text: 'API'},
        {value: 'front-end', text: 'Front-end'}
    ];

    $scope.showTypes = function() {
        var selected = $filter('filter')($scope.projectTypes, {value: $scope.project.type});
        return ($scope.project.type && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.projectVersions = [
        {value: 5.0, text: '5.0'},
        {value: 4.2, text: '4.2'}
    ];

    $scope.showVersions = function() {
        var selected = $filter('filter')($scope.projectVersions, {value: $scope.project.version});
        return ($scope.project.version && selected.length) ? selected[0].text : 'Not set';
    };

    // remove package
    $scope.removePackage = function(index) {
        $scope.packages.splice(index, 1);
    };

    // add package
    $scope.addPackage = function() {
        $scope.inserted = {
            id: $scope.packages.length+1,
            name: '',
            status: null,
            group: null
        };
        $scope.packages.push($scope.inserted);
    };


    $scope.packages = [
        {
            id: 1,
            name: "Dingo"
        },
        {
            id: 2,
            name: "Package X"
        },
        {
            id: 3,
            name: "Package Y"
        },
        {
            id: 4,
            name: "Package Z"
        }
    ]

    $scope.modules = [
        {
            name: "Module X"
        },
        {
            name: "Module Y"
        },
        {
            name: "Module Z"
        }
    ]

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

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.createPackage = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalController',
            size: size,
            resolve: {
                packages: function () {
                    return $scope.packages;
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