/**
 * Created by Kathleen on 07/02/2015.
 */

'use strict';

MetronicApp.controller('ModuleController', function($rootScope, $scope, $http, $timeout, projectService, $stateParams, $state) {

    var project;

    $scope.$on('$viewContentLoaded', function() {
        Metronic.initAjax(); // initialize core components
    });




    $rootScope.sidebar = [
        {
            icon: "briefcase",
            title: "General",
            uri: "#/module_general/"+$stateParams.id
        },
        {
            icon: "puzzle",
            title: "Entities",
            uri: "#/module_entities/"+$stateParams.id
        },
        {
            icon: "refresh",
            title: "Routes",
            uri: "#/module_routes/"+$stateParams.id
        }
    ]



        project = projectService.get({ id: $stateParams.id }, function() {
        console.log(project);

        $scope.project = project;

            $state.current.data.pageTitle = $scope.project['module'];

        $rootScope.crumbs = [{
            link: "#/dashboard.html",
            name: "Home"
        },
            {
                link: "#/projects_general/"+$stateParams.id,
                name: $scope.project['name']
            },{
                link: "#/projects_modules/"+$stateParams.id,
                name: 'Modules'
            }]

    })

    $scope.entities = [
        {
            name: "Entity X"
        },
        {
            name: "Entity Y"
        },
        {
            name: "Entity Z"
        }
    ]

    $scope.routes = [
        {
            name: "Route X"
        },
        {
            name: "Route Y"
        },
        {
            name: "Route Z"
        }
    ]



    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageSidebarClosed = false;

});