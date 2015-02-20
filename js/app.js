/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",
    "ngResource",
    "ngSanitize",
    "ngMockE2E",
    "xeditable"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);


//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.sidebar = [];
    $rootScope.finalCrumb = [];
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/* Init global settings and run the app */
MetronicApp.run(["$httpBackend","$rootScope", "settings", "$state", "editableOptions", function($httpBackend, $rootScope, settings, $state, editableOptions) {
    $rootScope.$state = $state; // state to be accessed from view

    editableOptions.theme = 'default';

    var projectDets = [
        {
            "id" : 1,
            "name" : "Larastart",
            "module" : "Module X",
            "entities" : "Entity X",
            "routes" : "Route X"
        },
        {
            "id" : 2,
            "name" : "Angularjs Tutorial"
        },
        {
            "id" : 3,
            "name" : "Laravel API"
        },
        {
            "id" : 4,
            "name" : "Angular Tests"
        }
    ];


    $httpBackend.whenGET('/api/v1/projects').respond(function(method, url, data){
        console.log('all');
        return [200, projectDets, {}];
    })


    $httpBackend.whenGET('/api/v1/projects/1').respond(function(method, url, data){
        console.log('with id');
        return [200, projectDets[0], {}];
    });

    $httpBackend.whenGET(/^layout\//).passThrough();
    $httpBackend.whenGET(/^dashboard\//).passThrough();
    $httpBackend.whenGET(/^projects\//).passThrough();
    $httpBackend.whenGET(/^modules\//).passThrough();
    $httpBackend.whenGET(/^entities\//).passThrough();
    $httpBackend.whenGET(/^routes\//).passThrough();


}]);