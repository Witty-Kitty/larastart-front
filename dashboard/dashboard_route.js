/**
 * Created by Kathleen on 09/02/2015.
 */

MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider


// Dashboard
.state('dashboard', {
    url: "/dashboard.html",
    templateUrl: "dashboard/dashboard.html",
    data: {pageTitle: ''},
    controller: "DashboardController",
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                files: [
                    '../../../assets/global/plugins/morris/morris.css',
                    '../../../assets/admin/pages/css/tasks.css',

                    '../../../assets/global/plugins/morris/morris.min.js',
                    '../../../assets/global/plugins/morris/raphael-min.js',
                    '../../../assets/global/plugins/jquery.sparkline.min.js',

                    '../../../assets/admin/pages/scripts/index3.js',
                    '../../../assets/admin/pages/scripts/tasks.js',

                    'dashboard/DashboardController.js'
                ]
            });
        }]
    }
})

        .state('login', {
            url: "/login",
            templateUrl: "dashboard/login.html",
            data: {pageTitle: 'Login'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../../../assets/global/plugins/morris/morris.css',
                            '../../../assets/admin/pages/css/tasks.css',

                            '../../../assets/global/plugins/morris/morris.min.js',
                            '../../../assets/global/plugins/morris/raphael-min.js',
                            '../../../assets/global/plugins/jquery.sparkline.min.js',

                            '../../../assets/admin/pages/scripts/index3.js',
                            '../../../assets/admin/pages/scripts/tasks.js',

                            'dashboard/DashboardController.js'
                        ]
                    });
                }]
            }
        })

        .state('reset_password', {
            url: "/reset",
            templateUrl: "dashboard/reset_pwd.html",
            data: {pageTitle: 'Reset Password'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../../../assets/global/plugins/morris/morris.css',
                            '../../../assets/admin/pages/css/tasks.css',

                            '../../../assets/global/plugins/morris/morris.min.js',
                            '../../../assets/global/plugins/morris/raphael-min.js',
                            '../../../assets/global/plugins/jquery.sparkline.min.js',

                            '../../../assets/admin/pages/scripts/index3.js',
                            '../../../assets/admin/pages/scripts/tasks.js',

                            'dashboard/DashboardController.js'
                        ]
                    });
                }]
            }
        })

        .state('register', {
            url: "/register",
            templateUrl: "dashboard/register.html",
            data: {pageTitle: 'Register'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../../../assets/global/plugins/morris/morris.css',
                            '../../../assets/admin/pages/css/tasks.css',

                            '../../../assets/global/plugins/morris/morris.min.js',
                            '../../../assets/global/plugins/morris/raphael-min.js',
                            '../../../assets/global/plugins/jquery.sparkline.min.js',

                            '../../../assets/admin/pages/scripts/index3.js',
                            '../../../assets/admin/pages/scripts/tasks.js',

                            'dashboard/DashboardController.js'
                        ]
                    });
                }]
            }
        })

        .state('recover', {
            url: "/recover",
            templateUrl: "dashboard/recover_pwd.html",
            data: {pageTitle: 'Recover'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../../../assets/global/plugins/morris/morris.css',
                            '../../../assets/admin/pages/css/tasks.css',

                            '../../../assets/global/plugins/morris/morris.min.js',
                            '../../../assets/global/plugins/morris/raphael-min.js',
                            '../../../assets/global/plugins/jquery.sparkline.min.js',

                            '../../../assets/admin/pages/scripts/index3.js',
                            '../../../assets/admin/pages/scripts/tasks.js',

                            'dashboard/DashboardController.js'
                        ]
                    });
                }]
            }
        })

}]);
