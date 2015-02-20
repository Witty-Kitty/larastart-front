/**
 * Created by Kathleen on 07/02/2015.
 */

'use strict';

MetronicApp.controller('RoutesController', function($rootScope, $scope, $http, $timeout, projectService, $stateParams, $filter) {


    $scope.$on('$viewContentLoaded', function() {
        Metronic.initAjax(); // initialize core components
    });




    $rootScope.sidebar = [
        {
            icon: "briefcase",
            title: "Routes",
            uri: "#/routes_routes/"+$stateParams.id
        },
        {
            icon: "puzzle",
            title: "Controllers",
            uri: "#/routes_controllers/"+$stateParams.id
        },
        {
            icon: "refresh",
            title: "Views",
            uri: "#/routes_views/"+$stateParams.id
        },
        {
            icon: "puzzle",
            title: "Transformers",
            uri: "#/routes_transformers/"+$stateParams.id
        }
    ]




    var project = projectService.get({ id: $stateParams.id }, function() {
        console.log(project);

        $scope.project = project;

        $rootScope.crumbs = [{
            link: "#/dashboard.html",
            name: "Home"
        },
            {
                link: "#/projects_general/"+$stateParams.id,
                name: $scope.project['name']
            }, {
                link: "#/routes_routes/"+$stateParams.id,
                name: 'Modules'
            }, {
                link: "#/module_general/"+$stateParams.id,
                name: $scope.project['module']
            }, {
                link: "#/module_general/"+$stateParams.id,
                name: 'Routes'
            },{
                link: "#/routes_routes/"+$stateParams.id,
                name: $scope.project['routes']
            }]


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


    $scope.controllers = [
        {
            name: "controller X"
        },
        {
            name: "controller Y"
        },
        {
            name: "controller Z"
        }
    ]

    $scope.views = [
        {
            name: "view X"
        },
        {
            name: "view Y"
        },
        {
            name: "view Z"
        }
    ]

    $scope.transformers = [
        {
            name: "transformer X"
        },
        {
            name: "transformer Y"
        },
        {
            name: "transformer Z"
        }
    ]

    $scope.routes = [
        {
            id: 1,
            name: "Route X"
        },
        {
            id: 2,
            name: "Route Y"
        },
        {
            id: 3,
            name: "Route Z"
        }
    ]

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
});