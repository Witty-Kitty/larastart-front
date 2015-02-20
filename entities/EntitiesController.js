/**
 * Created by Kathleen on 07/02/2015.
 */

'use strict';

MetronicApp.controller('EntitiesController', function($rootScope, $scope, $http, $timeout, projectService, $stateParams) {


    $scope.$on('$viewContentLoaded', function() {
        Metronic.initAjax(); // initialize core components
    });




    $rootScope.sidebar = [
        {
            icon: "briefcase",
            title: "General",
            uri: "#/entities_general/"+$stateParams.id
        },
        {
            icon: "puzzle",
            title: "Tables",
            uri: "#/entities_tables/"+$stateParams.id
        },
        {
            icon: "refresh",
            title: "Seeds",
            uri: "#/entities_seeds/"+$stateParams.id
        },
        {
            icon: "puzzle",
            title: "Model",
            uri: "#/entities_model/"+$stateParams.id
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
                link: "#/projects_modules/"+$stateParams.id,
                name: 'Modules'
            },{
                link: "#/module_general/"+$stateParams.id,
                name: $scope.project['module']
            },{
                link: "#/module_entities/"+$stateParams.id,
                name: 'Entities'
            }, {
                link: "#/entities_general/"+$stateParams.id,
                name: $scope.project['entities']
            }]

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
            if ($scope.entities.attributes.indexOf(e.value) >= 0) {
                selected.push(e.text);
            }
        });
        return selected.length ? selected.join(', ') : 'Not set';
    };


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageSidebarClosed = false;


    $scope.tables = [
        {
            name: "table X"
        },
        {
            name: "table Y"
        },
        {
            name: "table Z"
        }
    ]

    $scope.seeds = [
        {
            name: "seed X"
        },
        {
            name: "seed Y"
        },
        {
            name: "seed Z"
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
});