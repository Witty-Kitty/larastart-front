/**
 * Created by Kathleen on 09/02/2015.
 */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider

        // Entities_General
        .state('entities_general', {
            url: "/entities_general/p/:id/m/:mid/e/:eid",
            templateUrl: "entities/entities_general.html",
            data: {pageTitle: 'General'},
            controller: "EntitiesController",
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
                            'entities/EntitiesController.js'
                        ]
                    }]);
                }]
            }
        })


        // Entities_Tables
        .state('entities_tables', {
            url: "/entities_tables/p/:id/m/:mid/e/:eid",
            templateUrl: "entities/entities_tables.html",
            data: {pageTitle: 'Tables'},
            controller: "EntitiesController",
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
                            'entities/EntitiesController.js'
                        ]
                    }]);
                }]
            }
        })

        // Entities_Seeds
        .state('entities_seeds', {
            url: "/entities_seeds/p/:id/m/:mid/e/:eid",
            templateUrl: "entities/entities_seeds.html",
            data: {pageTitle: 'Seeds'},
            controller: "EntitiesController",
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
                            'entities/EntitiesController.js'
                        ]
                    }]);
                }]
            }
        })


        // Entities_Model
        .state('entities_model', {
            url: "/entities_model/p/:id/m/:mid/e/:eid",
            templateUrl: "entities/entities_model.html",
            data: {pageTitle: 'Model'},
            controller: "EntitiesController",
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
                            'entities/EntitiesController.js'
                        ]
                    }]);
                }]
            }
        })



}]);