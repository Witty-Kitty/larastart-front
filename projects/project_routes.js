/**
 * Created by Kathleen on 09/02/2015.
 */

MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider

        // General
        .state('general', {
            url: "/projects_general/p/:id",
            templateUrl: "projects/projects_general.html",
            data: {pageTitle: 'General'},
            controller: "ProjectsController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'projects/ProjectsController.js'
                        ]
                    }]);
                }]
            }
        })

        // Packages
        .state('packages', {
            url: "/projects_packages/p/:id",
            templateUrl: "projects/projects_packages.html",
            data: {pageTitle: 'Packages'},
            controller: "ProjectsController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'angularFileUpload',
                        files: [
                            '../../../assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                        ]
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'projects/ProjectsController.js'
                        ]
                    }]);
                }]
            }
        })

        // Modules
        .state('modules', {
            url: "/projects_modules/p/:id",
            templateUrl: "projects/projects_modules.html",
            data: {pageTitle: 'Modules'},
            controller: "ProjectsController",
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
                            'projects/ProjectsController.js'
                        ]
                    }]);
                }]
            }
        })

}]);