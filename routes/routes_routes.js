/**
 * Created by Kathleen on 09/02/2015.
 */



MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider

        // Routes
        .state('routes_routes', {
            url: "/routes_routes/:id",
            templateUrl: "routes/routes_routes.html",
            data: {pageTitle: 'Routes'},
            controller: "RoutesController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '../../../assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            '../../../assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ]
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'routes/RoutesController.js'
                        ]
                    }]);
                }]
            }
        })


        // Controllers
        .state('routes_controllers', {
            url: "/routes_controllers/:id",
            templateUrl: "routes/routes_controllers.html",
            data: {pageTitle: 'Controllers'},
            controller: "RoutesController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '../../../assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            '../../../assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ]
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'routes/RoutesController.js'
                        ]
                    }]);
                }]
            }
        })


        // Views
        .state('routes_views', {
            url: "/routes_views/:id",
            templateUrl: "routes/routes_views.html",
            data: {pageTitle: 'Views'},
            controller: "RoutesController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '../../../assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            '../../../assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ]
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'routes/RoutesController.js'
                        ]
                    }]);
                }]
            }
        })


        // Transformers
        .state('routes_transformers', {
            url: "/routes_transformers/:id",
            templateUrl: "routes/routes_transformers.html",
            data: {pageTitle: 'Transformers'},
            controller: "RoutesController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '../../../assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            '../../../assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ]
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'routes/RoutesController.js'
                        ]
                    }]);
                }]
            }
        })



}]);