/**
 * Created by Kathleen on 09/02/2015.
 */

MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider



        // Modules
        .state('module_general', {
            url: "/module_general/:id",
            templateUrl: "modules/module_general.html",
            data: {pageTitle: ''},
            controller: "ModuleController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                            'modules/ModuleController.js'
                        ]
                    }]);
                }]
            }
        })

        // Modules
        .state('module_entities', {
            url: "/module_entities/:id",
            templateUrl: "modules/module_entities.html",
            data: {pageTitle: 'Entities'},
            controller: "ModuleController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                            'modules/ModuleController.js'
                        ]
                    }]);
                }]
            }
        })

        // Modules
        .state('module_routes', {
            url: "/module_routes/:id",
            templateUrl: "modules/module_routes.html",
            data: {pageTitle: 'Routes'},
            controller: "ModuleController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                            'modules/ModuleController.js'
                        ]
                    }]);
                }]
            }
        })



}]);