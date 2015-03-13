/**
 * Created by Kathleen on 09/02/2015.
 */



MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider

        // Routes
        .state('requests_routes', {
            url: "/requests_routes/p/:id/m/:mid/r/:rid",
            templateUrl: "requests/requests_routes.html",
            data: {pageTitle: 'Routes'},
            controller: "RequestsController",
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
                            'requests/RequestsController.js'
                        ]
                    }]);
                }]
            }
        })


        // Controllers
        .state('requests_controllers', {
            url: "/requests_controllers/p/:id/m/:mid/r/:rid",
            templateUrl: "requests/requests_controllers.html",
            data: {pageTitle: 'Controllers'},
            controller: "RequestsController",
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
                            'requests/RequestsController.js'
                        ]
                    }]);
                }]
            }
        })


        // Views
        .state('requests_views', {
            url: "/requests_views/p/:id/m/:mid/r/:rid",
            templateUrl: "requests/requests_views.html",
            data: {pageTitle: 'Views'},
            controller: "RequestsController",
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
                            'requests/RequestsController.js'
                        ]
                    }]);
                }]
            }
        })


        // Transformers
        .state('requests_transformers', {
            url: "/requests_transformers/p/:id/m/:mid/r/:rid",
            templateUrl: "requests/requests_transformers.html",
            data: {pageTitle: 'Transformers'},
            controller: "RequestsController",
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
                            'requests/RequestsController.js'
                        ]
                    }]);
                }]
            }
        })



}]);