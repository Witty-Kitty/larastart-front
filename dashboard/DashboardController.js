'use strict';

MetronicApp.controller('DashboardController', function($rootScope, $scope, $http, $timeout,projectService) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        Metronic.initAjax();
    });

    $rootScope.sidebar = [];

    var projects = projectService.query(function() {
        console.log(projects);

        $scope.projects = projects;
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageSidebarClosed = false;

    //Accordion code
    $scope.oneAtATime = true;


    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    $rootScope.crumbs = [{
        link: "#/dashboard.html",
        name: "Home"
    }]

})

